<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterPendataanUsahaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('master_jenis_usaha')->insert([
            [
                'jenis_usaha' => 'Usaha Rantai Pasok',
                'slug'        => 'rantai-pasok',
            ],
            [
                'jenis_usaha' => 'Badan Usaha Jasa Konstruksi',
                'slug'        => 'bujk',
            ],
            [
                'jenis_usaha' => 'Usaha Orang Perseorangan',
                'slug'        => 'usaha-perseorangan',
            ],
        ]);

        DB::table('master_jenis_usaha_rantai_pasok')->insert([
            [
                'kategori_sumber_daya'  => 'Material',
                'pelaku_usaha'          => 'Produsen',
                'slug'                  => 'produsen-material',
            ],
            [
                'kategori_sumber_daya'  => 'Material',
                'pelaku_usaha'          => 'Distributor',
                'slug'                  => 'distributor-material',
            ],
            [
                'kategori_sumber_daya'  => 'Peralatan',
                'pelaku_usaha'          => 'Pemilik',
                'slug'                  => 'pemilik-peralatan',
            ],
            [
                'kategori_sumber_daya'  => 'Peralatan',
                'pelaku_usaha'          => 'Penyewaan',
                'slug'                  => 'penyewaan-peralatan',
            ],
            [
                'kategori_sumber_daya'  => 'Peralatan',
                'pelaku_usaha'          => 'Distributor/Agen Tunggal',
                'slug'                  => 'distributor-peralatan',
            ],
            [
                'kategori_sumber_daya'  => 'Teknologi',
                'pelaku_usaha'          => 'Badan Usaha',
                'slug'                  => 'badan-usaha-teknologi',
            ],
        ]);
    }
}
