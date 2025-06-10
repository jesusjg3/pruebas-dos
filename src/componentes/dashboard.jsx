import { useEffect, useState } from 'react';

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cambia la URL por la de tu backend real
    fetch('http://localhost:8000/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setData({ error: 'Error al cargar los datos.' });
      });
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (data?.error) return <div>{data.error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Dashboard;