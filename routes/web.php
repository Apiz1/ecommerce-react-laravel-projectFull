<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\AuthController;

Route::post('/admin/login',[AuthController::class,'authenticate']);

Route::get('/', function () {
    return view('welcome');
});
