<?php

namespace App\Http\Resources\Rekapitulasi;

use App\Http\Resources\Rekapitulasi\PengawasanTertibPemanfaatanProdukResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BangunanCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->transform(
            function ($bangunan)
            {
                return [
                    'id'                   => $bangunan->id,
                    'nama'                 => $bangunan->nama,
                    'nomorKontrak'         => $bangunan->nomor_kontrak_pembangunan,
                    'sumberDana'           => $bangunan->sumber_dana,
                    'tanggalMulaiBangun'   => $bangunan->mulai_pembangunan,
                    'tanggalSelesaiBangun' => $bangunan->selesai_pembangunan,
                    'tanggalPemanfaatan'   => $bangunan->tanggal_pemanfaatan,
                    'umurKonstruksi'       => $bangunan->umur_konstruksi,
                    'pemilikBangunan'      => $bangunan->pemilikBangunan->nama,
                    'pengelolaBangunan'    => $bangunan->pengelolaBangunan->nama,
                    'lokasi'               => $bangunan->lokasi,
                    'desaKelurahan'        => $bangunan->desa_kelurahan,
                    'kecamatan'            => $bangunan->kecamatan,
                    'daftarPengawasan'     => PengawasanTertibPemanfaatanProdukResource::collection($bangunan->pengawasan),
                ];
            }
        );
    }
}
