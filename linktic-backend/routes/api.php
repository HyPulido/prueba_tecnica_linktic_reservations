<?php

use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
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

// Route::prefix('v1')->group(function () {
//     Route::post('/device', [DeviceController::class, 'save'])->middleware('throttle:10');
//     Route::post('/encrypt', [DeviceController::class, 'encrypt'])->middleware('throttle:10');
//     Route::post('/decrypt', [DeviceController::class, 'decrypt'])->middleware('throttle:10');
// });

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
    Route::post('/user/refresh', [UserController::class, 'logout'])->middleware('throttle:20');
    Route::get('/user/current', [UserController::class, 'getCurrentUser'])->middleware('throttle:10');

    Route::get('products', [ProductController::class, 'index']);
    Route::post('products', [ProductController::class, 'store']);
    Route::put('products/{id}', [ProductController::class, 'update']);
    Route::get('products/{id}', [ProductController::class, 'show']);

    Route::get('orders', [OrderController::class, 'index']);
    Route::post('orders', [OrderController::class, 'store']);
    Route::get('orders/{id}', [OrderController::class, 'show']);
});

