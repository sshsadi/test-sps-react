import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Users.css"; 

function Home() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // O donde tengas el login
  };

  return (
    <div className="home-container">
      <h1 className="home-title">📋 SPS REACT TEST</h1>

      <nav className="home-nav">
        <Link to="/users" className="home-link">👥 Usuarios</Link>
        <Link to="/userCreate" className="home-link">➕ Nuevo Usuario</Link>
      </nav>
<br/>
      <button onClick={handleLogout} className="logout-button">
        Cerrar sesión
      </button>
    </div>
  );
}

export default Home;
