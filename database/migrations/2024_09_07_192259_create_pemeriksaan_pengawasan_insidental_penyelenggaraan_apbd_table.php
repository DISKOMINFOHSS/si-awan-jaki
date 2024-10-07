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
        Schema::create('pemeriksaan_pengawasan_insidental_penyelenggaraan_apbd', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('pengawasan_id');
            $table->string('indikator_id');
            $table->json('kesimpulan_pemeriksaan');
            $table->json('catatan_pemeriksaan');

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('pengawasan_id', 'pemeriksaan_pengawasan_insidental_pengawasan_id_foreign')->references('id')->on('pengawasan_penyelenggaraan_konstruksi');
            $table->foreign('indikator_id', 'pemeriksaan_pengawasan_insidental_indikator_id_foreign')->references('indikator_id')->on('master_pemeriksaan_pengawasan_insidental_penyelenggaraan_apbd');
            $table->foreign('created_by', 'pemeriksaan_pengawasan_insidental_created_by_foreign')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemeriksaan_pengawasan_insidental_penyelenggaraan_apbd');
    }
};
