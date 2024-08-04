<?php

namespace App\Http\Resources\Pendataan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BUJKResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                  => $this->id,
            'nama'                => $this->nama,
            'nib'                 => $this->nib,
            'dokumenNIB'          => $this->when($this->dokumen_nib, [
                'fileId'   => $this->dokumen_nib,
                'fileName' => $this->name,
                'filePath' => Storage::url($this->path),
            ]),
            'pjbu'                => $this->pjbu,
            'alamat'              => $this->alamat,
            'jenisUsaha'          => $this->whenLoaded('jenisUsaha'),
            'sertifikatStandar'   => $this->sertifikat_standar->transform(
                function ($sertifikat)
                {
                    return [
                        'id'              => $sertifikat->id,
                        'nomorSertifikat' => $sertifikat->nomor_sertifikat,
                        'jenisUsaha'      => $sertifikat->jenis_usaha,
                        'subklasifikasi'  => $sertifikat->subklasifikasi,
                        'status'          => (bool)$sertifikat->status,
                        'fileId'          => $sertifikat->sertifikat_id,
                        'fileName'        => $sertifikat->name,
                        'filePath'        => Storage::url($sertifikat->path),
                    ];
                }
            ),
            'daftarLaporan'        => $this->laporan,
            'daftarPaketPekerjaan' => $this->daftar_paket_pekerjaan,
        ];
    }
}
