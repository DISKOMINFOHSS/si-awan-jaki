<?php

namespace App\Models\Usaha;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PengawasanUsahaPerseorangan extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'pengawasan_usaha_perseorangan_lingkup_4';

    protected $fillable = [
        'jenis_pengawasan',
        'tanggal_pengawasan',
        'usaha_id',
        'tertib_persyaratan_skk',
        'tertib_persyaratan_nib',
        'tertib_pengawasan',
        'catatan',
        'verified_at',
        'verified_by',
        'created_by',
    ];

    protected $casts = [
        'tertib_persyaratan_skk' => 'boolean',
        'tertib_persyaratan_nib' => 'boolean',
        'tertib_pengawasan'      => 'boolean',
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
}
