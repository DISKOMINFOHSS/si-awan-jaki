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
        Schema::create('realisasi_fisik_pengawasan_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('pengawasan_id');

            $table->date('tanggal');
            $table->decimal('target', 5, 2);

            $table->decimal('realisasi', 5, 2)->nullable();
            $table->json('foto_lapangan')->nullable();

            $table->text('catatan')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable();

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('pengawasan_id', 'realisasi_fisik_pengawasan_progress_id_foreign')->references('id')->on('pengawasan_progress_proyek_konstruksi');
            $table->foreign('verified_by')->references('id')->on('users');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('realisasi_fisik_pengawasan_progress');
    }
};
