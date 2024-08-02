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
        Schema::create('pengawasan_bujk_lingkup_4', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('jenis_pengawasan');
            $table->date('tanggal_pengawasan');
            $table->foreignUuid('usaha_id');

            $table->boolean('tertib_persyaratan_sbu')->nullable();
            $table->boolean('tertib_persyaratan_nib')->nullable();

            $table->boolean('tertib_pengawasan')->nullable();
            $table->text('catatan')->nullable();

            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable();
            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('usaha_id')->references('id')->on('usaha');
            $table->foreign('verified_by')->references('id')->on('users');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengawasan_bujk_lingkup_4');
    }
};
