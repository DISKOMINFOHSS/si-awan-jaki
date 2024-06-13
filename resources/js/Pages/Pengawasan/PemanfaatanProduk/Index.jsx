import React from "react";

import Layout from "../../../Components/Layout";
import Tabs from "../../../Components/Tabs";
import Card from "../../../Components/Card";

import FormPengawasan from "../../../Components/Bangunan/FormPengawasan";

import {
    LiaPlusSolid,
    LiaSearchSolid,

} from "react-icons/lia";

const PengawasanPemanfaatanProdukIndex = ({ data }) => {
    console.log(data);

    const { daftarBangunan } = data;

    const tabList = [
        { label: 'Pengawasan Rutin' },
        { label: 'Pengawasan Insidental' },
    ];

    const [isModalPengawasanOpen, setIsModalPengawasanOpen] = React.useState(false);

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Tertib Pemanfaatan Produk Konstruksi</h1>
                    <h2 className="font-light text-xs text-slate-500">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi berdasarkan PERMEN PUPR Nomor 1 Tahun 2023</h2>
                </div>
                <div>
                    <button
                        className="w-full flex justify-center items-center space-x-1 text-white bg-blue-600 hover:bg-blue-800 rounded text-xs tracking-wide p-2.5 shadow-sm"
                        onClick={() => setIsModalPengawasanOpen(true)}
                    >
                        <LiaPlusSolid className="stroke-2" />
                        <span>Tambah</span>
                    </button>
                </div>
            </div>
            <Tabs tabList={tabList}>
                <Tabs.Tab>
                    <Card>
                        <Card.Header className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium text-sm text-slate-700">Bangunan Konstruksi</h3>
                                    <h4 className="font-light text-xs text-slate-500">Objek Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</h4>
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
                                        <tr>
                                            <th scope="col" rowSpan="2" className="p-4 font-medium">#</th>
                                            <th scope="col" rowSpan="2" className="p-4 font-medium min-w-60">Nama Bangunan Konstruksi</th>
                                            <th scope="col" rowSpan="2" className="p-4 font-medium min-w-48">Tanggal Pengawasan</th>
                                            <th scope="col" colSpan="2" className="px-4 pt-4 pb-2 font-medium">Fungsi Peruntukannya</th>
                                            <th scope="col" rowSpan="2" className="p-4 font-medium">Rencana Umur Konstruksi</th>
                                            <th scope="col" rowSpan="2" className="p-4 font-medium">Kapasitas dan Beban</th>
                                            <th scope="col" colSpan="2" className="px-4 pt-4 pb-2 font-medium">Pemeliharaan Produk Konstruksi</th>
                                            <th rowSpan="2"></th>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="px-4 pt-2 pb-4 font-medium">Kesesuaian Fungsi</th>
                                            <th scope="col" className="px-4 pt-2 pb-4 font-medium">Kesesuaian Lokasi</th>
                                            <th scope="col" className="px-4 pt-2 pb-4 font-medium">Pemeliharaan Bangunan</th>
                                            <th scope="col" className="px-4 pt-2 pb-4 font-medium">Program Pemeliharaan</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                </Tabs.Tab>
                <Tabs.Tab>
                    Pengawasan Insidental
                </Tabs.Tab>
            </Tabs>
            <FormPengawasan
                isVisible={isModalPengawasanOpen}
                onClose={() => setIsModalPengawasanOpen(false)}
                daftarBangunan={daftarBangunan}
            />
        </>
    );
}

PengawasanPemanfaatanProdukIndex.layout = page => <Layout children={page} />;

export default PengawasanPemanfaatanProdukIndex;
