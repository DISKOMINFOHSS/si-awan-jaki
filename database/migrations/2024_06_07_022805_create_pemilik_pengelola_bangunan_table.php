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
        Schema::create('pemilik_pengelola_bangunan', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nip')->nullable();
            $table->string('jabatan')->nullable();
            $table->string('instansi')->nullable();
            $table->text('alamat')->nullable();

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('created_by')->references('id')->on('users');
        });

        Schema::table('bangunan', function (Blueprint $table) {
            $table->foreign('pemilik_bangunan')->references('id')->on('pemilik_pengelola_bangunan');
            $table->foreign('pengelola_bangunan')->references('id')->on('pemilik_pengelola_bangunan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemilik_pengelola_bangunan');
    }
};
