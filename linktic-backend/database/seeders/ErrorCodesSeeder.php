<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ErrorCodesSeeder extends Seeder
{
    public function run()
    {
        // Trucnate table before to insert into table
        DB::table('error_codes')->truncate();

        DB::table('error_codes')->insert([
            ['code' => 'URSE201', 'status_code' => 200, 'controller' => 'User', 'message' => 'éxito', 'description' => 'proceso ejecutado exitosamente', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'URSE400', 'status_code' => 400, 'controller' => 'User', 'message' => 'el correo electrónico ya existe', 'description' => 'el correo electrónico ya está registrado en la base de datos', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_EXIST_EMAIL'],
            ['code' => 'URSE402', 'status_code' => 400, 'controller' => 'User', 'message' => 'el número de teléfono ya existe', 'description' => 'el número de teléfono ya está registrado en la base de datos', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_EXIST_PHONE'],
            ['code' => 'URSE403', 'status_code' => 400, 'controller' => 'User', 'message' => 'no es posible registrar el usuario', 'description' => 'no es posible registrar el usuario', 'cause' => NULL, 'code_app' => 'BAD_REQUEST'],
            ['code' => 'URSE405', 'status_code' => 400, 'controller' => 'User', 'message' => 'se encontraron campos vacíos, el campo {required_field} es obligatorio', 'description' => 'no se recibieron uno o más de los campos requeridos', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_EMPTY_FIELDS'],
            ['code' => 'URSE406', 'status_code' => 400, 'controller' => 'User', 'message' => 'no es posible descifrar algunos campos', 'description' => 'algunos o todos los campos no están cifrados correctamente', 'cause' => NULL, 'code_app' => 'BAD_REQUEST'],
            ['code' => 'URSE500', 'status_code' => 500, 'controller' => 'User', 'message' => 'error desconocido', 'description' => 'no es posible determinar por qué falló el proceso.', 'cause' => 'el ID del dispositivo no existe', 'code_app' => 'SYSTEM_ERROR'],

            // Login
            ['code' => 'URLN200', 'status_code' => 200, 'controller' => 'User', 'message' => 'éxito', 'description' => 'inicio de sesión exitoso', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'URLN400', 'status_code' => 400, 'controller' => 'User', 'message' => 'se encontraron campos vacíos, el campo {required_field} es requerido', 'description' => 'no se recibió uno o más de los campos requeridos', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_EMPTY_FIELDS'],
            ['code' => 'URLN401', 'status_code' => 401, 'controller' => 'User', 'message' => 'no autorizado', 'description' => 'usuario o contraseña incorrectos', 'cause' => NULL, 'code_app' => 'UNAUTHORIZED'],
            ['code' => 'URLN500', 'status_code' => 500, 'controller' => 'User', 'message' => 'error del sistema', 'description' => 'no es posible determinar por qué falló el proceso.', 'cause' => NULL, 'code_app' => 'SYSTEM_ERROR'],

            // Logout
            ['code' => 'URLT200', 'status_code' => 200, 'controller' => 'User', 'message' => 'éxito', 'description' => 'cierre de sesión exitoso', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'URLT400', 'status_code' => 400, 'controller' => 'User', 'message' => 'no es posible cerrar la sesión del usuario', 'description' => 'no se puede cerrar la sesión, algo salió mal', 'cause' => NULL, 'code_app' => 'BAD_REQUEST'],
            ['code' => 'URLT500', 'status_code' => 500, 'controller' => 'User', 'message' => 'error del sistema', 'description' => 'no es posible determinar por qué falló el proceso.', 'cause' => NULL, 'code_app' => 'SYSTEM_ERROR'],

            // Refresh Token
            ['code' => 'URRT200', 'status_code' => 200, 'controller' => 'User', 'message' => 'éxito', 'description' => 'token refrescado con éxito', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'URRT400', 'status_code' => 400, 'controller' => 'User', 'message' => 'no es posible refrescar el token del usuario', 'description' => 'no se puede refrescar el token, algo salió mal', 'cause' => NULL, 'code_app' => 'BAD_REQUEST'],
            ['code' => 'URRT500', 'status_code' => 500, 'controller' => 'User', 'message' => 'error del sistema', 'description' => 'no es posible determinar por qué falló el proceso.', 'cause' => NULL, 'code_app' => 'SYSTEM_ERROR'],

            // Autenticación
            ['code' => 'AEHE401', 'status_code' => 401, 'controller' => 'Authenticate', 'message' => 'no autorizado', 'description' => 'token vacío o inválido', 'cause' => 'token no válido para usar la API, posible cierre de sesión del usuario', 'code_app' => 'UNAUTHORIZED'],
            ['code' => 'AEHE403', 'status_code' => 403, 'controller' => 'Authenticate', 'message' => 'prohibido', 'description' => 'usuario no tiene permitido obtener información de la cuenta', 'cause' => 'se está intentando realizar un proceso en una cuenta que no pertenece al usuario autenticado', 'code_app' => 'FORBIDDEN_USER_NOT_ALLOWED'],

            // Admin
            ['code' => 'ANHE401', 'status_code' => 401, 'controller' => 'Admin', 'message' => 'no autorizado', 'description' => 'token vacío o inválido', 'cause' => 'token no válido para usar la API, posible cierre de sesión del usuario con rol admin o intento de usar API con token de un usuario no admin', 'code_app' => 'UNAUTHORIZED'],


            // ReservationController

            ['code' => 'RNIX200', 'status_code' => 200, 'controller' => 'Reservation', 'message' => 'éxito', 'description' => 'reservas listadas correctamente', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'RNIX402', 'status_code' => 404, 'controller' => 'Reservation', 'message' => 'reservas no encontradas', 'description' => 'no se encontraron reservas para mostrar', 'cause' => NULL, 'code_app' => 'NOT_FOUND_RESERVATIONS'],
            ['code' => 'RNIX500', 'status_code' => 500, 'controller' => 'Reservation', 'message' => 'error en el sistema', 'description' => 'un error inesperado ocurrió al procesar la solicitud', 'cause' => NULL, 'code_app' => 'SYSTEM_ERROR'],

            ['code' => 'RNSE201', 'status_code' => 201, 'controller' => 'Reservation', 'message' => 'reserva creada con éxito', 'description' => 'reserva creada correctamente en la base de datos', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'RNSE402', 'status_code' => 400, 'controller' => 'Reservation', 'message' => 'no se pudo crear la reserva', 'description' => 'fallo al intentar crear una nueva reserva en la base de datos', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_CREATE_RESERVATION'],
            ['code' => 'RNSE405', 'status_code' => 400, 'controller' => 'Reservation', 'message' => 'campos requeridos faltantes', 'description' => 'faltan campos requeridos para crear la reserva', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_REQUIRED_FIELDS'],
            ['code' => 'RNSE500', 'status_code' => 500, 'controller' => 'Reservation', 'message' => 'error en el sistema', 'description' => 'un error inesperado ocurrió al procesar la solicitud', 'cause' => NULL, 'code_app' => 'SYSTEM_ERROR'],

            ['code' => 'RNUE201', 'status_code' => 200, 'controller' => 'Reservation', 'message' => 'reserva actualizada con éxito', 'description' => 'reserva actualizada correctamente', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'RNUE402', 'status_code' => 400, 'controller' => 'Reservation', 'message' => 'no se pudo actualizar la reserva', 'description' => 'fallo al intentar actualizar la reserva', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_UPDATE_RESERVATION'],
            ['code' => 'RNUE405', 'status_code' => 400, 'controller' => 'Reservation', 'message' => 'campos requeridos faltantes', 'description' => 'faltan campos requeridos para actualizar la reserva', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_REQUIRED_FIELDS'],
            ['code' => 'RNUE500', 'status_code' => 500, 'controller' => 'Reservation', 'message' => 'error en el sistema', 'description' => 'un error inesperado ocurrió al procesar la solicitud', 'cause' => NULL, 'code_app' => 'SYSTEM_ERROR'],

            ['code' => 'RNSW200', 'status_code' => 200, 'controller' => 'Reservation', 'message' => 'reserva encontrada', 'description' => 'reserva listada correctamente', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'RNSW402', 'status_code' => 404, 'controller' => 'Reservation', 'message' => 'reserva no encontrada', 'description' => 'no se encontró una reserva con el ID proporcionado', 'cause' => NULL, 'code_app' => 'NOT_FOUND_RESERVATION'],
            ['code' => 'RNSW500', 'status_code' => 500, 'controller' => 'Reservation', 'message' => 'error en el sistema', 'description' => 'un error inesperado ocurrió al procesar la solicitud', 'cause' => NULL, 'code_app' => 'SYSTEM_ERROR'],

            ['code' => 'RNDE200', 'status_code' => 200, 'controller' => 'Reservation', 'message' => 'reserva eliminada con éxito', 'description' => 'reserva eliminada correctamente', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'RNDE402', 'status_code' => 400, 'controller' => 'Reservation', 'message' => 'no se pudo eliminar la reserva', 'description' => 'fallo al intentar eliminar la reserva', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_DELETE_RESERVATION'],
            ['code' => 'RNDE500', 'status_code' => 500, 'controller' => 'Reservation', 'message' => 'error en el sistema', 'description' => 'un error inesperado ocurrió al procesar la solicitud', 'cause' => NULL, 'code_app' => 'SYSTEM_ERROR'],

        ]);
    }
}
