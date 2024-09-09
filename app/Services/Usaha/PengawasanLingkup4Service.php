<?php

namespace App\Services\Usaha;

use App\Models\Usaha\PengawasanBUJKLingkup4;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class PengawasanLingkup4Service
{
    public function addPengawasanBUJK(array $data): string
    {
        $pengawasan = PengawasanBUJKLingkup4::create([
            'jenis_pengawasan'      => $data['jenis_pengawasan'],
            'tanggal_pengawasan'    => $data['tanggal_pengawasan'],
            'usaha_id'              => $data['usaha_id'],
            'created_by'            => $data['created_by'],
        ]);

        return $pengawasan->id;
    }

    public function checkPengawasanBUJKExists(string $id): bool
    {
        return PengawasanBUJKLingkup4::where('id', $id)->exists();
    }

    public function deletePengawasanBUJK(string $id)
    {
        $pengawasan = PengawasanBUJKLingkup4::find($id);
        $pengawasan->delete();
    }

    public function getDaftarPengawasanBUJK(): EloquentCollection
    {
        return PengawasanBUJKLingkup4::with([
            'usaha' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib');
            }
        ])->orderBy('tanggal_pengawasan', 'desc')
          ->get();
    }

    public function getPengawasan(string $id): PengawasanBUJKLingkup4
    {
        return PengawasanBUJKLingkup4::find($id);
    }

    public function getPengawasanBUJKById(string $id): PengawasanBUJKLingkup4
    {
        return PengawasanBUJKLingkup4::with([
            'usaha' => function (Builder $query)
            {
                $query->leftJoin('files', 'files.id', 'usaha.dokumen_nib')
                      ->select(
                        'usaha.id', 'usaha.nama', 'usaha.nib', 'usaha.pjbu', 'usaha.alamat',
                        'usaha.dokumen_nib', 'files.path', 'files.name',
                      );
            }
        ])->where('id', $id)->firstOrFail();
    }

    public function updatePengawasan(string $id, array $data)
    {
        $pengawasan = PengawasanBUJKLingkup4::find($id);
        $pengawasan->tanggal_pengawasan = $data['tanggal_pengawasan'];

        $pengawasan->save();

        return $pengawasan;
    }

    public function verifyPengawasanBUJK(string $id, array $data)
    {
        $pengawasan = PengawasanBUJKLingkup4::find($id);

        $pengawasan->tertib_persyaratan_sbu = $data['tertib_persyaratan_sbu'];
        $pengawasan->tertib_persyaratan_nib = $data['tertib_persyaratan_nib'];
        $pengawasan->tertib_pengawasan = $data['tertib_pengawasan'];
        $pengawasan->catatan = $data['catatan'];

        $pengawasan->verified_by = $data['verified_by'];
        $pengawasan->verified_at = now();

        $pengawasan->save();
    }
}
