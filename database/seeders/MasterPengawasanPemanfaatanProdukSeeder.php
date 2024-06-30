<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterPengawasanPemanfaatanProdukSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('master_pengawasan_pemanfaatan_produk')->insert([
            [
                'id'                 => '1a',
                'lingkup_pengawasan' => 'Pengawasan Fungsi Peruntukan terhadap Tertib Pemanfaatan Produk Jasa Konstruksi',
                'detail'             => 'Kesesuaian pemanfaatan bangunan konstruksi dengan fungsi yang direncanakan: Bangunan gedung sesuai dengan perizinan dan/atau bangunan sipil sesuai dengan peraturan perundangan',
                'indikator'          => 'Pemanfataan bangunan konstruksi sesuai dengan perizinannya',
                'cara_pemeriksaan'   => 'Membandingkan izin pembangunan dengan fakta di lapangan',
                'dokumen'            => 'Dokumen perizinan',
                'kesimpulan'         => json_encode(array('Sesuai')),
            ],
            [
                'id'                 => '1b',
                'lingkup_pengawasan' => 'Pengawasan Fungsi Peruntukan terhadap Tertib Pemanfaatan Produk Jasa Konstruksi',
                'detail'             => 'Kesesuaian lokasi bangunan konstruksi dengan peruntukan yang diatur dalam rencana detail tata ruang atau Kesesuaian Kegiatan Pemanfaatan Ruang (KKPR)',
                'indikator'          => 'Lokasi bangunan konstruksi sesuai peruntukan tata ruang yang dibuktikan dengan surat pernyataan dari instansi berwenang',
                'cara_pemeriksaan'   => 'Memeriksa ketersediaan Dokumen resmi dari instansi berwenang',
                'dokumen'            => 'Dokumen resmi dari instansi berwenang',
                'kesimpulan'         => json_encode(array('Tersedia')),
            ],
            [
                'id'                 => '2',
                'lingkup_pengawasan' => 'Pengawasan terhadap Rencana Umur Konstruksi',
                'detail'             => null,
                'indikator'          => 'Terjaminnya bangunan konstruksi tetap laik fungsi sepanjang umur konstruksi yang dibuktikan dengan tersedianya dokumen laik fungsi atau dokumen sejenis lainnya',
                'cara_pemeriksaan'   => 'Memeriksa ketersediaan dokumen laik fungsi atau dokumen sejenis yang diterbitkan oleh instansi berwenang',
                'dokumen'            => 'Dokumen laik fungsi atau dokumen sejenis yang diterbitkan oleh instansi berwenang',
                'kesimpulan'         => json_encode(array('Tersedia')),
            ],
            [
                'id'                 => '3',
                'lingkup_pengawasan' => 'Pengawasan terhadap Kapasitas dan Beban',
                'detail'             => null,
                'indikator'          => 'Terjaminnya bangunan konstruksi dari kelebihan kapasitas dan beban yang dibuktikan dengan tersedianya surat keterangan dari instansi yang memiliki kewenangan atau laporan dari pemilik/pengelola bangunan atau konfirmasi instansi yang memiliki kewenangan atau pemilik/pengelola bangunan',
                'cara_pemeriksaan'   => 'Memeriksa ketersediaan surat keterangan dari instansi yang memiliki kewenangan atau laporan dari pemilik/pengelola bangunan atau melakukan konfirmasi instansi yang memiliki kewenangan atau pemilik/pengelola bangunan',
                'dokumen'            => 'Surat keterangan dari instansi yang memiliki kewenangan atau laporan dari pemilik/pengelola bangunan',
                'kesimpulan'         => json_encode(array('Tersedia')),
            ],
            [
                'id'                 => '4a',
                'lingkup_pengawasan' => 'Pengawasan terhadap Pemeliharaan Produk Jasa Konstruksi',
                'detail'             => null,
                'indikator'          => 'Terlaksananya pemeliharaan bangunan konstruksi yang dibuktikan dengan ketersediaan surat pernyataan pemilik/pengelola bangunan dengan lampiran berupa Dokumen program pemeliharaan dan perawatan bangunan sesuai dengan ketentuan peraturan perundang-undangan tentang standar pemeliharaan dan perawatan',
                'cara_pemeriksaan'   => 'Memeriksa ketersediaan Dokumen program pemeliharaan/perawatan bangunan',
                'dokumen'            => 'Dokumen program pemeliharaan/perawatan bangunan',
                'kesimpulan'         => json_encode(array('Tersedia')),
            ],
            [
                'id'                 => '4b',
                'lingkup_pengawasan' => 'Pengawasan terhadap Pemeliharaan Produk Jasa Konstruksi',
                'detail'             => null,
                'indikator'          => 'Terlaksananya pemeliharaan bangunan konstruksi yang dibuktikan dengan ketersediaan surat pernyataan pemilik/pengelola bangunan dengan lampiran berupa Laporan pelaksanaan program pemeliharaan/perawatan bangunan',
                'cara_pemeriksaan'   => 'Memeriksa ketersediaan Laporan pelaksanaan program pemeliharaan/perawatan bangunan dibandingkan dengan pelaksanaannya',
                'dokumen'            => 'Laporan pelaksanaan program pemeliharaan/perawatan bangunan',
                'kesimpulan'         => json_encode(array('Tersedia', 'Sesuai')),
            ],
        ]);
    }
}
