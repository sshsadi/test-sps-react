import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import "../Users.css"; 

const userService = new UserService();

export async function userLoader({ params }) {
  const email = params.userId;
  const userService = new UserService();

  try {
    const response = await userService.get(email); // Usamos el método get implementado

    return { user: response.data };
  } catch (error) {
    throw new Response("Error al cargar usuario", {
      status: error.response?.status || 500,
    });
  }
}

function EditUser() {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [type, setType] = useState(user.type);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await userService.update(user.email, {
        username,
        type,
      });
  
      alert("Usuario actualizado correctamente");
      navigate("/users");
    } catch (error) {
      console.error("Error al actualizar usuario", error);
      alert("Error al guardar");
    }
  };

  const handleCancel = () => {
    navigate("/users");
  };
  
  return (
    <div className="form-container">
      <h2 className="form-title">✏️ Editar Usuario</h2>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>👤 Nombre:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>📧 Email:</label>
          <input type="email" value={user.email} disabled />
        </div>

        <div className="form-group">
          <label>🔐 Tipo:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-save">💾 Guardar</button>
          <button type="button" onClick={handleCancel} className="btn btn-cancel">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
