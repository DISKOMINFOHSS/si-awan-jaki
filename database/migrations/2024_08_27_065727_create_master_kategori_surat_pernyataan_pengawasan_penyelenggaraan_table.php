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
        Schema::create('master_kategori_surat_pernyataan_pengawasan_penyelenggaraan', function (Blueprint $table) {
            $table->unsignedTinyInteger('id')->autoIncrement();
            $table->unsignedTinyInteger('lingkup_id');
            $table->string('kategori');

            $table->foreign('lingkup_id', 'master_surat_pengawasan_penyelenggaraan_lingkup_id_foreign')->references('id')->on('master_lingkup_pengawasan_penyelenggaraan');
        });

        Schema::create('surat_pernyataan_penyelenggaraan_konstruksi', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('kategori_surat_pernyataan_id');
            $table->foreignUuid('proyek_konstruksi_id');
            $table->foreignId('surat_pernyataan_id');

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('kategori_surat_pernyataan_id', 'kategori_surat_pernyataan_penyelenggaraan_id_foreign')->references('id')->on('master_kategori_surat_pernyataan_pengawasan_penyelenggaraan');
            $table->foreign('proyek_konstruksi_id', 'surat_pernyataan_proyek_konstruksi_id_foreign')->references('id')->on('proyek_konstruksi');
            $table->foreign('surat_pernyataan_id', 'surat_pernyataan_penyelenggaraan_id_foreign')->references('id')->on('files');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_pernyataan_penyelenggaraan_konstruksi');
        Schema::dropIfExists('master_kategori_surat_pernyataan_pengawasan_penyelenggaraan');
    }
};
