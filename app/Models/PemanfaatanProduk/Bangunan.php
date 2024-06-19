<?php

namespace App\Models\PemanfaatanProduk;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bangunan extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'bangunan';

    protected $fillable = [
        'nama',
        'nomor_kontrak_pembangunan',
        'sumber_dana',
        'mulai_pembangunan',
        'selesai_pembangunan',
        'tanggal_pemanfaatan',
        'umur_konstruksi',
        'pemilik_bangunan',
        'sk_pemilik',
        'pengelola_bangunan',
        'sk_pengelola_bangunan',
        'lokasi',
        'desa_kelurahan',
        'kecamatan',
        'created_by',
    ];

    public function pemilikBangunan(): BelongsTo
    {
        return $this->belongsTo(PemilikPengelolaBangunan::class, 'pemilik_bangunan');
    }

    public function pengelolaBangunan(): BelongsTo
    {
        return $this->belongsTo(PemilikPengelolaBangunan::class, 'pengelola_bangunan');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function pengawasan(): HasMany
    {
        return $this->hasMany(PengawasanPemanfaatanProduk::class, 'bangunan_id');
    }
}
