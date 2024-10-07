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
        Schema::create('pengawasan_bujk_rutin', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('usaha_id');
            $table->date('start');
            $table->date('end');

            $table->foreignUuid('pengawasan_lingkup_2')->nullable();
            $table->foreignUuid('pengawasan_lingkup_3')->nullable();
            $table->foreignUuid('pengawasan_lingkup_4')->nullable();
            $table->foreignUuid('pengawasan_lingkup_5')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('usaha_id')->references('id')->on('usaha');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengawasan_bujk_rutin');
    }
};
