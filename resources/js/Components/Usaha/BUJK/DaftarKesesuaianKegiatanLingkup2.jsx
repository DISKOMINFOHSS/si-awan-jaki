import React from "react";
import Card from "../../Card";

import FormKesesuaianKegiatanLingkup2 from "./FormKesesuaianKegiatanLingkup2";

import {
    LiaSearchSolid,
    LiaPlusCircleSolid,
} from "react-icons/lia";

export default ({ lingkupPengawasan, pengawasanId, daftarPaketPekerjaan }) => {
    const [isModalKesesuaianKegiatanOpen, setIsModalKesesuaianKegiatanOpen] = React.useState(false);
    const [selectedPaketPekerjaan, setSelectedPaketPekerjaan] = React.useState({});

    return (
        <>
            <Card className="w-full">
                <Card.Header>
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-medium text-slate-700">Paket Pekerjaan</h3>
                            <h4 className="font-light text-xs text-slate-500">{lingkupPengawasan.lingkupPengawasan}</h4>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <div className="relative mx-2">
                                <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
                                    <LiaSearchSolid size={18} className="text-slate-500 -scale-x-100" />
                                </div>
                                <input type="search" name="search" placeholder="Cari..."
                                className="border border-slate-200 rounded py-2 pl-8 block w-56 text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs" />
                            </div>
                            <button
                                className="w-full flex justify-center items-center space-x-1 text-white bg-blue-600 hover:bg-blue-800 rounded text-[11px] tracking-wide px-2.5 py-2 shadow-sm"
                                onClick={() => setIsModalKesesuaianKegiatanOpen(true)}
                            >
                                <LiaPlusCircleSolid size={16}/>
                                <span>Tambah</span>
                            </button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase">
                                <tr className="border-b border-slate-200">
                                    <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">#</th>
                                    <th scope="col" rowSpan="2" className="p-4 font-medium min-w-64 border-r border-slate-200">Nama<br />Paket Pekerjaan</th>
                                    <th scope="col" colSpan="2" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Jenis</th>
                                    <th scope="col" colSpan="2" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Sifat</th>
                                    <th scope="col" colSpan="2" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Subklasifikasi</th>
                                    <th scope="col" colSpan="2" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Layanan</th>
                                    <th rowSpan="2"></th>
                                </tr>
                                <tr>
                                    <th scope="col" className="px-4 pt-2 pb-4 font-medium min-w-36 border-r border-slate-200">Jenis Usaha yang Dipersyaratkan</th>
                                    <th scope="col" className="px-4 pt-2 pb-4 font-medium min-w-32 border-r border-slate-200">Kesesuaian dengan SBU</th>
                                    <th scope="col" className="px-4 pt-2 pb-4 font-medium min-w-36 border-r border-slate-200">Sifat Usaha yang Dipersyaratkan</th>
                                    <th scope="col" className="px-4 pt-2 pb-4 font-medium min-w-32 border-r border-slate-200">Kesesuaian dengan SBU</th>
                                    <th scope="col" className="px-4 pt-2 pb-4 font-medium min-w-60 border-r border-slate-200">Subklasifikasi yang Dipersyaratkan</th>
                                    <th scope="col" className="px-4 pt-2 pb-4 font-medium min-w-32 border-r border-slate-200">Kesesuaian dengan SBU</th>
                                    <th scope="col" className="px-4 pt-2 pb-4 font-medium min-w-40 border-r border-slate-200">Layanan Usaha yang Dipersyaratkan</th>
                                    <th scope="col" className="px-4 pt-2 pb-4 font-medium min-w-32 border-r border-slate-200">Kesesuaian dengan SBU</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </Card.Body>
            </Card>
            <FormKesesuaianKegiatanLingkup2
                isVisible={isModalKesesuaianKegiatanOpen}
                onClose={() => setIsModalKesesuaianKegiatanOpen(false)}
                pengawasanId={pengawasanId}
                daftarPaketPekerjaan={daftarPaketPekerjaan}
                selectedPaketPekerjaan={selectedPaketPekerjaan}
            />
        </>
    )
}
