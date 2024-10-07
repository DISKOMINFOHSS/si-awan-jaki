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
        Schema::create('pemeriksaan_peralatan_konstruksi_usaha_rantai_pasok', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('pengawasan_id');

            $table->string('varian');
            $table->string('subvarian');
            $table->string('merk_peralatan');
            $table->integer('jumlah_unit');
            $table->string('surat_k3');
            $table->string('bukti_kepemilikan');
            $table->boolean('simpk');
            $table->string('nomor_registrasi_simpk')->nullable();

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('pengawasan_id', 'pemeriksaan_peralatan_konstruksi_pengawasan_id_foreign')->references('id')->on('pengawasan_usaha_rantai_pasok_lingkup_1');
            $table->foreign('created_by', 'pemeriksaan_peralatan_konstruksi_created_by_foreign')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemeriksaan_peralatan_konstruksi_usaha_rantai_pasok');
    }
};
