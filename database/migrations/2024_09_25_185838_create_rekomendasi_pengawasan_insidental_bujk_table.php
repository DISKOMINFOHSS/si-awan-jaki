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
        Schema::create('rekomendasi_pengawasan_insidental_bujk', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('pengawasan_id');
            $table->string('pengawasan_type');

            $table->text('rekomendasi');
            $table->text('keterangan')->nullable();
            $table->date('tanggal_temuan')->nullable();

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->index(['pengawasan_id', 'pengawasan_type'], 'rekomendasi_pengawasan_id_pengawasan_type_index');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekomendasi_pengawasan_insidental_bujk');
    }
};
