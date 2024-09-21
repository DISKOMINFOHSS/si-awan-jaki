import React from "react";
import { Link } from "@inertiajs/react";

import Card from "../../Card";

import { formatDateToIndonesia } from "../../../Utils/formatDate";

import { LiaSearchSolid } from "react-icons/lia";
import { getProgressStatusBadge } from "../../../Utils/getStatusBadge";

export default ({ tahun, daftarPengawasan }) => {
    const [keyword, setKeyword] = React.useState('');
    const handleKeywordChange = (event) => setKeyword(event.target.value);

    const filteredDaftarPengawasan = keyword ? daftarPengawasan.filter(({ proyekKonstruksi }) => {
        return proyekKonstruksi.namaPaket.toLowerCase().includes(keyword.toLowerCase());
    }) : daftarPengawasan;

    return (
        <Card>
            <Card.Header className="space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-medium text-sm text-slate-700">Proyek Konstruksi</h3>
                        <h4 className="font-light text-xs text-slate-500">Sumber Dana dari Anggaran Pendapatan dan Belanja Daerah (APBD)</h4>
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
                            type="search" name="search" placeholder="Cari..." value={keyword} onChange={handleKeywordChange}
                            className="border border-slate-200 rounded py-2 pl-8 block w-56 text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
                            <tr className="border-b border-slate-200">
                                <th scope="col" className="p-4 font-medium border-r border-slate-200">#</th>
                                <th scope="col" className="p-4 font-medium min-w-96 border-r border-slate-200">Nama Paket Pekerjaan</th>
                                <th scope="col" className="p-4 font-medium min-w-40 border-r border-slate-200">Penyedia Jasa</th>
                                <th scope="col" className="p-4 font-medium min-w-48 border-r border-slate-200">Konsultan Pengawas</th>
                                <th scope="col" className="p-4 font-medium min-w-40 border-r border-slate-200">Waktu Pelaksanaan</th>
                                <th scope="col" className="p-4 font-medium min-w-32 border-r border-slate-200">Status</th>
                                <th scope="col" className="p-4 font-medium min-w-48 border-r border-slate-200">Progress <br />Penyelesaian</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700">
                            {
                                filteredDaftarPengawasan.map(({ id, proyekKonstruksi, status }, i) => (
                                    <tr key={id} className="border-b border-slate-100 hover:bg-slate-100">
                                        <td className="px-4 py-5 text-center">{i + 1}</td>
                                        <td className="px-4 py-5">
                                            <div>
                                                <Link href={`/admin/jenis-pengawasan/progress/${tahun}/${id}`} className="text-justify hover:text-blue-600 hover:underline">
                                                    {proyekKonstruksi.namaPaket}
                                                </Link>
                                                <div className="font-light text-slate-500 capitalize">{`Nomor Kontrak: ${proyekKonstruksi.nomorKontrak}`}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 text-center">{proyekKonstruksi.penyediaJasa.nama}</td>
                                        <td className="px-4 py-5 text-center">{proyekKonstruksi.konsultanPengawas ? proyekKonstruksi.konsultanPengawas.nama : '-'}</td>
                                        <td className="px-4 py-5 text-center">
                                            {formatDateToIndonesia(proyekKonstruksi.tanggalMulaiPelaksanaan)} s.d {formatDateToIndonesia(proyekKonstruksi.tanggalSelesaiPelaksanaan)}
                                        </td>
                                        <td className="px-4 py-5 text-center">{getProgressStatusBadge(status)}</td>
                                        <td className="px-4 py-5 text-center"></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </Card.Body>
        </Card>
    )
}
