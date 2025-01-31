import { useState, useEffect } from 'react';

interface Cliente {
  id: string;
  nombre: string;
  correo: string;
}

interface Props {
  clienteEdit?: Cliente; // Cliente a editar (opcional)
  onSubmit: (cliente: Cliente) => void;
}

const ClienteForm = ({ clienteEdit, onSubmit }: Props) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  useEffect(() => {
    if (clienteEdit) {
      setNombre(clienteEdit.nombre);
      setCorreo(clienteEdit.correo);
    }
  }, [clienteEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !correo.includes('@')) {
      alert('Por favor, ingrese un nombre válido y un correo válido.');
      return;
    }

    const cliente: Cliente = {
      id: clienteEdit?.id || Date.now().toString(), // Generar ID único si es nuevo
      nombre,
      correo,
    };

    onSubmit(cliente); // Agregar o actualizar cliente
    setNombre('');
    setCorreo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Correo:</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </div>
      <button type="submit">{clienteEdit ? 'Actualizar' : 'Agregar'}</button>
    </form>
  );
};

export default ClienteForm;