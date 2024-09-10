<?php

namespace App\Helpers;

class RekapitulasiHelper
{
    public static function getTotalTertibPengawasan($data)
    {
        foreach($data as $d)
        {
            $d->tertib_pengawasan === 1 ? $result['totalTertib'] = $d->total_tertib_pengawasan :
                $result['totalBelumTertib'] = $d->total_tertib_pengawasan;
        }

        return $result;
    }
}
