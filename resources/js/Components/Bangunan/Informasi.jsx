import React from "react";
import Card from "../Card";

export default ({ bangunan }) => {
    return (
        <Card className="w-full">
            <Card.Body className="p-4 text-xs">
                <div className="pb-3 border-b border-slate-200">
                    <div className="font-medium">Nama Bangunan Konstruksi</div>
                    <div className="font-light text-slate-500 uppercase">{bangunan.nama}</div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 border-b border-slate-200 py-3">
                    <div>
                        <div className="font-medium">Nomor Kontrak (Pembangunan)</div>
                        <div className="font-light text-slate-500">{bangunan.nomorKontrak ? bangunan.nomorKontrak : '-'}</div>
                    </div>
                    <div>
                        <div className="font-medium">Sumber Dana</div>
                        <div className="font-light text-slate-500">{bangunan.sumberDana}</div>
                    </div>
                </div>
                <div className="py-3 border-b border-slate-200">
                    <div className="font-medium">Umur Konstruksi</div>
                    <div className="font-light text-slate-500">{bangunan.umurKonstruksi ? bangunan.umurKonstruksi : '-'}</div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 border-b border-slate-200 py-3">
                <div>
                    <div className="font-medium">Tanggal dan Tahun Pembangunan</div>
                    <div className="font-light text-slate-500">{bangunan.tanggalMulaiBangun} s.d {bangunan.tanggalSelesaiBangun}</div>
                </div>
                <div>
                    <div className="font-medium">Tanggal dan Tahun Pemanfaatan</div>
                    <div className="font-light text-slate-500">{bangunan.tanggalPemanfaatan}</div>
                </div>
                </div>
                <div className="pt-3">
                    <div className="font-medium">Lokasi Bangunan</div>
                    <div className="font-light text-slate-500 capitalize">
                        {bangunan.lokasi}
                        {bangunan.desa && `, ${bangunan.desa.toLowerCase()}`}
                        {bangunan.kecamatan && `, ${bangunan.kecamatan.toLowerCase()}`}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
