<?php

namespace App\Models\Penyelenggaraan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class IndikatorPengawasanPenyelenggaraanAPBD extends Model
{
    protected $table = 'master_indikator_pengawasan_penyelenggaraan_dana_apbd';

    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = false;

    public function lingkupPengawasan(): BelongsTo
    {
        return $this->belongsTo(PemeriksaanRutinPenyelenggaraanAPBD::class, 'lingkup_id', 'lingkup_id');
    }
}
