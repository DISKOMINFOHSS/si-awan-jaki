<?php

namespace App\Models\Penyelenggaraan;

use App\Enums\PelakuPengadaan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PenggunaJasa extends Model
{
    use SoftDeletes;

    protected $table = 'pengguna_jasa_konstruksi';

    protected $fillable = [
        'nama',
        'pelaku_pengadaan',
        'nip',
        'jabatan',
        'sk',
        'instansi',
        'alamat',
        'created_by'
    ];

    protected $casts = [
        'pelaku_pengadaan' => PelakuPengadaan::class,
    ];
}
