import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import "../Users.css"; 


const userService = new UserService();

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Cargar usuarios al iniciar
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.list();
      setUsers(data.data);
    } catch (error) {
      console.error("Error cargando usuarios", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/users/${id}`);
  };

  const handleDelete = async (email) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar?");
  
    if (!confirmar) return;
  
    try {
      await userService.delete(email);
      alert("Eliminado");
      // Recargar usuarios
      const response = await userService.list();
      setUsers(response.data);
    } catch (error) {
      console.error("Error al eliminar", error);
      alert("No se pudo eliminar");
    }
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // O donde tengas el login
  };

  return (
    <div className="usuarios-container">
      <h1 className="title">👥 Lista de Usuarios</h1>

      <button className="create-button" onClick={() => navigate("/userCreate")}>
        ➕ Nuevo Usuario
      </button>
<br/>
      <button onClick={handleHome} className="icon-button" title="Ir a Inicio">
        Ir a inicio
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>👤 Username</th>
            <th>📧 Email</th>
            <th>⚙️ Tipo</th>
            <th>🛠️ Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.type}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(user.email)}>
                    ✏️ Editar
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(user.email)}>
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay usuarios disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
      <br/>
      <button onClick={() => handleLogout}>
         Cerrar Sesión
      </button>
    </div>
  );
}


export default Users;
