import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from './navbar';
import './styles/dashboard.css';

export default function Dashboard() {
  // Estados para las listas
  const [roles, setRoles] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [users, setUsers] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [usuario, setUsuario] = useState(null);

  // Estados para formularios
  const [roleName, setRoleName] = useState('');
  const [roleDesc, setRoleDesc] = useState('');
  const [hotelNombre, setHotelNombre] = useState('');
  const [hotelUbicacion, setHotelUbicacion] = useState('');
  const [userNombre, setUserNombre] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmpleadoId, setUserEmpleadoId] = useState('');
  const [empleadoNombre, setEmpleadoNombre] = useState('');
  const [empleadoApellido, setEmpleadoApellido] = useState('');
  const [empleadoCargo, setEmpleadoCargo] = useState('');

  // Fetch functions
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

  // Cargar nombre de usuario autenticado (ejemplo, debes adaptar a tu backend)
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get('http://localhost:8000/api/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuario(res.data);
      } catch (err) {
        setUsuario(null);
      }
    };
    fetchMe();
    fetchRoles();
    fetchHotels();
    fetchUsers();
    fetchEmpleados();
  }, []);

  // Handlers para agregar
  const handleAddRol = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/rols', { nombrerol: roleName, descripcion: roleDesc }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      Swal.fire('✔', 'Rol creado', 'success');
      setRoleName('');
      setRoleDesc('');
      fetchRoles();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'No se pudo crear rol', 'error');
    }
  };

  const handleAddHotel = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/hotels', { nombre: hotelNombre, ubicacion: hotelUbicacion }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      Swal.fire('✔', 'Hotel creado', 'success');
      setHotelNombre('');
      setHotelUbicacion('');
      fetchHotels();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'No se pudo crear hotel', 'error');
    }
  };

  const handleAddUser = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/usuarios', {
        name: userNombre,
        email: userEmail,
        password: userPassword,
        empleado_id: userEmpleadoId === '' ? null : userEmpleadoId
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      Swal.fire('✔', 'Usuario creado', 'success');
      setUserNombre('');
      setUserEmail('');
      setUserPassword('');
      setUserEmpleadoId('');
      fetchUsers();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'No se pudo crear usuario', 'error');
    }
  };

  const handleAddEmpleado = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/empleados', {
        nombre: empleadoNombre,
        apellido: empleadoApellido,
        cargo: empleadoCargo
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      Swal.fire('✔', 'Empleado creado', 'success');
      setEmpleadoNombre('');
      setEmpleadoApellido('');
      setEmpleadoCargo('');
      fetchEmpleados();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'No se pudo crear empleado', 'error');
    }
  };

  // Handler para eliminar roles (igual puedes hacer para otros si quieres)
  const handleDeleteRol = async id => {
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
      <Navbar user={usuario} />
      <div className="admin-grid">
        {/* Roles */}
        <div className="admin-card">
          <h2>Administración de Roles</h2>
          <form onSubmit={handleAddRol} className="role-form">
            <input
              type="text"
              placeholder="Nombre del rol"
              value={roleName}
              onChange={e => setRoleName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Descripción"
              value={roleDesc}
              onChange={e => setRoleDesc(e.target.value)}
              required
            />
            <button type="submit">Agregar rol</button>
          </form>
          <hr />
          <div className="role-list">
            {roles.map(r => (
              <div key={r.id} className="role-item">
                <strong>{r.nombrerol}</strong>
                <p style={{ margin: "0.2em 0 0.2em 0.1em", color: "#607d8b" }}>{r.descripcion}</p>
                <button
                  onClick={() => handleDeleteRol(r.id)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hoteles */}
        <div className="admin-card">
          <h2>Hoteles</h2>
          <form onSubmit={handleAddHotel} className="role-form">
            <input
              type="text"
              placeholder="Nombre del hotel"
              value={hotelNombre}
              onChange={e => setHotelNombre(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Ubicación"
              value={hotelUbicacion}
              onChange={e => setHotelUbicacion(e.target.value)}
              required
            />
            <button type="submit">Agregar hotel</button>
          </form>
          <hr />
          <ul>
            {hotels.map(hotel => (
              <li key={hotel.id} style={{ margin: "0.7em 0" }}>
                <div><strong>{hotel.nombre}</strong></div>
                <div style={{ color: '#607d8b' }}>Ubicación: {hotel.ubicacion || hotel.direccion}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Usuarios */}
        <div className="admin-card">
          <h2>Usuarios</h2>
          <form onSubmit={handleAddUser} className="role-form">
            <input
              type="text"
              placeholder="Nombre"
              value={userNombre}
              onChange={e => setUserNombre(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={userPassword}
              onChange={e => setUserPassword(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Empleado ID (opcional)"
              value={userEmpleadoId}
              onChange={e => setUserEmpleadoId(e.target.value)}
            />
            <button type="submit">Agregar usuario</button>
          </form>
          <hr />
          <ul>
            {users.map(user => (
              <li key={user.id} style={{ margin: "0.7em 0" }}>
                <div>
                  <strong>{user.name}</strong> <span style={{ color: '#60a3d9' }}>({user.email})</span>
                </div>
                <div style={{ color: '#607d8b', fontSize: '0.98em' }}>
                  ID: {user.id}{user.empleado_id && <span> | Empleado ID: {user.empleado_id}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Empleados */}
        <div className="admin-card">
          <h2>Empleados</h2>
          <form onSubmit={handleAddEmpleado} className="role-form">
            <input
              type="text"
              placeholder="Nombre"
              value={empleadoNombre}
              onChange={e => setEmpleadoNombre(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              value={empleadoApellido}
              onChange={e => setEmpleadoApellido(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Cargo"
              value={empleadoCargo}
              onChange={e => setEmpleadoCargo(e.target.value)}
              required
            />
            <button type="submit">Agregar empleado</button>
          </form>
          <hr />
          <ul>
            {empleados.map(emp => (
              <li key={emp.id} style={{ margin: "0.7em 0" }}>
                <div>
                  <strong>{emp.nombre} {emp.apellido}</strong>
                </div>
                <div style={{ color: '#607d8b' }}>Cargo: {emp.cargo}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}