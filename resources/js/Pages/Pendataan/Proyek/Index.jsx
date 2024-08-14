import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import Card from "../../../Components/Card";

import formatCurrencyToIDR from "../../../Utils/formatCurrencyToIDR";

import {
    LiaPlusSolid,
    LiaSearchSolid,
    LiaFilterSolid,
    LiaAngleDownSolid,
    LiaAngleRightSolid,
} from "react-icons/lia";

const PendataanProyekIndex = ({ data }) => {
    console.log(data);
    const { daftarProyek } = data;

    return (
        <>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                <div>
                    <div className="flex gap-x-2 items-center">
                        <h1 className="font-medium text-xl text-slate-800">Proyek Konstruksi</h1>
                        <span className="rounded-full text-[11px] px-2 py-0.5 bg-blue-100 text-blue-500 font-medium">0</span>
                    </div>
                    <h2 className="font-light text-xs text-slate-500">Pendataan Penyelenggaraan Jasa Konstruksi di Kab. Hulu Sungai Selatan</h2>
                </div>
            </div>
            <div className="mb-5 flex justify-between gap-x-4">
                <div className="relative w-2/3">
                    <div className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center">
                        <LiaSearchSolid size={18} className="text-slate-500 -scale-x-100" />
                    </div>
                    <input
                        name="search" placeholder="Cari..."
                        className="border border-slate-200 rounded-md py-2.5 pl-9 block w-full text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs"
                    />
                </div>
                <div className="flex items-center gap-x-3">
                    <Link
                        href="/admin/pendataan/proyek/create"
                        className="w-full flex justify-center items-center space-x-1 text-white bg-blue-600 hover:bg-blue-800 rounded text-xs tracking-wide p-2.5 shadow-sm"
                    >
                        <LiaPlusSolid className="stroke-2" />
                        <span>Tambah</span>
                    </Link>
                    <button
                        className="w-full flex justify-center items-center space-x-2.5 text-slate-500 group hover:bg-slate-50 hover:text-blue-500 border border-slate-200 rounded text-xs tracking-wide px-3 py-2.5 shadow-sm"
                    >
                        <span className="flex items-center space-x-1">
                            <LiaFilterSolid size={16} />
                            <span className="group-hover:text-blue-500 text-slate-600">Filter</span>
                        </span>
                        <LiaAngleDownSolid size={12} />
                    </button>
                </div>
            </div>
            <Card className="w-full">
                <Card.Body>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-xs">
                            <tbody>
                                {
                                    daftarProyek.map((proyek) => (
                                        <tr key={proyek.id} className="border-b border-slate-100 hover:bg-slate-50">
                                            <td className="p-4">
                                                <div>
                                                    <Link href={`/admin/pendataan/proyek/${proyek.id}`} className="hover:text-blue-600 hover:underline">{proyek.namaPaket}</Link>
                                                    <div className="font-light text-slate-500 flex items-center gap-x-2">
                                                        <span>Tahun Anggaran {proyek.tahunAnggaran}</span>
                                                        <span>-</span>
                                                        <span>Nilai Kontrak : {formatCurrencyToIDR(proyek.nilaiKontrak)}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 min-w-56 hidden md:table-cell">
                                                <div>
                                                    <div>Penyedia Jasa</div>
                                                    <div className="font-light text-slate-500 line-clamp-1">{proyek.penyediaJasa.nama}</div>
                                                </div>
                                            </td>
                                            <td className="p-4 max-w-16">
                                                <Link href={`/admin/pendataan/usaha/${proyek.id}`} className="w-fit p-2 flex items-center gap-x-1.5 text-slate-600 hover:text-blue-600">
                                                    <LiaAngleRightSolid size={16} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

PendataanProyekIndex.layout = page => <Layout children={page} />;

export default PendataanProyekIndex;
