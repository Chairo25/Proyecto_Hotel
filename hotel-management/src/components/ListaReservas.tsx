import { useState, useEffect } from 'react';
import ReservaForm from './ReservaForm';

interface Reserva {
  id: string;
  clienteId: string;
  habitaciones: string[];
  fechaInicio: string;
  fechaFin: string;
}

interface Cliente {
  id: string;
  nombre: string;
}

interface Habitacion {
  id: string;
  tipo: string;
}

interface Props {
  clientes: Cliente[];
  habitaciones: Habitacion[];
}

const ListaReservas = ({ clientes, habitaciones }: Props) => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [reservaEdit, setReservaEdit] = useState<Reserva | undefined>();

  // Cargar datos desde localStorage al inicializar
  useEffect(() => {
    const data = localStorage.getItem('reservas');
    if (data) {
      setReservas(JSON.parse(data)); // Cargar reservas existentes
    }
  }, []);

  // Guardar datos en localStorage cuando cambien las reservas
  useEffect(() => {
    if (reservas.length > 0) {
      localStorage.setItem('reservas', JSON.stringify(reservas)); // Guardar datos en localStorage
    }
  }, [reservas]);

  const agregarOActualizarReserva = (reserva: Reserva) => {
    if (reservaEdit) {
      // Actualizar reserva existente
      setReservas((prev) =>
        prev.map((r) => (r.id === reserva.id ? reserva : r))
      );
      setReservaEdit(undefined); // Limpiar modo edición
    } else {
      // Agregar nueva reserva
      setReservas((prev) => [...prev, reserva]);
    }
  };

  const eliminarReserva = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta reserva?')) {
      setReservas((prev) => prev.filter((reserva) => reserva.id !== id));
    }
  };

  const obtenerNombreCliente = (id: string) => {
    const cliente = clientes.find((c) => c.id === id);
    return cliente ? cliente.nombre : 'Desconocido';
  };

  const obtenerNombresHabitaciones = (ids: string[]) => {
    return ids
      .map((id) => habitaciones.find((h) => h.id === id)?.tipo)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div>
      <h2>Gestión de Reservas</h2>
      <ReservaForm
        clientes={clientes}
        habitaciones={habitaciones}
        reservas={reservas} // Pasar todas las reservas existentes para validar disponibilidad
        reservaEdit={reservaEdit}
        onSubmit={agregarOActualizarReserva}
      />
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            <strong>{obtenerNombreCliente(reserva.clienteId)}</strong> reservó{' '}
            <strong>{obtenerNombresHabitaciones(reserva.habitaciones)}</strong> del{' '}
            <strong>{reserva.fechaInicio}</strong> al <strong>{reserva.fechaFin}</strong>.
            <button onClick={() => setReservaEdit(reserva)}>Editar</button>
            <button onClick={() => eliminarReserva(reserva.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaReservas;