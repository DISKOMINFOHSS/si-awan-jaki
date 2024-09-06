<?php

namespace App\Models\Penyelenggaraan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LingkupPengawasanPenyelenggaraan extends Model
{
    protected $table = 'master_lingkup_pengawasan_penyelenggaraan';
    public $timestamps = false;

    public function indikatorApbd(): HasMany
    {
        return $this->hasMany(IndikatorPengawasanPenyelenggaraanAPBD::class, 'lingkup_id');
    }
}
