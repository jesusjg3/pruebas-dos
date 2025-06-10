// src/componentes/Navbar.jsx
import { useNavigate } from "react-router-dom";
import "./styles/navbar.css";

export default function Navbar() {
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">ADMINISTRACION</div>
      <button className="logout-btn" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </nav>
  );
}
