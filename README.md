# Manejo de Sesiones y Usuarios  

> CREADOR: Eider Moises Pool Arjona

Este repositorio es un pequeño proyecto en el cual se usa las tecnologías para administrar las sesiones y usuarios.

En este proyecto tienes la posibilidad de estar como un usuario normal, y un usuario registrado, de las cuales el registrado tiene mayores permisos que el normal.

## Inventario  💥 [Ver Pagina](https://eider-inventario.fly.dev/ "Ver Pagina") 💥
### Funcionamiento: 
**1. Usuarios normales (sin registrarse) únicamente tienen la opción de ver los productos**

[![img1](https://i.postimg.cc/nZbzMLqT/Captura-desde-2023-02-07-23-00-38.png "img1")](https://i.postimg.cc/nZbzMLqT/Captura-desde-2023-02-07-23-00-38.png "img1")

------------

**2. Usuarios registrados pueden ver, agregar, actualizar, y eliminar los productos, además de que tienen la posibilidad de recuperar su contraseña mediante un correo electrónico y cerrar su sesión.**

[![img1](https://i.postimg.cc/FRtsNp3d/Captura-desde-2023-02-07-22-54-17.png "img1")](https://i.postimg.cc/FRtsNp3d/Captura-desde-2023-02-07-22-54-17.png "img1")

------------

[![img1](https://i.postimg.cc/RCLVxcFh/Captura-desde-2023-02-07-22-59-51.png "img1")](https://i.postimg.cc/RCLVxcFh/Captura-desde-2023-02-07-22-59-51.png "img1")

### Tecnologías utilizadas
- Express.js
	- JsonWebToken: (genera y valida tokens con el id del usuario y una palabra secreta)
	- bcrypt: (encripta y desencripta el password y lo almacena el la DB)
	- crypto: (genera IDs unicas)
	- nodemailer (envia correo para actualizar las contraseñas)
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
3. Ajusta en archivo .env segun tu informacion (.env)
	```
	SECRET="<YOURSECRET>" //puedes usar cualquier palabra
	EMAIL="<YOUR EMAIL>" // email que enviara los correos electronicos
	PASS_EMAIL="<YOUR PASSWORD>" // contraseñas del email
	```
	si tienes el doble verificacion en tu correo,deberas generar una contraseña de aplicaciones mas informacion: https://support.google.com/accounts/answer/185833?hl=es-419
4. Terminal

	```bash
	npm install
	```
5. Terminal

	```bash
	npm run dev
	```









