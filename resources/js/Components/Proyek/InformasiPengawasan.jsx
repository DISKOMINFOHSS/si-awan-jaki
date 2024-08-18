import React from "react";

import Card from "../Card";
import formatDateToIndonesia from "../../Utils/formatDateToIndonesia";
import formatCurrencyToIDR from "../../Utils/formatCurrencyToIDR";

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

export {
    InformasiProyekKonstruksi,
    InformasiUmumPengawasan,
}
