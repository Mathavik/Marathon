<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\EventController;

use App\Http\Controllers\PaymentController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MarathonRegistrationController;

// REGISTER
Route::post('/register', [MarathonRegistrationController::class, 'store']);
Route::post('/marathon/register', [MarathonRegistrationController::class, 'store']);

// LOGIN
Route::post('/login', [AuthController::class, 'login']);

// LOGOUT
Route::post('/logout', [AuthController::class, 'logout']);




Route::post('/payment/create-order', [PaymentController::class, 'createOrder']);

Route::post('/payment/verify', [PaymentController::class, 'verifyPayment']);

Route::post('/register-event', [EventController::class, 'registerEvent']);