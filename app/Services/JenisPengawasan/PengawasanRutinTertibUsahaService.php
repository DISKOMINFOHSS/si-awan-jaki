<?php

namespace App\Services\JenisPengawasan;

use App\Models\Usaha\PengawasanBUJKRutin;
use Illuminate\Support\Facades\DB;

class PengawasanRutinTertibUsahaService
{
    public function addPengawasanRutinBUJK(string $usahaId, array $dateRange, array $data)
    {
        $pengawasanRutin = PengawasanBUJKRutin::updateOrCreate(
            [
                'usaha_id' => $usahaId,
                'start'    => $dateRange['start'],
                'end'      => $dateRange['end'],
            ],
            $data,
        );

        return $pengawasanRutin->id;
    }

    public function checkPengawasanRutinBUJKExists(string $id)
    {
        return PengawasanBUJKRutin::where('id', $id)->exists();
    }

    public function getDaftarPengawasanRutinBUJK(string $tahun)
    {
        return PengawasanBUJKRutin::with('usaha:id,nama,nib,pjbu')
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
            )->whereYear('pengawasan_bujk_rutin.tanggal_pengawasan', $tahun)
             ->get();
    }

    public function getPengawasanRutinBUJKById(string $id)
    {
        return PengawasanBUJKRutin::with('usaha:id,nama,nib,pjbu,alamat')
            ->leftJoin('pengawasan_bujk_lingkup_2', 'pengawasan_bujk_rutin.pengawasan_lingkup_2', 'pengawasan_bujk_lingkup_2.id')
            ->leftJoin('pengawasan_bujk_lingkup_3', 'pengawasan_bujk_rutin.pengawasan_lingkup_3', 'pengawasan_bujk_lingkup_3.id')
            ->leftJoin('pengawasan_bujk_lingkup_4', 'pengawasan_bujk_rutin.pengawasan_lingkup_4', 'pengawasan_bujk_lingkup_4.id')
            ->leftJoin('pengawasan_bujk_lingkup_5', 'pengawasan_bujk_rutin.pengawasan_lingkup_5', 'pengawasan_bujk_lingkup_5.id')
            ->select(
                'pengawasan_bujk_rutin.*',
                'pengawasan_bujk_lingkup_2.id as pengawasan_lingkup_2_id',
                'pengawasan_bujk_lingkup_2.status_izin_usaha',
                'pengawasan_bujk_lingkup_2.status_verifikasi_nib',
                'pengawasan_bujk_lingkup_2.tertib_jenis_usaha',
                'pengawasan_bujk_lingkup_2.tertib_jenis_usaha',
                'pengawasan_bujk_lingkup_2.tertib_sifat_usaha',
                'pengawasan_bujk_lingkup_2.tertib_klasifikasi_usaha',
                'pengawasan_bujk_lingkup_2.tertib_layanan_usaha',
                'pengawasan_bujk_lingkup_2.tertib_pengawasan as tertib_pengawasan_lingkup_2',
                'pengawasan_bujk_lingkup_3.id as pengawasan_lingkup_3_id',
                'pengawasan_bujk_lingkup_3.tertib_bentuk_usaha',
                'pengawasan_bujk_lingkup_3.tertib_kualifikasi_usaha',
                'pengawasan_bujk_lingkup_3.tertib_pengawasan as tertib_pengawasan_lingkup_3',
                'pengawasan_bujk_lingkup_4.id as pengawasan_lingkup_4_id',
                'pengawasan_bujk_lingkup_4.tertib_persyaratan_sbu',
                'pengawasan_bujk_lingkup_4.tertib_persyaratan_nib',
                'pengawasan_bujk_lingkup_4.tertib_pengawasan as tertib_pengawasan_lingkup_4',
                'pengawasan_bujk_lingkup_5.id as pengawasan_lingkup_5_id',
                'pengawasan_bujk_lingkup_5.tertib_pengembangan_usaha',
                'pengawasan_bujk_lingkup_5.tertib_pengawasan as tertib_pengawasan_lingkup_5',
            )->findOrFail($id);
    }

    public function getPengawasanRutinBUJK(string $usahaId, array $dateRange)
    {
        return PengawasanBUJKRutin::firstOrCreate([
            'usaha_id' => $usahaId,
            'start'    => $dateRange['start'],
            'end'      => $dateRange['end'],
        ]);
    }

    public function updatePengawasanRutinBUJK(string $id, array $data)
    {
        PengawasanBUJKRutin::where('id', $id)->update($data);
    }

    public function getPengawasanRutinBUJKByLingkup2Id(string $pengawasanLingkup2Id)
    {
        return PengawasanBUJKRutin::where('pengawasan_lingkup_2', $pengawasanLingkup2Id)->first();
    }

    public function getPengawasanRutinBUJKByLingkup3Id(string $pengawasanLingkup3Id)
    {
        return PengawasanBUJKRutin::where('pengawasan_lingkup_3', $pengawasanLingkup3Id)->first();
    }

    public function getPengawasanRutinBUJKByLingkup4Id(string $pengawasanLingkup4Id)
    {
        return PengawasanBUJKRutin::where('pengawasan_lingkup_4', $pengawasanLingkup4Id)->first();
    }

    public function getPengawasanRutinBUJKByLingkup5Id(string $pengawasanLingkup5Id)
    {
        return PengawasanBUJKRutin::where('pengawasan_lingkup_5', $pengawasanLingkup5Id)->first();
    }

    public function addRekomendasiPengawasanRutinBUJK(string $pengawasanId, array $data)
    {
        DB::table('rekomendasi_pengawasan_rutin_bujk')->updateOrInsert(
            [
                'pengawasan_id' => $pengawasanId,
            ],
            [
                'rekomendasi' => $data['rekomendasi'],
                'keterangan'  => $data['keterangan'],
                'created_by'  => $data['created_by'],
                'created_at'  => now(),
                'updated_at'  => now(),
            ]
        );
    }

    public function getRekomendasiPengawasanRutinBUJKByPengawasanId(string $pengawasanId)
    {
        return DB::table('rekomendasi_pengawasan_rutin_bujk')
            ->where('pengawasan_id', $pengawasanId)
            ->first();
    }
}
