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
                    Route::post('/', 'store')->name('store');

                    Route::post('/{id}/nib', 'storeDokumenNIB');
                    Route::delete('/{id}/nib/{file_id}', 'destroyDokumenNIB');

                    Route::get('/{jenis_usaha}', 'index')->name('index');
                });

                Route::name('rantai_pasok.')->prefix('rantai-pasok')
                ->controller(App\Http\Controllers\Pendataan\Usaha\RantaiPasokController::class)
                ->group(function () {
                    Route::get('/{id}', 'show')->name('show');
                });

                Route::name('bujk.')->prefix('bujk')
                ->controller(App\Http\Controllers\Pendataan\Usaha\BUJKController::class)
                ->group(function () {
                    Route::get('/{id}', 'show')->name('show');

                    Route::post('/{id}/laporan', 'storeLaporan');
                    Route::post('/{id}/paket-pekerjaan', 'storePaketPekerjaan');

                    Route::post('/{id}/sbu', 'storeSertifikat');
                    Route::post('/{id}/sbu/{sertifikat_id}', 'updateSertifikat');
                    Route::delete('/{id}/sbu/{sertifikat_id}', 'destroySertifikat');
                });

                Route::name('usaha_perseorangan.')->prefix('usaha-perseorangan')
                ->controller(App\Http\Controllers\Pendataan\Usaha\UsahaPerseoranganController::class)
                ->group(function () {
                    Route::get('/{id}', 'show')->name('show');
                });
            });

            // Pendataan Proyek
            Route::name('proyek.')->prefix('proyek')
            ->controller(App\Http\Controllers\Pendataan\Proyek\ProyekController::class)
            ->group(function () {
                Route::get('/', 'index');
                Route::get('/create', 'create');
                Route::post('/', 'store');

                Route::get('/{id}', 'show');
                Route::post('/{id}/penyedia-jasa', 'storePenyediaJasa');
                Route::post('/{id}/pengguna-jasa', 'storePenggunaJasa');
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

            Route::name('usaha.')->prefix('/usaha')->group(function() {
                Route::name('1.')->prefix('/1')
                ->controller(App\Http\Controllers\Pengawasan\Usaha\UsahaRantaiPasokController::class)
                ->group(function () {
                    Route::get('/', 'category');
                });

                Route::name('2.')->prefix('/2')
                ->controller(App\Http\Controllers\Pengawasan\Usaha\Lingkup2Controller::class)
                ->group(function () {
                    Route::get('/', 'index');
                    Route::post('/', 'store');
                    Route::get('/{id}', 'show');
                    Route::post('/{id}/verification', 'verify');

                    Route::post('/{id}/paket-pekerjaan', 'storeKesesuaianKegiatan');
                    Route::delete('/{id}/paket-pekerjaan/{kesesuaian_id}', 'destroyKesesuaianKegiatan');
                });

                Route::name('3.')->prefix('/3')
                ->controller(App\Http\Controllers\Pengawasan\Usaha\Lingkup3Controller::class)
                ->group(function () {
                    Route::get('/', 'index');
                    Route::post('/', 'store');
                    Route::get('/{id}', 'show');
                    Route::post('/{id}/verification', 'verify');

                    Route::post('/{id}/paket-pekerjaan', 'storeKesesuaianKegiatan');
                    Route::delete('/{id}/paket-pekerjaan/{kesesuaian_id}', 'destroyKesesuaianKegiatan');
                });

                Route::name('4.')->prefix('/4')
                ->controller(App\Http\Controllers\Pengawasan\Usaha\Lingkup4Controller::class)
                ->group(function () {

                    // Route::get('/{jenis_usaha}', 'index')->name('index');
                    Route::post('/', 'store');

                    Route::name('bujk.')->prefix('/bujk')
                    ->group(function () {
                        Route::get('/', 'indexBUJK');
                        Route::get('/{id}/rutin', 'showPengawasanRutinBUJK');
                        Route::post('/{id}/verification', 'verifyPengawasanRutinBUJK');
                    });

                });

                Route::name('5.')->prefix('/5')
                ->controller(App\Http\Controllers\Pengawasan\Usaha\Lingkup5Controller::class)
                ->group(function () {
                    Route::get('/', 'index');
                    Route::post('/', 'store');
                    Route::get('/{id}', 'show');

                    Route::post('/{id}/verification', 'verify');
                    Route::post('/{id}/{pemeriksaan_id}', 'storePemeriksaan');
                });

                Route::controller(App\Http\Controllers\Pengawasan\Usaha\UsahaController::class)
                ->group(function () {
                    Route::get('/', 'scope');
                    Route::get('/{lingkup_id}', 'category');
                });
            });
        });
    }
);
