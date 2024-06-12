<?php

namespace App\Http\Resources\Pendataan;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BangunanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $pemilik = $this->pemilikBangunan;
        $pengelola = $this->pengelolaBangunan;

        return [
            'id'                   => $this->id,
            'nama'                 => $this->nama,
            'nomorKontrak'         => $this->nomor_kontrak_pembangunan,
            'sumberDana'           => $this->sumber_dana,
            'tanggalMulaiBangun'   => Carbon::parse($this->mulai_pembangunan)->locale('id')->isoFormat('D MMMM Y'),
            'tanggalSelesaiBangun' => Carbon::parse($this->selesai_pembangunan)->locale('id')->isoFormat('D MMMM Y'),
            'tanggalPemanfaatan'   => Carbon::parse($this->tanggal_pemanfaatan)->locale('id')->isoFormat('D MMMM Y'),
            'umurKonstruksi'       => $this->umur_konstruksi,
            'pemilikBangunan'      => [
                'nama'     => $pemilik->nama,
                'nip'      => $pemilik->nip,
                'jabatan'  => $pemilik->jabatan,
                'sk'       => $this->sk_pemilik,
                'instansi' => $pemilik->instansi,
                'alamat'   => $pemilik->alamat,
            ],
            'pengelolaBangunan'    => [
                'nama'     => $pengelola->nama,
                'nip'      => $pengelola->nip,
                'jabatan'  => $pengelola->jabatan,
                'sk'       => $this->sk_pengelola,
                'instansi' => $pengelola->instansi,
                'alamat'   => $pengelola->alamat,
            ],
            'lokasi'               => $this->lokasi,
            'desaKelurahan'        => $this->desa_kelurahan,
            'kecamatan'            => $this->kecamatan,
        ];
    }
}
