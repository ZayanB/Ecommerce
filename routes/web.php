<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::view('register', 'register');
Route::view('login', 'login');


Route::post('reg', [AuthenticationController::class, 'register'])->name('registerNewUser');
Route::post('log', [AuthenticationController::class, 'login'])->name('loginUser');
