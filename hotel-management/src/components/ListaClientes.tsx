import { useState, useEffect } from 'react';
import ClienteForm from './ClienteForm';

interface Cliente {
  id: string;
  nombre: string;
  correo: string;
}

const ListaClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteEdit, setClienteEdit] = useState<Cliente | undefined>();

  // Cargar datos desde localStorage al inicializar
  useEffect(() => {
    const data = localStorage.getItem('clientes');
    if (data) {
      setClientes(JSON.parse(data)); // Asegurar que los datos se cargan
    }
  }, []);

  // Guardar datos en localStorage cuando cambien los clientes
  useEffect(() => {
    if (clientes.length > 0) {
      localStorage.setItem('clientes', JSON.stringify(clientes)); // Guardar si hay datos
    }
  }, [clientes]);

  const agregarOActualizarCliente = (cliente: Cliente) => {
    if (clienteEdit) {
      // Actualizar cliente existente
      setClientes((prev) =>
        prev.map((c) => (c.id === cliente.id ? cliente : c))
      );
      setClienteEdit(undefined); // Limpiar modo edición
    } else {
      // Agregar nuevo cliente
      setClientes((prev) => [...prev, cliente]);
    }
  };

  const eliminarCliente = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      setClientes((prev) => prev.filter((cliente) => cliente.id !== id));
    }
  };

  return (
    <div>
      <h2>Gestión de Clientes</h2>
      <ClienteForm clienteEdit={clienteEdit} onSubmit={agregarOActualizarCliente} />
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nombre} - {cliente.correo}
            <button onClick={() => setClienteEdit(cliente)}>Editar</button>
            <button onClick={() => eliminarCliente(cliente.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaClientes;