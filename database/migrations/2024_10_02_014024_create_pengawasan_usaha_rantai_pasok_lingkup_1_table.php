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
        Schema::create('pengawasan_usaha_rantai_pasok_lingkup_1', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('jenis_pengawasan');
            $table->date('tanggal_pengawasan');
            $table->foreignUuid('usaha_id');

            $table->boolean('kepemilikan_perizinan_berusaha')->nullable();
            $table->boolean('keabsahan_perizinan_berusaha')->nullable();
            $table->boolean('kapasitas_terpasang')->nullable();
            $table->boolean('kepemilikan_perizinan_penggunaan')->nullable();
            $table->boolean('keabsahan_perizinan_penggunaan')->nullable();

            $table->boolean('tertib_perizinan_berusaha')->nullable();
            $table->boolean('tertib_perizinan_penggunaan')->nullable();
            $table->boolean('tertib_pencatatan_simpk')->nullable();

            $table->boolean('tertib_pengawasan')->nullable();
            $table->text('catatan')->nullable();

            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable();
            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('usaha_id', 'pengawasan_usaha_rantai_pasok_usaha_id_foreign')->references('id')->on('usaha');
            $table->foreign('verified_by', 'pengawasan_usaha_rantai_pasok_verified_by_foreign')->references('id')->on('users');
            $table->foreign('created_by', 'pengawasan_usaha_rantai_pasok_created_by_foreign')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengawasan_usaha_rantai_pasok_lingkup_1');
    }
};
