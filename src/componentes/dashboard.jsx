// src/componentes/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from './navbar';
import './styles/dashboard.css'; // Asegúrate de tener este archivo CSS

export default function Dashboard() {
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const fetchRoles = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/roles', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRoles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/roles', { name, description: desc }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      Swal.fire('✔', 'Rol creado', 'success');
      setName(''); setDesc('');
      fetchRoles();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Algo falló', 'error');
    }
  };

  return (
    <>
      <Navbar />
      <div className="role-card">
        <h2>Administración de Roles</h2>
        <form onSubmit={handleSubmit} className="role-form">
          <input
            type="text"
            placeholder="Nombre del rol"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            required
          />
          <button type="submit">Agregar rol</button>
        </form>
        <hr />
        <div className="role-list">
          {roles.map(r => (
            <div key={r.id} className="role-item">
              <strong>{r.name}</strong>
              <p>{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
