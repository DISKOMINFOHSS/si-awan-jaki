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
        Schema::create('pemeriksaan_pengawasan_rutin_penyelenggaraan', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('pengawasan_id');
            $table->unsignedTinyInteger('lingkup_id');
            $table->json('kesimpulan_pemeriksaan');
            $table->json('catatan_pemeriksaan')->nullable();

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('pengawasan_id', 'pemeriksaan_pengawasan_rutin_pengawasan_id_foreign')->references('id')->on('pengawasan_penyelenggaraan_konstruksi');
            $table->foreign('lingkup_id', 'pemeriksaan_pengawasan_rutin_lingkup_id_foreign')->references('id')->on('master_lingkup_pengawasan_penyelenggaraan');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemeriksaan_pengawasan_rutin_penyelenggaraan');
    }
};
