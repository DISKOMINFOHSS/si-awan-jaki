<?php

namespace App\Services\PemanfaatanProduk;

use App\Models\PemanfaatanProduk\PengawasanPemanfaatanProduk;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class PengawasanPemanfaatanProdukService
{
    public function addPengawasan(array $data): string
    {
        $pengawasan = PengawasanPemanfaatanProduk::create([
            'jenis_pengawasan'   => $data['jenis_pengawasan'],
            'tanggal_pengawasan' => $data['tanggal_pengawasan'],
            'bangunan_id'        => $data['bangunan_id'],
            'created_by'         => $data['created_by'],
        ]);

        return $pengawasan->id;
    }

    public function getDaftarPengawasan(): EloquentCollection
    {
        return PengawasanPemanfaatanProduk::with([
            'bangunan',
            'bangunan.pemilikBangunan',
            'bangunan.pengelolaBangunan',
        ])
        ->select(
            'id',
            'jenis_pengawasan',
            'tanggal_pengawasan',
            'bangunan_id',
            'tertib_kesesuaian_fungsi',
            'tertib_kesesuaian_lokasi',
            'tertib_rencana_umur_konstruksi',
            'tertib_kapasitas_beban',
            'tertib_pemeliharaan_bangunan',
            'tertib_program_pemeliharaan',
        )
        ->orderBy('created_at')
        ->get();
    }
}
