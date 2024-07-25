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
        Schema::create('sertifikat_standar_bujk', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sertifikat_id');
            $table->boolean('status');
            $table->foreignUuid('usaha_id');
            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('usaha_id')->references('id')->on('usaha');
            $table->foreign('sertifikat_id')->references('id')->on('files');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sertifikat_standar_bujk');
    }
};
