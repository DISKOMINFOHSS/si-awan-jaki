<?php

namespace App\Services\Usaha;

use App\Models\Usaha\KesesuaianKegiatanLingkup2;
use App\Models\Usaha\PengawasanBUJKLingkup2;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class PengawasanLingkup2Service
{
    public function addPengawasanBUJK(array $data): string
    {
        $pengawasan = PengawasanBUJKLingkup2::create([
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
        return PengawasanBUJKLingkup2::where('id', $id)->exists();
    }

    public function getDaftarPengawasanBUJK(): EloquentCollection
    {
        return PengawasanBUJKLingkup2::with([
            'usaha' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib');
            }
        ])->orderBy('created_by', 'desc')
          ->get();
    }

    public function getPengawasanBUJKById(string $id): PengawasanBUJKLingkup2
    {
        return PengawasanBUJKLingkup2::with([
            'usaha' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib', 'pjbu', 'alamat');
            },
            'kesesuaianKegiatan' => function (Builder $query)
            {
                $query->join('paket_pekerjaan', 'kesesuaian_paket_pekerjaan_lingkup_2.paket_id', 'paket_pekerjaan.id')
                      ->select(
                            'kesesuaian_paket_pekerjaan_lingkup_2.id',
                            'paket_pekerjaan.id as paketId',
                            'kesesuaian_paket_pekerjaan_lingkup_2.pengawasan_id',
                            'paket_pekerjaan.nama_paket as namaPaket',
                            'paket_pekerjaan.tahun_anggaran as tahunAnggaran',
                            'paket_pekerjaan.jenis_usaha as jenisUsaha',
                            'kesesuaian_paket_pekerjaan_lingkup_2.kesesuaian_jenis as kesesuaianJenis',
                            'paket_pekerjaan.sifat_usaha as sifatUsaha',
                            'kesesuaian_paket_pekerjaan_lingkup_2.kesesuaian_sifat as kesesuaianSifat',
                            'paket_pekerjaan.subklasifikasi_usaha as subklasifikasiUsaha',
                            'kesesuaian_paket_pekerjaan_lingkup_2.kesesuaian_subklasifikasi as kesesuaianSubklasifikasi',
                            'paket_pekerjaan.layanan_usaha as layananUsaha',
                            'kesesuaian_paket_pekerjaan_lingkup_2.kesesuaian_layanan as kesesuaianLayanan',
                      );
            }
        ])->where('id', $id)->firstOrFail();
    }

    public function addKesesuaianKegiatan(array $data): int
    {
        $kesesuaianKegiatan = KesesuaianKegiatanLingkup2::create([
            'pengawasan_id'             => $data['pengawasan_id'],
            'paket_id'                  => $data['paket_id'],
            'kesesuaian_jenis'          => $data['kesesuaian_jenis'],
            'kesesuaian_sifat'          => $data['kesesuaian_sifat'],
            'kesesuaian_subklasifikasi' => $data['kesesuaian_subklasifikasi'],
            'kesesuaian_layanan'        => $data['kesesuaian_layanan'],
            'created_by'                => $data['created_by'],
        ]);

        return $kesesuaianKegiatan->id;
    }

    public function checkKesesuaianKegiatanExists(string $pengawasanId, string $paketId): bool
    {
        return KesesuaianKegiatanLingkup2::where([
            ['pengawasan_id', '=', $pengawasanId],
            ['paket_id', '=', $paketId],
        ])->whereNull('deleted_at')
          ->exists();
    }

    public function updateKesesuaianKegiatan(array $data): int
    {
        $kesesuaianKegiatan = KesesuaianKegiatanLingkup2::find($data['id']);

        $kesesuaianKegiatan->kesesuaian_jenis = $data['kesesuaian_jenis'];
        $kesesuaianKegiatan->kesesuaian_sifat = $data['kesesuaian_sifat'];
        $kesesuaianKegiatan->kesesuaian_subklasifikasi = $data['kesesuaian_subklasifikasi'];
        $kesesuaianKegiatan->kesesuaian_layanan = $data['kesesuaian_layanan'];

        $kesesuaianKegiatan->save();

        return $kesesuaianKegiatan->id;
    }
}
