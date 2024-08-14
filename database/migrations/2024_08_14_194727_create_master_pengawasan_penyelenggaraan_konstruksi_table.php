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
        Schema::create('master_lingkup_pengawasan_penyelenggaraan', function (Blueprint $table) {
            $table->unsignedTinyInteger('id')->primary();
            $table->string('lingkup_pengawasan');
        });

        Schema::create('master_indikator_pengawasan_penyelenggaraan_dana_apbd', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->unsignedTinyInteger('lingkup_id');
            $table->string('indikator');

            $table->foreign('lingkup_id', 'master_indikator_pengawasan_penyelenggaraan_lingkup_id')->references('id')->on('master_lingkup_pengawasan_penyelenggaraan');
        });

        Schema::create('master_pemeriksaan_pengawasan_rutin_penyelenggaraan_dana_apbd', function (Blueprint $table) {
            $table->unsignedTinyInteger('lingkup_id')->primary();
            $table->string('dokumen');
            $table->json('cara_pemeriksaan');
            $table->json('kesimpulan');

            $table->foreign('lingkup_id', 'master_pemeriksaan_pengawasan_rutin_lingkup_id')->references('id')->on('master_lingkup_pengawasan_penyelenggaraan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_pemeriksaan_pengawasan_rutin_penyelenggaraan_dana_apbd');
        Schema::dropIfExists('master_indikator_pengawasan_penyelenggaraan_dana_apbd');
        Schema::dropIfExists('master_lingkup_pengawasan_penyelenggaraan');
    }
};
