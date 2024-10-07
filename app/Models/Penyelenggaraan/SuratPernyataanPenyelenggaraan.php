<?php

namespace App\Models\Penyelenggaraan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SuratPernyataanPenyelenggaraan extends Model
{
    protected $table = 'master_kategori_surat_pernyataan_pengawasan_penyelenggaraan';

    public $timestamps = false;

    public function lingkupPengawasan(): BelongsTo
    {
        return $this->belongsTo(PemeriksaanRutinPenyelenggaraanAPBD::class, 'lingkup_id', 'lingkup_id');
    }
}
