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
        Schema::table('proyek_konstruksi', function (Blueprint $table) {
            $table->foreignId('emonev_id')->nullable()->after('selesai_pelaksanaan');
        });

        Schema::table('pengawasan_progress_proyek_konstruksi', function (Blueprint $table) {
            $table->dropColumn([
                'emonev_id',
                'kode_urusan',
                'urusan',
                'kode_bidang',
                'kode_program',
                'kode_kegiatan',
                'kode_subkegiatan',
                'bidang',
                'program',
                'kegiatan',
                'subkegiatan',
                'latitude',
                'longitude',
                'realisasi_fisik',
                'realisasi_keuangan',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('proyek_konstruksi', function (Blueprint $table) {
            $table->dropColumn('emonev_id');
        });

        Schema::table('pengawasan_progress_proyek_konstruksi', function (Blueprint $table) {
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
        });
    }
};
