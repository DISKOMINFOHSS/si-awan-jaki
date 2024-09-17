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
        Schema::table('proyek_konstruksi', function (Blueprint $table) {
            $table->foreignUuid('konsultan_pengawas_id')->nullable()->after('penyedia_jasa_id');
            $table->text('nama_paket_pengawasan')->nullable()->after('konsultan_pengawas_id');

            $table->foreign('konsultan_pengawas_id')->references('id')->on('usaha');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('proyek_konstruksi', function (Blueprint $table) {
            //
        });
    }
};
