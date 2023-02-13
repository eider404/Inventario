# Manejo de Sesiones y Usuarios  

> CREADOR: Eider Moises Pool Arjona

Este repositorio es un pequeño proyecto en el cual se usa las tecnologías para administrar las sesiones y usuarios.
## Inventario  💥 [Ver Pagina](https://eider-inventario.fly.dev/ "Ver Pagina") 💥
### Funcionamiento: 
**1. Usuarios normales (sin registrarse) únicamente tienen la opción de ver los productos**

[![img1](https://i.postimg.cc/nZbzMLqT/Captura-desde-2023-02-07-23-00-38.png "img1")](https://i.postimg.cc/nZbzMLqT/Captura-desde-2023-02-07-23-00-38.png "img1")

------------

**2. Usuarios registrados pueden ver, agregar, actualizar, y eliminar los productos.**

[![img1](https://i.postimg.cc/FRtsNp3d/Captura-desde-2023-02-07-22-54-17.png "img1")](https://i.postimg.cc/FRtsNp3d/Captura-desde-2023-02-07-22-54-17.png "img1")

------------

[![img1](https://i.postimg.cc/RCLVxcFh/Captura-desde-2023-02-07-22-59-51.png "img1")](https://i.postimg.cc/RCLVxcFh/Captura-desde-2023-02-07-22-59-51.png "img1")

### Tecnologías utilizadas
- Express.js
	- JsonWebToken: (genera y valida tokens con el id del usuario y una palabra secreta)
	- bcrypt: (encripta y desencripta el password y lo almacena el la DB)
	- crypto: (genera IDs unicas)
- MySQL
- Bootstrap

### Instalacion
1. Crea la DB (Example.sql)


2. Ajustar la configuración de la DB, segun su servidor MYSQL ( src/models/db.js):
```javascript
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'Example'
}
```
3. Terminal

```bash
npm run dev
```









