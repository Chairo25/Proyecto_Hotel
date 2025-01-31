import { useState, useEffect } from 'react';
import HabitacionForm from './HabitacionForm';

interface Habitacion {
  id: string;
  tipo: string;
  precio: number;
}

const ListaHabitaciones = () => {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [habitacionEdit, setHabitacionEdit] = useState<Habitacion | undefined>();

  useEffect(() => {
    const data = localStorage.getItem('habitaciones');
    if (data) {
      setHabitaciones(JSON.parse(data)); // Cargar datos
    }
  }, []);

  useEffect(() => {
    if (habitaciones.length > 0) {
      localStorage.setItem('habitaciones', JSON.stringify(habitaciones)); // Guardar datos
    }
  }, [habitaciones]);

  const agregarOActualizarHabitacion = (habitacion: Habitacion) => {
    if (habitacionEdit) {
      setHabitaciones((prev) =>
        prev.map((h) => (h.id === habitacion.id ? habitacion : h))
      );
      setHabitacionEdit(undefined);
    } else {
      setHabitaciones((prev) => [...prev, habitacion]);
    }
  };

  const eliminarHabitacion = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta habitación?')) {
      setHabitaciones((prev) =>
        prev.filter((habitacion) => habitacion.id !== id)
      );
    }
  };

  return (
    <div>
      <h2>Gestión de Habitaciones</h2>
      <HabitacionForm
        habitacionEdit={habitacionEdit}
        onSubmit={agregarOActualizarHabitacion}
      />
      <ul>
        {habitaciones.map((habitacion) => (
          <li key={habitacion.id}>
            {habitacion.tipo} - ${habitacion.precio.toFixed(2)}
            <button onClick={() => setHabitacionEdit(habitacion)}>Editar</button>
            <button onClick={() => eliminarHabitacion(habitacion.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaHabitaciones;