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
        Schema::create('pengawasan_progress_proyek_konstruksi', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('proyek_konstruksi_id');
            $table->year('tahun_pengawasan');

            $table->string('emonev_id')->nullable();
            $table->string('kode_urusan')->nullable();
            $table->string('urusan')->nullable();
            $table->string('kode_bidang')->nullable();
            $table->string('bidang')->nullable();
            $table->string('kode_program')->nullable();
            $table->string('program', 512)->nullable();
            $table->string('kode_kegiatan')->nullable();
            $table->string('kegiatan', 512)->nullable();
            $table->string('kode_subkegiatan')->nullable();
            $table->string('subkegiatan', 512)->nullable();

            $table->decimal('latitude', 16, 14)->nullable();
            $table->decimal('longitude', 16, 13)->nullable();

            $table->decimal('realisasi_fisik', 5, 2)->nullable();
            $table->decimal('realisasi_keuangan', 12, 2)->nullable();

            $table->string('status')->nullable();

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('proyek_konstruksi_id', 'pengawasan_progress_proyek_konstruksi_id_foreign')->references('id')->on('proyek_konstruksi');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengawasan_progress_proyek_konstruksi');
    }
};
