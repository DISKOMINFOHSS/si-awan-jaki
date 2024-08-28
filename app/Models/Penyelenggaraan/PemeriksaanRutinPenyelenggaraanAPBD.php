<?php

namespace App\Models\Penyelenggaraan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PemeriksaanRutinPenyelenggaraanAPBD extends Model
{
    protected $table = 'master_pemeriksaan_pengawasan_rutin_penyelenggaraan_dana_apbd';
    protected $primaryKey = 'lingkup_id';

    public $incrementing = false;
    public $timestamps = false;

    protected $casts = [
        'cara_pemeriksaan' => 'array',
        'kesimpulan'       => 'array',
    ];

    public function indikator(): HasMany
    {
        return $this->hasMany(IndikatorPengawasanPenyelenggaraanAPBD::class, 'lingkup_id', 'lingkup_id');
    }

    public function suratPernyataan(): HasMany
    {
        return $this->hasMany(SuratPernyataanPenyelenggaraan::class, 'lingkup_id', 'lingkup_id');
    }
}
