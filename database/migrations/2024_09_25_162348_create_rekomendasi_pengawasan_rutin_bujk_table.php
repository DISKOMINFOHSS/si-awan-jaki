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
        Schema::create('rekomendasi_pengawasan_rutin_bujk', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pengawasan_id');

            $table->text('rekomendasi');
            $table->text('keterangan')->nullable();
            $table->date('tanggal_temuan')->nullable();

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('pengawasan_id')->references('id')->on('pengawasan_bujk_rutin');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekomendasi_pengawasan_rutin_bujk');
    }
};
