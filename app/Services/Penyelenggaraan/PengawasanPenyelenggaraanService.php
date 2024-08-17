<?php

namespace App\Services\Penyelenggaraan;

use App\Models\Penyelenggaraan\PengawasanPenyelenggaraan;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class PengawasanPenyelenggaraanService
{
    public function addPengawasan(array $data): string
    {
        $pengawasan = PengawasanPenyelenggaraan::create([
            'jenis_pengawasan'     => $data['jenis_pengawasan'],
            'tanggal_pengawasan'   => $data['tanggal_pengawasan'],
            'proyek_konstruksi_id' => $data['proyek_konstruksi_id'],
            'created_by'           => $data['created_by'],
        ]);

        return $pengawasan->id;
    }

    public function getDaftarPengawasanBySumberDana(string $sumberDana): EloquentCollection
    {
        return PengawasanPenyelenggaraan::withWhereHas(
            'proyekKonstruksi', function ($query) use ($sumberDana)
            {
                $query->leftJoin('usaha', 'proyek_konstruksi.penyedia_jasa_id', 'usaha.id')
                      ->where('proyek_konstruksi.sumber_dana', $sumberDana)
                      ->select(
                        'proyek_konstruksi.id as id',
                        'proyek_konstruksi.nama_paket as namaPaket',
                        'proyek_konstruksi.nomor_kontrak as nomorKontrak',
                        'usaha.nama as penyediaJasa'
                    );
            }
        )->orderBy('created_at')
         ->get();
    }
}
