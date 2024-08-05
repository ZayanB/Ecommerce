<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CartItemController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/products', [ProductController::class, 'getFeaturedProducts']);

Route::get('/products/category/{categoryId}', [ProductController::class, 'getProductsByCategory']);

Route::get('/categories', [CategoryController::class, 'getAllCategories']);
Route::get('/test', [ProductController::class, 'getProductsByFilter']);

Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'login']);

Route::post('/cartItem', [CartItemController::class, 'addCartItem']);
