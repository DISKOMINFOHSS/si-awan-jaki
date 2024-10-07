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
        Schema::create('pengawasan_tahunan_tertib_usaha_perseorangan', function (Blueprint $table) {
            $table->id();
            $table->year('tahun');
            $table->foreignUuid('usaha_id');

            $table->boolean('tertib_pengawasan')->nullable();
            $table->text('catatan')->nullable();

            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('usaha_id')->references('id')->on('usaha');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengawasan_tahunan_tertib_usaha_perseorangan');
    }
};
