// src/components/LoginForm.jsx
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      if (res.data.token) {
        Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          text: `Bienvenido, ${res.data.user.name}`,
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          // Guardar token localmente
          localStorage.setItem('token', res.data.token);

          // Redirigir al dashboard
          navigate('componentes/dashboard');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Credenciales inválidas',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el servidor',
        text: err.response?.data?.message || 'Algo salió mal',
      });
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Ingresar</button>
    </form>
  );
}

export default LoginForm;
