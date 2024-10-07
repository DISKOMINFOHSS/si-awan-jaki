<?php

namespace App\Http\Resources\Rekapitulasi;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengawasanTertibPemanfaatanProdukResource extends JsonResource
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
            'tertibKesesuaianFungsi'      => $this->tertib_kesesuaian_fungsi,
            'tertibKesesuaianLokasi'      => $this->tertib_kesesuaian_lokasi,
            'tertibRencanaUmurKonstruksi' => $this->tertib_rencana_umur_konstruksi,
            'tertibKapasitasBeban'        => $this->tertib_kapasitas_beban,
            'tertibPemeliharaanBangunan'  => $this->tertib_pemeliharaan_bangunan,
            'tertibProgramPemeliharaan'   => $this->tertib_program_pemeliharaan,
            'tertibPengawasan'            => $this->tertib_pengawasan,
            'catatan'                     => $this->catatan,
            'createdBy'                   => $this->createdBy->nama,
            'verifiedAt'                  => $this->verified_at,
            'verifiedBy'                  => $this->verifiedBy->nama,
        ];
    }
}
