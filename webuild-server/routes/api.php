<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\WarehouseOwnerController;
use App\Http\Controllers\MaterialCategoryController;
use App\Http\Controllers\MaterialController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
], function ($router) {
    Route::post('user/login', [AuthController::class, 'login']);
    Route::post('user/register', [AuthController::class, 'register']);
    Route::post('user/logout', [AuthController::class, 'logout']);
    Route::post('user/refresh', [AuthController::class, 'refresh']);

    Route::get('user/user-profile', [AuthController::class, 'userProfile']);  
    Route::post('user/editProfile/', [AuthController::class, 'editProfile']);

    Route::get('user/w', [AuthController::class, 'getWarehouses']);
    Route::get('user/u', [AuthController::class, 'getUsers']);

    Route::post('user/{user}/password', [AuthController::class, 'updatePassword']); 
    Route::post('user/password/email', [ForgotPasswordController::class, 'sendResetLinkEmail']);
    Route::get('/password/reset/{token}', function ($token) {
        return view('reset-password', ['token' => $token]);
    })->name('password.reset');
    Route::post('user/password/reset', [ResetPasswordController::class, 'reset']);

    Route::get('user/email/verify', [VerificationController::class, 'show'])->name('verification.notice');
    Route::get('user/email/verify/{token}', [VerificationController::class, 'verify'])->name('verification.verify');
    Route::get('user/email/resend', [VerificationController::class, 'resend'])->name('verification.resend');
    
    Route::post('category/add', [MaterialCategoryController::class, 'addMaterialCategory']);
    Route::put('category/update/{name}/{newName}', [MaterialCategoryController::class, 'updateMaterialCategory']);
    Route::delete('category/delete/{id}', [MaterialCategoryController::class, 'deleteMaterialCategory']);
    Route::get('category/{warehouse_id}',[MaterialCategoryController::class, 'getMaterialsCategories']);

    Route::post('material/add', [MaterialController::class, 'addMaterial']);
    Route::post('material/update/{id}', [MaterialController::class, 'updateMaterial']);
    Route::delete('material/delete/{id}', [MaterialController::class, 'deleteMaterial']);
    Route::get('material/{warehouse_id}/{category_id}',[MaterialController::class, 'getMaterials']);


});
