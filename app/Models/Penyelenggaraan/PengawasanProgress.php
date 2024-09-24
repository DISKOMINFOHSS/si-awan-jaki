<?php

namespace App\Models\Penyelenggaraan;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PengawasanProgress extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'pengawasan_progress_proyek_konstruksi';

    protected $fillable = [
        'proyek_konstruksi_id',
        'tahun_pengawasan',
        'kode_urusan',
        'urusan',
        'kode_bidang',
        'bidang',
        'kode_program',
        'program',
        'kode_kegiatan',
        'kegiatan',
        'kode_subkegiatan',
        'subkegiatan',
        'latitude',
        'longitude',
        'realisasi_fisik',
        'realisasi_keuangan',
        'status',
        'created_by',
    ];

    public function proyekKonstruksi(): BelongsTo
    {
        return $this->belongsTo(ProyekKonstruksi::class, 'proyek_konstruksi_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function realisasiFisik(): HasMany
    {
        return $this->hasMany(RealisasiFisikPengawasanProgress::class, 'pengawasan_id');
    }

    public function realisasiKeuangan(): HasMany
    {
        return $this->hasMany(RealisasiKeuanganPengawasanProgress::class, 'pengawasan_id');
    }
}
