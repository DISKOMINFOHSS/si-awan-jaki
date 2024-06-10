<?php

namespace App\Http\Resources\Pendataan;

use Carbon\Carbon;
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
        return $this->collection->transform( function ($bangunan) {
            return [
                'id'                   => $bangunan->id,
                'nama'                 => $bangunan->nama,
                'nomorKontrak'         => $bangunan->nomor_kontrak_pembangunan,
                'sumberDana'           => $bangunan->sumber_dana,
                'tanggalMulaiBangun'   => Carbon::parse($bangunan->mulai_pembangunan)->locale('id')->isoFormat('D MMMM Y'),
                'tanggalSelesaiBangun' => Carbon::parse($bangunan->selesai_pembangunan)->locale('id')->isoFormat('D MMMM Y'),
                'tanggalPemanfaatan'   => Carbon::parse($bangunan->tanggal_pemanfaatan)->locale('id')->isoFormat('D MMMM Y'),
                'umurKonstruksi'       => $bangunan->umur_konstruksi,
                'pemilikBangunan'      => $bangunan->pemilikBangunan->nama,
                'pengelolaBangunan'    => $bangunan->pengelolaBangunan->nama,
                'lokasi'               => $bangunan->lokasi,
                'desaKelurahan'        => $bangunan->desa_kelurahan,
                'kecamatan'            => $bangunan->kecamatan,
            ];
        });
    }
}
