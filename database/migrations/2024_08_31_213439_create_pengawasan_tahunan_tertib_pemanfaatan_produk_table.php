<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pengawasan_tahunan_tertib_pemanfaatan_produk', function (Blueprint $table) {
            $table->id();
            $table->year('tahun');
            $table->foreignUuid('bangunan_id');

            $table->boolean('tertib_kesesuaian_fungsi');
            $table->boolean('tertib_kesesuaian_lokasi');
            $table->boolean('tertib_rencana_umur_konstruksi');
            $table->boolean('tertib_kapasitas_beban');
            $table->boolean('tertib_pemeliharaan_bangunan');
            $table->boolean('tertib_program_pemeliharaan');

            $table->boolean('tertib_pengawasan');
            $table->text('catatan')->nullable();

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('bangunan_id', 'pengawasan_tahunan_pemanfaatan_produk_bangunan_id_foreign')->references('id')->on('bangunan');
            $table->foreign('created_by', 'pengawasan_tahunan_pemanfaatan_produk_created_by_foreign')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengawasan_tahunan_tertib_pemanfaatan_produk');
    }
};
