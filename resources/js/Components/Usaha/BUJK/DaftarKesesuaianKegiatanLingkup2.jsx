import React from "react";
import Card from "../../Card";

import FormKesesuaianKegiatanLingkup2 from "./FormKesesuaianKegiatanLingkup2";
import { getSesuaiStatusBadge } from "../../../Utils/getStatusBadge";

import {
    LiaSearchSolid,
    LiaPlusCircleSolid,
    LiaEditSolid,
    LiaTrashAltSolid,
} from "react-icons/lia";

export default ({
    lingkupPengawasan,
    pengawasanId,
    daftarPaketPekerjaan,
    daftarKesesuaianKegiatan,
}) => {
    const [isModalKesesuaianKegiatanOpen, setIsModalKesesuaianKegiatanOpen] = React.useState(false);
    const [selectedPaketPekerjaan, setSelectedPaketPekerjaan] = React.useState({});

    const [keyword, setKeyword] = React.useState('');
    const handleKeywordChange = (event) => setKeyword(event.target.value);

    const filteredDaftarKesesuaianKegiatan = keyword ? daftarKesesuaianKegiatan.filter(({ namaPaket }) => {
        return namaPaket.toLowerCase().includes(keyword.toLowerCase());
    }) : daftarKesesuaianKegiatan;

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
                                <input type="search" name="search" placeholder="Cari..." value={keyword} onChange={handleKeywordChange}
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
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
                                <tr className="border-b border-slate-200">
                                    <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">#</th>
                                    <th scope="col" rowSpan="2" className="p-4 font-medium min-w-64 border-r border-slate-200">Nama Paket Pekerjaan</th>
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
                            <tbody className="text-slate-600">
                                {
                                    filteredDaftarKesesuaianKegiatan.map((paketPekerjaan, i) => (
                                        <tr key={i + 1} className="border-b border-slate-100 hover:bg-slate-50">
                                            <td className="px-4 py-5 text-center">{i + 1}</td>
                                            <td className="px-4 py-5">
                                                <div>
                                                    <div className="hover:text-blue-600 hover:underline">{paketPekerjaan.namaPaket}</div>
                                                    <div className="font-light text-slate-500">Tahun Anggaran {paketPekerjaan.tahunAnggaran}</div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-5 text-center">{paketPekerjaan.jenisUsaha}</td>
                                            <td className="px-4 py-5 text-center">{getSesuaiStatusBadge(paketPekerjaan.kesesuaianJenis)}</td>
                                            <td className="px-4 py-5 text-center">{paketPekerjaan.sifatUsaha}</td>
                                            <td className="px-4 py-5 text-center">{getSesuaiStatusBadge(paketPekerjaan.kesesuaianSifat)}</td>
                                            <td className="px-4 py-5">{paketPekerjaan.subklasifikasiUsaha}</td>
                                            <td className="px-4 py-5 text-center">{getSesuaiStatusBadge(paketPekerjaan.kesesuaianSubklasifikasi)}</td>
                                            <td className="px-4 py-5 text-center">{paketPekerjaan.layananUsaha}</td>
                                            <td className="px-4 py-5 text-center">{getSesuaiStatusBadge(paketPekerjaan.kesesuaianLayanan)}</td>
                                            <td className="px-4 py-5 text-center">
                                                <div className="flex gap-x-2">
                                                    <button
                                                        type="button"
                                                        className="rounded border border-slate-200 text-slate-500 p-2 hover:bg-slate-200"
                                                        onClick={() => handleEditButtonClick(id)}
                                                    >
                                                        <LiaEditSolid size={18} />
                                                    </button>
                                                    <button
                                                        className="rounded border border-slate-200 text-red-500 p-2 hover:bg-slate-200"
                                                    >
                                                        <LiaTrashAltSolid size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
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
