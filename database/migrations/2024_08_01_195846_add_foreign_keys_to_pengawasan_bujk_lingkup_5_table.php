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
        Schema::table('pengawasan_bujk_lingkup_5', function (Blueprint $table) {
            $table->foreign('usaha_id')->references('id')->on('usaha');
            $table->foreign('verified_by')->references('id')->on('users');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengawasan_bujk_lingkup_5', function (Blueprint $table) {
            //
        });
    }
};
