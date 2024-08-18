import React from "react";
import { Link } from "@inertiajs/react";

import Card from "../../Card";
import formatDateToIndonesia from "../../../Utils/formatDateToIndonesia";

import { LiaSearchSolid } from "react-icons/lia";
import { getTertibStatusBadge } from "../../../Utils/getStatusBadge";

export default ({ daftarPengawasan }) => {
    return (
        <Card className="w-full">
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
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
                            <tr className="border-b border-slate-200">
                                <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">#</th>
                                <th scope="col" rowSpan="2" className="p-4 font-medium min-w-80 border-r border-slate-200">Kegiatan Konstruksi<br />(Nama Paket)</th>
                                <th scope="col" rowSpan="2" className="p-4 font-medium min-w-48 border-r border-slate-200">Nama Penyedia Jasa</th>
                                <th scope="col" rowSpan="2" className="p-4 font-medium min-w-40 border-r border-slate-200">Tanggal Pengawasan</th>
                                <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">Proses Pemilihan Penyedia Jasa</th>
                                <th scope="col" colSpan="3" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Pengawasan terhadap Kontrak Kerja Konstruksi</th>
                                <th scope="col" colSpan="3" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Pengawasan terhadap Penerapan Standar Keamanan, Keselamatan, Kesehatan, dan Keberlanjutan Konstruksi</th>
                                <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">Penerapan Sistem Manajemen Mutu Konstruksi</th>
                                <th scope="col" colSpan="3" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Pengelolaan dan Penggunaan Material, Peralatan, dan Teknologi Konstruksi</th>
                                <th scope="col" colSpan="1" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200 min-w-48">Pengelolaan dan Pemanfaatan Sumber Material Konstruksi</th>
                                <th rowSpan="2"></th>
                            </tr>
                            <tr>
                                <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Penerapan Standar Kontrak</th>
                                <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200 min-w-44">Penggunaan Tenaga Kerja Konstruksi Bersertifikat</th>
                                <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200 min-w-48">Pemberian Pekerjaan Utama dan/atau Penunjang kepada Subpenyedia Jasa</th>
                                <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Ketersediaan Dokumen Standar K4</th>
                                <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Penerapan SMKK</th>
                                <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Kegiatan Antisipasi Kecelakaan Kerja</th>
                                <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200 min-w-48">Pemenuhan Penyediaan Peralatan dalam Pelaksanaan Proyek Konstruksi</th>
                                <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200 min-w-40">Penggunaan Material Standar (SNI dan Standar Lain)</th>
                                <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200 min-w-40">Penggunaan PDN untuk Teknologi dan MPK</th>
                                <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Pemenuhan terhadap Standar Teknis Lingkungan</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700">
                            {
                                daftarPengawasan.map((pengawasan, i) => (
                                    <tr key={pengawasan.id} className="border-b border-slate-100 hover:bg-slate-100">
                                        <td className="px-4 py-5 text-center">{i + 1}</td>
                                        <td className="px-4 py-5">
                                            <div>
                                                <Link href={`/admin/pengawasan/penyelenggaraan/APBD/${pengawasan.jenisPengawasan.toLowerCase()}/${pengawasan.id}`} className="hover:text-blue-600 hover:underline">
                                                    {pengawasan.proyekKonstruksi.namaPaket}
                                                </Link>
                                                <div className="font-light text-slate-500 capitalize">{`Nomor Kontrak: ${pengawasan.proyekKonstruksi.nomorKontrak}`}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 text-center">{pengawasan.proyekKonstruksi.penyediaJasa ? pengawasan.proyekKonstruksi.penyediaJasa : ''}</td>
                                        <td className="px-4 py-5 text-center">{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</td>
                                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibProsesPemilihanPenyediaJasa)}</td>
                                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPenerapanStandarKontrak)}</td>
                                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPenggunaanTKK)}</td>
                                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPemberianPekerjaan)}</td>
                                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibKetersediaanDokumenStandarK4)}</td>
                                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPenerapanSMKK)}</td>
                                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibAntisipasiKecelakaan)}</td>
                                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPenerapanManajemenMutu)}</td>
                                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPemenuhanPenyediaanMPTK)}</td>
                                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPenggunaanMPTK)}</td>
                                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPenggunaanPDN)}</td>
                                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPemenuhanStandarLingkungan)}</td>
                                        <td></td>
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
