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
        Schema::create('pengawasan_penyelenggaraan_konstruksi', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('jenis_pengawasan');
            $table->date('tanggal_pengawasan');
            $table->foreignUuid('proyek_konstruksi_id');

            // Lingkup Pengawasan 1
            $table->boolean('tertib_proses_pemilihan_penyedia_jasa')->nullable();

            // Lingkup Pengawasan 2
            $table->boolean('tertib_penerapan_standar_kontrak')->nullable();
            $table->boolean('tertib_penggunaan_tkk')->nullable();
            $table->boolean('tertib_pemberian_pekerjaan')->nullable();

            // Lingkup Pengawasan 3
            $table->boolean('tertib_ketersediaan_dokumen_standar_k4')->nullable();
            $table->boolean('tertib_penerapan_smkk')->nullable();
            $table->boolean('tertib_antisipasi_kecelakaan')->nullable();

            // Lingkup Pengawasan 4
            $table->boolean('tertib_penerapan_manajemen_mutu')->nullable();

            // Lingkup Pengawasan 5
            $table->boolean('tertib_pemenuhan_penyediaan_mptk')->nullable();
            $table->boolean('tertib_penggunaan_mptk')->nullable();
            $table->boolean('tertib_penggunaan_pdn')->nullable();

            // Lingkup Pengawasan 6
            $table->boolean('tertib_pemenuhan_standar_lingkungan')->nullable();

            $table->boolean('tertib_pengawasan')->nullable();
            $table->text('catatan')->nullable();

            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable();
            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('proyek_konstruksi_id', 'pengawasan_penyelenggaraan_proyek_konstruksi_id_foreign')->references('id')->on('proyek_konstruksi');
            $table->foreign('verified_by')->references('id')->on('users');
            $table->foreign('created_by')->references('id')->on('users');
        });

        // Schema::table('pengawasan_penyelenggaraan_konstruksi', function (Blueprint $table) {
        //     $table->foreign('proyek_konstruksi_id', 'pengawasan_penyelenggaraan_proyek_konstruksi_id_foreign')->references('id')->on('proyek_konstruksi');
        //     $table->foreign('verified_by')->references('id')->on('users');
        //     $table->foreign('created_by')->references('id')->on('users');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengawasan_penyelenggaraan_konstruksi');
    }
};
