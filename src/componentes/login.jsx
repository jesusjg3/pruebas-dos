import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from './navbar';
import './styles/dashboard.css';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });
      // Guarda el token y llama onLogin si tu app lo necesita
      localStorage.setItem('token', res.data.token);
      if (onLogin) onLogin(res.data.user); // Puedes borrar esto si tu app no lo usa
      window.location.href = "/dashboard"; // Redirección directa tras login
    } catch (err) {
      setError('Login incorrecto. Verifica tus datos.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Ingresar</button>
        </form>
        {error && <div className="login-error">{error}</div>}
      </div>
    </div>
  );
}