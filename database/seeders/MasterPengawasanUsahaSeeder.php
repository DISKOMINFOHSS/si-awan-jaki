<?php

namespace Database\Seeders;

use App\Models\Usaha\JenisUsaha;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterPengawasanUsahaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lingkup Pengawasan
        DB::table('master_lingkup_pengawasan_usaha')->insert([
            [
                'id'                 => 1,
                'lingkup_pengawasan' => 'Pemenuhan Persyaratan Usaha Rantai Pasok Sumber Daya Konstruksi',
                'label'              => 'Usaha Rantai Pasok',
            ],
            [
                'id'                 => 2,
                'lingkup_pengawasan' => 'Kesesuaian Jenis, Sifat, Klasifikasi, dan Layanan Usaha dengan Kegiatan Usaha Jasa Konstruksi',
                'label'              => 'Kesesuaian Kegiatan Konstruksi',
            ],
            [
                'id'                 => 3,
                'lingkup_pengawasan' => 'Kesesuaian Bentuk dan Kualifikasi dengan Kegiatan Usaha Jasa Konstruksi dan Segmentasi Pasar',
                'label'              => 'Kesesuaian Kegiatan Usaha Jasa Konstruksi dan Segmentasi Pasar',
            ],
            [
                'id'                 => 4,
                'lingkup_pengawasan' => 'Pemenuhan Persyaratan Usaha Jasa Konstruksi',
                'label'              => 'Pemenuhan Persyaratan Usaha'
            ],
            [
                'id'                 => 5,
                'lingkup_pengawasan' => 'Pelaksanaan Pengembangan Usaha Berkelanjutan',
                'label'              => 'Pengembangan Usaha Berkelanjutan',
            ],
        ]);

        // Objek Pengawasan
        DB::table('master_objek_pengawasan_usaha')->insert([
            'objek_id'   => JenisUsaha::where('jenis_usaha', 'Usaha Rantai Pasok')->first()->id,
            'lingkup_id' => 1,
        ]);

        $bujkId = JenisUsaha::where('jenis_usaha', 'Badan Usaha Jasa Konstruksi')->first()->id;
        for ($i = 2; $i <= 5; $i++)
        {
            DB::table('master_objek_pengawasan_usaha')->insert([
                'objek_id'   => $bujkId,
                'lingkup_id' => $i,
            ]);
        }

        DB::table('master_objek_pengawasan_usaha')->insert([
            'objek_id'   => JenisUsaha::where('jenis_usaha', 'Usaha Orang Perseorangan')->first()->id,
            'lingkup_id' => 4,
        ]);
    }
}
