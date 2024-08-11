<?php

namespace App\Http\Resources\Pendataan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProyekKonstruksiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'    => $this->id,
            'namaPaket' => $this->nama_paket,
            'nomorKontrak' => $this->nomor_kontrak,
            'sumberDana' => $this->sumber_dana,
            'tahunAnggaran' => $this->tahun_anggaran,
            'nilaiKontrak' => $this->nilai_kontrak,
            'nilaiPagu' => $this->nilai_pagu,
            'tanggalKontrak' => $this->tanggal_kontrak,
            'tanggalMulaiPelaksanaan' => $this->mulai_pelaksanaan,
            'tanggalSelesaiPelaksanaan' => $this->selesai_pelaksanaan,
            'penyediaJasa' => $this->whenLoaded('penyediaJasa'),
            'penggunaJasa' => $this->whenLoaded('penggunaJasa'),
        ];
    }
}
