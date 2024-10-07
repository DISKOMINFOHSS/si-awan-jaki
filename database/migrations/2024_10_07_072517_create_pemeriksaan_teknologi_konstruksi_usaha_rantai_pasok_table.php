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
        Schema::create('pemeriksaan_teknologi_konstruksi_usaha_rantai_pasok', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('pengawasan_id');

            $table->string('nama_teknologi');
            $table->string('bidang_usaha');
            $table->boolean('haki');
            $table->string('nomor_haki')->nullable();

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('pengawasan_id', 'pemeriksaan_teknologi_konstruksi_pengawasan_id_foreign')->references('id')->on('pengawasan_usaha_rantai_pasok_lingkup_1');
            $table->foreign('created_by', 'pemeriksaan_teknologi_konstruksi_created_by_foreign')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemeriksaan_teknologi_konstruksi_usaha_rantai_pasok');
    }
};
