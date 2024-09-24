<?php

namespace App\Models\Penyelenggaraan;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RealisasiKeuanganPengawasanProgress extends Model
{
    use SoftDeletes;

    protected $table = 'realisasi_keuangan_pengawasan_progress';

    protected $fillable = [
        'pengawasan_id',
        'tanggal',
        'jumlah_pembayaran',
        'tanggal_dibayar',
        'realisasi',
        'url',
        'catatan',
        'verified_at',
        'verified_by',
        'created_by',
    ];

    protected $casts = [
        'jumlahPembayaran' => 'decimal:2',
        'realisasi'        => 'decimal:2',
    ];

    public function pengawasan(): BelongsTo
    {
        return $this->belongsTo(PengawasanProgress::class, 'pengawasan_id');
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
