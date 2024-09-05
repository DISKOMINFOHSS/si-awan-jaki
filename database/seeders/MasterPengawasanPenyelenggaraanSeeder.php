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
                    'Tersedia' => 'Memeriksa ketersediaan surat pernyataan',
                    'Sesuai'   => 'Memeriksa isi surat penyataan',
                ]),
                'kesimpulan'       => json_encode(array('Tersedia', 'Sesuai')),
            ],
            [
                'lingkup_id'       => 2,
                'dokumen'          => 'Surat pernyataan Kuasa Pengguna Anggaran atau Pejabat Pembuat Komitmen bahwa penyusunan dan pelaksanaan Kontrak Kerja Konstruksi telah sesuai dengan ketentuan peraturan perundang-undangan.',
                'cara_pemeriksaan' => json_encode([
                    'Tersedia' => 'Memeriksa ketersediaan surat pernyataan',
                    'Sesuai'   => 'Memeriksa isi surat penyataan',
                ]),
                'kesimpulan'       => json_encode(array('Tersedia', 'Sesuai')),
            ],
            [
                'lingkup_id'       => 3,
                'dokumen'          => 'Surat pernyataan dari Kuasa Pengguna Anggaran atau Pejabat Pembuat Komitmen bahwa sudah memenuhi ketentuan dalam Standar K4.',
                'cara_pemeriksaan' => json_encode([
                    'Tersedia' => 'Memeriksa ketersediaan surat pernyataan',
                    'Sesuai'   => 'Memeriksa isi surat penyataan',
                ]),
                'kesimpulan'       => json_encode(array('Tersedia', 'Sesuai')),
            ],
            [
                'lingkup_id'       => 4,
                'dokumen'          => 'Surat pernyataan dari Kuasa Pengguna Anggaran atau Pejabat Pembuat Komitmen bahwa sudah memenuhi ketentuan dalam penerapan sistem manajemen mutu.',
                'cara_pemeriksaan' => json_encode([
                    'Tersedia' => 'Memeriksa ketersediaan surat pernyataan',
                    'Sesuai'   => 'Memeriksa isi surat penyataan',
                ]),
                'kesimpulan'       => json_encode(array('Tersedia', 'Sesuai')),
            ],
            [
                'lingkup_id'       => 5,
                'dokumen'          => 'Surat pernyataan Kuasa Pengguna Anggaran atau Pejabat Pembuat Komitmen bahwa sudah memenuhi ketentuan dalam pengelolaan dan penggunaan material, peralatan dan teknologi berdasarkan surat pernyataan dari pimpinan Badan Usaha Jasa Konstruksi.',
                'cara_pemeriksaan' => json_encode([
                    'Tersedia' => 'Memeriksa ketersediaan surat pernyataan',
                    'Sesuai'   => 'Memeriksa isi surat penyataan',
                ]),
                'kesimpulan'       => json_encode(array('Tersedia', 'Sesuai')),
            ],
            [
                'lingkup_id'       => 6,
                'dokumen'          => 'Surat pernyataan Kuasa Pengguna Anggaran atau Pejabat Pembuat Komitmen bahwa badan usaha sudah memenuhi ketentuan dalam pengelolaan dan pemanfaatan sumber material konstruksi berdasarkan surat pernyataan dari pimpinan Badan Usaha Jasa Konstruksi.',
                'cara_pemeriksaan' => json_encode([
                    'Tersedia' => 'Memeriksa ketersediaan surat pernyataan',
                    'Sesuai'   => 'Memeriksa isi surat penyataan',
                ]),
                'kesimpulan'       => json_encode(array('Tersedia', 'Sesuai')),
            ],
        ]);

        // Surat Pernyataan
        DB::table('master_kategori_surat_pernyataan_pengawasan_penyelenggaraan')->insert([
            [
                'lingkup_id' => 1,
                'kategori'   => 'Surat Pernyataan Kesesuaian Proses Pemilihan Penyedia Jasa Konstruksi',
            ],
            [
                'lingkup_id' => 2,
                'kategori'   => 'Surat Pernyataan tentang penyusunan dan pelaksanaan Kontrak Kerja Konstruksi',
            ],
            [
                'lingkup_id' => 3,
                'kategori'   => 'Surat Pernyataan tentang penerapan Standar Keamanan, Keselamatan, Kesehatan, dan Keberlanjutan Konstruksi',
            ],
            [
                'lingkup_id' => 4,
                'kategori'   => 'Surat Pernyataan tentang Penerapan Manajemen Mutu',
            ],
            [
                'lingkup_id' => 5,
                'kategori'   => 'Surat Pernyataan tentang Pengelolaan dan Penggunaan Material, Peralatan, dan Teknologi Konstruksi',
            ],
            [
                'lingkup_id' => 5,
                'kategori'   => 'Surat Pernyataan Pimpinan BUJK tentang Pengelolaan dan Penggunaan Material, Peralatan, dan Teknologi Konstruksi',
            ],
            [
                'lingkup_id' => 6,
                'kategori'   => 'Surat Pernyataan tentang Pengelolaan dan Pemanfaatan Sumber Material Konstruksi',
            ],
            [
                'lingkup_id' => 6,
                'kategori'   => 'Surat Pernyataan Pimpinan BUJK tentang Pengelolaan dan Pemanfaatan Sumber Material Konstruksi',
            ],
        ]);

        // Pemeriksaan Pengawasan Insidental Sumber Dana APBD
        // DB::table('master_pemeriksaan_pengawasan_insidental_penyelenggaraan_dana_apbd')->insert([
        //     [
        //         'id'           => '1',
        //         'indikator_id' => '1',
        //         'dokumen'      => '
        //             <p>Dokumen Pemilihan yang sudah dikeluarkan oleh Kepala Unit Kerja Pengadaan Barang/Jasa.</p>
        //             <p>Dokumen pemilihan penyedia jasa:
        //             <ol>
        //                 <li>Dokumen kualifikasi</li>
        //                 <li>Harga Perkiraan Sendiri</li>
        //                 <li>
        //                     Dokumen tender/seleksi:
        //                     <ol type="a">
        //                         <li>Umum</li>
        //                         <li>Pengumuman</li>
        //                         <li>Instruksi Kepada Peserta (IKP)</li>
        //                         <li>Lembar Data Pemilihan (LPD)</li>
        //                         <li>Dokumen penawaran administrasi teknis dan harga</li>
        //                         <li>Rancangan Kontrak (surat perjanjian, Syarat- syarat umum kontrak/SSUK, syarat-syarat khusus kontrak/SSKK)</li>
        //                         <li>Daftar Kuantitas dan Harga/DKH</li>
        //                     </ol>
        //                 </li>
        //                 <li>Spesifikasi teknis/KAK (untuk konsultansi)</li>
        //                 <li>Gambar-gambar</li>
        //                 <li>Dokumen lainnya</li>
        //             </ol>
        //             </p>
        //             <p>Dalam hal dilakukan dengan cara terintegrasi design and build, dokumennya:
        //             <ol>
        //                 <li>Dokumen kualifikasi</li>
        //                 <li>Pagu Anggaran</li>
        //                 <li>
        //                     Dokumen tender:
        //                     <ol type="a">
        //                         <li>Instruksi Kepada Peserta (IKP)</li>
        //                         <li>Lembar Data Pemilihan (LPD)</li>
        //                         <li>Dokumen penawaran administrasi teknis dan harga</li>
        //                         <li>Rancangan Kontrak (surat perjanjian, Syarat- syarat umum kontrak/SSUK, syarat-syarat khusus kontrak/SSKK)</li>
        //                         <li>Daftar Kuantitas dan Harga/DKH</li>
        //                     </ol>
        //                 </li>
        //                 <li>Persetujuan dari pimpinan Lembaga/ kementerian/Gubernur/ Bupati atau Walikota</li>
        //                 <li>Ketentuan Kuasa Pengguna Anggaran/Pejabat Pembuat Komitmen</li>
        //                 <li>Dokumen lainnya</li>
        //             </ol>
        //             </p>
        //         ',
        //         'cara_pemeriksaan' => json_encode([
        //             'Memeriksa kelengkapan dokumen pengadaan/pemilihan dengan ketentuan peraturan perundang-undangan tentang pengadaan Barang/Jasa',
        //             'Dokumen pengadaan/pemilihan untuk memastikan metode pemilihan barang/jasa yang digunakan sesuai peraturan perundangan'
        //         ]),
        //         'kesimpulan' => json_encode([
        //             ['Ada / Tidak', 'Sesuai dengan ketentuan peraturan perundang-undangan / Tidak Sesuai dengan ketentuan peraturan perundang-undangan'],
        //             ['Sesuai / Tidak']
        //         ]),
        //     ],
        //     [
        //         'id' => '2a',
        //         'indikator_id' => '2a',
        //         'dokumen' => 'Dokumen Kontrak Kerja Konstruksi dan perubahannya yang sudah disahkan oleh Kuasa Pengguna Anggaran/Pejabat Pembuat Komitmen',
        //         'cara pemeriksaan' => json_encode([
        //             'Membandingkan Kontrak Kerja Konstruksi dengan ketentuan penggunaan kontrak standar'
        //         ]),
        //         'kesimpulan' => json_encode([
        //             ['Sesuai / Tidak Sesuai']
        //         ]),
        //     ],
        //     [
        //         'id' => '2b1',
        //         'indikator_id' => '2b',
        //         'dokumen' => 'Dokumen kontrak khususnya yang menyangkut Penggunaan Tenaga Kerja dan Dokumen Daftar Tenaga Kerja di Proyek yang selalu dimuktahirkan (periodik 3 bulanan)',
        //         'cara pemeriksaan' => json_encode([
        //             'Mengecek kepemilikan SKK, tenaga kerja konstruksi yang terdaftar dalam Kontrak Kerja Konstruksi'
        //         ]),
        //         'kesimpulan' => json_encode([
        //             ['Jumlah TKK memiliki SKK yang sesuai (Orang)', 'Jumlah TKK yang tidak memiliki SKK (Orang)', 'Jumlah TKK yang memiliki SKK tidak sesuai (Orang)']
        //         ]),
        //     ],
        //     [
        //         'id' => '2b2',
        //         'indikator_id' => '2b',
        //         'dokumen' => 'Daftar remunerasi Tenaga Kerja pada kualifikasi jenjang jabatan ahli',
        //         'cara pemeriksaan' => json_encode([
        //             'Mengecek remunerasi tenaga kerja pada kualifikasi jenjang jabatan ahli dibandingkan standar remunerasi'
        //         ]),
        //         'kesimpulan' => json_encode([
        //             ['Jumlah TKK yang gajinya sesuai (Orang)', 'Jumlah tkk yang gajinya tidak sesuai (Orang)']
        //         ]),
        //     ],
        //     [
        //         'id' => '2c',
        //         'indikator_id' => '2c',
        //         'dokumen' => 'Dokumen daftar SubPenyedia dan surat keputusan/ DO penunjukan Sub penyedia jasa',
        //         'cara pemeriksaan' => json_encode([
        //             'Mengecek apakah sub penyedia jasa yang ditunjuk sesuai peraturan (penyedia jasa spesialis)'
        //         ]),
        //         'kesimpulan' => json_encode([
        //             ['Jumlah penyedia jasa yang ditunjuk sesuai peraturan (BUJK)', 'Jumlah penyedia jasa yang ditunjuk tidak sesuai peraturan (BUJK)']
        //         ]),
        //     ],
        //     [
        //         'id' => '2d',
        //         'indikator_id' => '2d',
        //         'dokumen' => 'Dokumen Kontrak Kerja Konstruksi',
        //         'cara pemeriksaan' => json_encode([
        //             'Memeriksa apakah klausul hak kekayaan intelektual sudah dicantumkan dalam Kontrak Kerja Konstruksi'
        //         ]),
        //         'kesimpulan' => json_encode([
        //             ['Ada / Tidak']
        //         ]),
        //     ],
        //     [
        //         'id' => '2e',
        //         'indikator_id' => '2e',
        //         'dokumen' => 'Dokumen Kontrak Kerja Konstruksi',
        //         'cara pemeriksaan' => json_encode([
        //             'Memeriksa apakah klausul kewajiban alih teknologi sudah dicantumkan dalam Kontrak Kerja Konstruksi'
        //         ]),
        //         'kesimpulan' => json_encode([
        //             ['Ada / Tidak']
        //         ]),
        //     ],
        //     [
        //         'id' => '2f',
        //         'indikator_id' => '2f',
        //         'dokumen' => 'Dokumen Kontrak Kerja Konstruksi',
        //         'cara pemeriksaan' => json_encode([
        //             'Memeriksa apakah klausul kewajiban penggunaan produk dalam negeri dengan TKDN minimal sesuai dengan ketentuan peraturan perundang-undangan sudah dicantumkan dalam Kontrak Kerja Konstruksi'
        //         ]),
        //         'kesimpulan' => json_encode([
        //             ['Ada / Tidak']
        //         ]),
        //     ],
        //     [
        //         'id' => '2g',
        //         'indikator_id' => '2g',
        //         'dokumen' => 'Dokumen Kontrak Kerja Konstruksi',
        //         'cara pemeriksaan' => json_encode([
        //             'Memeriksa apakah klausul kewajiban membayar asuransi tenaga kerja konstruksi (BPJS Ketenagakerjaan dan BPJS Kesehatan) sudah dicantumkan dalam Kontrak Kerja Konstruksi'
        //         ]),
        //         'kesimpulan' => json_encode([
        //             ['Ada / Tidak']
        //         ]),
        //     ],
        //     [
        //         'id' => '3a1',
        //         'indikator_id' => '3a',
        //         'dokumen' => 'Dokumen Kontrak Kerja Konstruksi',
        //         ''
        //         'cara pemeriksaan' => json_encode([
        //             'Memeriksa apakah klausul kewajiban membayar asuransi tenaga kerja konstruksi (BPJS Ketenagakerjaan dan BPJS Kesehatan) sudah dicantumkan dalam Kontrak Kerja Konstruksi'
        //         ]),
        //         'kesimpulan' => json_encode([
        //             ['Ada / Tidak']
        //         ]),
        //     ],
        // ]);

        DB::table('master_pemeriksaan_pengawasan_insidental_penyelenggaraan_apbd')->insert([
            [
                'indikator_id'     => '1',
                'cara_pemeriksaan' => json_encode([
                    'Memeriksa kelengkapan dokumen pengadaan/pemilihan dengan ketentuan peraturan perundang-undangan tentang pengadaan Barang/Jasa',
                    'Dokumen pengadaan/pemilihan untuk memastikan metode pemilihan barang/jasa yang digunakan sesuai peraturan perundangan'
                ]),
                'kesimpulan' => json_encode([
                    ['Ada / Tidak', 'Sesuai dengan ketentuan peraturan perundang-undangan / Tidak Sesuai dengan ketentuan peraturan perundang-undangan'],
                    ['Sesuai / Tidak']
                ]),
            ],
            [
                'indikator_id'     => '2a',
                'cara_pemeriksaan' => json_encode([
                    'Membandingkan Kontrak Kerja Konstruksi dengan ketentuan penggunaan kontrak standar'
                ]),
                'kesimpulan' => json_encode([
                    ['Sesuai / Tidak Sesuai']
                ]),
            ],
            [
                'indikator_id'     => '2b',
                'cara_pemeriksaan' => json_encode([
                    'Mengecek kepemilikan SKK, tenaga kerja konstruksi yang terdaftar dalam Kontrak Kerja Konstruksi',
                    'Mengecek remunerasi tenaga kerja pada kualifikasi jenjang jabatan ahli dibandingkan standar remunerasi',
                ]),
                'kesimpulan' => json_encode([
                    ['Jumlah TKK memiliki SKK yang sesuai (Orang)', 'Jumlah TKK yang tidak memiliki SKK (Orang)', 'Jumlah TKK yang memiliki SKK tidak sesuai (Orang)'],
                    ['Jumlah TKK yang gajinya sesuai (Orang)', 'Jumlah tkk yang gajinya tidak sesuai (Orang)'],
                ]),
            ],
            [
                'indikator_id'     => '2c',
                'cara_pemeriksaan' => json_encode([
                    'Mengecek apakah sub penyedia jasa yang ditunjuk sesuai peraturan (penyedia jasa spesialis)'
                ]),
                'kesimpulan' => json_encode([
                    ['Jumlah penyedia jasa yang ditunjuk sesuai peraturan (BUJK)', 'Jumlah penyedia jasa yang ditunjuk tidak sesuai peraturan (BUJK)']
                ]),
            ],
            [
                'indikator_id'     => '2d',
                'cara_pemeriksaan' => json_encode([
                    'Memeriksa apakah klausul hak kekayaan intelektual sudah dicantumkan dalam Kontrak Kerja Konstruksi'
                ]),
                'kesimpulan' => json_encode([
                    ['Ada / Tidak']
                ]),
            ],
            [
                'indikator_id'     => '2e',
                'cara_pemeriksaan' => json_encode([
                    'Memeriksa apakah klausul kewajiban alih teknologi sudah dicantumkan dalam Kontrak Kerja Konstruksi'
                ]),
                'kesimpulan' => json_encode([
                    ['Ada / Tidak']
                ]),
            ],
            [
                'indikator_id'     => '2f',
                'cara_pemeriksaan' => json_encode([
                    'Memeriksa apakah klausul kewajiban penggunaan produk dalam negeri dengan TKDN minimal sesuai dengan ketentuan peraturan perundang-undangan sudah dicantumkan dalam Kontrak Kerja Konstruksi'
                ]),
                'kesimpulan' => json_encode([
                    ['Ada / Tidak']
                ]),
            ],
            [
                'indikator_id'     => '2g',
                'cara_pemeriksaan' => json_encode([
                    'Memeriksa apakah klausul kewajiban membayar asuransi tenaga kerja konstruksi (BPJS Ketenagakerjaan dan BPJS Kesehatan) sudah dicantumkan dalam Kontrak Kerja Konstruksi'
                ]),
                'kesimpulan' => json_encode([
                    ['Ada / Tidak']
                ]),
            ],
            [
                'indikator_id'     => '3a',
                'cara_pemeriksaan' => json_encode([
                    'Memeriksa ketersediaan pengaturan aspek standar mutu bahan dan mutu peralatan pada dokumen RMPK dan Program Mutu',
                    'Memeriksa ketersediaan pengaturan aspek standar keselamatan kesehatan kerja, standar prosedur pelaksanaan Jasa Konstruksi, standar prosedur pelaksanaan Jasa Konstruksi, standar mutu hasil pelaksanaan Jasa Konstruksi serta standar operasi dan pemeliharaan pada dokumen: a. RKK pelaksanaan; b. RKK pengawasan; c. RMPK; d. RMLLP (jika ada); dan e. program mutu',
                    'Memeriksa ketersediaan dokumen pedoman perlindungan sosial tenaga kerja sesuai ketentuan peraturan perundang-undangan',
                    'Memeriksa ketersediaan dokumen rencana penerapan keselamatan konstruksi yang meliputi dokumen lingkungan atau RKPPL (Jika ada)',
                    'Memeriksa dokumen rancangan konseptual SMKK pengkajian, perencanaan, dan/atau perancangan yang sudah disahkan',
                    'Memeriksa ketersediaan dokumen rencana teknis proses pembangunan, pemeliharaan, pembongkaran, datan/atau pembangunan kembali yang sudah disahkan',
                    'Ketersediaan dokumen laporan penerapan keselamatan konstruksi yang sudah disahkan meliputi pemutakhiran: a. RKK pelaksanaan; b. RKK pengawasan; c. RMPK; d. RKPPL dan RMLLP (jika ada); e.program mutu; dan f. progress pelaksanaan dan pengawasan'
                ]),
                'kesimpulan' => json_encode([
                    ['Ada / Tidak'],
                    ['Ada / Tidak'],
                    ['Ada / Tidak'],
                    ['Ada / Tidak'],
                    ['Ada / Tidak'],
                    ['Ada / Tidak'],
                    ['Ada / Tidak'],
                ]),
            ],
            [
                'indikator_id'     => '3b',
                'cara_pemeriksaan' => json_encode([
                    'Memeriksa ketersediaan dokumen rancangan konseptual SMKK',
                    'Memeriksa ketersediaan dokumen RKK',
                    'Memeriksa ketersediaan dokumen RMPK',
                    'Memeriksa ketersediaan dokumen Program mutu',
                    'Memeriksa ketersediaan dokumen RKPPL',
                    'Memeriksa ketersediaan dokumen RMLLP',

                ]),
                'kesimpulan' => json_encode([
                    ['Ada / Tidak'],
                    ['Ada / Tidak'],
                    ['Ada / Tidak'],
                    ['Ada / Tidak'],
                    ['Ada / Tidak'],
                    ['Ada / Tidak'],
                ]),
            ],
            [
                'indikator_id'     => '3c',
                'cara_pemeriksaan' => json_encode([
                    'Memeriksa ketersediaan Dokumen rencana program sosialisasi SMKK di Proyek konstruksi',
                    'Memeriksa ketersediaan Laporan penerapan RKK',
                    'Memeriksa ketersediaan bukti Pembayaran BPJS Ketenagakerjaan',
                    'Memeriksa ketersediaan bukti Pembayaran BPJS Kesehatan atau bukti pembayaran asuransi kesehatan',
                ]),
                'kesimpulan' => json_encode([
                    ['Ada / Tidak'],
                    ['Ada / Tidak'],
                    ['Ada / Tidak'],
                    ['Ada / Tidak'],
                ]),
            ],
            [
                'indikator_id'     => '4',
                'cara_pemeriksaan' => json_encode([
                    'Membandingkan rencana mutu dengan laporan pelaksanaannya',
                ]),
                'kesimpulan' => json_encode([
                    ['Sesuai / Tidak Sesuai'],
                ]),
            ],
            [
                'indikator_id'     => '5a',
                'cara_pemeriksaan' => json_encode([
                    'Memeriksa dokumen rencana kebutuhan material, peralatan dan teknologi',
                    'Memeriksa dokumen laporan pelaksanaan material peralatan konstruksi'
                ]),
                'kesimpulan' => json_encode([
                    ['Ada / Tidak'],
                    ['Ada / Tidak'],
                ]),
            ],
            [
                'indikator_id'     => '5b',
                'cara_pemeriksaan' => json_encode([
                    'Mengecek dokumen penggunaan material dasar utama dan material olahan utama yang memiliki SNI/standar lain atau tidak',
                    'Mengecek dokumen peralatan konstruksi utama yang memiliki surat keterangan memnuhi syarat K3 dari dinas yang membidangi ketenagakerjaan',
                    'Mengecek dokumen tenaga operator yang memiliki surat izin operator (SIO) dari dinas yang membidangi ketenagakerjaan',
                    'Mengecek dokumen kesesuaian teknologi konstruksi yang digunakan dengan spesifikasi teknis yang dipersyaratkan'
                ]),
                'kesimpulan' => json_encode([
                    ['Memiliki / Tidak', 'Jumlah material dasar utama dan olahan utama yang memiliki SNI atau standar lain yang berlaku sebanyak'],
                    ['Jumlah peralatan konstruksi utama yang memiliki Surat keterangan memenuhi syarat K3 sebanyak (unit)'],
                    ['Jumlah tenaga operator yang memiliki SIO sebanyak (Orang)'],
                    ['Sesuai / Tidak'],
                ]),
            ],
            [
                'indikator_id'     => '5c',
                'cara_pemeriksaan' => json_encode([
                    'Mengecek ketersediaan dokumen TKDN dari proyek konstruksi dan mengecek pemenuhan komitmen TKDN terhadap batasan minimum capaian TKDN sesuai persyaratan tender',
                    'Mengecek ketersediaan sertifikat TKDN material konstruksi yang masih berlaku dan sertifikat BMP produsen material konstruksi (apabila ada), terutama material konstruksi yang termasuk kategori wajib',
                    'Mengecek dokumen persetujuan penggunaan produk impor yang ditandatangani Pejabat berwenang (apabila ada penggunaan produk impor)',
                ]),
                'kesimpulan' => json_encode([
                    ['Tersedia / Tidak', 'Sesuai / Tidak'],
                    ['Tersedia / Tidak'],
                    ['Tersedia / Tidak'],
                ]),
            ],
            [
                'indikator_id'     => '6',
                'cara_pemeriksaan' => json_encode([
                    'Memeriksa ketersediaan surat persetujuan pencantuman logo Ekolabel Indonesia atau sertifikat yang diterbitkan oleh instansi terkait yang berwenang',
                    'Memeriksa ketersediaan Surat Izin Penambangan'
                ]),
                'kesimpulan' => json_encode([
                    ['Tersedia / Tidak'],
                    ['Tersedia / Tidak'],
                ]),
            ],
        ]);
    }
}
