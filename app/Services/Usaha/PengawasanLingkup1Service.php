<?php

namespace App\Services\Usaha;

use App\Models\Usaha\PengawasanUsahaRantaiPasok;

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
}
