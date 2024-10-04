<?php

namespace App\Services\Usaha;

use App\Models\Usaha\PengawasanUsahaRantaiPasok;
use Illuminate\Contracts\Database\Eloquent\Builder;

class PengawasanLingkup1Service
{
    public function addPengawasan(array $data): string
    {
        $pengawasan = PengawasanUsahaRantaiPasok::create($data);
        return $pengawasan->id;
    }

    public function checkPengawasanExists(string $id)
    {
        return PengawasanUsahaRantaiPasok::where('id', $id)->exists();
    }

    public function getDaftarPengawasanBySlug(string $slug)
    {
        return PengawasanUsahaRantaiPasok::withWhereHas('usaha', function ($query) use ($slug) {
            $query->join('usaha_rantai_pasok', 'usaha.id', 'usaha_rantai_pasok.usaha_id')
                ->join('master_jenis_usaha_rantai_pasok as rantai_pasok', 'usaha_rantai_pasok.rantai_pasok_id', 'rantai_pasok.id')
                ->where('rantai_pasok.slug', $slug)
                ->select(
                    'usaha.id', 'usaha.nama', 'usaha.nib', 'usaha.pjbu',
                );
        })->orderBy('tanggal_pengawasan', 'desc')
          ->get();
    }

    public function getPengawasanById(string $id)
    {
        return PengawasanUsahaRantaiPasok::with([
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
}
