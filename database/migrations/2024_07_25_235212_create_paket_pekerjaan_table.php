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
        Schema::create('paket_pekerjaan', function (Blueprint $table) {
            $table->id();
            $table->string('nama_paket');
            $table->year('tahun_anggaran');
            $table->string('jenis_usaha');
            $table->string('sifat_usaha');
            $table->text('subklasifikasi_usaha');
            $table->string('layanan_usaha');
            $table->string('bentuk_usaha');
            $table->string('kualifikasi_usaha');
            $table->foreignUuid('usaha_id');
            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('usaha_id')->references('id')->on('usaha');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paket_pekerjaan');
    }
};
