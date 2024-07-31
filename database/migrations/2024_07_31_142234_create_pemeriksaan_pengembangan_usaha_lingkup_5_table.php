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
        Schema::create('pemeriksaan_pengembangan_usaha_lingkup_5', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('pengawasan_id');
            $table->string('pemeriksaan_id');
            $table->string('hasil_pemeriksaan');
            $table->text('catatan_pemeriksaan')->nullable();

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('pengawasan_id')->references('id')->on('pengawasan_bujk_lingkup_5');
            $table->foreign('pemeriksaan_id')->references('id')->on('master_pemeriksaan_pengembangan_usaha');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemeriksaan_pengembangan_usaha_lingkup_5');
    }
};
