<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReservationController;
use App\Http\Middleware\AuthenticateMiddleware;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('v1')->group(function () {
    Route::post('/encrypt', [UserController::class, 'encrypt'])->middleware('throttle:10');
    Route::post('/decrypt', [UserController::class, 'decrypt'])->middleware('throttle:10');
});

Route::prefix('v1')->group(function () {
    Route::post('/user', [UserController::class, 'save'])->middleware('throttle:10');
    Route::post('/user/login', [UserController::class, 'login'])->middleware('throttle:20');
});

Route::prefix('v1')->middleware(AuthenticateMiddleware::class)->group(function () {
    Route::post('/user/logout', [UserController::class, 'logout'])->middleware('throttle:20');
    Route::post('/user/token/refresh', [UserController::class, 'logout'])->middleware('throttle:20');
    Route::get('/user/current', [UserController::class, 'getCurrentUser'])->middleware('throttle:10');

    // Reservations
    Route::get('reservations', [ReservationController::class, 'index']);
    Route::post('reservation', [ReservationController::class, 'store']);
    Route::put('reservation/{id}', [ReservationController::class, 'update']);
    Route::get('reservation/{id}', [ReservationController::class, 'show']);
    Route::delete('reservation/{id}', [ReservationController::class, 'delete']);
});

