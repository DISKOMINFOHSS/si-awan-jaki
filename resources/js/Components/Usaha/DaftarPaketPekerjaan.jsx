import React from "react";

import Card from "../Card";
import FormPaketPekerjaan from "./FormPaketPekerjaan";

import {
    LiaSearchSolid,
    LiaPlusCircleSolid,
    LiaEditSolid,
    LiaTrashAltSolid,
} from "react-icons/lia";

export default ({ daftarPaketPekerjaan, usahaId }) => {
    const [isModalPaketPekerjaanOpen, setIsModalPaketPekerjaan] = React.useState(false);

    return (
        <>
            <Card className="w-full">
                <Card.Header>
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-medium text-slate-700">Paket Pekerjaan</h3>
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
                                onClick={() => setIsModalPaketPekerjaan(true)}
                                className="w-full flex justify-center items-center space-x-1 text-white bg-blue-600 hover:bg-blue-800 rounded text-[11px] tracking-wide px-2.5 py-2 shadow-sm"
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
                                <tr>
                                    <th scope="col" className="p-4 font-medium">#</th>
                                    <th scope="col" className="p-4 font-medium min-w-64">Nama Paket Pekerjaan</th>
                                    <th scope="col" className="p-4 font-medium min-w-44">Jenis Usaha</th>
                                    <th scope="col" className="p-4 font-medium min-w-32">Sifat Usaha</th>
                                    <th scope="col" className="p-4 font-medium min-w-72">Subklasifikasi Usaha</th>
                                    <th scope="col" className="p-4 font-medium min-w-40">Layanan Usaha</th>
                                    <th scope="col" className="p-4 font-medium min-w-36">Bentuk Usaha</th>
                                    <th scope="col" className="p-4 font-medium min-w-44">Kualifikasi Usaha</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-600">
                                {
                                    daftarPaketPekerjaan.map(({
                                        namaPaket,
                                        tahunAnggaran,
                                        jenisUsaha,
                                        sifatUsaha,
                                        subklasifikasiUsaha,
                                        layananUsaha,
                                        bentukUsaha,
                                        kualifikasiUsaha,
                                    }, i) => (
                                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="px-4 py-5 text-center">{i + 1}</td>
                                        <td className="px-4 py-5">
                                            <div>
                                                <div>{namaPaket}</div>
                                                <div className="font-light text-slate-500">Tahun Anggaran {tahunAnggaran}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 text-center">{jenisUsaha}</td>
                                        <td className="px-4 py-5 text-center">{sifatUsaha}</td>
                                        <td className="px-4 py-5 font-light">{subklasifikasiUsaha}</td>
                                        <td className="px-4 py-5 text-center">{layananUsaha}</td>
                                        <td className="px-4 py-5 text-center">{bentukUsaha}</td>
                                        <td className="px-4 py-5 text-center">{kualifikasiUsaha}</td>
                                        <td className="px-4 py-5 text-center">
                                            <div className="flex gap-x-2">

                                                <button
                                                    className="rounded border border-slate-200 text-slate-500 p-2 hover:bg-slate-200"
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card.Body>
            </Card>
            <FormPaketPekerjaan
                isVisible={isModalPaketPekerjaanOpen}
                onClose={() => setIsModalPaketPekerjaan(false)}
                usahaId={usahaId}
            />
        </>
    )
}
