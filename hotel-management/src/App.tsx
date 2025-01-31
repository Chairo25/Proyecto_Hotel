import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Clientes from './pages/Clientes';
import Habitaciones from './pages/Habitaciones';
import Reservas from './pages/Reservas';

function App() {
  return (
    <Router>
      <div>
        {/* Título principal */}
        <h1>Gestión de Hotel</h1>
        
        {/* Barra de navegación */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/clientes">
            <button>Clientes</button>
          </Link>
          <Link to="/habitaciones">
            <button>Habitaciones</button>
          </Link>
          <Link to="/reservas">
            <button>Reservas</button>
          </Link>
        </nav>
        
        {/* Rutas de la aplicación */}
        <Routes>
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/habitaciones" element={<Habitaciones />} />
          <Route path="/reservas" element={<Reservas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;