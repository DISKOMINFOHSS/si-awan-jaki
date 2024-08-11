<?php

namespace App\Http\Resources\Pendataan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProyekKonstruksiCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->transform(function ($proyek)
        {
            return [
                'id'                        => $proyek->id,
                'namaPaket'                 => $proyek->nama_paket,
                'nomorKontrak'              => $proyek->nomor_kontrak,
                'sumberDana'                => $proyek->sumber_dana,
                'tahunAnggaran'             => $proyek->tahun_anggaran,
                'nilaiPagu'                 => $proyek->nilai_pagu,
                'nilaiKontrak'              => $proyek->nilai_kontrak,
                'tanggalMulaiPelaksanaan'   => $proyek->mulai_pelaksanaan,
                'tanggalSelesaiPelaksanaan' => $proyek->selesai_pelaksanaan,
                'penyediaJasa'              => $proyek->penyediaJasa,
            ];
        });
    }
}
