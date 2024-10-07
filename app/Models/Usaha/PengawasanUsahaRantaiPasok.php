<?php

namespace App\Models\Usaha;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PengawasanUsahaRantaiPasok extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'pengawasan_usaha_rantai_pasok_lingkup_1';

    protected $fillable = [
        'jenis_pengawasan',
        'tanggal_pengawasan',
        'usaha_id',
        'kepemilikan_perizinan_berusaha',
        'keabsahan_perizinan_berusaha',
        'kapasitas_terpasang',
        'kepemilikan_perizinan_penggunaan',
        'keabsahan_perizinan_penggunaan',
        'tertib_perizinan_berusaha',
        'tertib_perizinan_penggunaan',
        'tertib_pencatatan_simpk',
        'tertib_pengawasan',
        'catatan',
        'verified_at',
        'verified_by',
        'created_by',
    ];

    protected $casts = [
        'kepemilikan_perizinan_berusaha'   => 'boolean',
        'keabsahan_perizinan_berusaha'     => 'boolean',
        'kapasitas_terpasang'              => 'boolean',
        'kepemilikan_perizinan_penggunaan' => 'boolean',
        'keabsahan_perizinan_penggunaan'   => 'boolean',
        'tertib_perizinan_berusaha'        => 'boolean',
        'tertib_perizinan_penggunaan'      => 'boolean',
        'tertib_pencatatan_simpk'          => 'boolean',
        'tertib_pengawasan'                => 'boolean',
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
