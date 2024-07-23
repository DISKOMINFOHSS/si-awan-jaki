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
        Schema::create('master_jenis_usaha_rantai_pasok', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('kategori_sumber_daya');
            $table->string('pelaku_usaha');
            $table->string('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_jenis_usaha_rantai_pasok');
    }
};
