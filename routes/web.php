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
            // Pendataan Usaha
            Route::name('usaha.')->prefix('usaha')->group(function () {
                Route::controller(App\Http\Controllers\Pendataan\Usaha\UsahaController::class)
                ->group(function () {
                    Route::get('/', 'category');
                    // Route::post('/', 'store')->name('store');

                    Route::get('/{jenis_usaha}', 'index')->name('index');
                });
            });

            // Pendataan Bangunan
            Route::name('bangunan.')->prefix('bangunan')
                ->controller(App\Http\Controllers\Pendataan\Bangunan\BangunanController::class)
                ->group(function () {
                    Route::get('/', 'index');
                    Route::get('/create', 'create');
                    Route::post('/', 'store');
                    Route::get('/{id}', 'show');
                    Route::get('/{id}/edit', 'edit');
                    Route::put('/{id}', 'update');

                    Route::put('/{id}/pemilik', 'updatePemilik');
                    Route::put('/{id}/pengelola', 'updatePengelola');
                });
        });

        Route::name('pengawasan.')->prefix('pengawasan')->group(function () {
            Route::name('pemanfaatan_produk')->prefix('/pemanfaatan-produk')
                ->controller(App\Http\Controllers\Pengawasan\PemanfaatanProduk\PemanfaatanProdukController::class)
                ->group(function () {
                    Route::get('/', 'index');
                    Route::post('/', 'store');
                    Route::get('/{id}', 'show');

                    Route::post('/{id}/verification', 'storeVerification');

                    Route::get('/{id}/laporan', 'showLaporan');

                    Route::post('/{id}/rekomendasi', 'storeRekomendasi');
                    Route::get('/{id}/rekomendasi/create', 'createRekomendasi');

                    Route::post('/{id}/{lingkup_id}', 'storePemeriksaan');

                });
        });
    }
);
