<?php

namespace App\Models\Usaha;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PengawasanBUJKLingkup5 extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'pengawasan_bujk_lingkup_5';

    protected $fillable = [
        'jenis_pengawasan',
        'tanggal_pengawasan',
        'usaha_id',
        'tertib_pengembangan_usaha',
        'tertib_pengawasan',
        'catatan',
        'verified_at',
        'verified_by',
        'created_by',
    ];

    protected $casts = [
        'tertib_pengembangan_usaha' => 'boolean',
        'tertib_pengawasan'         => 'boolean',
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
