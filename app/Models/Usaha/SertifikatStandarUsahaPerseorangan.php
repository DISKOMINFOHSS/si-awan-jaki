<?php

namespace App\Models\Usaha;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SertifikatStandarUsahaPerseorangan extends Model
{
    protected $table = 'sertifikat_standar_usaha_perseorangan';

    public function usaha(): BelongsTo
    {
        return $this->belongsTo(Usaha::class, 'usaha_id');
    }
}
