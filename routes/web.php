<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::view('register', 'register');
Route::view('getf', 'featuredproducts');
Route::view('login', 'login');

Route::post('reg', [AuthenticationController::class, 'register'])->name('registerNewUser');
Route::post('log', [AuthenticationController::class, 'login'])->name('loginUser');

Route::post('addUser', [AuthenticationController::class, 'addUser']);
Route::post('loginUser', [AuthenticationController::class, 'loginUser']);

Route::post('ftrd', [ProductController::class, 'getFeaturedProducts']);
Route::get('featured', [ProductController::class, 'getFeaturedProducts']);