Instruacciones para iniciar Proyecto.

### `npm install` para instalar dependencias.

### `createdb abm` Creacion de DB.

Desde la command line introduce `createdb abm` para crear la base de datos en PostgreSQL.

### Crear varieble de entorno `.env` cuyo contenido será:

PORT = 3001
DB = "abm"

### `npm run server` para iniciar backend.

### `npm run client` para iniciar frontend.

Se ha configurado en las dependencias para que se inicie en PORT=3000

### `npm run seed` seedear DB.

El cliente no tendrá datos que iterar en un principio por lo que debe correr para correr el archivo seed.js y asi llenar la base de datos.

### Falta Login , Register y Paginacion.
