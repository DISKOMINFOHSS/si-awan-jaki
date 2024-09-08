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
        Schema::create('pengawasan_tahunan_tertib_usaha_bujk', function (Blueprint $table) {
            $table->id();
            $table->year('tahun');
            $table->foreignUuid('bujk_id');

            // Lingkup Pengawasan 2
            $table->boolean('tertib_jenis_usaha');
            $table->boolean('tertib_sifat_usaha');
            $table->boolean('tertib_klasifikasi_usaha');
            $table->boolean('tertib_layanan_usaha');

            // Lingkup Pengawasan 3
            $table->boolean('tertib_bentuk_usaha');
            $table->boolean('tertib_kualifikasi_usaha');

            // Lingkup Pengawasan 4
            $table->boolean('tertib_persyaratan_sbu');
            $table->boolean('tertib_persyaratan_nib');

            // Lingkup Pengawasan 5
            $table->boolean('tertib_pengembangan_usaha');

            $table->boolean('tertib_pengawasan');
            $table->text('catatan')->nullable();

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('bujk_id', 'pengawasan_tahunan_bujk_bujk_id_foreign')->references('id')->on('usaha');
            $table->foreign('created_by', 'pengawasan_tahunan_bujk_created_by_foreign')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengawasan_tahunan_tertib_usaha_bujk');
    }
};
