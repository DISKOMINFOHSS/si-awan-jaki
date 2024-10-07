<?php

namespace App\Http\Resources\Pengawasan\TertibPemanfaatanProduk;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengawasanPemanfaatanProdukResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                          => $this->id,
            'jenisPengawasan'             => $this->jenis_pengawasan,
            'tanggalPengawasan'           => $this->tanggal_pengawasan,
            'bangunan'                    => $this->whenLoaded('bangunan'),
            'tertibKesesuaianFungsi'      => $this->tertib_kesesuaian_fungsi,
            'tertibKesesuaianLokasi'      => $this->tertib_kesesuaian_lokasi,
            'tertibRencanaUmurKonstruksi' => $this->tertib_rencana_umur_konstruksi,
            'tertibKapasitasBeban'        => $this->tertib_kapasitas_beban,
            'tertibPemeliharaanBangunan'  => $this->tertib_pemeliharaan_bangunan,
            'tertibProgramPemeliharaan'   => $this->tertib_program_pemeliharaan,
            'tertibPengawasan'            => $this->tertib_pengawasan,
        ];
    }
}
