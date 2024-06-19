<?php

namespace App\Models\PemanfaatanProduk;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PengawasanPemanfaatanProduk extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'pengawasan_pemanfaatan_produk';

    protected $fillable = [
        'jenis_pengawasan',
        'tanggal_pengawasan',
        'bangunan_id',
        'tertib_kesesuaian_fungsi',
        'tertib_kesesuaian_lokasi',
        'tertib_rencana_umur_konstruksi',
        'tertib_kapasitas_beban',
        'tertib_pemeliharaan_bangunan',
        'tertib_program_pemeliharaan',
        'is_tertib',
        'catatan',
        'verified_by',
        'verified_at',
        'created_by',
    ];

    public function bangunan(): BelongsTo
    {
        return $this->belongsTo(Bangunan::class, 'bangunan_id');
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
