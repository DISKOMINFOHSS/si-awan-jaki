<?php

namespace App\Services\Rekapitulasi;

use App\Models\Usaha\Usaha;

class TertibUsahaService
{
    // public function getDaftarBUJK(string $tahun)
    // {
    //     return Usaha::join('master_jenis_usaha as jenis_usaha', 'usaha.jenis_usaha_id', 'jenis_usaha.id')
    //         ->where('jenis_usaha', 'Badan Usaha Jasa Konstruksi')
    // }

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
        })->select('usaha.id', 'usaha.nama', 'usaha.nib', 'usaha.pjbu')
          ->orderBy('usaha.nama')
          ->get();
    }
}
