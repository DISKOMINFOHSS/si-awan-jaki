<?php

namespace App\Models\Usaha;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class PengawasanBUJKLingkup3 extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'pengawasan_bujk_lingkup_3';

    protected $fillable = [
        'jenis_pengawasan',
        'tanggal_pengawasan',
        'usaha_id',
        'status_izin_usaha',
        'status_verifikasi_nib',
        'tertib_bentuk_usaha',
        'tertib_kualifikasi_usaha',
        'tertib_pengawasan',
        'catatan',
        'verified_at',
        'verified_by',
        'created_by',
    ];

    protected $casts = [
        'status_verifikasi_nib'    => 'boolean',
        'tertib_bentuk_usaha'      => 'boolean',
        'tertib_kualifikasi_usaha' => 'boolean',
        'tertib_pengawasan'        => 'boolean',
    ];

    public function usaha(): BelongsTo
    {
        return $this->belongsTo(Usaha::class, 'usaha_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function verifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by')->withDefault();
    }

    public function kesesuaianKegiatan(): HasMany
    {
        return $this->hasMany(KesesuaianKegiatanLingkup3::class, 'pengawasan_id');
    }

    public function rekomendasi(): MorphOne
    {
        return $this->morphOne(RekomendasiPengawasanInsidentalBUJK::class, 'pengawasan');
    }
}
