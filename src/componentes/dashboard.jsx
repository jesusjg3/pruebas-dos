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

  const [estados, setEstados] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [usuario, setUsuario] = useState(null);


  // Estados para formularios
  const [estadoNombre, setEstadoNombre] = useState('');
  const [estadoDescripcion, setEstadoDescripcion] = useState('');
  const [empleadoNombre, setEmpleadoNombre] = useState('');
  const [empleadoApellido, setEmpleadoApellido] = useState('');
  const [roleName, setRoleName] = useState('');
  const [roleDesc, setRoleDesc] = useState('');
  const [hotelNombre, setHotelNombre] = useState('');
  const [hotelUbicacion, setHotelUbicacion] = useState('');
  const [userNombre, setUserNombre] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmpleadoId, setUserEmpleadoId] = useState('');
  const [empleadoCedula, setEmpleadoCedula] = useState('');
  const [empleadoNacimiento, setEmpleadoNacimiento] = useState('');
  const [empleadoSangre, setEmpleadoSangre] = useState('');
  const [empleadoHotel, setEmpleadoHotel] = useState('');
  const [empleadoRol, setEmpleadoRol] = useState('');
  const [empleadoEstado, setEmpleadoEstado] = useState('');
  const [empleadoCorreo, setEmpleadoCorreo] = useState('');
  const [empleadoTelefono, setEmpleadoTelefono] = useState('');


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

  const fetchEstados = async () => {
    const res = await axios.get('http://localhost:8000/api/estados', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setEstados(res.data);
  };

  useEffect(() => {
    fetchEstados();
    // ...otros fetch
  }, []);


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

  const handleAddEstado = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/estados', {
        nombreestado: estadoNombre,
        descripcion: estadoDescripcion,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      Swal.fire('✔', 'Estado creado', 'success');
      setEstadoNombre('');
      setEstadoDescripcion('');
      fetchEstados(); // asegúrate de tener esta función para recargar los estados
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'No se pudo crear estado', 'error');
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
    await axios.post('http://localhost:8000/api/empleados', {
      nombre: empleadoNombre,
      apellido: empleadoApellido,
      cedula: empleadoCedula,
      fechanacimiento: empleadoNacimiento,
      tiposangre: empleadoSangre,
      hotel_id: empleadoHotel,
      rols_id: empleadoRol,
      estado_id: empleadoEstado,
      correo: empleadoCorreo,
      telefono: empleadoTelefono,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

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

        <div className="admin-card">
          <h2>Estados</h2>
          <form onSubmit={handleAddEstado} className="role-form">
            <input
              type="text"
              placeholder="Nombre del estado"
              value={estadoNombre}
              onChange={e => setEstadoNombre(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Descripción"
              value={estadoDescripcion}
              onChange={e => setEstadoDescripcion(e.target.value)}
              required
            />
            <button type="submit">Crear estado</button>
          </form>
          <hr />
          <ul>
            {estados.map(est => (
              <li key={est.id}>
                <strong>{est.nombreestado}</strong> - {est.descripcion}
              </li>
            ))}
          </ul>
        </div>

        {/* Empleados */}

      </div>
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
            placeholder="Cédula"
            value={empleadoCedula}
            onChange={e => setEmpleadoCedula(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Fecha de nacimiento"
            value={empleadoNacimiento}
            onChange={e => setEmpleadoNacimiento(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Tipo de sangre"
            value={empleadoSangre}
            onChange={e => setEmpleadoSangre(e.target.value)}
            required
          />
          <select
            value={empleadoHotel}
            onChange={e => setEmpleadoHotel(e.target.value)}
            required
          >
            <option value="">Selecciona un hotel</option>
            {hotels.map(h => (
              <option key={h.id} value={h.id}>{h.nombre}</option>
            ))}
          </select>
          <select
            value={empleadoRol}
            onChange={e => setEmpleadoRol(e.target.value)}
            required
          >
            <option value="">Selecciona un rol</option>
            {roles.map(r => (
              <option key={r.id} value={r.id}>{r.nombrerol}</option>
            ))}
          </select>
          <select
            value={empleadoEstado}
            onChange={e => setEmpleadoEstado(e.target.value)}
            required
          >
            <option value="">Selecciona un estado</option>
            {estados.map(es => (
              <option key={es.id} value={es.id}>{es.nombreestado}</option>
            ))}
          </select>
          <input
            type="email"
            placeholder="Correo"
            value={empleadoCorreo}
            onChange={e => setEmpleadoCorreo(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={empleadoTelefono}
            onChange={e => setEmpleadoTelefono(e.target.value)}
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
              <div style={{ color: '#607d8b' }}>
                Cargo: {emp.rol ? emp.rol.nombrerol : 'Sin rol'}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}