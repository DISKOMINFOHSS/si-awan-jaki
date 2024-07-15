<?php

namespace App\Models\PemanfaatanProduk;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class RekomendasiPengawasanPemanfaatanProduk extends Model
{
    use SoftDeletes;

    protected $table = 'rekomendasi_pengawasan_pemanfaatan_produk';

    protected $fillable = [
        'pengawasan_id',
        'rekomendasi',
        'keterangan',
        'tanggal_temuan',
        'created_by',
    ];

    public function pengawasan(): BelongsTo
    {
        return $this->belongsTo(PengawasanPemanfataanProduk::class, 'pengawasan_id');
    }
}
