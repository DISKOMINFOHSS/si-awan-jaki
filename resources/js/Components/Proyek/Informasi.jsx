import React from "react";
import Card from "../Card";

import formatCurrencyToIDR from "../../Utils/formatCurrencyToIDR";
import formatDateToIndonesia from "../../Utils/formatDateToIndonesia";

const Informasi = ({ proyekKonstruksi }) => {
    return (
        <Card className="h-fit w-full">
            <Card.Body className="p-4 text-xs">
                <div className="pb-3 border-b border-slate-200">
                    <div className="font-medium">Nama Paket Pekerjaan</div>
                    <div className="font-light text-slate-500">{proyekKonstruksi.namaPaket}</div>
                </div>
                <div className="grid grid-cols-3 gap-x-4 border-b border-slate-200 py-3">
                    <div>
                        <div className="font-medium">Nomor Kontrak</div>
                        <div className="font-light text-slate-500 uppercase">{proyekKonstruksi.nomorKontrak}</div>
                    </div>
                    <div>
                        <div className="font-medium">Sumber Dana</div>
                        <div className="font-light text-slate-500">{proyekKonstruksi.sumberDana}</div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-x-4 border-b border-slate-200 py-3">
                    <div>
                        <div className="font-medium">Tahun Anggaran</div>
                        <div className="font-light text-slate-500 uppercase">{proyekKonstruksi.tahunAnggaran}</div>
                    </div>
                    <div>
                        <div className="font-medium">Nilai Kontrak</div>
                        <div className="font-light text-slate-500">{formatCurrencyToIDR(proyekKonstruksi.nilaiKontrak)}</div>
                    </div>
                    <div>
                        <div className="font-medium">Nilai Pagu</div>
                        <div className="font-light text-slate-500">{formatCurrencyToIDR(proyekKonstruksi.nilaiPagu)}</div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-x-4 pt-3">
                    <div>
                        <div className="font-medium">Tanggal Kontrak</div>
                        <div className="font-light text-slate-500">
                            {proyekKonstruksi.tanggalKontrak ? formatDateToIndonesia(proyekKonstruksi.tanggalKontrak) : '-'}
                        </div>
                    </div>
                    <div>
                        <div className="font-medium">Waktu Pelaksanaan</div>
                        <div className="font-light text-slate-500">
                            {formatDateToIndonesia(proyekKonstruksi.tanggalMulaiPelaksanaan)} s.d {formatDateToIndonesia(proyekKonstruksi.tanggalSelesaiPelaksanaan)}
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

const InformasiPenggunaJasa = ({ penggunaJasa }) => {
    return (
        <Card className="w-full h-fit">
            <Card.Body className="p-4 text-xs text-slate-800">
                <div className="pb-3 border-b border-slate-200">
                    <div className="font-medium capitalize">Nama {penggunaJasa.pelaku_pengadaan}</div>
                    <div className="font-light text-slate-500 uppercase">{penggunaJasa.nama}</div>
                </div>
                <div className="grid grid-cols-3 gap-x-4 border-b border-slate-200 py-3">
                    <div>
                        <div className="font-medium">NIP</div>
                        <div className="font-light text-slate-500">{penggunaJasa.nip ? penggunaJasa.nip : "-"}</div>
                    </div>
                    <div className="col-span-2">
                        <div className="font-medium">Jabatan</div>
                        <div className="font-light text-slate-500">{penggunaJasa.jabatan ? penggunaJasa.jabatan : "-"}</div>
                    </div>
                </div>
                <div className="py-3 border-b border-slate-200">
                    <div className="font-medium">Dasar Pengangkatan SK Lembaga</div>
                    <div className="font-light text-slate-500">{penggunaJasa.sk ? penggunaJasa.sk : "-"}</div>
                </div>
                <div className="pt-3">
                    <div className="font-medium">Instansi</div>
                    <div className="font-light text-slate-500">{penggunaJasa.instansi ? penggunaJasa.instansi : "-"}</div>
                    <div className="font-light text-slate-500"><span className="text-slate-800">Alamat:</span> {penggunaJasa.alamat ? penggunaJasa.alamat : "-"}</div>
                </div>
            </Card.Body>
        </Card>
    )
}

const InformasiPenyediaJasa = ({ penyediaJasa }) => {
    return (
        <Card className="w-full h-fit">
            <Card.Body className="p-4 text-xs text-slate-800">
                <div className="pb-3 border-b border-slate-200">
                    <div className="font-medium capitalize">Nama Penyedia Jasa</div>
                    <div className="font-light text-slate-500 uppercase">{penyediaJasa.nama}</div>
                </div>
                <div className="grid grid-cols-3 gap-x-4 border-b border-slate-200 py-3">
                    <div>
                        <div className="font-medium">NIB</div>
                        <div className="font-light text-slate-500">{penyediaJasa.nib ? penyediaJasa.nib : "-"}</div>
                    </div>
                    <div className="col-span-2">
                        <div className="font-medium">Penanggung Jawab Badan Usaha (PJBU)</div>
                        <div className="font-light text-slate-500">{penyediaJasa.pjbu}</div>
                    </div>
                </div>
                <div className="pt-3">
                    <div className="font-medium">Alamat</div>
                    <div className="font-light text-slate-500">{penyediaJasa.alamat}</div>
                </div>
            </Card.Body>
        </Card>
    )
}

export {
    Informasi,
    InformasiPenggunaJasa,
    InformasiPenyediaJasa,
};
