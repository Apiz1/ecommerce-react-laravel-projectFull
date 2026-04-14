<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\SizeController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\TempImageController;
use App\Http\Controllers\front\ProductController as FrontProductController;
use App\Http\Controllers\front\AccountController;
use App\Http\Controllers\front\OrderController;
use App\Http\Controllers\front\ShippingController as FrontShippinController;
use App\Http\Controllers\admin\OrderController as AdminOrderController;
use App\Http\Controllers\admin\ShippingController;

Route::post('/admin/login',[AuthController::class,'authenticate']);
Route::get('get-latest-products',[FrontProductController::class,'latestProducts']);
Route::get('get-featured-products',[FrontProductController::class,'featuredProducts']);
Route::get('get-categories',[FrontProductController::class,'getCategories']);
Route::get('get-brands',[FrontProductController::class,'getBrand']);
Route::get('get-products',[FrontProductController::class,'getProducts']);
Route::get('get-product/{id}',[FrontProductController::class,'getProduct']);
Route::post('register',[AccountController::class,'register']);
Route::post('login',[AccountController::class,'authenticate']);
Route::get('get-shipping-front',[FrontShippinController::class,'getShipping']);

Route::group(['middleware'=>['auth:sanctum','checkUserRole']],function(){
Route::post('save-order',[OrderController::class,'saveOrder']);
Route::get('get-order-details/{id}',[AccountController::class,'getOrderDetails']);
Route::get('get-orders',[AccountController::class,'getOrders']);
Route::post('update-profile',[AccountController::class,'updateProfile']);
Route::get('get-profile-details',[AccountController::class,'getAccountDetail']);
Route::post('create-payment-intent',[OrderController::class,'createPaymentIntent']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['middleware'=>['auth:sanctum','checkAdminRole']],function(){
    //Route::get('categories',[CategoryController::class,'index']);
    //Route::get('categories/{id}',[CategoryController::class,'show']);
    //Route::put('categories/{id}',[CategoryController::class,'update']);
    //Route::delete('categories/{id}',[CategoryController::class,'destroy']);
    //Route::post('categories',[CategoryController::class,'store']);

    Route::resource('categories',CategoryController::class);
    Route::resource('brands',BrandController::class);
    Route::get('sizes',[SizeController::class,'index']);
    Route::resource('products',ProductController::class);
    Route::post('temp-images',[TempImageController::class,'store']);
    Route::post('save-product-image',[ProductController::class,'saveProductImage']);
    Route::get('change-product-default-image',[ProductController::class,'updateDefaultImage']);
    Route::delete('delete-product-image/{id}',[ProductController::class,'deleteProductImage']);

    Route::get('orders',[AdminOrderController::class,'index']);
    Route::get('orders/{id}',[AdminOrderController::class,'detail']);
    Route::post('update-order/{id}',[AdminOrderController::class,'updateOrder']);

    Route::get('get-shipping',[ShippingController::class,'getShipping']);
    Route::post('save-shipping',[ShippingController::class,'updateShipping']);

});