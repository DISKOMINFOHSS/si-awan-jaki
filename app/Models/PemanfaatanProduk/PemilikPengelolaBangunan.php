<?php

namespace App\Models\PemanfaatanProduk;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PemilikPengelolaBangunan extends Model
{
    use SoftDeletes;

    protected $table = 'pemilik_pengelola_bangunan';

    protected $fillable = [
        'nama',
        'nip',
        'jabatan',
        'instansi',
        'alamat',
        'created_by',
    ];
}
