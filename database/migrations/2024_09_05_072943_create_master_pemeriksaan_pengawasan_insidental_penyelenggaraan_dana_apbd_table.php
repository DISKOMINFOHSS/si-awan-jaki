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
        Schema::create('master_pemeriksaan_pengawasan_insidental_penyelenggaraan_apbd', function (Blueprint $table) {
            $table->string('indikator_id')->primary();
            $table->json('cara_pemeriksaan');
            $table->json('kesimpulan');

            $table->foreign('indikator_id', 'master_pemeriksaan_pengawasan_insidental_indikator_id_foreign')->references('id')->on('master_indikator_pengawasan_penyelenggaraan_dana_apbd');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_pemeriksaan_pengawasan_insidental_penyelenggaraan_apbd');
    }
};
