<?php

namespace App\Http\Resources\Pengawasan\TertibUsaha;

use App\Http\Resources\Pendataan\SertifikatStandarBUJKResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PengawasanInsidentalBUJKLingkup4Resource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $usaha = $this->whenLoaded('usaha');

        return [
            'id'                   => $this->id,
            'jenisPengawasan'      => $this->jenis_pengawasan,
            'tanggalPengawasan'    => $this->tanggal_pengawasan,
            'usaha'                => [
                'id'                      => $usaha->id,
                'nama'                    => $usaha->nama,
                'nib'                     => $usaha->nib,
                'dokumenNIB'              => $this->when($usaha->dokumen_nib, [
                    'fileName' => $usaha->name,
                    'filePath' => Storage::url($usaha->path),
                ]),
                'pjbu'                    => $usaha->pjbu,
                'alamat'                  => $usaha->alamat,
                'daftarSertifikatStandar' => $usaha->sertifikat_standar ? SertifikatStandarBUJKResource::collection($usaha->sertifikat_standar) : null,
            ],
            'tertibPersyaratanSBU' => $this->tertib_persyaratan_sbu,
            'tertibPersyaratanNIB' => $this->tertib_persyaratan_nib,
            'tertibPengawasan'     => $this->tertib_pengawasan,
            'catatan'              => $this->catatan,
            'createdBy'            => $this->createdBy->nama,
            'verifiedAt'           => $this->verified_at ? $this->verified_at : null,
            'verifiedBy'           => $this->verifiedBy->nama,
        ];
    }
}
