import React from "react";

import Card from "../Card";
import formatDateToIndonesia from "../../Utils/formatDateToIndonesia";
import formatCurrencyToIDR from "../../Utils/formatCurrencyToIDR";
import { getTertibStatusBadge } from "../../Utils/getStatusBadge";

const InformasiProyekKonstruksi = ({ proyekKonstruksi }) => {
    return (
        <Card className="h-fit">
            <Card.Body className="p-4 text-xs">
                <div className="pb-3 border-b border-slate-200">
                    <div className="font-medium">Nama Proyek Konstruksi</div>
                    <div className="font-light text-slate-500">{proyekKonstruksi.namaPaket}</div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 border-b border-slate-200 py-3">
                    <div>
                        <div className="font-medium">Nomor Kontrak</div>
                        <div className="font-light text-slate-500 uppercase">{proyekKonstruksi.nomorKontrak}</div>
                    </div>
                    <div>
                        <div className="font-medium">Nilai Proyek</div>
                        <div className="font-light text-slate-500">{formatCurrencyToIDR(proyekKonstruksi.nilaiKontrak)}</div>
                    </div>
                </div>
                <div className="py-3 border-b border-slate-200">
                    <div className="font-medium">Waktu Pelaksanaan</div>
                    <div className="font-light text-slate-500">
                        {formatDateToIndonesia(proyekKonstruksi.tanggalMulaiPelaksanaan)} s.d {formatDateToIndonesia(proyekKonstruksi.tanggalSelesaiPelaksanaan)}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 pt-3">
                    <div>
                        <div className="font-medium">Penyedia Jasa</div>
                        <div className="font-light text-slate-500 uppercase">{proyekKonstruksi.penyediaJasa}</div>
                    </div>
                    <div>
                        <div className="font-medium">Nama SKPD</div>
                        <div className="font-light text-slate-500">{proyekKonstruksi.penggunaJasaInstansi}</div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

const InformasiUmumPengawasan = ({ pengawasan }) => {
    return (
        <Card className="h-fit w-full">
            <Card.Body className="p-4 text-xs">
                <div className="grid grid-cols-2 gap-x-4 pb-3 border-b border-slate-200">
                    <div>
                        <div className="font-medium">Jenis Pengawasan</div>
                        <div className="font-light text-slate-500">Pengawasan {pengawasan.jenisPengawasan}</div>
                    </div>
                    <div>
                        <div className="font-medium">Tanggal Pengawasan</div>
                        <div className="font-light text-slate-500">{formatDateToIndonesia(new Date(pengawasan.tanggalPengawasan))}</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 pt-3">
                    <div>
                        <div className="font-medium">Tanggal Verifikasi</div>
                        <div className="font-light text-slate-500">{pengawasan.verifiedAt ? formatDateToIndonesia(new Date(pengawasan.verifiedAt)) : '-'}</div>
                    </div>
                    <div>
                        <div className="font-medium">Verifikasi oleh</div>
                        <div className="font-light text-slate-500">{pengawasan.verifiedBy ? pengawasan.verifiedBy : '-'}</div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

const InformasiTertibPengawasan = ({ pengawasan }) => {
    const {
        tertibProsesPemilihanPenyediaJasa,
        tertibPenerapanStandarKontrak,
        tertibPenggunaanTKK,
        tertibPemberianPekerjaan,
        tertibKetersediaanDokumenStandarK4,
        tertibPenerapanSMKK,
        tertibAntisipasiKecelakaan,
        tertibPenerapanManajemenMutu,
        tertibPemenuhanPenyediaanMPTK,
        tertibPenggunaanMPTK,
        tertibPenggunaanPDN,
        tertibPemenuhanStandarLingkungan,
        tertibPengawasan,
    } = pengawasan;

    return (
        // <Card className="h-fit w-full">
        //     <Card.Body className="p-4 text-xs text-slate-800">
        //         <div className="pb-3 border-b border-slate-200">
        //             <div className="space-y-2">
        //                 <div>
        //                     <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 1</div>
        //                     <div>Pengawasan terhadap Proses Pemilihan Penyedia Jasa</div>
        //                 </div>
        //                 <div className="font-light text-slate-500">{getTertibStatusBadge(tertibProsesPemilihanPenyediaJasa)}</div>
        //             </div>
        //         </div>
        //         <div className="grid grid-cols-2 gap-x-4 gap-y-1 py-3 border-b border-slate-200">
        //             <div className="col-span-2">
        //                 <div>
        //                     <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 2</div>
        //                     <div>Pengawasan terhadap Kontrak Kerja Konstruksi</div>
        //                 </div>
        //             </div>
        //             <div className="space-y-2">
        //                 <div>
        //                     <div>Penerapan Standar Kontrak</div>
        //                 </div>
        //                 <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenerapanStandarKontrak)}</div>
        //             </div>
        //             <div className="space-y-2">
        //                 <div>
        //                     <div>Penggunaan TKK Bersertifikat</div>
        //                 </div>
        //                 <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenggunaanTKK)}</div>
        //             </div>
        //             <div className="col-span-2 w-3/4 space-y-2">
        //                 <div className="mt-1">
        //                     <div>Pemberian Pekerjaan Utama dan/atau Penunjang kepada Subpenyedia Jasa</div>
        //                 </div>
        //                 <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPemberianPekerjaan)}</div>
        //             </div>
        //         </div>
        //         <div className="grid grid-cols-2 gap-x-4 gap-y-1 py-3 border-b border-slate-200">
        //             <div className="col-span-2">
        //                 <div>
        //                     <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 3</div>
        //                     <div>Pengawasan terhadap Penerapan Standar K4</div>
        //                 </div>
        //             </div>
        //             <div className="space-y-2">
        //                 <div>
        //                     <div>Ketersediaan Dokumen Standar K4</div>
        //                 </div>
        //                 <div className="font-light text-slate-500">{getTertibStatusBadge(tertibKetersediaanDokumenStandarK4)}</div>
        //             </div>
        //             <div className="space-y-2">
        //                 <div>
        //                     <div >Penerapan SMKK</div>
        //                 </div>
        //                 <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenerapanSMKK)}</div>
        //             </div>
        //             <div className="col-span-2 space-y-2">
        //                 <div className="mt-1">
        //                     <div>Kegiatan Antisipasi Kecelakaan Kerja</div>
        //                 </div>
        //                 <div className="font-light text-slate-500">{getTertibStatusBadge(tertibAntisipasiKecelakaan)}</div>
        //             </div>
        //         </div>
        //         <div className="py-3 border-b border-slate-200">
        //             <div className="space-y-2">
        //                 <div>
        //                     <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 4</div>
        //                     <div>Pengawasan terhadap penerapan manajemen mutu Konstruksi</div>
        //                 </div>
        //                 <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenerapanManajemenMutu)}</div>
        //             </div>
        //         </div>
        //         <div className="grid grid-cols-2 gap-x-4 gap-y-1 py-3 border-b border-slate-200">
        //             <div className="col-span-2">
        //                 <div>
        //                     <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 5</div>
        //                     <div>Pengelolaan dan Penggunaan Material, Peralatan dan Teknologi Konstruksi</div>
        //                 </div>
        //             </div>
        //             <div className="col-span-2 space-y-2">
        //                 <div>
        //                     <div>Pemenuhan penyediaan material, peralatan, dan teknologi konstruksi dalam pelaksanaan proyek konstruksi</div>
        //                 </div>
        //                 <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPemenuhanPenyediaanMPTK)}</div>
        //             </div>
        //             <div className="space-y-2 mt-1">
        //                 <div>
        //                     <div>Penerapan Material Standar (SNI dan Standar Lain)</div>
        //                 </div>
        //                 <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenggunaanMPTK)}</div>
        //             </div>
        //             <div className="space-y-2 mt-1">
        //                 <div>
        //                     <div>Penggunaan PDN untuk Teknologi dan MPK</div>
        //                 </div>
        //                 <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenggunaanPDN)}</div>
        //             </div>
        //         </div>
        //         <div className="pt-3">
        //             <div className="space-y-2">
        //                 <div>
        //                     <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 6</div>
        //                     <div>Pengelolaan dan Pemanfaatan Sumber Material Konstruksi</div>
        //                 </div>
        //                 <div>Pemenuhan terhadap standar teknis lingkungan</div>
        //                 <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPemenuhanStandarLingkungan)}</div>
        //             </div>
        //         </div>
        //     </Card.Body>
        // </Card>
        <Card className="h-fit w-full">
            <Card.Body className="p-4 grid grid-cols-2 gap-4 text-xs text-slate-800">
                <div>
                    <div className="pb-3 border-b border-slate-200">
                        <div className="space-y-2">
                            <div>
                                <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 1</div>
                                <div>Pengawasan terhadap Proses Pemilihan Penyedia Jasa</div>
                            </div>
                            <div className="font-light text-slate-500">{getTertibStatusBadge(tertibProsesPemilihanPenyediaJasa)}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 py-3 border-b border-slate-200">
                        <div className="col-span-2">
                            <div>
                                <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 2</div>
                                <div>Pengawasan terhadap Kontrak Kerja Konstruksi</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <div>Penerapan Standar Kontrak</div>
                            </div>
                            <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenerapanStandarKontrak)}</div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <div>Penggunaan TKK Bersertifikat</div>
                            </div>
                            <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenggunaanTKK)}</div>
                        </div>
                        <div className="col-span-2 w-3/4 space-y-2">
                            <div className="mt-1">
                                <div>Pemberian Pekerjaan Utama dan/atau Penunjang kepada Subpenyedia Jasa</div>
                            </div>
                            <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPemberianPekerjaan)}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-3">
                        <div className="col-span-2">
                            <div>
                                <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 3</div>
                                <div>Pengawasan terhadap Penerapan Standar K4</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <div>Ketersediaan Dokumen Standar K4</div>
                            </div>
                            <div className="font-light text-slate-500">{getTertibStatusBadge(tertibKetersediaanDokumenStandarK4)}</div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <div >Penerapan SMKK</div>
                            </div>
                            <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenerapanSMKK)}</div>
                        </div>
                        <div className="col-span-2 space-y-2">
                            <div className="mt-1">
                                <div>Kegiatan Antisipasi Kecelakaan Kerja</div>
                            </div>
                            <div className="font-light text-slate-500">{getTertibStatusBadge(tertibAntisipasiKecelakaan)}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="pb-3 border-b border-slate-200">
                        <div className="space-y-2">
                            <div>
                                <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 4</div>
                                <div>Pengawasan terhadap penerapan manajemen mutu Konstruksi</div>
                            </div>
                            <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenerapanManajemenMutu)}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 py-3 border-b border-slate-200">
                        <div className="col-span-2">
                            <div>
                                <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 5</div>
                                <div>Pengelolaan dan Penggunaan Material, Peralatan dan Teknologi Konstruksi</div>
                            </div>
                        </div>
                        <div className="col-span-2 space-y-2">
                            <div>
                                <div>Pemenuhan penyediaan material, peralatan, dan teknologi konstruksi dalam pelaksanaan proyek konstruksi</div>
                            </div>
                            <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPemenuhanPenyediaanMPTK)}</div>
                        </div>
                        <div className="space-y-2 mt-1">
                            <div>
                                <div>Penerapan Material Standar (SNI dan Standar Lain)</div>
                            </div>
                            <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenggunaanMPTK)}</div>
                        </div>
                        <div className="space-y-2 mt-1">
                            <div>
                                <div>Penggunaan PDN untuk Teknologi dan MPK</div>
                            </div>
                            <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenggunaanPDN)}</div>
                        </div>
                    </div>
                    <div className="pt-3">
                        <div className="space-y-2">
                            <div>
                                <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 6</div>
                                <div>Pengelolaan dan Pemanfaatan Sumber Material Konstruksi</div>
                            </div>
                            <div>Pemenuhan terhadap standar teknis lingkungan</div>
                            <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPemenuhanStandarLingkungan)}</div>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export {
    InformasiProyekKonstruksi,
    InformasiUmumPengawasan,
    InformasiTertibPengawasan,
}
