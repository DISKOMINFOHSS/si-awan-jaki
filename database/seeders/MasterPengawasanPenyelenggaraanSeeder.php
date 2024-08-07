<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterPengawasanPenyelenggaraanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lingkup Pengawasan
        DB::table('master_lingkup_pengawasan_penyelenggaraan')->insert([
            [
                'id'                 => 1,
                'lingkup_pengawasan' => 'Pengawasan terhadap proses pemilihan Penyedia Jasa',
            ],
            [
                'id'                 => 2,
                'lingkup_pengawasan' => 'Pengawasan terhadap penyusunan dan pelaksanaan Kontrak Kerja Konstruksi',
            ],
            [
                'id'                 => 3,
                'lingkup_pengawasan' => 'Pengawasan terhadap penerapan Standar Keamanan, Keselamatan, Kesehatan, dan Keberlanjutan Konstruksi',
            ],
            [
                'id'                 => 4,
                'lingkup_pengawasan' => 'Pengawasan terhadap penerapan manajemen mutu Konstruksi',
            ],
            [
                'id'                 => 5,
                'lingkup_pengawasan' => 'Pengawasan terhadap penggunaan material, peralatan dan teknologi konstruksi',
            ],
            [
                'id'                => 6,
                'lingkup_pengawasan' => 'Pengawasan terhadap pengelolaan dan pemanfaatan sumber material Konstruksi',
            ],
        ]);

        // Indikator Sumber Dana APBD
        DB::table('master_indikator_pengawasan_penyelenggaraan_dana_apbd')->insert([
            [
                'id'         => '1',
                'lingkup_id' => 1,
                'indikator'  => 'Terlaksananya pemilihan Penyedia Jasa Konstruksi dilakukan sesuai dengan ketentuan peraturan perundang-undangan.',
            ],
            [
                'id'         => '2a',
                'lingkup_id' => 2,
                'indikator'  => 'Penggunaan standar kontrak',
            ],
            [
                'id'         => '2b',
                'lingkup_id' => 2,
                'indikator'  => 'Penggunaan Tenaga Kerja Konstruksi bersertifikat',
            ],
            [
                'id'         => '2c',
                'lingkup_id' => 2,
                'indikator'  => 'Pemberian pekerjaan utama dan/atau penunjang kepada subpenyedia jasa',
            ],
            [
                'id'         => '2d',
                'lingkup_id' => 2,
                'indikator'  => 'Kepemilikan Hak Atas Kekayaan Intelektual',
            ],
            [
                'id'         => '2e',
                'lingkup_id' => 2,
                'indikator'  => 'Kewajiban alih teknologi untuk kontrak dengan pihak asing',
            ],
            [
                'id'         => '2f',
                'lingkup_id' => 2,
                'indikator'  => 'Penggunaan produk dalam negeri',
            ],
            [
                'id'         => '2g',
                'lingkup_id' => 2,
                'indikator'  => 'Kewajiban pembayaran Asuransi Tenaga Kerja Konstruksi',
            ],
            [
                'id'         => '3a',
                'lingkup_id' => 3,
                'indikator'  => 'Ketersediaan dokumen penerapan standar K4',
            ],
            [
                'id'         => '3b',
                'lingkup_id' => 3,
                'indikator'  => 'Ketersediaan dokumen penerapan SMKK',
            ],
            [
                'id'         => '3c',
                'lingkup_id' => 3,
                'indikator'  => 'Ketersediaan dokumen bukti antisipasi kecelakaan konstruksi',
            ],
            [
                'id'         => '4',
                'lingkup_id' => 4,
                'indikator'  => 'Sistem manajemen mutu konstruksi dilakukan sesuai ketentuan peraturan perundang-undangan',
            ],
            [
                'id'         => '5a',
                'lingkup_id' => 5,
                'indikator'  => 'Pemenuhan penyediaan material, peralatan, dan teknologi konstruksi dalam pelaksanaan proyek konstruksi',
            ],
            [
                'id'         => '5b',
                'lingkup_id' => 5,
                'indikator'  => 'Penggunaan material, peralatan, dan teknologi konstruksi sesuai dengan standar (SNI) atau standar lain yang berlaku) dan teknologi konstruksi tepat guna yang mengutamakan penerapan teknologi dengan platform digital',
            ],
            [
                'id'         => '5c',
                'lingkup_id' => 5,
                'indikator'  => 'Penggunaan produk dalam negeri untuk material, peralatan, dan teknologi konstruksi sesuai dengan ketentuan perundang- undangan tentang pemberdayaan industri nasional',
            ],
            [
                'id'         => '6',
                'lingkup_id' => 6,
                'indikator'  => 'Pemenuhan terhadap standar teknis lingkungan',
            ],
        ]);

        // Pemeriksaan Pengawasan Rutin Sumber Dana APBD
        DB::table('master_pemeriksaan_pengawasan_rutin_penyelenggaraan_dana_apbd')->insert([
            [
                'lingkup_id'       => 1,
                'dokumen'          => 'Surat pernyataan Kuasa Pengguna Anggaran atau Pejabat Pembuat Komitmen bahwa proses pemilihan Penyedia Jasa konstruksi sesuai dengan ketentuan peraturan perundang-undangan.',
                'cara_pemeriksaan' => json_encode([
                    'Tersedia' => 'Memeriksan ketersediaan surat pernyataan',
                    'Sesuai'   => 'Memeriksan isi surat penyataan',
                ]),
                'kesimpulan'       => json_encode(array('Tersedia', 'Sesuai')),
            ],
            [
                'lingkup_id'       => 2,
                'dokumen'          => 'Surat pernyataan Kuasa Pengguna Anggaran atau Pejabat Pembuat Komitmen bahwa penyusunan dan pelaksanaan Kontrak Kerja Konstruksi telah sesuai dengan ketentuan peraturan perundang-undangan.',
                'cara_pemeriksaan' => json_encode([
                    'Tersedia' => 'Memeriksan ketersediaan surat pernyataan',
                    'Sesuai'   => 'Memeriksan isi surat penyataan',
                ]),
                'kesimpulan'       => json_encode(array('Tersedia', 'Sesuai')),
            ],
            [
                'lingkup_id'       => 3,
                'dokumen'          => 'Surat pernyataan dari Kuasa Pengguna Anggaran atau Pejabat Pembuat Komitmen bahwa sudah memenuhi ketentuan dalam Standar K4.',
                'cara_pemeriksaan' => json_encode([
                    'Tersedia' => 'Memeriksan ketersediaan surat pernyataan',
                    'Sesuai'   => 'Memeriksan isi surat penyataan',
                ]),
                'kesimpulan'       => json_encode(array('Tersedia', 'Sesuai')),
            ],
            [
                'lingkup_id'       => 4,
                'dokumen'          => 'Surat pernyataan dari Kuasa Pengguna Anggaran atau Pejabat Pembuat Komitmen bahwa sudah memenuhi ketentuan dalam penerapan sistem manajemen mutu.',
                'cara_pemeriksaan' => json_encode([
                    'Tersedia' => 'Memeriksan ketersediaan surat pernyataan',
                    'Sesuai'   => 'Memeriksan isi surat penyataan',
                ]),
                'kesimpulan'       => json_encode(array('Tersedia', 'Sesuai')),
            ],
            [
                'lingkup_id'       => 5,
                'dokumen'          => 'Surat pernyataan Kuasa Pengguna Anggaran atau Pejabat Pembuat Komitmen bahwa sudah memenuhi ketentuan dalam pengelolaan dan penggunaan material, peralatan dan teknologi berdasarkan surat pernyataan dari pimpinan Badan Usaha Jasa Konstruksi.',
                'cara_pemeriksaan' => json_encode([
                    'Tersedia' => 'Memeriksan ketersediaan surat pernyataan',
                    'Sesuai'   => 'Memeriksan isi surat penyataan',
                ]),
                'kesimpulan'       => json_encode(array('Tersedia', 'Sesuai')),
            ],
            [
                'lingkup_id'       => 6,
                'dokumen'          => 'Surat pernyataan Kuasa Pengguna Anggaran atau Pejabat Pembuat Komitmen bahwa badan usaha sudah memenuhi ketentuan dalam pengelolaan dan pemanfaatan sumber material konstruksi berdasarkan surat pernyataan dari pimpinan Badan Usaha Jasa Konstruksi.',
                'cara_pemeriksaan' => json_encode([
                    'Tersedia' => 'Memeriksan ketersediaan surat pernyataan',
                    'Sesuai'   => 'Memeriksan isi surat penyataan',
                ]),
                'kesimpulan'       => json_encode(array('Tersedia', 'Sesuai')),
            ],
        ]);
    }
}
