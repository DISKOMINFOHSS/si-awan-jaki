<?php

namespace App\Models\Penyelenggaraan;

use App\Models\User;
use App\Models\Usaha\Usaha;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProyekKonstruksi extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'proyek_konstruksi';

    protected $fillable = [
        'kode_paket',
        'nama_paket',
        'nomor_kontrak',
        'sumber_dana',
        'tahun_anggaran',
        'nilai_pagu',
        'nilai_kontrak',
        'tanggal_kontrak',
        'mulai_pelaksanaan',
        'selesai_pelaksanaan',
        'penyedia_jasa_id',
        'pengguna_jasa_id',
        'created_by',
    ];

    public function penyediaJasa(): BelongsTo
    {
        return $this->belongsTo(Usaha::class, 'penyedia_jasa_id');
    }

    public function penggunaJasa(): BelongsTo
    {
        return $this->belongsTo(PenggunaJasa::class, 'pengguna_jasa_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function pengawasan(): HasMany
    {
        return $this->hasMany(PengawasanPenyelenggaraan::class, 'proyek_konstruksi_id');
    }
}
