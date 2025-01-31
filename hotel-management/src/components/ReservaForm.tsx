import { useState, useEffect } from 'react';

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
  reservas: Reserva[]; // Agregamos reservas para validar disponibilidad
  reservaEdit?: Reserva;
  onSubmit: (reserva: Reserva) => void;
}

const ReservaForm = ({ clientes, habitaciones, reservas, reservaEdit, onSubmit }: Props) => {
  const [clienteId, setClienteId] = useState('');
  const [habitacionesSeleccionadas, setHabitacionesSeleccionadas] = useState<string[]>([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  useEffect(() => {
    if (reservaEdit) {
      setClienteId(reservaEdit.clienteId);
      setHabitacionesSeleccionadas(reservaEdit.habitaciones);
      setFechaInicio(reservaEdit.fechaInicio);
      setFechaFin(reservaEdit.fechaFin);
    }
  }, [reservaEdit]);

  const verificarDisponibilidad = (habitacionId: string, inicio: string, fin: string) => {
    return reservas.every((reserva) => {
      if (!reserva.habitaciones.includes(habitacionId)) return true;
      const inicioReserva = new Date(reserva.fechaInicio).getTime();
      const finReserva = new Date(reserva.fechaFin).getTime();
      const inicioNueva = new Date(inicio).getTime();
      const finNueva = new Date(fin).getTime();

      return finNueva <= inicioReserva || inicioNueva >= finReserva; // Sin solapamientos
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clienteId || habitacionesSeleccionadas.length === 0 || !fechaInicio || !fechaFin) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (new Date(fechaInicio) >= new Date(fechaFin)) {
      alert('La fecha de inicio debe ser anterior a la fecha de fin.');
      return;
    }

    const noDisponibles = habitacionesSeleccionadas.filter(
      (id) => !verificarDisponibilidad(id, fechaInicio, fechaFin)
    );

    if (noDisponibles.length > 0) {
      alert('Una o más habitaciones seleccionadas no están disponibles en las fechas elegidas.');
      return;
    }

    const reserva: Reserva = {
      id: reservaEdit?.id || Date.now().toString(),
      clienteId,
      habitaciones: habitacionesSeleccionadas,
      fechaInicio,
      fechaFin,
    };

    onSubmit(reserva);

    setClienteId('');
    setHabitacionesSeleccionadas([]);
    setFechaInicio('');
    setFechaFin('');
  };

  const toggleHabitacionSeleccionada = (habitacionId: string) => {
    setHabitacionesSeleccionadas((prev) =>
      prev.includes(habitacionId)
        ? prev.filter((id) => id !== habitacionId)
        : [...prev, habitacionId]
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Cliente:</label>
        <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
          <option value="">Seleccione un cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Habitaciones:</label>
        {habitaciones.map((habitacion) => (
          <div key={habitacion.id}>
            <input
              type="checkbox"
              value={habitacion.id}
              checked={habitacionesSeleccionadas.includes(habitacion.id)}
              onChange={() => toggleHabitacionSeleccionada(habitacion.id)}
            />
            {habitacion.tipo}
          </div>
        ))}
      </div>

      <div>
        <label>Fecha de inicio:</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Fecha de fin:</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          required
        />
      </div>

      <button type="submit">{reservaEdit ? 'Actualizar' : 'Agregar'} Reserva</button>
    </form>
  );
};

export default ReservaForm;