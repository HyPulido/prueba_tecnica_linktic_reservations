# Proyecto Laravel

## Información

- **PHP**: 8.1.10
- **Laravel**: 10.48.22

## Requisitos del Sistema

Asegúrate de tener instalados los siguientes requisitos antes de comenzar:

- PHP >= 8.1
- Composer
- MySQL o cualquier otra base de datos compatible con Laravel

## Instalación

1. Clona este repositorio:

    ```bash
    git clone https://github.com/HyPulido/prueba_tecnica_linktic.git
    cd linktic-backend
    ```

2. Instala las dependencias:

    ```bash
    composer install
    ```

3. Copia el archivo de ejemplo `.env` y configúralo:

    ```bash
    cp .env.example .env
    ```

4. Genera la clave secreta deJWT:

    ```bash
    php artisan jwt:secret
    ```

5. Configura el archivo `.env` con las credenciales de tu base de datos y otros servicios necesarios.

   Algunos de los parámetros que deberás configurar son:
   - Configuración de la base de datos:
     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=linktic_reservations
     DB_USERNAME=root
     DB_PASSWORD=
     ```
   - Configuración de clave para encriptar y desencriptar información
     ```env
    KEY_AES_ENCRYPT=Linktic_pru3b412
     ```

6. Ejecuta las migraciones de la base de datos:

    ```bash
    php artisan migrate
    ```

7. (Opcional) Llena la base de datos con datos de ejemplo:

    ```bash
    php artisan db:seed
    ```

## Ejecución del Proyecto

Inicia el servidor de desarrollo:

```bash
php artisan serve