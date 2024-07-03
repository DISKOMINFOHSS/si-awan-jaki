<?php

namespace App\Models\PemanfaatanProduk;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PemeriksaanPengawasanPemanfaatanProduk extends Model
{
    use SoftDeletes;

    protected $table = 'pemeriksaan_pengawasan_pemanfaatan_produk';

    protected $fillable = [
        'pengawasan_id',
        'lingkup_id',
        'kesimpulan_pemeriksaan',
        'catatan_pemeriksaan',
        'created_by',
    ];

    public function pengawasan(): BelongsTo
    {
        return $this->belongsTo(PengawasanPemanfataanProduk::class, 'pengawasan_id');
    }
}
