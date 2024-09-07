<?php

namespace App\Http\Resources\Pengawasan\TertibPenyelenggaraan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LingkupPengawasanInsidentalAPBDResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'lingkupPengawasan' => $this->lingkup_pengawasan,
            'indikator'         => $this->indikatorApbd->transform(
                function ($indikator)
                {
                    return [
                        'id'               => $indikator->id,
                        'indikator'        => $indikator->indikator,
                        'caraPemeriksaan'  => $indikator->cara_pemeriksaan,
                        'kesimpulan'       => $indikator->kesimpulan,
                        'hasilPemeriksaan' => [
                            'hasil'   => $indikator->kesimpulan_pemeriksaan,
                            'catatan' => $indikator->catatan_pemeriksaan,
                        ],
                    ];
                }
            ),
        ];
    }
}
