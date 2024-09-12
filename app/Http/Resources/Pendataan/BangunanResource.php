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
            'tanggalMulaiBangun'   => $this->mulai_pembangunan,
            'tanggalSelesaiBangun' => $this->selesai_pembangunan,
            'tanggalPemanfaatan'   => $this->tanggal_pemanfaatan,
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
            'daftarBuktiDukung'    => $this->whenHas('daftar_bukti_dukung'),
        ];
    }
}
