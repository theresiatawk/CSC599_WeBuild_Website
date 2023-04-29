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
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ReviewsController;

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

    Route::post('user/password/change', [AuthController::class, 'updatePassword']); 
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

    Route::post('equipment/add', [EquipmentController::class, 'addEquipmentWithGenerator']);
    Route::post('equipment/update/{id}', [EquipmentController::class, 'updateEquipment']);
    Route::delete('equipment/delete/{id}', [EquipmentController::class, 'deleteEquipment']);
    Route::get('equipment/w/{warehouse_id}',[EquipmentController::class, 'getEquipments']);
    Route::get('equipment/{id}',[EquipmentController::class, 'getEquipment']);

    Route::post('service/add', [ServiceController::class, 'addServiceWithGenerator']);
    Route::post('service/update/{id}', [ServiceController::class, 'updateService']);
    Route::delete('service/delete/{id}', [ServiceController::class, 'deleteService']);
    Route::get('service/w/{warehouse_id}',[ServiceController::class, 'getServices']);
    Route::get('service/{id}',[ServiceController::class, 'getService']);

    Route::post('reviews/add',[ReviewsController::class, 'addReview']);
    Route::get('reviews/delete/{id}',[ReviewsController::class, 'deleteReview']);
    Route::get('reviews/{warehouse_id}',[ReviewsController::class, 'getReviews']);
});
