import React from "react";
import { usePage } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";
import Card from "../../../Components/Card";

import FormVerifikasiBUJK from "../../../Components/Rekapitulasi/FormVerifikasiBUJK";

import {
    LiaHomeSolid,
    LiaFileExportSolid,
    LiaSearchSolid,
    LiaCheckCircleSolid
} from "react-icons/lia";
import { getTertibStatusBadge } from "../../../Utils/getStatusBadge";
import Tabs from "../../../Components/Tabs";
import DaftarUsahaPerseorangan from "../../../Components/Rekapitulasi/DaftarUsahaPerseorangan";

const RekapitulasiTertibUsahaIndex = ({ data }) => {
    const { url } = usePage();
    const tahun = url.split('/')[3];

    console.log(data);
    const { daftarTertibUsahaBUJK, daftarTertibUsahaPerseorangan } = data;

    const [keyword, setKeyword] = React.useState('');
    const handleKeywordChange = (event) => setKeyword(event.target.value);

    const [ isModalBUJKVerificationOpen, setIsModalBUJKVerificationOpen ] = React.useState(false);
    const [ selectedBUJK, setSelectedBUJK ] = React.useState({});

    const filteredDaftarTertibUsahaBUJK = keyword ? daftarTertibUsahaBUJK.filter(({ nama }) => {
        return nama.toLowerCase().includes(keyword.toLowerCase());
    }) : daftarTertibUsahaBUJK;

    function handleBUJKVerificationButtonClick(usaha) {
        setSelectedBUJK(usaha);
        setIsModalBUJKVerificationOpen(true);
    }

    const tabList = [
        { label: 'Badan Usaha' },
        { label: 'Usaha Orang Perseorangan' },
    ];

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/rekapitulasi/${tahun}`}>Pengawasan Tahunan</Breadcrumb.Item>
                <Breadcrumb.Item active>Tertib Usaha</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Pengawasan Tertib Usaha Jasa Konstruksi</h1>
                    <h2 className="font-light text-xs text-slate-500">Rekapitulasi Laporan Pengawasan Penyelenggaraan Jasa Konstruksi Tahun {url.split('/')[3]}</h2>
                </div>
            </div>
            <Tabs tabList={tabList}>
                <Tabs.Tab>
                <Card>
                    <Card.Header className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium text-sm text-slate-700">Badan Usaha Jasa Konstruksi</h3>
                                <h4 className="font-light text-xs text-slate-500">Pengawasan Tertib Usaha Jasa Konstruksi</h4>
                            </div>
                            <div>
                                <a
                                    href={`/admin/rekapitulasi/${tahun}/tertib-usaha/rekapitulasi-tertib-usaha-${tahun}.pdf`}
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
                                    type="search" name="search" placeholder="Cari..." value={keyword} onChange={handleKeywordChange}
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
                                        filteredDaftarTertibUsahaBUJK.map((usaha, i) => (
                                            <tr key={usaha.usahaId} className="border-b border-slate-100 hover:bg-slate-100">
                                                <td className="px-4 py-5 text-center">{i + 1}</td>
                                                <td className="px-4 py-5">
                                                    <div>
                                                        <div className="uppercase hover:text-blue-600 hover:underline">{usaha.nama}</div>
                                                        <div className="font-light text-slate-500">{`NIB: ${usaha.nib}`}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-5 text-center">{usaha.pjbu}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(usaha.tertibJenisUsaha)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(usaha.tertibSifatUsaha)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(usaha.tertibKlasifikasiUsaha)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(usaha.tertibLayananUsaha)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(usaha.tertibBentukUsaha)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(usaha.tertibKualifikasiUsaha)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(usaha.tertibPersyaratanSBU)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(usaha.tertibPersyaratanNIB)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(usaha.tertibPengembanganUsaha)}</td>
                                                <td className="px-4 py-5 text-center">
                                                    <div className="flex justify-end gap-x-2">
                                                        <button
                                                            type="button"
                                                            className="flex items-center gap-x-1 rounded border border-slate-200 text-blue-500 p-2 hover:bg-slate-200"
                                                            onClick={() => handleBUJKVerificationButtonClick(usaha)}
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
                </Tabs.Tab>
                <Tabs.Tab>
                    <DaftarUsahaPerseorangan daftarTertibUsaha={daftarTertibUsahaPerseorangan} />
                </Tabs.Tab>
            </Tabs>
            <FormVerifikasiBUJK
                isVisible={isModalBUJKVerificationOpen}
                onClose={() => setIsModalBUJKVerificationOpen(false)}
                usaha={selectedBUJK}
            />
        </>
    )
}

RekapitulasiTertibUsahaIndex.layout = page => <Layout children={page} />;

export default RekapitulasiTertibUsahaIndex;
