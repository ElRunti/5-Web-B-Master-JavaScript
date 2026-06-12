import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Escribe un nombre de usuario.");
      return;
    }
    if (!password.trim()) {
      setError("Escribe una contraseña.");
      return;
    }
    onLogin(username.trim());
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">Murmur</div>
        <p className="login-tagline">Lo que piensas, en voz baja.</p>

        <form onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="username">
            Nombre de usuario
          </label>
          <input
            id="username"
            className="login-input"
            type="text"
            placeholder="@tunombre"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            autoComplete="username"
            autoFocus
          />

          <label className="login-label" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            className="login-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            autoComplete="current-password"
          />

          {error && (
            <p style={{ fontSize: 13, color: "#e24b4a", marginBottom: 12 }}>
              {error}
            </p>
          )}

          <button className="login-btn" type="submit">
            Entrar a Murmur
          </button>
        </form>

        <p className="login-hint">
          Cualquier usuario y contraseña funciona en este demo.
        </p>
      </div>
    </div>
  );
};

export default Login;
