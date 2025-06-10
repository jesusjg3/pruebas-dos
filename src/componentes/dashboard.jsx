import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from './navbar';
import './styles/dashboard.css';

export default function Dashboard() {
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  // Nuevos estados
  const [hotels, setHotels] = useState([]);
  const [users, setUsers] = useState([]);
  const [empleados, setEmpleados] = useState([]);

  const fetchRoles = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/rols', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRoles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // NUEVO: obtener hoteles
  const fetchHotels = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/hotels', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setHotels(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // NUEVO: obtener usuarios
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/usuarios', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // NUEVO: obtener empleados
  const fetchEmpleados = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/empleados', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEmpleados(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchHotels();
    fetchUsers();
    fetchEmpleados();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/rols', { nombrerol: name, descripcion: desc }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      Swal.fire('✔', 'Rol creado', 'success');
      setName('');
      setDesc('');
      fetchRoles();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Algo falló', 'error');
    }
  };

  const handleDelete = async id => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el rol permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/rols/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        Swal.fire('Eliminado', 'El rol ha sido eliminado', 'success');
        fetchRoles();
      } catch (err) {
        Swal.fire('Error', err.response?.data?.message || 'No se pudo eliminar', 'error');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-grid">
        {/* Cuadro de Roles */}
        <div className="admin-card">
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
                <strong>{r.nombrerol}</strong>
                <p>{r.descripcion}</p>
                <button
                  style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.3rem 0.8rem', cursor: 'pointer', marginLeft: '1rem' }}
                  onClick={() => handleDelete(r.id)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cuadro de Hoteles */}
        <div className="admin-card">
          <h2>Hoteles</h2>
          <ul>
            {hotels.map(hotel => (
              <li key={hotel.id}>
                <strong>{hotel.nombre}</strong> - {hotel.ubicacion || hotel.direccion}
              </li>
            ))}
          </ul>
        </div>

        {/* Cuadro de Usuarios */}
        <div className="admin-card">
          <h2>Usuarios</h2>
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <strong>{user.name}</strong> - {user.email}
              </li>
            ))}
          </ul>
        </div>

        {/* Cuadro de Empleados */}
        <div className="admin-card">
          <h2>Empleados</h2>
          <ul>
            {empleados.map(emp => (
              <li key={emp.id}>
                <strong>{emp.nombre}</strong> {emp.apellido} - {emp.cargo}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}