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
        Schema::create('pengawasan_pemanfaatan_produk', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('jenis_pengawasan');
            $table->date('tanggal_pengawasan');
            $table->foreignUuid('bangunan_id');

            $table->boolean('tertib_kesesuaian_fungsi')->nullable();
            $table->boolean('tertib_kesesuaian_lokasi')->nullable();
            $table->boolean('tertib_rencana_umur_konstruksi')->nullable();
            $table->boolean('tertib_kapasitas_beban')->nullable();
            $table->boolean('tertib_pemeliharaan_bangunan')->nullable();
            $table->boolean('tertib_program_pemeliharaan')->nullable();

            $table->boolean('is_tertib')->nullable();
            $table->text('catatan')->nullable();

            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable();
            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('bangunan_id')->references('id')->on('bangunan');
            $table->foreign('verified_by')->references('id')->on('users');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengawasan_pemanfaatan_produk');
    }
};
