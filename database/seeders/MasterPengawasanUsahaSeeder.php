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

        // Lingkup 5 - Pengembangan Usaha Berkelanjutan
        DB::table('master_pemeriksaan_pengembangan_usaha')->insert([
            [
                'id'               => '1',
                'nama_pemeriksaan' => 'Peningkatan Kapasitas Sumber Daya Manusia Badan Usaha',
                'indikator'        => 'Badan usaha melakukan kegiatan peningkatan kapasitas SDM melalui kegiatan pendidikan pelatihan/bimtek/seminar/loka karya (tahun terakhir)',
                'subindikator'     => null,
                'cara_pemeriksaan' => 'Memeriksa apakah dalam laporan telah memuat kegiatan peningkatan kapasitas SDM melalui kegiatan pendidikan pelatihan/bimtek/seminar/loka karya (tahun terakhir)',
                'dokumen'          => 'Laporan tahunan kegiatan BUJK yang berisi pelaksanaan pengembangan usaha berkelanjutan dan/atau laporan pengembangan usaha berkelanjutan yang dilakukan Asosiasi',
            ],
            [
                'id'               => '2',
                'nama_pemeriksaan' => 'Peningkatan Peralatan',
                'indikator'        => 'Penambahan/pembaruan peralatan',
                'subindikator'     => null,
                'cara_pemeriksaan' => 'Memeriksa apakah dalam laporan telah memuat kegiatan peningkatan peralatan melalui penambahan/pembaruan peralatan',
                'dokumen'          => 'Laporan tahunan kegiatan BUJK yang berisi pelaksanaan pengembangan usaha berkelanjutan',
            ],
            [
                'id'               => '3a',
                'nama_pemeriksaan' => 'Peningkatan Teknologi',
                'indikator'        => 'Penambahan/Pembaruan/Peningkatan kecepatan/peningkatan konten software',
                'subindikator'     => null,
                'cara_pemeriksaan' => 'Memeriksa apakah dalam laporan telah memuat kegiatan Penambahan/Pembaruan/Peningkatan kecepatan/peningkatan konten software',
                'dokumen'          => 'Laporan tahunan kegiatan BUJK yang berisi pelaksanaan pengembangan usaha berkelanjutan',
            ],
            [
                'id'               => '3b',
                'nama_pemeriksaan' => 'Peningkatan Teknologi',
                'indikator'        => 'Penambahan/pembaruan/peningkatan kapasitas hardware',
                'subindikator'     => null,
                'cara_pemeriksaan' => 'Memeriksa apakah dalam laporan telah memuat kegiatan Penambahan/pembaruan/peningkatan kapasitas hardware',
                'dokumen'          => 'Laporan tahunan kegiatan BUJK yang berisi pelaksanaan pengembangan usaha berkelanjutan',
            ],
            [
                'id'               => '4a',
                'nama_pemeriksaan' => 'Peningkatan Kualitas Pengelolaan Keuangan',
                'indikator'        => 'Opini akuntan publik untuk kualifikasi usaha besar dan menengah',
                'subindikator'     => null,
                'cara_pemeriksaan' => 'Memeriksa apakah ada peningkatan opini akuntan publik dari laporan opini akuntan publik tahun sebelumnya',
                'dokumen'          => 'Laporan keuangan BUJK',
            ],
            [
                'id'               => '4b',
                'nama_pemeriksaan' => 'Peningkatan Kualitas Pengelolaan Keuangan',
                'indikator'        => 'Penggunaan Standar Akuntansi untuk kualifikasi usaha kecil',
                'subindikator'     => null,
                'cara_pemeriksaan' => 'Memeriksa apakah laporan keuanga telah memenuhi standar akuntansi (minimal memuat pencatatan penerimaan dan pengeluaran, hutang dan piutang)',
                'dokumen'          => 'Laporan keuangan BUJK',
            ],
            [
                'id'               => '5a1',
                'nama_pemeriksaan' => 'Peningkatan Manajemen Usaha',
                'indikator'        => 'Pengembangan Organisasi',
                'subindikator'     => 'Penerapan Good Corporate Governance (GCG)',
                'cara_pemeriksaan' => 'Mengecek apakah BUJK telah menerapkan GCG (minimal memiliki dan melaksanakan SOP, memiliki struktur organisasi)',
                'dokumen'          => 'Laporan tahunan kegiatan BUJK yang berisi pelaksanaan pengembangan usaha berkelanjutan',
            ],
            [
                'id'               => '5a2',
                'nama_pemeriksaan' => 'Peningkatan Manajemen Usaha',
                'indikator'        => 'Pengembangan Organisasi',
                'subindikator'     => 'Penghargaan',
                'cara_pemeriksaan' => 'Mengecek apakah BUJK telah memperoleh penghargaan (antara lain memenuhi ISO, PU Award, dll)',
                'dokumen'          => 'Laporan tahunan kegiatan BUJK yang berisi pelaksanaan pengembangan usaha berkelanjutan',
            ],
            [
                'id'               => '5b1',
                'nama_pemeriksaan' => 'Peningkatan Manajemen Usaha',
                'indikator'        => 'Manajemen Operasi',
                'subindikator'     => 'Penerapan sistem manajemen rantai pasok',
                'cara_pemeriksaan' => 'Mengecek apakah BUJK telah menerapkan sistem manajemen rantai pasok (minimal memiliki daftar pemasok bahan dan peralatan, catatan kebutuhan dan penggunaan material dan peralatan)',
                'dokumen'          => 'Laporan tahunan kegiatan BUJK yang berisi pelaksanaan pengembangan usaha berkelanjutan',
            ],
            [
                'id'               => '5b2',
                'nama_pemeriksaan' => 'Peningkatan Manajemen Usaha',
                'indikator'        => 'Manajemen Operasi',
                'subindikator'     => 'Penerapan standar mutu bahan',
                'cara_pemeriksaan' => 'Mengecek apakah BUJK telah menerapkan standar mutu bahan (antara lain memiliki SOP untuk pemilihan dan penggunaan bahan, memiliki laboratorium pengujian bahan)',
                'dokumen'          => 'Laporan tahunan kegiatan BUJK yang berisi pelaksanaan pengembangan usaha berkelanjutan',
            ],
            [
                'id'               => '5b3',
                'nama_pemeriksaan' => 'Peningkatan Manajemen Usaha',
                'indikator'        => 'Manajemen Operasi',
                'subindikator'     => 'Penerapan standar mutu peralatan',
                'cara_pemeriksaan' => 'Mengecek apakah BUJK telah menerapkan standar mutu peralatan (minimal mencatatkan peralatannya ke dalam SIMPK)',
                'dokumen'          => 'Laporan tahunan kegiatan BUJK yang berisi pelaksanaan pengembangan usaha berkelanjutan',
            ],
            [
                'id'               => '5b4',
                'nama_pemeriksaan' => 'Peningkatan Manajemen Usaha',
                'indikator'        => 'Manajemen Operasi',
                'subindikator'     => 'Penerapan SMKK',
                'cara_pemeriksaan' => 'Mengecek apakah BUJK telah menerapan standar keselamatan dan kesehatan kerja (minimal memiliki SOP SMKK, penyediaan dan penggunaan APD dan APK, terdapat tenaga ahli/petugas K3 konstruksi/keselamatan konstruksi)',
                'dokumen'          => 'Laporan tahunan kegiatan BUJK yang berisi pelaksanaan pengembangan usaha berkelanjutan',
            ],
        ]);
    }
}
