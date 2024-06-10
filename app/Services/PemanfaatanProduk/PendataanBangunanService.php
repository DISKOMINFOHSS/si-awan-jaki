<?php

namespace App\Services\PemanfaatanProduk;

use App\Models\PemanfaatanProduk\Bangunan;
use App\Models\PemanfaatanProduk\PemilikPengelolaBangunan;

class PendataanBangunanService
{
    public function addPemilikPengelolaBangunan(array $data): int
    {
        $pemilikPengelola = PemilikPengelolaBangunan::firstOrCreate(
            [
                'nama'       => $data['nama']
            ],
            [
                'nip'        => $data['nip'],
                'jabatan'    => $data['jabatan'],
                'instansi'   => $data['instansi'],
                'alamat'     => $data['alamat'],
                'created_by' => $data['created_by'],
            ]
        );

        return $pemilikPengelola->id;
    }

    public function addBangunan(array $data): string
    {
        $bangunan = Bangunan::create([
            'nama'                      => $data['nama'],
            'nomor_kontrak_pembangunan' => $data['nomor_kontrak_pembangunan'],
            'sumber_dana'               => $data['sumber_dana'],
            'mulai_pembangunan'         => $data['mulai_pembangunan'],
            'selesai_pembangunan'       => $data['selesai_pembangunan'],
            'tanggal_pemanfaatan'       => $data['tanggal_pemanfaatan'],
            'umur_konstruksi'           => $data['umur_konstruksi'],
            'pemilik_bangunan'          => $data['pemilik_bangunan'],
            'sk_pemilik'                => $data['sk_pemilik'],
            'pengelola_bangunan'        => $data['pengelola_bangunan'],
            'sk_pengelola'              => $data['sk_pengelola'],
            'lokasi'                    => $data['lokasi'],
            'desa_kelurahan'            => $data['desa_kelurahan'],
            'kecamatan'                 => $data['kecamatan'],
            'created_by'                => $data['created_by'],
        ]);

        return $bangunan->id;
    }
}
