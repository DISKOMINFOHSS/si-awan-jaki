import React from "react";
import { usePage } from "@inertiajs/react";

import Breadcrumb from "../../../Components/Breadcrumb";
import Layout from "../../../Components/Layout";
import Card from "../../../Components/Card";

import { getTertibStatusBadge } from "../../../Utils/getStatusBadge";

import {
    LiaHomeSolid,
    LiaFileExportSolid,
    LiaSearchSolid,
    LiaCheckCircleSolid,
} from "react-icons/lia";
import FormVerifikasiPenyelenggaraan from "../../../Components/Rekapitulasi/FormVerifikasiPenyelenggaraan";

const RekapitulasiTertibPenyelenggaraanIndex = ({ data }) => {
    console.log(data);
    const { url } = usePage();
    const tahun = url.split('/')[3];

    const { daftarProyekKonstruksi } = data;

    const [ isModalVerificationOpen, setIsModalVerificationOpen ] = React.useState(false);
    const [ selectedProyekKonstruksi, setSelectedProyekKonstruksi ] = React.useState({});

    function handleVerificationButtonClick(proyekKonstruksi) {
        setSelectedProyekKonstruksi(proyekKonstruksi);
        setIsModalVerificationOpen(true);
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/rekapitulasi/${tahun}`}>Pengawasan Tahunan</Breadcrumb.Item>
                <Breadcrumb.Item active>Tertib Penyelenggaraan</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Pengawasan Tertib Penyelenggaraan Jasa Konstruksi</h1>
                    <h2 className="font-light text-xs text-slate-500">Rekapitulasi Laporan Pengawasan Penyelenggaraan Jasa Konstruksi Tahun {url.split('/')[3]}</h2>
                </div>
            </div>
            <div>
                <Card>
                    <Card.Header className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium text-sm text-slate-700">Proyek Konstruksi</h3>
                                <h4 className="font-light text-xs text-slate-500">Pengawasan Tertib Penyelenggaraan Jasa Konstruksi</h4>
                            </div>
                            <div>
                                <a
                                    href={`/admin/rekapitulasi/${tahun}/penyelenggaraan/rekapitulasi-penyelenggaraan-${tahun}.pdf`}
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
                                        <th scope="col" rowSpan="2" className="p-4 font-medium min-w-96 border-r border-slate-200">Kegiatan Konstruksi (Nama Paket) /<br />Nomor Kontrak</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium min-w-48 border-r border-slate-200">Nama BUJK</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">Proses Pemilihan Penyedia Jasa</th>
                                        <th scope="col" colSpan="3" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Pengawasan terhadap Kontrak Kerja Konstruksi</th>
                                        <th scope="col" colSpan="3" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Pengawasan terhadap Penerapan Standar Keamanan, Keselamatan, Kesehatan, dan Keberlanjutan Konstruksi</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">Penerapan Sistem Manajemen Mutu Konstruksi</th>
                                        <th scope="col" colSpan="3" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Pengelolaan dan Penggunaan Material, Peralatan, dan Teknologi Konstruksi</th>
                                        <th scope="col" colSpan="1" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200 min-w-48">Pengelolaan dan Pemanfaatan Sumber Material Konstruksi</th>
                                        <th rowSpan="2"></th>
                                    </tr>
                                    <tr className="border-b border-slate-200">
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
                                        daftarProyekKonstruksi.map((proyek, i) => (
                                            <tr key={proyek.id} className="border-b border-slate-100 hover:bg-slate-100">
                                                <td className="px-4 py-5 text-center">{i + 1}</td>
                                                <td className="px-4 py-5">
                                                    <div>
                                                        <div className="hover:text-blue-600 hover:underline">{proyek.namaPaket}</div>
                                                        <div className="font-light text-slate-500">{`Nomor Kontrak: ${proyek.nomorKontrak}`}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-5 text-center">{proyek.penyediaJasa.nama}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(proyek.tertibProsesPemilihanPenyediaJasa)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(proyek.tertibPenerapanStandarKontrak)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(proyek.tertibPenggunaanTKK)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(proyek.tertibPemberianPekerjaan)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(proyek.tertibKetersediaanDokumenStandarK4)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(proyek.tertibPenerapanSMKK)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(proyek.tertibAntisipasiKecelakaan)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(proyek.tertibPenerapanManajemenMutu)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(proyek.tertibPemenuhanPenyediaanMPTK)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(proyek.tertibPenggunaanMPTK)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(proyek.tertibPenggunaanPDN)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(proyek.tertibPemenuhanStandarLingkungan)}</td>
                                                <td className="px-4 py-5 text-center">
                                                    <div className="flex justify-end gap-x-2">
                                                        <button
                                                            type="button"
                                                            className="flex items-center gap-x-1 rounded border border-slate-200 text-blue-500 p-2 hover:bg-slate-200"
                                                            onClick={() => handleVerificationButtonClick(proyek)}
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
            <FormVerifikasiPenyelenggaraan
                isVisible={isModalVerificationOpen}
                onClose={() => setIsModalVerificationOpen(false)}
                proyekKonstruksi={selectedProyekKonstruksi}
            />
        </>
    );
}

RekapitulasiTertibPenyelenggaraanIndex.layout = page => <Layout children={page} />;

export default RekapitulasiTertibPenyelenggaraanIndex;
