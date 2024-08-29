import React from "react";

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";
import Card from "../../../Components/Card";

import {
    LiaHomeSolid,
    LiaSearchSolid,
} from "react-icons/lia";

const RekapitulasiTertibPemanfaatanProdukIndex = ({ data }) => {
    console.log(data);

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/rekapitulasi">Pengawasan Tahunan</Breadcrumb.Item>
                <Breadcrumb.Item active>Tertib Pemanfaatan Produk</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</h1>
                    <h2 className="font-light text-xs text-slate-500">Rekapitulasi Laporan Pengawasan Penyelenggaraan Jasa Konstruksi Tahun 2024</h2>
                </div>
            </div>
            <div>
                <Card>
                    <Card.Header className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium text-sm text-slate-700">Bangunan Konstruksi</h3>
                                <h4 className="font-light text-xs text-slate-500">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</h4>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-2.5">
                            <div className="flex items-center min-w-32 gap-x-2.5">
                                <label htmlFor="" className="text-sm text-slate-500">Tahun:</label>
                                <select name="" id=""
                                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                >
                                    <option>2024</option>
                                    <option>2023</option>
                                </select>
                            </div>
                            <div className="relative mx-2">
                                <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
                                    <LiaSearchSolid size={18} className="text-slate-500 -scale-x-100" />
                                </div>
                                <input
                                    type="search" name="search" placeholder="Cari..."
                                    className="border border-slate-200 rounded py-2 pl-8 block w-56 text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase">
                                    <tr className="border-b border-slate-200">
                                        <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">#</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium min-w-60 border-r border-slate-200">Nama Bangunan Konstruksi</th>
                                        <th scope="col" colSpan="2" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Fungsi Peruntukannya</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">Rencana Umur Konstruksi</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">Kapasitas dan Beban</th>
                                        <th scope="col" colSpan="2" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Pemeliharaan Produk Konstruksi</th>
                                        <th rowSpan="2"></th>
                                    </tr>
                                    <tr className="border-b border-slate-200">
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Kesesuaian Fungsi</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Kesesuaian Lokasi</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Pemeliharaan Bangunan</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Program Pemeliharaan</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

RekapitulasiTertibPemanfaatanProdukIndex.layout = page => <Layout children={page} />;

export default RekapitulasiTertibPemanfaatanProdukIndex;
