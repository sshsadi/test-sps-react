import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import "../Users.css"; 

const userService = new UserService();

function UserCreate() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await userService.create({
        username,
        email,
        type,
        password,
      });
  
      alert("Usuario creado exitosamente");
      navigate("/users");
    } catch (error) {
      console.error("Error al crear usuario:", error);
      alert("No se pudo crear el usuario");
    }
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">➕ Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>👤 Nombre:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>📧 Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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

        <div className="form-group">
          <label>🔑 Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-save">💾 Crear</button>
          <button type="button" onClick={handleCancel} className="btn btn-cancel">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default UserCreate;