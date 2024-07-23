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
        Schema::create('usaha', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nama');
            $table->string('nib')->nullable()->unique();
            $table->foreignId('dokumen_nib')->nullable();
            $table->string('pjbu')->nullable();
            $table->string('alamat')->nullable();
            $table->boolean('status');
            $table->unsignedTinyInteger('jenis_usaha_id');
            $table->foreignId('created_by');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('dokumen_nib')->references('id')->on('files');
            $table->foreign('jenis_usaha_id')->references('id')->on('master_jenis_usaha');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usaha');
    }
};
