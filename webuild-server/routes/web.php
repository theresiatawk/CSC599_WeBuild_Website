<?php
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Route::get('/', function () {
//     return view('welcome');
// });
// Route::get('/login', function () {
//     throw new \Illuminate\Auth\Access\AuthorizationException('Unauthorized action.');
//     return;
// })->name('login');
Route::get('/email/verify/{token}', 'Auth\VerificationController@verify')->name('verification.verify');

Route::get('/', function () {
    return response()->json([
        'redirection' => 'A redirection Happen'
    ], 200);
});
Route::get('/login', function () {
    return view('login');
})->name('login');


