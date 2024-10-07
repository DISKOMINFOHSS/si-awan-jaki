import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../../../Components/Layout";
import Card from "../../../../Components/Card";

import getDefaultData from "../../../../Utils/getDefaultData";
import { formatDateToIndonesia } from "../../../../Utils/formatDate";
import { getTertibStatusBadge } from "../../../../Utils/getStatusBadge";

const JenisPengawasanInsidentalTertibPemanfaatanProdukIndex = ({ data }) => {
    console.log(data);
    const { daftarTertibPemanfaatanProduk, totalTertibPengawasan } = data;

    const { tertibUsaha, tertibPenyelenggaraan, tertibPemanfaatanProduk } = totalTertibPengawasan;
    const {
        tertibBUJKLingkup2,
        tertibBUJKLingkup3,
        tertibBUJKLingkup4,
        tertibBUJKLingkup5,
    } = tertibUsaha;

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Pengawasan Insidental - Tahun 2024</h1>
                    <h2 className="font-light text-xs text-slate-500">Pengawasan Penyelenggaraan Jasa Konstruksi berdasarkan PERMEN PUPR Nomor 1 Tahun 2023</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-4">
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800 text-center">
                        <div className="uppercase text-slate-500 tracking-wide">Pengawasan Tertib Usaha <br /> Jasa Konstruksi</div>
                        <div className="text-2xl font-medium mt-1 mb-2">
                        {
                            getDefaultData(tertibBUJKLingkup2.totalTertib, 0) + getDefaultData(tertibBUJKLingkup2.totalBelumTertib, 0) +
                            getDefaultData(tertibBUJKLingkup3.totalTertib, 0) + getDefaultData(tertibBUJKLingkup3.totalBelumTertib, 0) +
                            getDefaultData(tertibBUJKLingkup4.totalTertib, 0) + getDefaultData(tertibBUJKLingkup4.totalBelumTertib, 0) +
                            getDefaultData(tertibBUJKLingkup5.totalTertib, 0) + getDefaultData(tertibBUJKLingkup5.totalBelumTertib, 0)
                        }
                        </div>
                        <div className="flex justify-center item-center gap-x-2.5">
                            <div className="text-right">
                                <div className="font-light text-slate-500 flex justify-end items-center gap-x-1.5">
                                    <span className="bg-green-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                    <span>
                                    {
                                        getDefaultData(tertibBUJKLingkup2.totalTertib, 0) +
                                        getDefaultData(tertibBUJKLingkup3.totalTertib, 0) +
                                        getDefaultData(tertibBUJKLingkup4.totalTertib, 0) +
                                        getDefaultData(tertibBUJKLingkup5.totalTertib, 0)
                                    }
                                    </span>
                                    <span className="font-normal text-slate-700">Tertib</span>
                                </div>
                            </div>
                            <div className="border border-slate-100"></div>
                            <div className="text-left">
                                <div className="font-light text-slate-500 flex items-center gap-x-1.5">
                                    <span className="bg-red-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                    <span>
                                    {
                                        getDefaultData(tertibBUJKLingkup2.totalBelumTertib, 0) +
                                        getDefaultData(tertibBUJKLingkup3.totalBelumTertib, 0) +
                                        getDefaultData(tertibBUJKLingkup4.totalBelumTertib, 0) +
                                        getDefaultData(tertibBUJKLingkup5.totalBelumTertib, 0)
                                    }
                                    </span>
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
            <div>
                <div className="flex flex-nowrap overflow-x-auto items-center gap-x-5 border-b border-slate-200 text-sm text-slate-500">
                    <Link
                        href="/admin/jenis-pengawasan/insidental/2024/tertib-usaha"
                        className="flex items-center gap-x-1 px-1 py-2.5 whitespace-nowrap"
                    >
                        <span>Tertib Usaha</span>
                    </Link>
                    <Link
                        href="/admin/jenis-pengawasan/insidental/2024/tertib-penyelenggaraan"
                        className="flex items-center gap-x-1 px-1 py-2.5 whitespace-nowrap"
                    >
                        <span>Tertib Penyelenggaraan</span>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-x-1 px-1 py-2.5 whitespace-nowrap border-b-2 border-blue-600 text-blue-600"
                    >
                        <span>Tertib Pemanfaatan Produk</span>
                    </Link>
                </div>
                <div className="my-5 space-y-5">
                    <Card>
                        <Card.Header className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium text-sm text-slate-700">Bangunan Konstruksi</h3>
                                    <h4 className="font-light text-xs text-slate-500">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</h4>
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
                                                            <div className="font-light text-slate-500 capitalize">{`${pengawasan.bangunan.desaKelurahan.toLowerCase()}, ${pengawasan.bangunan.kecamatan.toLowerCase()}`}</div>
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
                </div>
            </div>
        </>
    );
}

JenisPengawasanInsidentalTertibPemanfaatanProdukIndex.layout = page => <Layout children={page} />;

export default JenisPengawasanInsidentalTertibPemanfaatanProdukIndex;
