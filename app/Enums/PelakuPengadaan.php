<?php

namespace App\Enums;

enum PelakuPengadaan: string
{
    case KPA = 'Kuasa Pengguna Anggaran';
    case PPK = 'Pejabat Pembuat Komitmen';
    case Perwakilan = 'Perwakilan Masyarakat, Swasta, atau Badan Usaha';
}
