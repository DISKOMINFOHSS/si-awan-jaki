import React from "react";
import Card from "../Card";

export default ({ role, data }) => {
    return (
        <Card className="w-full">
            <Card.Body className="p-4 text-xs text-slate-800">
                <div className="pb-3 border-b border-slate-200">
                    <div className="font-medium capitalize">Nama {role} Bangunan</div>
                    <div className="font-light text-slate-500 uppercase">{data.nama}</div>
                </div>
                <div className="grid grid-cols-3 gap-x-4 border-b border-slate-200 py-3">
                    <div>
                        <div className="font-medium">NIP</div>
                        <div className="font-light text-slate-500">{data.nip ? data.nip : "-"}</div>
                    </div>
                    <div className="col-span-2">
                        <div className="font-medium">Jabatan</div>
                        <div className="font-light text-slate-500">{data.jabatan ? data.jabatan : "-"}</div>
                    </div>
                </div>
                <div className="py-3 border-b border-slate-200">
                    <div className="font-medium">Dasar Pengangkatan SK Lembaga</div>
                    <div className="font-light text-slate-500">{data.sk ? data.sk : "-"}</div>
                </div>
                <div className="pt-3">
                    <div className="font-medium">Instansi</div>
                    <div className="font-light text-slate-500">{data.instansi ? data.instansi : "-"}</div>
                    <div className="font-light text-slate-500"><span className="text-slate-800">Alamat:</span> {data.alamat ? data.alamat : "-"}</div>
                </div>
            </Card.Body>
        </Card>
    );
}
