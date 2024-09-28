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
        // Route::inertia('/dashboard', 'Dashboard')->name('dashboard');
        Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'dashboard'])->name('dashboard');

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
            Route::name('proyek_konstruksi.')->prefix('proyek-konstruksi')
            ->controller(App\Http\Controllers\Pendataan\Proyek\ProyekController::class)
            ->group(function () {
                Route::get('/', 'index');
                Route::post('/', 'store');
                Route::get('/create', 'create');

                Route::get('/{id}', 'show');
                Route::put('/{id}', 'update');
                Route::get('/{id}/edit', 'edit');

                Route::post('/{id}/pengguna-jasa', 'storePenggunaJasa');
                Route::post('/{id}/penyedia-jasa', 'storePenyediaJasa');
                Route::post('/{id}/konsultan-pengawas', 'storeKonsultanPengawas');

                Route::post('/{id}/surat-pernyataan', 'storeSuratPernyataan');
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

                    Route::post('/{id}/bukti-dukung', 'storeBuktiDukung');
                    Route::delete('/{id}/bukti-dukung/{bukti_dukung_id}', 'deleteBuktiDukung');

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
                    Route::delete('/{id}', 'destroy');

                    Route::post('/{id}/verification', 'verify');
                    Route::get('/{id}/simak', 'print');

                    Route::get('/{id}/rekomendasi', 'showRekomendasi');
                    Route::post('/{id}/rekomendasi', 'storeRekomendasi');

                    Route::post('/{id}/{lingkup_id}', 'storePemeriksaan');

                });

            Route::name('penyelenggaraan.')->prefix('/penyelenggaraan')
            ->group(function () {
                Route::name('APBD.')->prefix('/APBD')
                ->group(function () {
                    Route::controller(App\Http\Controllers\Pengawasan\Penyelenggaraan\APBD\PenyelenggaraanController::class)
                    ->group(function () {
                        Route::get('/', 'index');
                        Route::post('/', 'store');
                        Route::delete('/{id}', 'destroy');

                        Route::post('/{id}/verification', 'verify');
                        Route::post('/{id}/rekomendasi', 'recommend');
                    });

                    // Pengawasan Rutin
                    Route::name('rutin.')->prefix('/rutin/{id}')
                    ->controller(App\Http\Controllers\Pengawasan\Penyelenggaraan\APBD\PengawasanRutinController::class)
                    ->group(function () {
                        Route::get('/', 'show');
                        Route::post('/', 'store');

                        Route::get('/rekomendasi', 'recommendation');
                        Route::get('/simak', 'print');
                        // Route::get('/simak', 'showSimak');
                    });

                    // Pengawasan Insidental
                    Route::name('insidental.')->prefix('/insidental/{id}')
                    ->controller(App\Http\Controllers\Pengawasan\Penyelenggaraan\APBD\PengawasanInsidentalController::class)
                    ->group(function () {
                        Route::get('/', 'show');
                        Route::post('/', 'store');

                        Route::get('/rekomendasi', 'recommendation');
                        Route::get('/simak', 'print');
                    });
                });
            });

            Route::name('usaha.')->prefix('/usaha')->group(function() {
                Route::redirect('/rantai-pasok', '/admin/pengawasan/usaha/1');

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
                    Route::put('/{id}', 'update');
                    Route::delete('/{id}', 'destroy');

                    Route::post('/{id}/verification', 'verify');

                    Route::post('/{id}/paket-pekerjaan', 'storeKesesuaianKegiatan');
                    Route::delete('/{id}/paket-pekerjaan/{kesesuaian_id}', 'destroyKesesuaianKegiatan');

                    Route::get('/{id}/rekomendasi', 'recommendation');
                    Route::post('/{id}/rekomendasi', 'recommend');
                    Route::get('/{id}/simak', 'print');
                });

                Route::name('3.')->prefix('/3')
                ->controller(App\Http\Controllers\Pengawasan\Usaha\Lingkup3Controller::class)
                ->group(function () {
                    Route::get('/', 'index');
                    Route::post('/', 'store');
                    Route::get('/{id}', 'show');
                    Route::put('/{id}', 'update');
                    Route::delete('/{id}', 'destroy');

                    Route::post('/{id}/verification', 'verify');

                    Route::post('/{id}/paket-pekerjaan', 'storeKesesuaianKegiatan');
                    Route::delete('/{id}/paket-pekerjaan/{kesesuaian_id}', 'destroyKesesuaianKegiatan');

                    Route::get('/{id}/rekomendasi', 'recommendation');
                    Route::post('/{id}/rekomendasi', 'recommend');

                    Route::get('/{id}/simak', 'print');
                });

                Route::name('4.')->prefix('/4')
                ->group(function () {

                    Route::controller(App\Http\Controllers\Pengawasan\Usaha\Lingkup4Controller::class)
                    ->group(function () {
                        // Route::get('/{jenis_usaha}', 'index')->name('index');
                        Route::post('/', 'store');
                        Route::put('/{id}', 'update');
                        Route::delete('/{id}', 'destroy');

                        // Route::prefix('/bujk')
                        // ->group(function () {
                            Route::get('/bujk', 'indexBUJK');
                            Route::get('/bujk/{id}/rutin', 'showPengawasanRutinBUJK');
                            Route::post('/bujk/{id}/verification', 'verifyPengawasanBUJK');
                        // });
                    });

                    Route::name('bujk.')->prefix('/bujk')
                    ->controller(App\Http\Controllers\Pengawasan\Usaha\Lingkup4\BUJKController::class)
                    ->group(function () {
                        Route::get('/{id}/insidental', 'insidental');
                        Route::get('/{id}/rekomendasi', 'recommendation');
                        Route::post('/{id}/rekomendasi', 'recommend');
                    });
                });

                Route::name('5.')->prefix('/5')
                ->controller(App\Http\Controllers\Pengawasan\Usaha\Lingkup5Controller::class)
                ->group(function () {
                    Route::get('/', 'index');
                    Route::post('/', 'store');
                    Route::get('/{id}', 'show');
                    Route::put('/{id}', 'update');
                    Route::delete('/{id}', 'destroy');

                    Route::post('/{id}/verification', 'verify');

                    Route::get('/{id}/rekomendasi', 'recommendation');
                    Route::post('/{id}/rekomendasi', 'recommend');

                    Route::post('/{id}/{pemeriksaan_id}', 'storePemeriksaan');
                });

                Route::name('bujk.')->prefix('/bujk')
                ->controller(App\Http\Controllers\Pengawasan\Usaha\BUJKController::class)
                ->group(function () {
                    Route::get('/', 'index');
                    Route::post('/rutin', 'store');
                    Route::get('/rutin/{id}', 'show');
                    Route::get('/rutin/{id}/rekomendasi', 'recommendation');
                    Route::post('/rutin/{id}/rekomendasi', 'recommend');
                });

                Route::controller(App\Http\Controllers\Pengawasan\Usaha\UsahaController::class)
                ->group(function () {
                    Route::get('/', 'scope');
                    Route::get('/{lingkup_id}', 'category');
                });
            });
        });

        // Jenis Pengawasan
        Route::name('jenis_pengawasan.')->prefix('/jenis-pengawasan')
        ->group(function () {

            // Pengawasan Rutin
            Route::name('rutin.')->prefix('/rutin')
            ->group(function () {
                Route::redirect('/', "/admin/jenis-pengawasan/rutin/" . date('Y'));

                Route::controller(App\Http\Controllers\JenisPengawasan\Rutin\PengawasanRutinController::class)
                ->group(function () {
                    Route::get('/{tahun}', 'index');
                    Route::get('/{tahun}/{file_name}', 'show');
                });
            });

            // Pengawasan Insidental
            Route::name('insidental.')->prefix('/insidental')
            ->group(function () {
                Route::redirect('/', "/admin/jenis-pengawasan/insidental/" . date('Y') . '/tertib-usaha');
                Route::redirect('/{tahun}', "/admin/jenis-pengawasan/insidental/" . date('Y') . '/tertib-usaha');

                Route::controller(App\Http\Controllers\JenisPengawasan\Insidental\PengawasanInsidentalController::class)
                ->group(function () {
                    // Route::get('/{tahun}', 'index');
                    Route::get('/{tahun}/tertib-usaha', 'usaha');
                    Route::get('/{tahun}/tertib-penyelenggaraan', 'penyelenggaraan');
                    Route::get('/{tahun}/tertib-pemanfaatan-produk', 'pemanfaatan');

                    Route::get('/{tahun}/{file_name}', 'rekapitulasi');
                });
            });

            // Pengawasan Progress
            Route::name('progress.')->prefix('/progress')
            ->group(function () {
                Route::redirect('/', "/admin/jenis-pengawasan/progress/" . date('Y'));

                Route::prefix('/{tahun}')
                ->controller(App\Http\Controllers\JenisPengawasan\Progress\PengawasanProgressController::class)
                ->group(function () {
                    Route::get('/', 'index');
                    Route::post('/', 'store');
                    Route::get('/{id}', 'show');

                    Route::post('/{id}/realisasi-fisik', 'target');
                    Route::post('/{pengawasan_id}/realisasi-fisik/{id}', 'realisasi');

                    Route::post('/{id}/realisasi-keuangan', 'termin');
                    Route::post('/{pengawasan_id}/realisasi-keuangan/{id}', 'pembayaran');
                });
            });


        });

        // Rekapitulasi
        Route::name('rekapitulasi.')->prefix('rekapitulasi')
        ->group(function () {
            Route::redirect('/', "/admin/rekapitulasi/" . date('Y'));

            Route::controller(App\Http\Controllers\Rekapitulasi\RekapitulasiController::class)
            ->group(function () {
                Route::get('/{tahun}', 'index');
            });

            Route::name('pemanfaatan_produk.')
            ->controller(App\Http\Controllers\Rekapitulasi\TertibPemanfaatanProdukController::class)
            ->group(function () {
                Route::get('/{tahun?}/pemanfaatan-produk', 'index');
                Route::post('/{tahun}/pemanfaatan-produk', 'store');

                Route::get('/{tahun}/pemanfaatan-produk/pdf', 'show');
            });

            Route::name('penyelenggaraan.')->prefix('/{tahun}/penyelenggaraan')
            ->controller(App\Http\Controllers\Rekapitulasi\TertibPenyelenggaraanController::class)
            ->group(function () {
                Route::get('/', 'index');
                Route::post('/', 'store');

                Route::get('/{fileName}', 'show');
            });

            Route::name('usaha.')->prefix('/{tahun}/tertib-usaha')
            ->controller(App\Http\Controllers\Rekapitulasi\TertibUsahaController::class)
            ->group(function () {
                Route::get('/', 'index');

                Route::post('/bujk', 'storePengawasanBUJK');
                Route::get('/{fileName}', 'show');
            });

        });

        // Route::name('rekapitulasi.')->prefix('/rekapitulasi')
        // ->group(function () {
        //     Route::get('/{?year}')
        // });
    }
);
