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
        Schema::create('bukti_dukung_pengawasan_bangunan', function (Blueprint $table) {
            $table->id();
            $table->year('tahun');
            $table->string('label');
            $table->string('url');
            $table->foreignUuid('bangunan_id');

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('bangunan_id')->references('id')->on('bangunan');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bukti_dukung_pengawasan_bangunan');
    }
};
