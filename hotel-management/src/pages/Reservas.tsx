import { useEffect, useState } from 'react';
import ListaReservas from '../components/ListaReservas';

interface Cliente {
  id: string;
  nombre: string;
}

interface Habitacion {
  id: string;
  tipo: string;
}

const Reservas = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);

  // Cargar clientes desde localStorage al montar el componente
  useEffect(() => {
    const clientesData = localStorage.getItem('clientes');
    if (clientesData) {
      setClientes(JSON.parse(clientesData));
    }
  }, []);

  // Cargar habitaciones desde localStorage al montar el componente
  useEffect(() => {
    const habitacionesData = localStorage.getItem('habitaciones');
    if (habitacionesData) {
      setHabitaciones(JSON.parse(habitacionesData));
    }
  }, []);

  return (
    <div>
      <h2>Reservas</h2>
      <ListaReservas clientes={clientes} habitaciones={habitaciones} />
    </div>
  );
};

export default Reservas;