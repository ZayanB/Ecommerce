<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::view('register', 'register');
Route::view('login', 'login');

Route::post('addUser', [AuthenticationController::class, 'addUser']);
Route::post('loginUser', [AuthenticationController::class, 'loginUser']);
