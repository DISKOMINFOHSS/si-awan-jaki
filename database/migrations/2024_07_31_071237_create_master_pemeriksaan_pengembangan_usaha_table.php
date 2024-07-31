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
        Schema::create('master_pemeriksaan_pengembangan_usaha', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('nama_pemeriksaan');
            $table->string('indikator');
            $table->string('subindikator')->nullable();
            $table->text('cara_pemeriksaan');
            $table->string('dokumen');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_pemeriksaan_pengembangan_usaha');
    }
};
