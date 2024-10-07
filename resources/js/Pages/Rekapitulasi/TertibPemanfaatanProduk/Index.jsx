import React from "react";

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";
import Card from "../../../Components/Card";
import FormVerifikasiPemanfaatanProduk from "../../../Components/Rekapitulasi/FormVerifikasiPemanfaatanProduk";

import { formatDateToIndonesia } from "../../../Utils/formatDate";
import { getTertibStatusBadge } from "../../../Utils/getStatusBadge";

import {
    LiaCheckCircleSolid,
    LiaHomeSolid,
    LiaSearchSolid,
    LiaFileExportSolid
} from "react-icons/lia";

const RekapitulasiTertibPemanfaatanProdukIndex = ({ data }) => {
    console.log(data);
    const { daftarBangunan } = data;

    const [ isModalVerificationOpen, setIsModalVerificationOpen ] = React.useState(false);
    const [ selectedBangunan, setSelectedBangunan ] = React.useState({});

    function handleVerificationButtonClick(bangunan) {
        setSelectedBangunan(bangunan);
        setIsModalVerificationOpen(true);
    }

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
                            <div>
                                <a
                                    href={`/admin/rekapitulasi/2024/pemanfaatan-produk/pdf`}
                                    target="_blank"
                                    className="w-full flex justify-center items-center space-x-1 text-blue-500 border border-blue-400 rounded text-xs tracking-wide px-3 py-2.5 hover:bg-slate-100 hover:text-blue-500 focus:border-blue-400 focus:ring-blue-400 focus:text-blue-500"
                                >
                                    <LiaFileExportSolid size={16} />
                                    <span>Export PDF</span>
                                </a>
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
                                        <th scope="col" rowSpan="2" className="p-4 font-medium min-w-72 border-r border-slate-200">Nama Bangunan Konstruksi</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium min-w-48 border-r border-slate-200">Lokasi</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium min-w-36 border-r border-slate-200">Tanggal dan Tahun Pembangunan</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium min-w-36 border-r border-slate-200">Tanggal dan Tahun Pemanfaatan</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium min-w-32 border-r border-slate-200">Umur Konstruksi</th>
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
                                <tbody className="text-slate-700">
                                    {
                                        daftarBangunan.map((bangunan, i) => (
                                            <tr key={bangunan.id} className="border-b border-slate-100 hover:bg-slate-100">
                                                <td className="px-4 py-5 text-center">{i + 1}</td>
                                                <td className="px-4 py-5">
                                                    <div>
                                                        <div className="uppercase hover:text-blue-600 hover:underline">{bangunan.nama}</div>
                                                        <div className="font-light text-slate-500">{`Nomor Kontrak: ${bangunan.nomorKontrak}`}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-5">
                                                    <div>
                                                        <div className="line-clamp-2">{bangunan.lokasi}</div>
                                                        <div className="font-light capitalize line-clamp-2">{`${bangunan.desaKelurahan.toLowerCase()}, ${bangunan.kecamatan.toLowerCase()}`}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-5 text-center">
                                                    {`${formatDateToIndonesia(bangunan.tanggalMulaiBangun)} s.d ${formatDateToIndonesia(bangunan.tanggalSelesaiBangun)}`}
                                                </td>
                                                <td className="px-4 py-5 text-center">{formatDateToIndonesia(bangunan.tanggalPemanfaatan)}</td>
                                                <td className="px-4 py-5 text-center">{bangunan.umurKonstruksi}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(bangunan.tertibKesesuaianFungsi)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(bangunan.tertibKesesuaianLokasi)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(bangunan.tertibRencanaUmurKonstruksi)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(bangunan.tertibKapasitasBeban)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(bangunan.tertibPemeliharaanBangunan)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(bangunan.tertibProgramPemeliharaan)}</td>
                                                <td className="px-4 py-5 text-center">
                                                    <div className="flex justify-end gap-x-2">
                                                        <button
                                                            type="button"
                                                            className="flex items-center gap-x-1 rounded border border-slate-200 text-blue-500 p-2 hover:bg-slate-200"
                                                            onClick={() => handleVerificationButtonClick(bangunan)}
                                                        >
                                                            <LiaCheckCircleSolid size={18} />
                                                            <span>Verifikasi</span>
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
            </div>
            <FormVerifikasiPemanfaatanProduk
                isVisible={isModalVerificationOpen}
                onClose={() => setIsModalVerificationOpen(false)}
                bangunan={selectedBangunan}
            />
        </>
    );
}

RekapitulasiTertibPemanfaatanProdukIndex.layout = page => <Layout children={page} />;

export default RekapitulasiTertibPemanfaatanProdukIndex;
