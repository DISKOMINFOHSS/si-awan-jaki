<?php

namespace App\Models\Usaha;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JenisUsaha extends Model
{
    protected $table = 'master_jenis_usaha';
    public $timestamps = false;

    public function usaha(): HasMany
    {
        return $this->hasMany(Usaha::class);
    }
}
