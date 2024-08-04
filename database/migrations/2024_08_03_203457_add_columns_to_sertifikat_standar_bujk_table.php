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
        Schema::table('sertifikat_standar_bujk', function (Blueprint $table) {
            $table->string('nomor_sertifikat')->after('id');
            $table->string('jenis_usaha')->after('sertifikat_id')->nullable();

            $table->foreignId('sertifikat_id')->nullable()->change();
        });

        Schema::create('rincian_sertifikat_standar_bujk', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sertifikat_standar_id');
            $table->text('subklasifikasi');

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('sertifikat_standar_id')->references('id')->on('sertifikat_standar_bujk');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rincian_sertifikat_standar_bujk');
    }
};
