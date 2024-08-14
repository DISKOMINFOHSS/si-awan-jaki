<?php

namespace App\Services\Penyelenggaraan;

use App\Models\Penyelenggaraan\ProyekKonstruksi;
use App\Models\Penyelenggaraan\PenggunaJasa;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

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

    public function getDaftarProyekKonstruksi(): EloquentCollection
    {
        return ProyekKonstruksi::with([
            'penyediaJasa' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib', 'pjbu', 'alamat');
            }
        ])->orderBy('tahun_anggaran', 'asc')
          ->orderBy('nama_paket')
          ->get();
    }

    public function getProyekKonstruksiById(string $id): ProyekKonstruksi
    {
        return ProyekKonstruksi::with([
            'penyediaJasa' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib', 'pjbu', 'alamat');
            },
            'penggunaJasa'
        ])->where('id', $id)->first();
    }
}
