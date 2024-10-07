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
        Schema::table('pengawasan_bujk_rutin', function (Blueprint $table) {
            $table->foreign('pengawasan_lingkup_2')->references('id')->on('pengawasan_bujk_lingkup_2');
            $table->foreign('pengawasan_lingkup_3')->references('id')->on('pengawasan_bujk_lingkup_3');
            $table->foreign('pengawasan_lingkup_4')->references('id')->on('pengawasan_bujk_lingkup_4');
            $table->foreign('pengawasan_lingkup_5')->references('id')->on('pengawasan_bujk_lingkup_5');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengawasan_bujk_rutin', function (Blueprint $table) {
            //
        });
    }
};
