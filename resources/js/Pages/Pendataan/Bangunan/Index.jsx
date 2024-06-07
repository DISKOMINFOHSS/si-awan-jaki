import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../../Components/Layout";

import {
    LiaPlusSolid,
    LiaSearchSolid,
    LiaFilterSolid,
    LiaAngleDownSolid,
} from "react-icons/lia";

const PendataanBangunanIndex = () => {
    return (
        <>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                <div>
                    <div className="flex gap-x-2 items-center">
                        <h1 className="font-medium text-xl text-slate-800">Bangunan Konstruksi</h1>
                        <span className="rounded-full text-[11px] px-2 py-0.5 bg-blue-100 text-blue-500 font-medium">16</span>
                    </div>
                    <h2 className="font-light text-xs text-slate-500">Pendataan Pemanfaatan Produk Jasa Konstruksi di Kab. Hulu Sungai Selatan</h2>
                </div>
            </div>
            <div className="mb-5 flex justify-between gap-x-4">
                <div className="relative w-2/3">
                    <div className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center">
                        <LiaSearchSolid size={18} className="text-slate-500 -scale-x-100" />
                    </div>
                    <input
                        type="search" name="search" placeholder="Cari..."
                        className="border border-slate-200 rounded-md py-2.5 pl-9 block w-full text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs"
                    />
                </div>
                <div className="flex items-center gap-x-3">
                    <Link
                        href="/admin/pendataan/bangunan/create"
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
        </>
    );
}

PendataanBangunanIndex.layout = page => <Layout children={page} />;

export default PendataanBangunanIndex;
