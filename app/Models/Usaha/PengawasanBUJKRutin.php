<?php

namespace App\Models\Usaha;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PengawasanBUJKRutin extends Model
{
    use SoftDeletes;

    protected $table = 'pengawasan_bujk_rutin';

    protected $fillable = [
        'usaha_id',
        'start',
        'end',
        'pengawasan_lingkup_2',
        'pengawasan_lingkup_3',
        'pengawasan_lingkup_4',
        'pengawasan_lingkup_5',
    ];

    protected $casts = [
        'tertib_jenis_usaha'        => 'boolean',
        'tertib_sifat_usaha'        => 'boolean',
        'tertib_klasifikasi_usaha'  => 'boolean',
        'tertib_layanan_usaha'      => 'boolean',
        'tertib_bentuk_usaha'       => 'boolean',
        'tertib_kualifikasi_usaha'  => 'boolean',
        'tertib_persyaratan_sbu'    => 'boolean',
        'tertib_persyaratan_nib'    => 'boolean',
        'tertib_pengembangan_usaha' => 'boolean',
    ];

    public function usaha(): BelongsTo
    {
        return $this->belongsTo(Usaha::class, 'usaha_id');
    }
}
