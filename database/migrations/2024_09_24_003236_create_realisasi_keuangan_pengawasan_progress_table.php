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
        Schema::create('realisasi_keuangan_pengawasan_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('pengawasan_id');

            $table->date('tanggal');
            $table->decimal('jumlah_pembayaran', 12, 2);

            $table->date('tanggal_dibayar')->nullable();
            $table->decimal('realisasi', 12, 2)->nullable();
            $table->string('url')->nullable();

            $table->text('catatan')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable();

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('pengawasan_id', 'realisasi_keuangan_pengawasan_progress_id_foreign')->references('id')->on('pengawasan_progress_proyek_konstruksi');
            $table->foreign('verified_by')->references('id')->on('users');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('realisasi_keuangan_pengawasan_progress');
    }
};
