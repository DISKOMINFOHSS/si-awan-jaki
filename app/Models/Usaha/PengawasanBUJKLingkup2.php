<?php

namespace App\Models\Usaha;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PengawasanBUJKLingkup2 extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'pengawasan_bujk_lingkup_2';

    protected $fillable = [
        'jenis_pengawasan',
        'tanggal_pengawasan',
        'usaha_id',
        'status_izin_usaha',
        'status_verifikasi_nib',
        'tertib_jenis_usaha',
        'tertib_sifat_usaha',
        'tertib_klasifikasi_usaha',
        'tertib_layanan_usaha',
        'tertib_pengawasan',
        'catatan',
        'verified_at',
        'verified_by',
        'created_by',
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
        return $this->hasMany(KesesuaianKegiatanLingkup2::class, 'pengawasan_id');
    }
}
