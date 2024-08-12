<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\OrderAddressController;
use App\Http\Controllers\OrderInfoController;
use App\Http\Controllers\ProductReviewController;
use App\Http\Controllers\ShoppingCartController;
use App\Http\Controllers\UserAddressController;
use App\Http\Controllers\UserInfoController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/products', [ProductController::class, 'getFeaturedProducts']);

// Route::get('/products/category/{categoryId}', [ProductController::class, 'getProductsByCategory']);
Route::get('/products/{product}', [ProductController::class, 'getSingleProduct']);

Route::get('/categories', [CategoryController::class, 'getAllCategories']);
Route::get('/test', [ProductController::class, 'getProductsByFilter']);

Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'login']);
Route::post('/logout', [AuthenticationController::class, 'logout'])->middleware('auth:sanctum');


Route::post('/createItem', [ShoppingCartController::class, 'createCartItem'])->middleware('auth:sanctum');
Route::post('/getCart', [ShoppingCartController::class, 'getCartItems'])->middleware('auth:sanctum');
Route::post('/removeCartItem', [ShoppingCartController::class, 'removeCartItem'])->middleware('auth:sanctum');

Route::get('/productReviews', [ProductReviewController::class, 'getProductReview']);
Route::post('/addProductReview', [ProductReviewController::class, 'addProductReview'])->middleware('auth:sanctum');

Route::post('/addAddress', [UserAddressController::class, 'addAddress'])->middleware('auth:sanctum');
Route::post('/getAddress', [UserAddressController::class, 'getAddress'])->middleware('auth:sanctum');

Route::post('/createOrderAddress', [OrderAddressController::class, 'addOrderAddress'])->middleware(('auth:sanctum'));

Route::post('/placeOrder', [OrderInfoController::class, 'createOrder'])->middleware(('auth:sanctum'));

Route::post('/getUserInfo', [UserInfoController::class, 'getUserInfo'])->middleware('auth:sanctum');
Route::post('/getOrderInfo', [OrderInfoController::class, 'getOrderInfo'])->middleware('auth:sanctum');
