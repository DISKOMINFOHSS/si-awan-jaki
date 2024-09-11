import React from "react";

import Layout from "../../../Components/Layout";
import Card from "../../../Components/Card";
import Tabs from "../../../Components/Tabs";

import DaftarPengawasanTertibPenyelenggaraan from "../../../Components/Proyek/APBD/DaftarPengawasan";
import DaftarPengawasanTertibPemanfaatanProduk from "../../../Components/Bangunan/DaftarPengawasan";

import { getTertibStatusBadge } from "../../../Utils/getStatusBadge";

import {
    LiaBuildingSolid,
    LiaHardHatSolid,
    LiaUserFriendsSolid,
    LiaSearchSolid,
} from "react-icons/lia";
import { formatDateToIndonesia } from "../../../Utils/formatDate";
import { Link } from "@inertiajs/react";
import getDefaultData from "../../../Utils/getDefaultData";

const JenisPengawasanRutinIndex = ({ data }) => {
    console.log(data);

    const {
        daftarTertibUsaha,
        daftarTertibPenyelenggaraan,
        daftarTertibPemanfaatanProduk,
        totalTertibPengawasan
    } = data;

    const { tertibPenyelenggaraan, tertibPemanfaatanProduk } = totalTertibPengawasan;

    const tabList = [
        { label: 'Tertib Usaha' },
        { label: 'Tertib Penyelenggaraan' },
        { label: 'Tertib Pemanfaatan Produk' },
    ];

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Pengawasan Rutin - Tahun 2024</h1>
                    <h2 className="font-light text-xs text-slate-500">Pengawasan Penyelenggaraan Jasa Konstruksi berdasarkan PERMEN PUPR Nomor 1 Tahun 2023</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-4">
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800 text-center">
                        <div className="uppercase text-slate-500 tracking-wide">Pengawasan Tertib Usaha <br /> Jasa Konstruksi</div>
                        <div className="text-2xl font-medium mt-1 mb-2">100</div>
                        <div className="flex justify-center item-center gap-x-2.5">
                            <div className="text-right">
                                <div className="font-light text-slate-500 flex justify-end items-center gap-x-1.5">
                                    <span className="bg-green-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                    <span>0</span>
                                    <span className="font-normal text-slate-700">Tertib</span>
                                </div>
                            </div>
                            <div className="border border-slate-100"></div>
                            <div className="text-left">
                                <div className="font-light text-slate-500 flex items-center gap-x-1.5">
                                    <span className="bg-red-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                    <span>0</span>
                                    <span className="font-normal text-slate-700">Belum Tertib</span>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800 text-center">
                        <div className="uppercase text-slate-500 tracking-wide">Pengawasan Tertib Penyelenggaraan <br /> Jasa Konstruksi</div>
                        <div className="text-2xl font-medium mt-1 mb-2">{getDefaultData(tertibPenyelenggaraan.totalTertib, 0) + getDefaultData(tertibPenyelenggaraan.totalBelumTertib, 0)}</div>
                        <div className="flex justify-center item-center gap-x-2.5">
                            <div className="text-right">
                                <div className="font-light text-slate-500 flex justify-end items-center gap-x-1.5">
                                    <span className="bg-green-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                    <span>{getDefaultData(tertibPenyelenggaraan.totalTertib, 0)}</span>
                                    <span className="font-normal text-slate-700">Tertib</span>
                                </div>
                            </div>
                            <div className="border border-slate-100"></div>
                            <div className="text-left">
                                <div className="font-light text-slate-500 flex items-center gap-x-1.5">
                                    <span className="bg-red-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                    <span>{getDefaultData(tertibPenyelenggaraan.totalBelumTertib, 0)}</span>
                                    <span className="font-normal text-slate-700">Belum Tertib</span>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800 text-center">
                        <div className="uppercase text-slate-500 tracking-wide">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</div>
                        <div className="text-2xl font-medium mt-1 mb-2">{getDefaultData(tertibPemanfaatanProduk.totalTertib, 0) + getDefaultData(tertibPemanfaatanProduk.totalBelumTertib, 0)}</div>
                        <div className="flex justify-center item-center gap-x-2.5">
                            <div className="text-right">
                                <div className="font-light text-slate-500 flex justify-end items-center gap-x-1.5">
                                    <span className="bg-green-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                    <span>{getDefaultData(tertibPemanfaatanProduk.totalTertib, 0)}</span>
                                    <span className="font-normal text-slate-700">Tertib</span>
                                </div>
                            </div>
                            <div className="border border-slate-100"></div>
                            <div className="text-left">
                                <div className="font-light text-slate-500 flex items-center gap-x-1.5">
                                    <span className="bg-red-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                    <span>{getDefaultData(tertibPemanfaatanProduk.totalBelumTertib, 0)}</span>
                                    <span className="font-normal text-slate-700">Belum Tertib</span>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            {/* <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-5 my-4">
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800">
                        <div className="flex items-start justify-between gap-x-2.5">
                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                <LiaSquare size={20} />
                            </div>
                            <div className="text-end">
                                <div className="font-light text-slate-500 text-[11px]">Pengawasan</div>
                                <div className="font-medium text-base leading-tight">16</div>
                                <div className="line-clamp-1 text-slate-500">Total Pengawasan Rutin</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800">
                        <div className="flex items-start justify-between gap-x-2.5">
                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                <LiaUserFriendsSolid size={20} />
                            </div>
                            <div className="text-end">
                                <div className="font-light text-slate-500 text-[11px]">Pengawasan</div>
                                <div className="font-medium text-base leading-tight">16</div>
                                <div className="line-clamp-1 text-slate-500">Tertib Usaha Jasa Konstruksi</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800">
                        <div className="flex items-start justify-between gap-x-2.5">
                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                <LiaHardHatSolid size={20} />
                            </div>
                            <div className="text-end">
                                <div className="font-light text-slate-500 text-[11px]">Pengawasan</div>
                                <div className="font-medium text-base leading-tight">16</div>
                                <div className="line-clamp-1 text-slate-500">Tertib Penyelenggaraan</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800">
                        <div className="flex items-start justify-between gap-x-2.5">
                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                <LiaBuildingSolid size={20} />
                            </div>
                            <div className="text-end">
                                <div className="font-light text-slate-500 text-[11px]">Pengawasan</div>
                                <div className="font-medium text-base leading-tight">16</div>
                                <div className="line-clamp-1 text-slate-500">Tertib Pemanfaatan Produk</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div> */}
            <Tabs tabList={tabList}>
                <Tabs.Tab>
                <Card>
                    <Card.Header className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium text-sm text-slate-700">Badan Usaha Jasa Konstruksi</h3>
                                <h4 className="font-light text-xs text-slate-500">Objek Pengawasan Tertib Usaha Jasa Konstruksi</h4>
                            </div>
                            <div className="flex items-center gap-x-2">
                                {/* <div className="relative mx-2">
                                    <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
                                        <LiaSearchSolid size={18} className="text-slate-500 -scale-x-100" />
                                    </div>
                                    <input
                                        type="search" name="search" placeholder="Cari..."
                                        className="border border-slate-200 rounded py-2.5 pl-8 block w-56 text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div> */}
                                <Link
                                    href={`/admin/`}
                                    className="w-fit flex justify-center items-center gap-x-2  text-blue-600 bg-blue-50 rounded text-xs tracking-wide px-3 py-2.5 hover:bg-blue-600 hover:text-white"
                                >
                                    Lihat Semua
                                </Link>
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
                                        <th scope="col" colSpan="5" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Kesesuaian Kegiatan Konstruksi</th>
                                        <th scope="col" colSpan="3" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Kesesuaian Kegiatan Usaha Jasa Konstruksi dan Segmentasi Pasar Jasa Konstruksi</th>
                                        <th scope="col" colSpan="3" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Pemenuhan Persyaratan Usaha</th>
                                        <th scope="col" colSpan="2" className="p-4 font-medium border-r border-slate-200">Pelaksanaan Pengembangan Usaha Berkelanjutan</th>
                                        <th rowSpan="2"></th>
                                    </tr>
                                    <tr className="border-b border-slate-200">
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Tanggal Pengawasan</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Jenis</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Sifat</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Klasifikasi</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Layanan</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Tanggal Pengawasan</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Bentuk</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Kualifikasi</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Tanggal Pengawasan</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200 min-w-20">SBU</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200 min-w-20">NIB</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Tanggal Pengawasan</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200"></th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700">
                                    {
                                        daftarTertibUsaha.daftarTertibBUJK.map((pengawasan, i) => (
                                            <tr key={i} className="border-b border-slate-100 hover:bg-slate-100">
                                                <td className="px-4 py-5 text-center">{i + 1}</td>
                                                <td className="px-4 py-5">
                                                    <div>
                                                        <div className="uppercase hover:text-blue-600 hover:underline">{pengawasan.usaha.nama}</div>
                                                        <div className="font-light text-slate-500">{`NIB: ${pengawasan.usaha.nib}`}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-5 text-center">{pengawasan.usaha.pjbu}</td>
                                                <td className="px-4 py-5 text-center">
                                                    <a target="_blank" href={`/admin/pengawasan/usaha/2/${pengawasan.pengawasanLingkup2Id}`} className="hover:text-blue-600 hover:underline">
                                                        {pengawasan.tanggalPengawasanLingkup2 ? formatDateToIndonesia(pengawasan.tanggalPengawasanLingkup2) : '-'}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibJenisUsaha)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibSifatUsaha)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibKlasifikasiUsaha)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibLayananUsaha)}</td>
                                                <td className="px-4 py-5 text-center">
                                                    <a target="_blank" href={`/admin/pengawasan/usaha/3/${pengawasan.pengawasanLingkup3Id}`} className="hover:text-blue-600 hover:underline">
                                                        {pengawasan.tanggalPengawasanLingkup3 ? formatDateToIndonesia(pengawasan.tanggalPengawasanLingkup3) : '-'}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibBentukUsaha)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibKualifikasiUsaha)}</td>
                                                <td className="px-4 py-5 text-center">
                                                    <a target="_blank" href={`/admin/pengawasan/usaha/4/${pengawasan.pengawasanLingkup4Id}/rutin`} className="hover:text-blue-600 hover:underline">
                                                        {pengawasan.tanggalPengawasanLingkup4 ? formatDateToIndonesia(pengawasan.tanggalPengawasanLingkup4) : '-'}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPersyaratanSBU)}</td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPersyaratanNIB)}</td>
                                                <td className="px-4 py-5 text-center">
                                                    <a target="_blank" href={`/admin/pengawasan/usaha/5/${pengawasan.pengawasanLingkup5Id}`} className="hover:text-blue-600 hover:underline">
                                                        {pengawasan.tanggalPengawasanLingkup5 ? formatDateToIndonesia(pengawasan.tanggalPengawasanLingkup5) : '-'}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPengembanganUsaha)}</td>
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
                    <Card>
                        <Card.Header className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium text-sm text-slate-700">Proyek Konstruksi</h3>
                                    <h4 className="font-light text-xs text-slate-500">Pengawasan Tertib Penyelenggaraan Jasa Konstruksi</h4>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <Link
                                        href={`/admin/pengawasan/penyelenggaraan/APBD`}
                                        className="w-fit flex justify-center items-center gap-x-2  text-blue-600 bg-blue-50 rounded text-xs tracking-wide px-3 py-2.5 hover:bg-blue-600 hover:text-white"
                                    >
                                        Lihat Semua
                                    </Link>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
                                        <tr className="border-b border-slate-200">
                                            <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">#</th>
                                            <th scope="col" rowSpan="2" className="p-4 font-medium min-w-96 border-r border-slate-200">Kegiatan Konstruksi<br />(Nama Paket)</th>
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
                                            daftarTertibPenyelenggaraan.map((pengawasan, i) => (
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
                </Tabs.Tab>
                <Tabs.Tab>
                    <Card>
                        <Card.Header className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium text-sm text-slate-700">Bangunan Konstruksi</h3>
                                    <h4 className="font-light text-xs text-slate-500">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</h4>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <Link
                                        href={`/admin/pengawasan/pemanfaatan-produk`}
                                        className="w-fit flex justify-center items-center gap-x-2  text-blue-600 bg-blue-50 rounded text-xs tracking-wide px-3 py-2.5 hover:bg-blue-600 hover:text-white"
                                    >
                                        Lihat Semua
                                    </Link>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
                                        <tr className="border-b border-slate-200">
                                            <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">#</th>
                                            <th scope="col" rowSpan="2" className="p-4 font-medium min-w-60">Nama Bangunan Konstruksi</th>
                                            <th scope="col" rowSpan="2" className="p-4 font-medium min-w-48 border-r border-slate-200">Tanggal<br />Pengawasan</th>
                                            <th scope="col" colSpan="2" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Fungsi Peruntukannya</th>
                                            <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">Rencana Umur Konstruksi</th>
                                            <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">Kapasitas dan Beban</th>
                                            <th scope="col" colSpan="2" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Pemeliharaan Produk Konstruksi</th>
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
                                            daftarTertibPemanfaatanProduk.map((pengawasan, i) => (
                                                <tr key={pengawasan.id} className="border-b border-slate-100 hover:bg-slate-100">
                                                    <td className="px-4 py-5 text-center">{i + 1}</td>
                                                    <td className="px-4 py-5">
                                                        <div>
                                                            <Link href={`/admin/pengawasan/pemanfaatan-produk/${pengawasan.id}`} className="uppercase hover:text-blue-600 hover:underline">
                                                                {pengawasan.bangunan.nama}
                                                            </Link>
                                                            <div className="font-light text-slate-500 capitalize">{`${pengawasan.bangunan.desa_kelurahan.toLowerCase()}, ${pengawasan.bangunan.kecamatan.toLowerCase()}`}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-5 text-center">{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</td>
                                                    <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibKesesuaianFungsi)}</td>
                                                    <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibKesesuaianLokasi)}</td>
                                                    <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibRencanaUmurKonstruksi)}</td>
                                                    <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibKapasitasBeban)}</td>
                                                    <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPemeliharaanBangunan)}</td>
                                                    <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibProgramPemeliharaan)}</td>
                                                    <td className="px-4 py-5 text-center"></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                </Tabs.Tab>
            </Tabs>
        </>
    );
}

JenisPengawasanRutinIndex.layout = page => <Layout children={page} />;

export default JenisPengawasanRutinIndex;
