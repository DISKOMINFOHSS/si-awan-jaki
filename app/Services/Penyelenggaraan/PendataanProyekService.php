<?php

namespace App\Services\Penyelenggaraan;

use App\Models\Penyelenggaraan\ProyekKonstruksi;
use App\Models\Penyelenggaraan\PenggunaJasa;

class PendataanProyekService
{
    public function addProyekKonstruksi(array $data): string
    {
        $proyek = ProyekKonstruksi::create([
            'nama_paket'          => $data['nama_paket'],
            'nomor_kontrak'       => $data['nomor_kontrak'],
            'sumber_dana'         => $data['sumber_dana'],
            'tahun_anggaran'      => $data['tahun_anggaran'],
            'nilai_pagu'          => $data['nilai_pagu'],
            'nilai_kontrak'       => $data['nilai_kontrak'],
            'tanggal_kontrak'     => $data['tanggal_kontrak'],
            'mulai_pelaksanaan'   => $data['mulai_pelaksanaan'],
            'selesai_pelaksanaan' => $data['selesai_pelaksanaan'],
            'created_by'          => $data['created_by'],
        ]);

        return $proyek->id;
    }

    public function checkProyekKonstruksiExists(string $id): bool
    {
        return ProyekKonstruksi::where('id', $id)->exists();
    }

    // Penyedia Jasa
    public function addPenyediaJasaToProyekKonstruksi(string $id, string $penyediaJasaId): string
    {
        $proyek = ProyekKonstruksi::find($id);
        $proyek->penyedia_jasa_id = $penyediaJasaId;

        $proyek->save();

        return $proyek->id;
    }

    // Pengguna Jasa
    public function addPenggunaJasa(array $data): string
    {
        $penggunaJasa = PenggunaJasa::create([
            'nama'             => $data['nama'],
            'pelaku_pengadaan' => $data['pelaku_pengadaan'],
            'nip'              => $data['nip'],
            'jabatan'          => $data['jabatan'],
            'sk'               => $data['sk'],
            'instansi'         => $data['instansi'],
            'alamat'           => $data['alamat'],
            'created_by'       => $data['created_by'],
        ]);

        return $penggunaJasa->id;
    }

    public function addPenggunaJasaToProyekKonstruksi(string $id, string $penggunaJasaId): string
    {
        $proyek = ProyekKonstruksi::find($id);
        $proyek->pengguna_jasa_id = $penggunaJasaId;

        $proyek->save();

        return $proyek->id;
    }
}
