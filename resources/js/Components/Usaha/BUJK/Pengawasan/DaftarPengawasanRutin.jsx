import React from "react";
import { Link } from "@inertiajs/react";

import Card from "../../../Card";
import FormAddPengawasanRutin from "./FormAddPengawasanRutin";

import { getTertibStatusBadge } from "../../../../Utils/getStatusBadge";
import { formatDateToIndonesia } from "../../../../Utils/formatDate";

import { LiaSearchSolid, LiaPlusSolid } from "react-icons/lia";

export default ({ daftarUsaha, daftarPengawasan }) => {
    const [isModalPengawasanOpen, setIsModalPengawasanOpen] = React.useState(false);

    return (
        <>
            <Card>
                <Card.Header className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-medium text-sm text-slate-700">Badan Usaha Jasa Konstruksi</h3>
                            <h4 className="font-light text-xs text-slate-500">Pengawasan Tertib Usaha Jasa Konstruksi</h4>
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
                    <div className="flex items-center gap-x-2.5">
                        <div className="flex items-center min-w-32 gap-x-2.5">
                            <label htmlFor="" className="text-sm text-slate-500">Tahun:</label>
                            <select name="" id=""
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            >
                                <option>2024</option>
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
                                    <th scope="col" rowSpan="2" className="p-4 font-medium min-w-52 border-r border-slate-200">Nama Badan Usaha /<br />NIB</th>
                                    <th scope="col" rowSpan="2" className="p-4 font-medium min-w-32 border-r border-slate-200">PJBU</th>
                                    <th scope="col" rowSpan="2" className="p-4 font-medium min-w-36 border-r border-slate-200">Tanggal Pengawasan</th>
                                    <th scope="col" colSpan="4" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Kesesuaian Kegiatan Konstruksi</th>
                                    <th scope="col" colSpan="2" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Kesesuaian Kegiatan Usaha Jasa Konstruksi dan Segmentasi Pasar Jasa Konstruksi</th>
                                    <th scope="col" colSpan="2" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Pemenuhan Persyaratan Usaha</th>
                                    <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">Pelaksanaan Pengembangan Usaha Berkelanjutan</th>
                                    <th rowSpan="2"></th>
                                </tr>
                                <tr className="border-b border-slate-200">
                                    <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Jenis</th>
                                    <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Sifat</th>
                                    <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Klasifikasi</th>
                                    <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Layanan</th>
                                    <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Bentuk</th>
                                    <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Kualifikasi</th>
                                    <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200 min-w-20">SBU</th>
                                    <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200 min-w-20">NIB</th>

                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                {
                                    daftarPengawasan.map((pengawasan, i) => (
                                        <tr key={i} className="border-b border-slate-100 hover:bg-slate-100">
                                            <td className="px-4 py-5 text-center">{i + 1}</td>
                                            <td className="px-4 py-5">
                                                <div>
                                                    <Link href={`/admin/pengawasan/usaha/bujk/rutin/${pengawasan.id}`} className="uppercase hover:text-blue-600 hover:underline">
                                                        {pengawasan.usaha.nama}
                                                    </Link>
                                                    <div className="font-light text-slate-500">{`NIB: ${pengawasan.usaha.nib}`}</div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-5 text-center">{pengawasan.usaha.pjbu}</td>
                                            <td className="px-4 py-5 text-center">{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</td>
                                            <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibJenisUsaha)}</td>
                                            <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibSifatUsaha)}</td>
                                            <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibKlasifikasiUsaha)}</td>
                                            <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibLayananUsaha)}</td>
                                            <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibBentukUsaha)}</td>
                                            <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibKualifikasiUsaha)}</td>
                                            <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPersyaratanSBU)}</td>
                                            <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPersyaratanNIB)}</td>
                                            <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPengembanganUsaha)}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </Card.Body>
            </Card>
            <FormAddPengawasanRutin
                isVisible={isModalPengawasanOpen}
                onClose={() => setIsModalPengawasanOpen(false)}
                daftarUsaha={daftarUsaha}
            />
        </>
    )
}
