# Gestión de Hotel

# Autores: Jairo Eduardo Pogo Rengel

Esta es una aplicación web para la gestión de un hotel, desarrollada con **ReactJS** y **TypeScript**, que permite gestionar clientes, habitaciones y reservas. Los datos se almacenan en `localStorage`, asegurando su persistencia incluso después de recargar la página.

## Tecnologías utilizadas

- ReactJS
- TypeScript
- react-router-dom
- localStorage para persistencia de datos

## Funcionalidades implementadas

### Gestión de Clientes
- **Agregar clientes:** Permite registrar clientes con nombre y correo.
- **Editar clientes:** Permite actualizar la información de un cliente existente.
- **Eliminar clientes:** Permite eliminar un cliente.
- **Persistencia:** Los datos de clientes se guardan en `localStorage` y se recuperan automáticamente.

### Gestión de Habitaciones
- **Agregar habitaciones:** Permite registrar habitaciones con su tipo (individual, doble, suite, etc.) y precio por noche.
- **Editar habitaciones:** Permite actualizar la información de una habitación.
- **Eliminar habitaciones:** Permite eliminar una habitación.
- **Persistencia:** Los datos de habitaciones se guardan en `localStorage` y se recuperan automáticamente.

### Gestión de Reservas
- **Agregar reservas:** Permite registrar reservas seleccionando un cliente, una o más habitaciones y las fechas de la estancia.
- **Editar reservas:** Permite actualizar la información de una reserva existente.
- **Eliminar reservas:** Permite eliminar una reserva.
- **Validaciones:** No permite solapamiento de fechas para la misma habitación.
- **Persistencia:** Los datos de reservas se guardan en `localStorage` y se recuperan automáticamente.
- **Relaciones lógicas:** Las reservas están relacionadas con los clientes y las habitaciones.

## Instrucciones para clonar, instalar y ejecutar la aplicación

### 1. Clonar el repositorio
Ejecuta el siguiente comando en tu terminal para clonar este repositorio:

```bash
git clone <URL-DEL-REPOSITORIO>
cd <CARPETA-DEL-PROYECTO>