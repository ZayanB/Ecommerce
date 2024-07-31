<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::view('register', 'register');
Route::view('getf', 'featuredproducts');
Route::view('login', 'login');

Route::post('addUser', [AuthenticationController::class, 'addUser']);
Route::post('loginUser', [AuthenticationController::class, 'loginUser']);

Route::post('featured', [ProductController::class, 'getFeaturedProducts']);
