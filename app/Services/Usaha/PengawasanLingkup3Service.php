<?php

namespace App\Services\Usaha;

use App\Models\Usaha\KesesuaianKegiatanLingkup3;
use App\Models\Usaha\PengawasanBUJKLingkup3;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class PengawasanLingkup3Service
{
    public function addPengawasanBUJK(array $data): string
    {
        $pengawasan = PengawasanBUJKLingkup3::create([
            'jenis_pengawasan'      => $data['jenis_pengawasan'],
            'tanggal_pengawasan'    => $data['tanggal_pengawasan'],
            'usaha_id'              => $data['usaha_id'],
            'status_izin_usaha'     => $data['status_izin_usaha'],
            'status_verifikasi_nib' => $data['status_verifikasi_nib'],
            'created_by'            => $data['created_by']
        ]);

        return $pengawasan->id;
    }

    public function checkPengawasanBUJKExists(string $id): bool
    {
        return PengawasanBUJKLingkup3::where('id', $id)->exists();
    }

    public function getDaftarPengawasanBUJK(): EloquentCollection
    {
        return PengawasanBUJKLingkup3::with([
            'usaha' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib');
            }
        ])->orderBy('created_by', 'desc')
          ->get();
    }

    public function getPengawasanBUJKById(string $id): PengawasanBUJKLingkup3
    {
        return PengawasanBUJKLingkup3::with([
            'usaha' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib', 'pjbu', 'alamat');
            },
            'kesesuaianKegiatan' => function (Builder $query)
            {
                $query->join('paket_pekerjaan', 'kesesuaian_paket_pekerjaan_lingkup_3.paket_id', 'paket_pekerjaan.id')
                      ->select(
                            'kesesuaian_paket_pekerjaan_lingkup_3.id',
                            'paket_pekerjaan.id as paketId',
                            'kesesuaian_paket_pekerjaan_lingkup_3.pengawasan_id',
                            'paket_pekerjaan.nama_paket as namaPaket',
                            'paket_pekerjaan.tahun_anggaran as tahunAnggaran',
                            'paket_pekerjaan.bentuk_usaha as bentukUsaha',
                            'kesesuaian_paket_pekerjaan_lingkup_3.kesesuaian_bentuk as kesesuaianBentuk',
                            'paket_pekerjaan.kualifikasi_usaha as kualifikasiUsaha',
                            'kesesuaian_paket_pekerjaan_lingkup_3.kesesuaian_kualifikasi as kesesuaianKualifikasi',
                      );
            }
        ])->where('id', $id)->firstOrFail();
    }

    public function addKesesuaianKegiatan(array $data): int
    {
        $kesesuaianKegiatan = KesesuaianKegiatanLingkup3::create([
            'pengawasan_id'          => $data['pengawasan_id'],
            'paket_id'               => $data['paket_id'],
            'kesesuaian_bentuk'      => $data['kesesuaian_bentuk'],
            'kesesuaian_kualifikasi' => $data['kesesuaian_kualifikasi'],
            'created_by'             => $data['created_by'],
        ]);

        return $kesesuaianKegiatan->id;
    }

    public function checkKesesuaianKegiatanExists(string $pengawasanId, string $paketId): bool
    {
        return KesesuaianKegiatanLingkup3::where([
            ['pengawasan_id', '=', $pengawasanId],
            ['paket_id', '=', $paketId],
        ])->whereNull('deleted_at')
          ->exists();
    }

    public function updateKesesuaianKegiatan(array $data): int
    {
        $kesesuaianKegiatan = KesesuaianKegiatanLingkup3::find($data['id']);

        $kesesuaianKegiatan->kesesuaian_bentuk = $data['kesesuaian_bentuk'];
        $kesesuaianKegiatan->kesesuaian_kualifikasi = $data['kesesuaian_kualifikasi'];

        $kesesuaianKegiatan->save();

        return $kesesuaianKegiatan->id;
    }
}
