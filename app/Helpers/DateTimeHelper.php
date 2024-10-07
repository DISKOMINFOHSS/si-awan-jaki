<?php

namespace App\Helpers;

class DateTimeHelper
{
    public static function getYear($date)
    {
        return date('Y', strtotime($date));
    }

    public static function getHalfYearDateRange($date)
    {
        $currentDate = strtotime($date);
        $year = date('Y', $currentDate);

        return ($currentDate >= strtotime($year . '-01-01') && $currentDate <= strtotime($year . '-06-30')) ?
            [ 'start' => ($year . '-01-01'), 'end' => ($year . '-06-30') ] :
            [ 'start' => ($year . '-07-01'), 'end' => ($year . '-12-31') ] ;
    }

    public static function getYearDateRange($date)
    {
        $year = date('Y', strtotime($date));
        return [ 'start' => ($year . '-01-01'), 'end' => ($year . '-12-31') ];
    }
}
