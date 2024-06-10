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
        Schema::create('bangunan', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nama');
            $table->string('nomor_kontrak_pembangunan')->nullable();
            $table->string('sumber_dana')->nullable();

            $table->date('mulai_pembangunan')->nullable();
            $table->date('selesai_pembangunan')->nullable();
            $table->date('tanggal_pemanfaatan')->nullable();

            $table->string('umur_konstruksi')->nullable();

            $table->foreignId('pemilik_bangunan')->nullable();
            $table->text('sk_pemilik')->nullable();
            $table->foreignId('pengelola_bangunan')->nullable();
            $table->text('sk_pengelola')->nullable();

            $table->text('lokasi')->nullable();
            $table->string('desa_kelurahan')->nullable();
            $table->string('kecamatan')->nullable();

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bangunan');
    }
};
