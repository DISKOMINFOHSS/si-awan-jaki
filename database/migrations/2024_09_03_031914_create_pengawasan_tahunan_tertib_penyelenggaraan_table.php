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
        Schema::create('pengawasan_tahunan_tertib_penyelenggaraan', function (Blueprint $table) {
            $table->id();
            $table->year('tahun');
            $table->foreignUuid('proyek_konstruksi_id');

            // Lingkup Pengawasan 1
            $table->boolean('tertib_proses_pemilihan_penyedia_jasa');

            // Lingkup Pengawasan 2
            $table->boolean('tertib_penerapan_standar_kontrak');
            $table->boolean('tertib_penggunaan_tkk');
            $table->boolean('tertib_pemberian_pekerjaan');

            // Lingkup Pengawasan 3
            $table->boolean('tertib_ketersediaan_dokumen_standar_k4');
            $table->boolean('tertib_penerapan_smkk');
            $table->boolean('tertib_antisipasi_kecelakaan');

            // Lingkup Pengawasan 4
            $table->boolean('tertib_penerapan_manajemen_mutu');

            // Lingkup Pengawasan 5
            $table->boolean('tertib_pemenuhan_penyediaan_mptk');
            $table->boolean('tertib_penggunaan_mptk');
            $table->boolean('tertib_penggunaan_pdn');

            // Lingkup Pengawasan 6
            $table->boolean('tertib_pemenuhan_standar_lingkungan');

            $table->boolean('tertib_pengawasan');
            $table->text('catatan')->nullable();

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('proyek_konstruksi_id', 'pengawasan_tahunan_penyelenggaraan_proyek_id_foreign')->references('id')->on('proyek_konstruksi');
            $table->foreign('created_by', 'pengawasan_tahunan_penyelenggaraan_created_by_foreign')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengawasan_tahunan_tertib_penyelenggaraan');
    }
};
