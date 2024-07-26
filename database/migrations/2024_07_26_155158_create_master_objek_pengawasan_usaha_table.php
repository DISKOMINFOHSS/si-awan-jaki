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
        Schema::create('master_objek_pengawasan_usaha', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->unsignedTinyInteger('objek_id');
            $table->unsignedTinyInteger('lingkup_id');

            $table->foreign('objek_id')->references('id')->on('master_jenis_usaha');
            $table->foreign('lingkup_id')->references('id')->on('master_lingkup_pengawasan_usaha');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_objek_pengawasan_usaha');
    }
};
