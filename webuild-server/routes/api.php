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
use App\Http\Controllers\OrderController;
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
    Route::post('category/update/{id}', [MaterialCategoryController::class, 'updateMaterialCategory']);
    Route::get('category/delete/{id}', [MaterialCategoryController::class, 'deleteMaterialCategory']);
    Route::get('category/{warehouse_id}',[MaterialCategoryController::class, 'getMaterialsCategories']);
    Route::get('category/one/{id}',[MaterialCategoryController::class, 'getCategory']);

    Route::post('material/add', [MaterialController::class, 'addMaterial']);
    Route::post('material/update/{id}', [MaterialController::class, 'updateMaterial']);
    Route::get('material/delete/{id}', [MaterialController::class, 'deleteMaterial']);
    Route::get('material/one/{id}',[MaterialController::class, 'getMaterial']);
    Route::get('material/{warehouse_id}/{category_id}',[MaterialController::class, 'getMaterials']);

    Route::post('equipment/add', [EquipmentController::class, 'addEquipmentWithGenerator']);
    Route::post('equipment/update/{id}', [EquipmentController::class, 'updateEquipment']);
    Route::get('equipment/delete/{id}', [EquipmentController::class, 'deleteEquipment']);
    Route::get('equipment/w/{warehouse_id}',[EquipmentController::class, 'getEquipments']);
    Route::get('equipment/{id}',[EquipmentController::class, 'getEquipment']);

    Route::post('service/add', [ServiceController::class, 'addServiceWithGenerator']);
    Route::post('service/update/{id}', [ServiceController::class, 'updateService']);
    Route::get('service/delete/{id}', [ServiceController::class, 'deleteService']);
    Route::get('service/w/{warehouse_id}',[ServiceController::class, 'getServices']);
    Route::get('service/{id}',[ServiceController::class, 'getService']);

    Route::post('order/material', [OrderController::class, 'orderMaterial']);
    Route::post('order/service', [OrderController::class, 'orderService']);
    Route::post('order/equipment', [OrderController::class, 'orderEquipment']);
    Route::post('order/get/date/item', [OrderController::class, 'getOrdersForWarehouseForDate']);
    Route::get('order/get/w', [OrderController::class, 'getOrdersForWarehouse']);
    Route::get('order/get/w/canceled', [OrderController::class, 'getOrdersForWarehouseCanceled']);
    Route::get('order/get/w/pending', [OrderController::class, 'getOrdersForWarehousePending']);
    Route::get('order/get/w/completed', [OrderController::class, 'getOrdersForWarehouseComplete']);
    Route::get('order/get/w/material', [OrderController::class, 'getOrdersForWarehouseMaterial']);
    Route::get('order/get/w/service', [OrderController::class, 'getOrdersForWarehouseService']);
    Route::get('order/get/w/equipment', [OrderController::class, 'getOrdersForWarehouseEquipment']);
    Route::get('order/get/u', [OrderController::class, 'getOrdersForUser']);
    Route::get('order/get/u/canceled', [OrderController::class, 'getOrdersForUserCanceled']);
    Route::get('order/get/u/pending', [OrderController::class, 'getOrdersForUserPending']);
    Route::get('order/get/u/completed', [OrderController::class, 'getOrdersForUserComplete']);
    Route::get('order/get/u/material', [OrderController::class, 'getOrdersForUserMaterial']);
    Route::get('order/get/u/service', [OrderController::class, 'getOrdersForUserService']);
    Route::get('order/get/u/equipment', [OrderController::class, 'getOrdersForUserEquipment']);
    Route::post('order/change/{order_id}/{status}', [OrderController::class, 'changeOrderStatus']);
    Route::post('order/delete/{order_id}', [OrderController::class, 'deleteOrder']);

    Route::post('reviews/add',[ReviewsController::class, 'addReview']);
    Route::get('reviews/delete/{id}',[ReviewsController::class, 'deleteReview']);
    Route::get('reviews/{warehouse_id}',[ReviewsController::class, 'getReviews']);


});
