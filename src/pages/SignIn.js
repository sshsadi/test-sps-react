import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

const userService = new UserService();

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError(false);
    setLoading(true);

    try {
      const res = await userService.login({email, password});

      const { token } = res.data;
      localStorage.setItem("token", token);
     // setMensaje("Inicio de sesión exitoso");
      setLoading(false);

      setTimeout(() => {
        navigate("/home");
      }, 800);
    } catch (error) {
      setMensaje(
        error.response?.status === 401
          ? "Credenciales incorrectas"
          : "Error en el servidor, intenta nuevamente"
      );
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="form" aria-label="Formulario de inicio de sesión">
        <h2 className="title">Iniciar Sesión</h2>

        {mensaje && (
          <div
            role="alert"
            className={`alert ${error ? "error" : "success"}`}
          >
            {mensaje}
          </div>
        )}

        <label htmlFor="email" className="label">Correo electrónico</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tucorreo@ejemplo.com"
          required
          className="input"
          disabled={loading}
        />

        <label htmlFor="password" className="label">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="input"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="button"
        >
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
