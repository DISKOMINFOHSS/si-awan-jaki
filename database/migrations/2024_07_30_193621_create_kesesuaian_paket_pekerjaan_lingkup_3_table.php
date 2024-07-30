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
        Schema::create('kesesuaian_paket_pekerjaan_lingkup_3', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('pengawasan_id');
            $table->foreignId('paket_id');
            $table->boolean('kesesuaian_bentuk');
            $table->boolean('kesesuaian_kualifikasi');

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('pengawasan_id')->references('id')->on('pengawasan_bujk_lingkup_3');
            $table->foreign('paket_id')->references('id')->on('paket_pekerjaan');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kesesuaian_paket_pekerjaan_lingkup_3');
    }
};
