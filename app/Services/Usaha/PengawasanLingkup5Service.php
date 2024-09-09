<?php

namespace App\Services\Usaha;

use App\Models\Usaha\PemeriksaanPengembanganUsahaLingkup5;
use App\Models\Usaha\PengawasanBUJKLingkup5;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Collection as DBCollection;
use Illuminate\Support\Facades\DB;

class PengawasanLingkup5Service
{
    public function checkPemeriksaanPengembanganUsahaExists(string $id): bool
    {
        return DB::table('master_pemeriksaan_pengembangan_usaha as pemeriksaan')->where('id', $id)->exists();
    }

    public function deletePengawasanBUJK(string $id)
    {
        $pengawasan = PengawasanBUJKLingkup5::find($id);
        $pengawasan->delete();
    }

    public function getDaftarPemeriksaanPengembanganUsaha(string $pengawasanId): DBCollection
    {
        return DB::table('master_pemeriksaan_pengembangan_usaha as pemeriksaan')
            ->leftJoin('pemeriksaan_pengembangan_usaha_lingkup_5 as hasil_pemeriksaan', function (JoinClause $join) use ($pengawasanId)
            {
                $join->on('pemeriksaan.id', '=', 'hasil_pemeriksaan.pemeriksaan_id')
                     ->where('hasil_pemeriksaan.pengawasan_id', $pengawasanId);
            })
            ->select(
                'pemeriksaan.*',
                'hasil_pemeriksaan.hasil_pemeriksaan',
                'hasil_pemeriksaan.catatan_pemeriksaan',
            )
            ->orderBy('pemeriksaan.id')->get();
    }

    public function addPengawasanBUJK(array $data): string
    {
        $pengawasan = PengawasanBUJKLingkup5::create([
            'jenis_pengawasan'      => $data['jenis_pengawasan'],
            'tanggal_pengawasan'    => $data['tanggal_pengawasan'],
            'usaha_id'              => $data['usaha_id'],
            'created_by'            => $data['created_by'],
        ]);

        return $pengawasan->id;
    }

    public function checkPengawasanBUJKExists(string $id): bool
    {
        return PengawasanBUJKLingkup5::where('id', $id)->exists();
    }

    public function getPengawasanBUJK(string $id): PengawasanBUJKLingkup5
    {
        return PengawasanBUJKLingkup5::find($id);
    }

    public function getDaftarPengawasanBUJK(): EloquentCollection
    {
        return PengawasanBUJKLingkup5::with([
            'usaha' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib');
            }
        ])->orderBy('created_by', 'desc')
          ->get();
    }

    public function getPengawasanBUJKById(string $id): PengawasanBUJKLingkup5
    {
        return PengawasanBUJKLingkup5::with([
            'usaha' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib', 'pjbu', 'alamat');
            },
        ])->where('id', $id)->firstOrFail();
    }

    public function updatePengawasanBUJK(string $id, array $data)
    {
        $pengawasan = PengawasanBUJKLingkup5::find($id);
        $pengawasan->tanggal_pengawasan = $data['tanggal_pengawasan'];

        $pengawasan->save();

        return $pengawasan;
    }

    public function verifyPengawasanBUJK(string $id, array $data)
    {
        $pengawasan = PengawasanBUJKLingkup5::find($id);

        $pengawasan->tertib_pengembangan_usaha = $data['tertib_pengembangan_usaha'];
        $pengawasan->tertib_pengawasan = $data['tertib_pengawasan'];
        $pengawasan->catatan = $data['catatan'];

        $pengawasan->verified_by = $data['verified_by'];
        $pengawasan->verified_at = now();

        $pengawasan->save();
    }

    public function addPemeriksaanPengembanganUsaha(array $data): string
    {
        $pemeriksaan = PemeriksaanPengembanganUsahaLingkup5::firstOrNew([
            'pengawasan_id'  => $data['pengawasan_id'],
            'pemeriksaan_id' => $data['pemeriksaan_id'],
        ]);

        $pemeriksaan->hasil_pemeriksaan = $data['hasil_pemeriksaan'];
        $pemeriksaan->catatan_pemeriksaan = $data['catatan_pemeriksaan'];
        $pemeriksaan->created_by = $data['created_by'];

        $pemeriksaan->save();

        return $pemeriksaan->id;
    }
}
