<?php

namespace App\Http\Resources\Pengawasan\TertibUsaha;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PengawasanUsahaRantaiPasokResource extends JsonResource
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
            'id'                             => $this->id,
            'jenisPengawasan'                => $this->jenis_pengawasan,
            'tanggalPengawasan'              => $this->tanggal_pengawasan,
            'usaha'                          => [
                'id'                      => $usaha->id,
                'nama'                    => $usaha->nama,
                'nib'                     => $usaha->nib,
                'dokumenNIB'              => $this->when($usaha->dokumen_nib, [
                    'fileName' => $usaha->name,
                    'filePath' => Storage::url($usaha->path),
                ]),
                'pjbu'                    => $usaha->pjbu,
                'alamat'                  => $usaha->alamat
            ],
            'kepemilikanPerizinanBerusaha'   => $this->kepemilikan_perizinan_berusaha,
            'keabsahanPerizinanBerusaha'     => $this->keabsahan_perizinan_berusaha,
            'kapasitasTerpasang'             => $this->kapasitas_terpasang,
            'kepemilikanPerizinanPenggunaan' => $this->kepemilikan_perizinan_penggunaan,
            'keabsahanPerizinanPenggunaan'   => $this->keabsahan_perizinan_penggunaan,
            'daftarMaterialKonstruksi'       => $this->whenNotNull($this->material_konstruksi),
            'daftarPeralatanKonstruksi'      => $this->whenNotNull($this->peralatan_konstruksi),
            'tertibPerizinanBerusaha'        => $this->tertib_perizinan_berusaha,
            'tertibPerizinanPenggunaan'      => $this->tertib_perizinan_penggunaan,
            'tertibPencatatanSIMPK'          => $this->tertib_pencatatan_simpk,
            'tertibPengawasan'               => $this->tertib_pengawasan,
            'catatan'                        => $this->catatan,
            'rekomendasi'                    => $this->whenHas('rekomendasi'),
            'createdBy'                      => $this->createdBy->nama,
            'verifiedAt'                     => $this->verified_at ? $this->verified_at : null,
            'verifiedBy'                     => $this->verifiedBy->nama,
        ];
    }
}
