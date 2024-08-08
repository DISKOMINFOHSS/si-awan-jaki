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
        Schema::create('proyek_konstruksi', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('kode_paket')->nullable();
            $table->text('nama_paket');
            $table->string('nomor_kontrak')->nullable();
            $table->string('sumber_dana');
            $table->year('tahun_anggaran')->nullable();
            $table->decimal('nilai_pagu', 12, 2)->nullable();
            $table->decimal('nilai_kontrak', 12, 2)->nullable();

            $table->date('tanggal_kontrak')->nullable();
            $table->date('mulai_pelaksanaan')->nullable();
            $table->date('selesai_pelaksanaan')->nullable();

            $table->foreignUuid('penyedia_jasa_id')->nullable();
            $table->foreignId('pengguna_jasa_id')->nullable();

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('penyedia_jasa_id')->references('id')->on('usaha');
            $table->foreign('pengguna_jasa_id')->references('id')->on('pengguna_jasa_konstruksi');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proyek_konstruksi');
    }
};
