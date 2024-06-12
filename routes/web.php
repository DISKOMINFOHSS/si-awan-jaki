<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::name('auth.')->group(function () {
    Route::controller(App\Http\Controllers\Auth\AuthController::class)->group(function () {
        Route::get('/login', 'login')->name('login');
        Route::post('/login', 'authenticate')->name('authenticate');

        Route::post('/logout', 'logout')->middleware('auth')->name('logout');
    });
});

Route::redirect('/', '/admin/dashboard');

Route::middleware(['auth'])->name('admin.')->prefix('admin')
    ->group(function () {
        Route::inertia('/dashboard', 'Dashboard')->name('dashboard');

        Route::name('pendataan.')->prefix('pendataan')->group(function () {

            // Pendataan Bangunan
            Route::name('bangunan.')->prefix('bangunan')
                ->controller(App\Http\Controllers\Pendataan\Bangunan\BangunanController::class)
                ->group(function () {
                    Route::get('/', 'index');
                    Route::get('/create', 'create');
                    Route::post('/', 'store');
                    Route::get('/{id}', 'show');
                });
        });
    }
);
