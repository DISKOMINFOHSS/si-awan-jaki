<?php

namespace App\Http\Resources\Rekapitulasi;

use App\Http\Resources\Pengawasan\TertibUsaha\PengawasanUsahaPerseoranganResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengawasanTertibUsahaPerseoranganResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->whenHas('pengawasan_id'),
            'tahun'            => $this->tahun,
            'usahaId'          => $this->id,
            'nama'             => $this->nama,
            'nib'              => $this->nib,
            'alamat'           => $this->alamat,
            'skk'              => $this->whenLoaded('skk'),
            'daftarPengawasan' => $this->whenLoaded('pengawasanUsahaPerseorangan')->transform(
                function ($pengawasan) {
                    return [
                        'id'                => $pengawasan->id,
                        'jenisPengawasan'   => $pengawasan->jenis_pengawasan,
                        'tanggalPengawasan' => $pengawasan->tanggal_pengawasan,
                        'tertibPengawasan'  => $pengawasan->tertib_pengawasan,
                        'catatan'           => $pengawasan->catatan,
                    ];
                }
            ),
            'tertibPengawasan' => $this->whenHas('tertib_pengawasan'),
            'catatan'          => $this->whenHas('catatan'),
        ];;
    }
}
