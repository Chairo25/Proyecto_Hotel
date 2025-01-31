import { useState, useEffect } from 'react';

interface Habitacion {
  id: string;
  tipo: string;
  precio: number;
}

interface Props {
  habitacionEdit?: Habitacion;
  onSubmit: (habitacion: Habitacion) => void;
}

const HabitacionForm = ({ habitacionEdit, onSubmit }: Props) => {
  const [tipo, setTipo] = useState('');
  const [precio, setPrecio] = useState<number | ''>('');

  useEffect(() => {
    if (habitacionEdit) {
      setTipo(habitacionEdit.tipo);
      setPrecio(habitacionEdit.precio);
    }
  }, [habitacionEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipo.trim() || precio === '' || precio <= 0) {
      alert('Por favor, ingrese un tipo válido y un precio mayor a 0.');
      return;
    }

    const habitacion: Habitacion = {
      id: habitacionEdit?.id || Date.now().toString(),
      tipo,
      precio: Number(precio),
    };

    onSubmit(habitacion);
    setTipo('');
    setPrecio('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tipo de habitación:</label>
        <input
          type="text"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Precio por noche:</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">{habitacionEdit ? 'Actualizar' : 'Agregar'}</button>
    </form>
  );
};

export default HabitacionForm;