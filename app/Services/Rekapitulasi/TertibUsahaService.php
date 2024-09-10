<?php

namespace App\Services\Rekapitulasi;

use App\Models\Usaha\PengawasanBUJKRutin;
use App\Models\Usaha\Usaha;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;

class TertibUsahaService
{
    public function getDaftarPengawasanRutinBUJK(string $tahun)
    {
        return PengawasanBUJKRutin::with('usaha:id,nama,nib,pjbu')
            ->leftJoin('pengawasan_bujk_lingkup_2', 'pengawasan_bujk_rutin.pengawasan_lingkup_2', 'pengawasan_bujk_lingkup_2.id')
            ->leftJoin('pengawasan_bujk_lingkup_3', 'pengawasan_bujk_rutin.pengawasan_lingkup_3', 'pengawasan_bujk_lingkup_3.id')
            ->leftJoin('pengawasan_bujk_lingkup_4', 'pengawasan_bujk_rutin.pengawasan_lingkup_4', 'pengawasan_bujk_lingkup_4.id')
            ->leftJoin('pengawasan_bujk_lingkup_5', 'pengawasan_bujk_rutin.pengawasan_lingkup_5', 'pengawasan_bujk_lingkup_5.id')
            ->select(
                'pengawasan_bujk_rutin.*',
                'pengawasan_bujk_lingkup_2.tanggal_pengawasan as tanggal_pengawasan_lingkup_2',
                'pengawasan_bujk_lingkup_2.tertib_jenis_usaha',
                'pengawasan_bujk_lingkup_2.tertib_jenis_usaha',
                'pengawasan_bujk_lingkup_2.tertib_sifat_usaha',
                'pengawasan_bujk_lingkup_2.tertib_klasifikasi_usaha',
                'pengawasan_bujk_lingkup_2.tertib_layanan_usaha',
                'pengawasan_bujk_lingkup_3.tanggal_pengawasan as tanggal_pengawasan_lingkup_3',
                'pengawasan_bujk_lingkup_3.tertib_bentuk_usaha',
                'pengawasan_bujk_lingkup_3.tertib_kualifikasi_usaha',
                'pengawasan_bujk_lingkup_4.tanggal_pengawasan as tanggal_pengawasan_lingkup_4',
                'pengawasan_bujk_lingkup_4.tertib_persyaratan_sbu',
                'pengawasan_bujk_lingkup_4.tertib_persyaratan_nib',
                'pengawasan_bujk_lingkup_5.tanggal_pengawasan as tanggal_pengawasan_lingkup_5',
                'pengawasan_bujk_lingkup_5.tertib_pengembangan_usaha',
        )->whereYear('start', $tahun)->whereYear('end', $tahun)
         ->orderBy('updated_at', 'desc')
         ->limit(5)
         ->get();
    }

    public function getDaftarTertibUsahaBUJKTahunanWithPengawasanRutin(string $tahun)
    {
        return Usaha::withWhereHas('pengawasanRutin', function ($query) use ($tahun)
        {
            $query->whereYear('start', $tahun)->whereYear('end', $tahun)
                  ->leftJoin('pengawasan_bujk_lingkup_2', 'pengawasan_bujk_rutin.pengawasan_lingkup_2', 'pengawasan_bujk_lingkup_2.id')
                  ->leftJoin('pengawasan_bujk_lingkup_3', 'pengawasan_bujk_rutin.pengawasan_lingkup_3', 'pengawasan_bujk_lingkup_3.id')
                  ->leftJoin('pengawasan_bujk_lingkup_4', 'pengawasan_bujk_rutin.pengawasan_lingkup_4', 'pengawasan_bujk_lingkup_4.id')
                  ->leftJoin('pengawasan_bujk_lingkup_5', 'pengawasan_bujk_rutin.pengawasan_lingkup_5', 'pengawasan_bujk_lingkup_5.id')
                  ->select(
                    'pengawasan_bujk_rutin.*',
                    'pengawasan_bujk_lingkup_2.tertib_jenis_usaha',
                    'pengawasan_bujk_lingkup_2.tertib_sifat_usaha',
                    'pengawasan_bujk_lingkup_2.tertib_klasifikasi_usaha',
                    'pengawasan_bujk_lingkup_2.tertib_layanan_usaha',
                    'pengawasan_bujk_lingkup_3.tertib_bentuk_usaha',
                    'pengawasan_bujk_lingkup_3.tertib_kualifikasi_usaha',
                    'pengawasan_bujk_lingkup_4.tertib_persyaratan_sbu',
                    'pengawasan_bujk_lingkup_4.tertib_persyaratan_nib',
                    'pengawasan_bujk_lingkup_5.tertib_pengembangan_usaha',
                  )->orderBy('start');
        })->leftJoin('pengawasan_tahunan_tertib_usaha_bujk as pengawasan_tahunan', function (JoinClause $join) use ($tahun)
        {
            $join->on('usaha.id', '=', 'pengawasan_tahunan.bujk_id')
                 ->where('tahun', $tahun);
        })->select(
            'usaha.id',
            'usaha.nama',
            'usaha.nib',
            'usaha.pjbu',
            'pengawasan_tahunan.id as pengawasan_id',
            'pengawasan_tahunan.tahun',
            'pengawasan_tahunan.tertib_jenis_usaha',
            'pengawasan_tahunan.tertib_sifat_usaha',
            'pengawasan_tahunan.tertib_klasifikasi_usaha',
            'pengawasan_tahunan.tertib_layanan_usaha',
            'pengawasan_tahunan.tertib_bentuk_usaha',
            'pengawasan_tahunan.tertib_kualifikasi_usaha',
            'pengawasan_tahunan.tertib_persyaratan_sbu',
            'pengawasan_tahunan.tertib_persyaratan_nib',
            'pengawasan_tahunan.tertib_pengembangan_usaha',
            'pengawasan_tahunan.tertib_pengawasan',
            'pengawasan_tahunan.catatan',
         )->orderBy('usaha.nama')
          ->get();
    }

    public function storeVerifikasiPengawasanBUJKTahunan(string $tahun, string $usahaId, array $data)
    {
        DB::table('pengawasan_tahunan_tertib_usaha_bujk')->updateOrInsert(
            [
                'tahun'   => $tahun,
                'bujk_id' => $usahaId,
            ],
            [
                'tertib_jenis_usaha'        => $data['tertib_jenis_usaha'],
                'tertib_sifat_usaha'        => $data['tertib_sifat_usaha'],
                'tertib_klasifikasi_usaha'  => $data['tertib_klasifikasi_usaha'],
                'tertib_layanan_usaha'      => $data['tertib_layanan_usaha'],
                'tertib_bentuk_usaha'       => $data['tertib_bentuk_usaha'],
                'tertib_kualifikasi_usaha'  => $data['tertib_kualifikasi_usaha'],
                'tertib_persyaratan_sbu'    => $data['tertib_persyaratan_sbu'],
                'tertib_persyaratan_nib'    => $data['tertib_persyaratan_nib'],
                'tertib_pengembangan_usaha' => $data['tertib_pengembangan_usaha'],
                'tertib_pengawasan'         => $data['tertib_pengawasan'],
                'catatan'                   => $data['catatan'],
                'created_by'                => $data['created_by'],
            ],
        );
    }

    public function getDaftarTertibUsahaBUJKTahunan(string $tahun)
    {
        return Usaha::join('pengawasan_tahunan_tertib_usaha_bujk as pengawasan_tahunan', function (JoinClause $join) use ($tahun)
        {
            $join->on('usaha.id', '=', 'pengawasan_tahunan.bujk_id')
                 ->where('tahun', $tahun);
        })->select(
            'usaha.id',
            'usaha.nama',
            'usaha.nib',
            'usaha.pjbu',
            'pengawasan_tahunan.id as pengawasan_id',
            'pengawasan_tahunan.tahun',
            'pengawasan_tahunan.tertib_jenis_usaha',
            'pengawasan_tahunan.tertib_sifat_usaha',
            'pengawasan_tahunan.tertib_klasifikasi_usaha',
            'pengawasan_tahunan.tertib_layanan_usaha',
            'pengawasan_tahunan.tertib_bentuk_usaha',
            'pengawasan_tahunan.tertib_kualifikasi_usaha',
            'pengawasan_tahunan.tertib_persyaratan_sbu',
            'pengawasan_tahunan.tertib_persyaratan_nib',
            'pengawasan_tahunan.tertib_pengembangan_usaha',
            'pengawasan_tahunan.tertib_pengawasan',
            'pengawasan_tahunan.catatan',
         )->orderBy('usaha.nama')
          ->get();
    }

    public function getTertibUsahaBUJKCount(string $tahun)
    {
        return DB::table('pengawasan_tahunan_tertib_usaha_bujk')
            ->selectRaw('count(id) as total_tertib_pengawasan, tertib_pengawasan')
            ->groupBy('tertib_pengawasan')
            ->where('tahun', $tahun)
            ->get();
    }
}
