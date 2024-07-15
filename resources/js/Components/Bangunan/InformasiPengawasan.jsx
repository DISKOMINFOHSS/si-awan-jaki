import React from "react";

import Card from "../Card";
import { getTertibStatusBadge } from "../../Utils/getStatusBadge";

const InformasiBangunan = ({ bangunan }) => {
    const {
        nama,
        pemilikBangunan,
        pengelolaBangunan,
        lokasi,
        desaKelurahan,
        kecamatan,
    } = bangunan;

    return (
        <Card className="w-full h-fit">
            <Card.Body className="p-4 text-xs">
                <div className="pb-3 border-b border-slate-200">
                    <div className="font-medium">Nama Bangunan Konstruksi</div>
                    <div className="font-light text-slate-500 uppercase">{nama}</div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 border-b border-slate-200 py-3">
                    <div>
                        <div className="font-medium">Nama Pemilik Bangunan</div>
                        <div className="font-light text-slate-500 uppercase">{pemilikBangunan}</div>
                    </div>
                    <div>
                        <div className="font-medium">Nama Pengelola Bangunan</div>
                        <div className="font-light text-slate-500 uppercase">{pengelolaBangunan}</div>
                    </div>
                </div>
                <div className="pt-3">
                    <div className="font-medium">Lokasi Bangunan</div>
                    <div className="font-light text-slate-500 capitalize">
                        {lokasi}
                        {desaKelurahan && `, ${desaKelurahan.toLowerCase()}`}
                        {kecamatan && `, ${kecamatan.toLowerCase()}`}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

const InformasiUmumPengawasan = ({ pengawasan }) => {
    const {
        jenisPengawasan,
        tanggalPengawasan,
        verifiedAt,
        verifiedBy,
    } = pengawasan;

    return (
        <Card className="h-fit w-full">
            <Card.Body className="p-4 text-xs">
                <div className="grid grid-cols-2 gap-x-4 pb-3 border-b border-slate-200">
                    <div>
                        <div className="font-medium">Jenis Pengawasan</div>
                        <div className="font-light text-slate-500">Pengawasan {jenisPengawasan}</div>
                    </div>
                    <div>
                        <div className="font-medium">Tanggal Pengawasan</div>
                        <div className="font-light text-slate-500">{tanggalPengawasan}</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 pt-3">
                    <div>
                        <div className="font-medium">Tanggal Verifikasi</div>
                        <div className="font-light text-slate-500">{verifiedAt ? verifiedAt : '-'}</div>
                    </div>
                    <div>
                        <div className="font-medium">Verifikasi oleh</div>
                        <div className="font-light text-slate-500">{verifiedBy ? verifiedBy : '-'}</div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

const InformasiTertibPengawasan = ({ pengawasan }) => {
    const {
        tertibKesesuaianFungsi,
        tertibKesesuaianLokasi,
        tertibRencanaUmurKonstruksi,
        tertibKapasitasBeban,
        tertibPemeliharaanBangunan,
        tertibProgramPemeliharaan,
    } = pengawasan;

    return (
        <Card className="h-fit w-full">
            <Card.Body className="p-4 text-xs">
                <div className="grid grid-cols-2 gap-x-4 pb-3 border-b border-slate-200">
                    <div className="space-y-2">
                        <div>
                            <div className="font-medium">Kesesuaian Fungsi</div>
                            <div className="font-light text-[11px] text-slate-500">Pengawasan Fungsi Peruntukan</div>
                        </div>
                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibKesesuaianFungsi)}</div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <div className="font-medium">Kesesuaian Lokasi</div>
                            <div className="font-light text-[11px] text-slate-500">Pengawasan Fungsi Peruntukan</div>
                        </div>
                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibKesesuaianLokasi)}</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 pt-3 pb-3 border-b border-slate-200">
                    <div className="space-y-2">
                        <div>
                            <div className="font-medium">Rencana Umur Konstruksi</div>
                        </div>
                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibRencanaUmurKonstruksi)}</div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <div className="font-medium">Kapasitas dan Beban</div>
                        </div>
                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibKapasitasBeban)}</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 pt-3">
                    <div className="space-y-2">
                        <div>
                            <div className="font-medium">Pemeliharaan Bangunan</div>
                            <div className="font-light text-[11px] text-slate-500">Pemeliharaan Produk Konstruksi</div>
                        </div>
                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPemeliharaanBangunan)}</div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <div className="font-medium">Program Pemeliharan</div>
                            <div className="font-light text-[11px] text-slate-500">Pemeliharaan Produk Konstruksi</div>
                        </div>
                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibProgramPemeliharaan)}</div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export {
    InformasiBangunan,
    InformasiUmumPengawasan,
    InformasiTertibPengawasan,
};
