<?php

namespace App\Helpers;

class RekapitulasiHelper
{
    public static function getTotalTertibPengawasan($data)
    {
        foreach($data as $d)
        {
            switch ($d->tertib_pengawasan)
            {
                case 1:
                    $result['totalTertib'] = $d->total_tertib_pengawasan;
                    break;
                case 0:
                    $result['totalBelumTertib'] = $d->total_tertib_pengawasan;
                    break;
            }
        }

        return $result;
    }
}
