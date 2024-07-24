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
        Schema::create('usaha_rantai_pasok', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('usaha_id');
            $table->unsignedTinyInteger('rantai_pasok_id');

            $table->foreign('usaha_id')->references('id')->on('usaha');
            $table->foreign('rantai_pasok_id')->references('id')->on('master_jenis_usaha_rantai_pasok');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usaha_rantai_pasok');
    }
};
