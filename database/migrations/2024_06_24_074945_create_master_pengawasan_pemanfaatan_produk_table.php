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
        Schema::create('master_pengawasan_pemanfaatan_produk', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('lingkup_pengawasan');
            $table->text('detail')->nullable();
            $table->text('indikator');
            $table->text('cara_pemeriksaan');
            $table->string('dokumen');
            $table->json('kesimpulan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_pengawasan_pemanfaatan_produk');
    }
};
