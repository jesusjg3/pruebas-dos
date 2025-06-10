import React from 'react';

export default function Navbar({ user }) {
  return (
    <nav className="navbar">
      <div className="logo">GESTIONHOTEL</div>
      <div className="nav-center">
        <a href="/dashboard">Dashboard</a>
        <a href="/reservas">Reservas</a>
        <a href="/hoteles">Hoteles</a>
        <a href="/empleados">Empleados</a>
      </div>
      <div className="user-info">
        {user ? (
          <>Bienvenido, <b>{user.name}</b></>
        ) : (
          <>No autenticado</>
        )}
      </div>
    </nav>
  );
}