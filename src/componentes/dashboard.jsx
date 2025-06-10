import Navbar from "./navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard-content">
        <h1>Bienvenido al Dashboard</h1>
        <p>Has iniciado sesión exitosamente.</p>
      </div>
    </>
  );
}
