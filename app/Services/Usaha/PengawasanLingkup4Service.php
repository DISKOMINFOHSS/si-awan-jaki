<?php

namespace App\Services\Usaha;

use App\Models\Usaha\PengawasanBUJKLingkup4;
use App\Models\Usaha\PengawasanUsahaPerseorangan;
use App\Models\Usaha\RekomendasiPengawasanInsidentalBUJK;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Facades\DB;

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

    public function addRekomendasiPengawasanInsidentalBUJK(string $id, array $data)
    {
        $pengawasan = PengawasanBUJKLingkup4::find($id);

        $rekomendasi = RekomendasiPengawasanInsidentalBUJK::firstOrNew(['pengawasan_id' => $pengawasan->id]);

        $rekomendasi->rekomendasi = $data['rekomendasi'];
        $rekomendasi->keterangan = $data['keterangan'];
        $rekomendasi->created_by = $data['created_by'];

        $pengawasan->rekomendasi()->save($rekomendasi);
    }

    public function addPengawasanUsahaPerseorangan(array $data)
    {
        $pengawasan = PengawasanUsahaPerseorangan::create([
            'jenis_pengawasan'      => $data['jenis_pengawasan'],
            'tanggal_pengawasan'    => $data['tanggal_pengawasan'],
            'usaha_id'              => $data['usaha_id'],
            'created_by'            => $data['created_by'],
        ]);

        return $pengawasan->id;
    }

    public function checkPengawasanUsahaPerseoranganExists(string $id): bool
    {
        return PengawasanUsahaPerseorangan::where('id', $id)->exists();
    }

    public function getDaftarPengawasanUsahaPerseorangan()
    {
        return PengawasanUsahaPerseorangan::with([
            'usaha' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib');
            }
        ])->orderBy('tanggal_pengawasan', 'desc')
          ->get();
    }

    public function getDaftarPengawasanUsahaPerseoranganWithSKKAktif()
    {
        return PengawasanUsahaPerseorangan::with([
            'usaha' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib', 'alamat');
            },
            'usaha.skk' => function (Builder $query)
            {
                $query->where('status', true);
            }
        ])->orderBy('tanggal_pengawasan', 'desc')
          ->get();
    }

    public function getPengawasanUsahaPerseoranganById(string $id)
    {
        return PengawasanUsahaPerseorangan::with([
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

    public function verifyPengawasanUsahaPerseorangan(string $id, array $data)
    {
        $pengawasan = PengawasanUsahaPerseorangan::find($id);

        $pengawasan->tertib_persyaratan_skk = $data['tertib_persyaratan_skk'];
        $pengawasan->tertib_persyaratan_nib = $data['tertib_persyaratan_nib'];
        $pengawasan->tertib_pengawasan = $data['tertib_pengawasan'];
        $pengawasan->catatan = $data['catatan'];

        $pengawasan->verified_by = $data['verified_by'];
        $pengawasan->verified_at = now();

        $pengawasan->save();
    }

    public function deletePengawasanUsahaPerseorangan(string $id)
    {
        $pengawasan = PengawasanUsahaPerseorangan::find($id);
        $pengawasan->delete();
    }

    public function addRekomendasiPengawasanUsahaPerseorangan(string $pengawasanId, array $data)
    {
        DB::table('rekomendasi_pengawasan_usaha_perseorangan')->updateOrInsert(
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

    public function getRekomendasiPengawasanByPengawasanId(string $pengawasanId)
    {
        return DB::table('rekomendasi_pengawasan_usaha_perseorangan')->where('pengawasan_id', $pengawasanId)->first();
    }
}
