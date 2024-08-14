<?php

namespace App\Services\Penyelenggaraan;

use App\Models\Penyelenggaraan\ProyekKonstruksi;
use App\Models\Penyelenggaraan\PenggunaJasa;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class PendataanProyekService
{
    public function getDaftarProyekKonstruksi(): EloquentCollection
    {
        return ProyekKonstruksi::with([
            'penyediaJasa' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib', 'pjbu', 'alamat');
            },
            'penggunaJasa' => function (Builder $query)
            {
                $query->select('id', 'nama', 'pelaku_pengadaan as pelakuPengadaan');
            }
        ])->get();
    }
}
