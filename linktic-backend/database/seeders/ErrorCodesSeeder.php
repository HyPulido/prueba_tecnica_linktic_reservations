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
            ##  UserController
            #   Save
            // ['code' => 'URSE201', 'status_code' => 200, 'controller' => 'User', 'message' => 'success', 'description' => 'process executed successfully', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            // ['code' => 'URSE400', 'status_code' => 400, 'controller' => 'User', 'message' => 'email already exist', 'description' => 'already exist email registered in the database', 'cause' => NULL, 'code_app' => "BAD_REQUEST_EXIST_EMAIL"],
            // ['code' => 'URSE402', 'status_code' => 400, 'controller' => 'User', 'message' => 'phone number already exist', 'description' => 'already exist phone number registered in the database', 'cause' => NULL, 'code_app' => "BAD_REQUEST_EXIST_PHONE"],
            // ['code' => 'URSE403', 'status_code' => 400, 'controller' => 'User', 'message' => 'is not possible user register', 'description' => 'is not possible user register', 'cause' => NULL, 'code_app' => 'BAD_REQUEST'],
            // ['code' => 'URSE405', 'status_code' => 400, 'controller' => 'User', 'message' => 'empty fields found, field {required_field} is required', 'description' => 'you did not receive one or none of the required fields', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_EMPTY_FIELDS'],
            // ['code' => 'URSE406', 'status_code' => 400, 'controller' => 'User', 'message' => 'is not possible decrypt some fields', 'description' => 'Some or all of the fields are not encrypted correctly', 'cause' => NULL, 'code_app' => 'BAD_REQUEST'],
            // ['code' => 'URSE500', 'status_code' => 500, 'controller' => 'User', 'message' => 'unknow error', 'description' => 'it is not possible to know now why the process failed.', 'cause' => 'device id not exist', 'code_app' => 'SYSTEM_ERROR'],

            ['code' => 'URSE201', 'status_code' => 200, 'controller' => 'User', 'message' => 'éxito', 'description' => 'proceso ejecutado exitosamente', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'URSE400', 'status_code' => 400, 'controller' => 'User', 'message' => 'el correo electrónico ya existe', 'description' => 'el correo electrónico ya está registrado en la base de datos', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_EXIST_EMAIL'],
            ['code' => 'URSE402', 'status_code' => 400, 'controller' => 'User', 'message' => 'el número de teléfono ya existe', 'description' => 'el número de teléfono ya está registrado en la base de datos', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_EXIST_PHONE'],
            ['code' => 'URSE403', 'status_code' => 400, 'controller' => 'User', 'message' => 'no es posible registrar el usuario', 'description' => 'no es posible registrar el usuario', 'cause' => NULL, 'code_app' => 'BAD_REQUEST'],
            ['code' => 'URSE405', 'status_code' => 400, 'controller' => 'User', 'message' => 'se encontraron campos vacíos, el campo {required_field} es obligatorio', 'description' => 'no se recibieron uno o más de los campos requeridos', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_EMPTY_FIELDS'],
            ['code' => 'URSE406', 'status_code' => 400, 'controller' => 'User', 'message' => 'no es posible descifrar algunos campos', 'description' => 'algunos o todos los campos no están cifrados correctamente', 'cause' => NULL, 'code_app' => 'BAD_REQUEST'],
            ['code' => 'URSE500', 'status_code' => 500, 'controller' => 'User', 'message' => 'error desconocido', 'description' => 'no es posible determinar por qué falló el proceso.', 'cause' => 'el ID del dispositivo no existe', 'code_app' => 'SYSTEM_ERROR'],

            #   Login
            // ['code' => 'URLN200', 'status_code' => 200, 'controller' => 'User', 'message' => 'success', 'description' => 'login succesfully', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            // ['code' => 'URLN400', 'status_code' => 400, 'controller' => 'User', 'message' => 'empty fields found, field {required_field} is required', 'description' => 'you did not receive one or none of the required fields', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_EMPTY_FIELDS'],
            // ['code' => 'URLN401', 'status_code' => 401, 'controller' => 'User', 'message' => 'unauthorized', 'description' => 'user or password incorrect', 'cause' => NULL, 'code_app' => 'UNAUTHORIZED'],
            // ['code' => 'URLN500', 'status_code' => 500, 'controller' => 'User', 'message' => 'system error', 'description' => 'it is not possible to know now why the process failed.', 'cause' => NULL, 'code_app' => 'SYSTEM_ERROR'],
            // #   Logout
            // ['code' => 'URLT200', 'status_code' => 200, 'controller' => 'User', 'message' => 'success', 'description' => 'logout succesfully', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            // ['code' => 'URLT400', 'status_code' => 400, 'controller' => 'User', 'message' => 'not possible logout user', 'description' => 'can\'t logout user, something went wrong', 'cause' => NULL, 'code_app' => 'BAD_REQUEST'],
            // ['code' => 'URLT500', 'status_code' => 500, 'controller' => 'User', 'message' => 'system error', 'description' => 'it is not possible to know now why the process failed.', 'cause' => NULL, 'code_app' => 'SYSTEM_ERROR'],
            // #   refreshToken
            // ['code' => 'URRT200', 'status_code' => 200, 'controller' => 'User', 'message' => 'success', 'description' => 'logout succesfully', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            // ['code' => 'URRT400', 'status_code' => 400, 'controller' => 'User', 'message' => 'not possible logout user', 'description' => 'can\'t logout user, something went wrong', 'cause' => NULL, 'code_app' => 'BAD_REQUEST'],
            // ['code' => 'URRT500', 'status_code' => 500, 'controller' => 'User', 'message' => 'system error', 'description' => 'it is not possible to know now why the process failed.', 'cause' => NULL, 'code_app' => 'SYSTEM_ERROR'],


            // ##  Authenticate
            // #   handle
            // ['code' => 'AEHE401', 'status_code' => 401, 'controller' => 'Authenticate', 'message' => 'unauthorized', 'description' => 'token empty or invalid', 'cause' => 'not valid token for use the api, possible user logout', 'code_app' => 'UNAUTHORIZED'],
            // ['code' => 'AEHE403', 'status_code' => 403, 'controller' => 'Authenticate', 'message' => 'forbidden', 'description' => 'user not allowed to obtain account information', 'cause' => 'an attempt is being made to carry out a process on an account that does not belong to the authenticated user', 'code_app' => 'FORBIDDEN_USER_NOT_ALLOWED'],

            // ##  Admin
            // #   handle
            // ['code' => 'ANHE401', 'status_code' => 401, 'controller' => 'Admin', 'message' => 'unauthorized', 'description' => 'token empty or invalid', 'cause' => 'not valid token for use the api, possible user with role admin logout or trying use api with token of user not admin', 'code_app' => 'UNAUTHORIZED'],



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

            // ProductController
            ['code' => 'PTIX200', 'status_code' => 200, 'controller' => 'Product', 'message' => 'éxito', 'description' => 'productos listados correctamente', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'PTIX402', 'status_code' => 404, 'controller' => 'Product', 'message' => 'productos no encontrados', 'description' => 'no se encontraron productos para mostrar', 'cause' => NULL, 'code_app' => 'NOT_FOUND_PRODUCTS'],
            ['code' => 'PTSE201', 'status_code' => 201, 'controller' => 'Product', 'message' => 'producto creado con éxito', 'description' => 'producto creado correctamente en la base de datos', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'PTSE402', 'status_code' => 400, 'controller' => 'Product', 'message' => 'no se pudo crear el producto', 'description' => 'fallo al intentar crear un nuevo producto en la base de datos', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_CREATE_PRODUCT'],
            ['code' => 'PTSE405', 'status_code' => 400, 'controller' => 'Product', 'message' => 'no se pudo crear el producto', 'description' => 'fallo al intentar crear un nuevo producto en la base de datos', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_CREATE_PRODUCT'],
            ['code' => 'PTSE500', 'status_code' => 500, 'controller' => 'Product', 'message' => 'error en el sistema', 'description' => 'un error inesperado ocurrió al procesar la solicitud', 'cause' => NULL, 'code_app' => 'SYSTEM_ERROR'],
            ['code' => 'PTUE201', 'status_code' => 200, 'controller' => 'Product', 'message' => 'producto actualizado con éxito', 'description' => 'producto actualizado correctamente', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'PTUE402', 'status_code' => 400, 'controller' => 'Product', 'message' => 'no se pudo actualizar el producto', 'description' => 'fallo al intentar actualizar el producto', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_UPDATE_PRODUCT'],
            ['code' => 'PTSW200', 'status_code' => 200, 'controller' => 'Product', 'message' => 'producto encontrado', 'description' => 'producto listado correctamente', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'PTSW402', 'status_code' => 404, 'controller' => 'Product', 'message' => 'producto no encontrado', 'description' => 'no se encontró un producto con el ID proporcionado', 'cause' => NULL, 'code_app' => 'NOT_FOUND_PRODUCT'],
            ['code' => 'PTXX500', 'status_code' => 500, 'controller' => 'Product', 'message' => 'error en el sistema', 'description' => 'un error inesperado ocurrió al procesar la solicitud', 'cause' => NULL, 'code_app' => 'SYSTEM_ERROR'],

            // OrderController
            ['code' => 'ORIX200', 'status_code' => 200, 'controller' => 'Order', 'message' => 'éxito', 'description' => 'órdenes listadas correctamente', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'ORIX402', 'status_code' => 404, 'controller' => 'Order', 'message' => 'órdenes no encontradas', 'description' => 'no se encontraron órdenes para mostrar', 'cause' => NULL, 'code_app' => 'NOT_FOUND_ORDERS'],
            ['code' => 'ORSE201', 'status_code' => 201, 'controller' => 'Order', 'message' => 'orden creada con éxito', 'description' => 'orden creada correctamente en la base de datos', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'ORSE400', 'status_code' => 400, 'controller' => 'Order', 'message' => 'campos requeridos ausentes', 'description' => 'falta uno o más campos requeridos para crear la orden', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_REQUIRED_FIELDS'],
            ['code' => 'ORSE402', 'status_code' => 400, 'controller' => 'Order', 'message' => 'dirección faltante para el tipo de entrega', 'description' => 'la dirección es requerida para el tipo de entrega seleccionado', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_MISSING_ADDRESS'],
            ['code' => 'ORSE403', 'status_code' => 400, 'controller' => 'Order', 'message' => 'productos faltantes o incorrectos', 'description' => 'no se proporcionaron productos válidos para la orden', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_MISSING_PRODUCTS'],
            ['code' => 'ORSE405', 'status_code' => 400, 'controller' => 'Order', 'message' => 'productos no disponibles', 'description' => 'algunos productos no están disponibles o fueron rechazados', 'cause' => NULL, 'code_app' => 'BAD_REQUEST_PRODUCTS_UNAVAILABLE'],
            ['code' => 'ORSE406', 'status_code' => 500, 'controller' => 'Order', 'message' => 'error al crear la orden', 'description' => 'fallo al intentar crear una nueva orden en la base de datos', 'cause' => NULL, 'code_app' => 'SYSTEM_ERROR_CREATE_ORDER'],
            ['code' => 'ORSE500', 'status_code' => 500, 'controller' => 'Order', 'message' => 'error en el sistema', 'description' => 'un error inesperado ocurrió al procesar la solicitud de creación de orden', 'cause' => NULL, 'code_app' => 'SYSTEM_ERROR'],
            ['code' => 'ORSW200', 'status_code' => 200, 'controller' => 'Order', 'message' => 'orden encontrada', 'description' => 'orden recuperada correctamente', 'cause' => NULL, 'code_app' => 'SUCCESS'],
            ['code' => 'ORSW402', 'status_code' => 404, 'controller' => 'Order', 'message' => 'orden no encontrada', 'description' => 'no se encontró una orden con el ID proporcionado', 'cause' => NULL, 'code_app' => 'NOT_FOUND_ORDER'],
            ['code' => 'ORSW500', 'status_code' => 500, 'controller' => 'Order', 'message' => 'error en el sistema', 'description' => 'un error inesperado ocurrió al recuperar la orden', 'cause' => NULL, 'code_app' => 'SYSTEM_ERROR']
        ]);
    }
}
