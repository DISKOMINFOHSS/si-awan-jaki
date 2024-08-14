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
        Schema::create('pengguna_jasa_konstruksi', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('pelaku_pengadaan');
            $table->string('nip')->nullable();
            $table->string('jabatan')->nullable();
            $table->text('sk')->nullable();
            $table->string('instansi')->nullable();
            $table->text('alamat')->nullable();

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
        Schema::dropIfExists('pengguna_jasa_konstruksi');
    }
};
