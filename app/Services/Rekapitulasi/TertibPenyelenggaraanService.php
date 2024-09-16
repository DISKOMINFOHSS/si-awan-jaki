<?php

namespace App\Services\Rekapitulasi;

use App\Models\Penyelenggaraan\ProyekKonstruksi;
use App\Models\Penyelenggaraan\PengawasanPenyelenggaraan;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;

class TertibPenyelenggaraanService
{
    public function getDaftarProyekKonstruksi(string $tahun): EloquentCollection
    {
        return ProyekKonstruksi::withWhereHas('pengawasan', function ($query) use ($tahun)
        {
            $query->whereYear('tanggal_pengawasan', $tahun)
                  ->orderBy('jenis_pengawasan', 'desc');
        })->leftJoin('pengawasan_tahunan_tertib_penyelenggaraan as pengawasan_tahunan', function (JoinClause $join) use ($tahun)
        {
            $join->on('proyek_konstruksi.id', '=', 'pengawasan_tahunan.proyek_konstruksi_id')
                 ->where('tahun', $tahun);
        })->leftJoin('usaha', 'proyek_konstruksi.penyedia_jasa_id', 'usaha.id')
          ->leftJoin('pengguna_jasa_konstruksi as pengguna_jasa', 'proyek_konstruksi.pengguna_jasa_id', 'pengguna_jasa.id')
          ->select(
            'proyek_konstruksi.*',
            'usaha.nama as penyedia_jasa',
            'pengguna_jasa.nama as pengguna_jasa',
            'pengguna_jasa.instansi as pengguna_jasa_instansi',
            'pengawasan_tahunan.tahun',
            'pengawasan_tahunan.tertib_proses_pemilihan_penyedia_jasa',
            'pengawasan_tahunan.tertib_penerapan_standar_kontrak',
            'pengawasan_tahunan.tertib_penggunaan_tkk',
            'pengawasan_tahunan.tertib_pemberian_pekerjaan',
            'pengawasan_tahunan.tertib_ketersediaan_dokumen_standar_k4',
            'pengawasan_tahunan.tertib_penerapan_smkk',
            'pengawasan_tahunan.tertib_antisipasi_kecelakaan',
            'pengawasan_tahunan.tertib_penerapan_manajemen_mutu',
            'pengawasan_tahunan.tertib_pemenuhan_penyediaan_mptk',
            'pengawasan_tahunan.tertib_penggunaan_mptk',
            'pengawasan_tahunan.tertib_penggunaan_pdn',
            'pengawasan_tahunan.tertib_pemenuhan_standar_lingkungan',
            'pengawasan_tahunan.tertib_pengawasan',
            'pengawasan_tahunan.catatan',
         )->orderBy('proyek_konstruksi.nama_paket')
          ->get();
    }

    public function storeVerifikasiPengawasanTahunan(string $tahun, string $proyekId, array $data)
    {
        DB::table('pengawasan_tahunan_tertib_penyelenggaraan')->updateOrInsert(
            [
                'tahun' => $tahun,
                'proyek_konstruksi_id' => $proyekId,
            ],
            [
                'tertib_proses_pemilihan_penyedia_jasa'  => $data['tertib_proses_pemilihan_penyedia_jasa'],
                'tertib_penerapan_standar_kontrak'       => $data['tertib_penerapan_standar_kontrak'],
                'tertib_penggunaan_tkk'                  => $data['tertib_penggunaan_tkk'],
                'tertib_pemberian_pekerjaan'             => $data['tertib_pemberian_pekerjaan'],
                'tertib_ketersediaan_dokumen_standar_k4' => $data['tertib_ketersediaan_dokumen_standar_k4'],
                'tertib_penerapan_smkk'                  => $data['tertib_penerapan_smkk'],
                'tertib_antisipasi_kecelakaan'           => $data['tertib_antisipasi_kecelakaan'],
                'tertib_penerapan_manajemen_mutu'        => $data['tertib_penerapan_manajemen_mutu'],
                'tertib_pemenuhan_penyediaan_mptk'       => $data['tertib_pemenuhan_penyediaan_mptk'],
                'tertib_penggunaan_mptk'                 => $data['tertib_penggunaan_mptk'],
                'tertib_penggunaan_pdn'                  => $data['tertib_penggunaan_pdn'],
                'tertib_pemenuhan_standar_lingkungan'    => $data['tertib_pemenuhan_standar_lingkungan'],
                'tertib_pengawasan'                      => $data['tertib_pengawasan'],
                'catatan'                                => $data['catatan'],
                'created_by'                             => $data['created_by'],
                'created_at'                             => now(),
                'updated_at'                             => now(),
            ],
        );
    }

    public function getDaftarPengawasanTahunan(string $tahun): EloquentCollection
    {
        return ProyekKonstruksi::join('pengawasan_tahunan_tertib_penyelenggaraan as pengawasan_tahunan', function (JoinClause $join) use ($tahun)
        {
            $join->on('proyek_konstruksi.id', '=', 'pengawasan_tahunan.proyek_konstruksi_id')
                 ->where('tahun', $tahun);
        })->leftJoin('usaha', 'proyek_konstruksi.penyedia_jasa_id', 'usaha.id')
          ->select(
            'proyek_konstruksi.id',
            'proyek_konstruksi.nama_paket',
            'proyek_konstruksi.nomor_kontrak',
            'proyek_konstruksi.sumber_dana',
            'proyek_konstruksi.tahun_anggaran',
            'proyek_konstruksi.penyedia_jasa_id',
            'usaha.nama as penyedia_jasa',
            'pengawasan_tahunan.tahun',
            'pengawasan_tahunan.tertib_proses_pemilihan_penyedia_jasa',
            'pengawasan_tahunan.tertib_penerapan_standar_kontrak',
            'pengawasan_tahunan.tertib_penggunaan_tkk',
            'pengawasan_tahunan.tertib_pemberian_pekerjaan',
            'pengawasan_tahunan.tertib_ketersediaan_dokumen_standar_k4',
            'pengawasan_tahunan.tertib_penerapan_smkk',
            'pengawasan_tahunan.tertib_antisipasi_kecelakaan',
            'pengawasan_tahunan.tertib_penerapan_manajemen_mutu',
            'pengawasan_tahunan.tertib_pemenuhan_penyediaan_mptk',
            'pengawasan_tahunan.tertib_penggunaan_mptk',
            'pengawasan_tahunan.tertib_penggunaan_pdn',
            'pengawasan_tahunan.tertib_pemenuhan_standar_lingkungan',
            'pengawasan_tahunan.tertib_pengawasan',
            'pengawasan_tahunan.catatan',
         )->orderBy('proyek_konstruksi.nama_paket')
          ->get();
    }

    public function getTertibPenyelenggaraanCount(string $tahun)
    {
        return DB::table('pengawasan_tahunan_tertib_penyelenggaraan')
            ->selectRaw('count(id) as total_tertib_pengawasan, tertib_pengawasan')
            ->groupBy('tertib_pengawasan')
            ->where('tahun', $tahun)
            ->get();
    }

    public function getDaftarPengawasanRutin(string $tahun)
    {
        return PengawasanPenyelenggaraan::withWhereHas(
            'proyekKonstruksi', function ($query)
            {
                $query->leftJoin('usaha', 'proyek_konstruksi.penyedia_jasa_id', 'usaha.id')
                      ->select(
                        'proyek_konstruksi.id as id',
                        'proyek_konstruksi.nama_paket as namaPaket',
                        'proyek_konstruksi.nomor_kontrak as nomorKontrak',
                        'usaha.nama as penyediaJasa'
                    );
            }
        )->where('jenis_pengawasan', 'Rutin')
         ->whereYear('tanggal_pengawasan', $tahun)
         ->orderBy('tanggal_pengawasan', 'desc')
         ->get();
    }

    public function getDaftarPengawasanByJenisPengawasan(string $tahun, string $jenisPengawasan)
    {
        return PengawasanPenyelenggaraan::withWhereHas(
            'proyekKonstruksi', function ($query)
            {
                $query->leftJoin('usaha', 'proyek_konstruksi.penyedia_jasa_id', 'usaha.id')
                      ->select(
                        'proyek_konstruksi.id as id',
                        'proyek_konstruksi.nama_paket as namaPaket',
                        'proyek_konstruksi.nomor_kontrak as nomorKontrak',
                        'usaha.nama as penyediaJasa'
                    );
            }
        )->where('jenis_pengawasan', $jenisPengawasan)
         ->whereYear('tanggal_pengawasan', $tahun)
         ->orderBy('tanggal_pengawasan', 'desc')
         ->get();
    }

    public function getDaftarPengawasanRutinOrderByNamaPaket(string $tahun)
    {
        return PengawasanPenyelenggaraan::withWhereHas(
            'proyekKonstruksi', function ($query)
            {
                $query->leftJoin('usaha', 'proyek_konstruksi.penyedia_jasa_id', 'usaha.id')
                      ->select(
                        'proyek_konstruksi.id as id',
                        'proyek_konstruksi.nama_paket as namaPaket',
                        'proyek_konstruksi.nomor_kontrak as nomorKontrak',
                        'usaha.nama as penyediaJasa'
                    );
            }
        )->join('proyek_konstruksi', 'proyek_konstruksi.id', 'pengawasan_penyelenggaraan_konstruksi.proyek_konstruksi_id')
         ->where('jenis_pengawasan', 'Rutin')
         ->whereYear('tanggal_pengawasan', $tahun)
         ->select('pengawasan_penyelenggaraan_konstruksi.*', 'proyek_konstruksi.nama_paket')
         ->orderBy('nama_paket')
         ->get();
    }

    public function getPengawasanRutinCount(string $tahun)
    {
        return DB::table('pengawasan_penyelenggaraan_konstruksi')
            ->selectRaw('count(id) as total_tertib_pengawasan, tertib_pengawasan')
            ->where('jenis_pengawasan', 'Rutin')
            ->whereYear('tanggal_pengawasan', $tahun)
            ->whereNotNull('tertib_pengawasan')
            ->whereNull('deleted_at')
            ->groupBy('tertib_pengawasan')
            ->get();
    }

    public function getPengawasanCount(string $tahun)
    {
        return DB::table('pengawasan_penyelenggaraan_konstruksi')
            ->selectRaw('count(id) as total_tertib_pengawasan, tertib_pengawasan')
            ->where('jenis_pengawasan', 'Rutin')
            ->whereYear('tanggal_pengawasan', $tahun)
            ->whereNotNull('tertib_pengawasan')
            ->whereNull('deleted_at')
            ->groupBy('tertib_pengawasan')
            ->get();
    }
}
