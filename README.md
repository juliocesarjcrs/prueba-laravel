# prueba-laravel
Proyecto desarrollado en laravel
Pasos de instalación del proyecto de Laravel

1.	El repositorio esta en: https://github.com/juliocesarjcrs/prueba-laravel
2.	Puede clonarlo o descargarlo como zip
 
3.	Para clonarlo en una terminal de git puede jecutar:
git clone 'https://github.com/juliocesarjcrs/prueba-laravel.git'
4.	Ingresar en la terminal a la carpeta: prueba-laravel y ejecutar 
composer install y  luego npm install
5.	en PhpMyadmin crear una base de datos llamada: laravel con cotejamiento utf8mb4_general_ci
6.	En la consola ejecutar  php artisan migrate para crear las tablas en la base de datos
Y
7.	Ejecutar php artisan db:seed para ingresar un usuario por defecto con rol administrador . 
Ejecutar php artisan serve y npm run dev
8.	Abrir en el navegador http://127.0.0.1:8000/
9.	Dar click en Iniciar sesión e ingresar con los datos generados por el seeder que se muestran a contuinuación:

Con el correo:  julio@correo.com
Contraseña: 123456

