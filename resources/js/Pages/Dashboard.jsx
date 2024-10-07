import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../Components/Layout";
import Card from "../Components/Card";

import getDefaultData from "../Utils/getDefaultData";

import {
    LiaCalendarDaySolid,
    LiaExclamationTriangleSolid,
    LiaChartBar,
    LiaAngleRightSolid,
} from "react-icons/lia";
import { formatDateToIndonesia } from "../Utils/formatDate";
import { getProgressStatusBadge } from "../Utils/getStatusBadge";
import { getRealisasiFisikProgressBar } from "../Utils/getProgressBar";

const Dashboard = ({ data }) => {
    console.log(data);
    const tahun = new Date().getFullYear();

    const {
        daftarPengawasanProgress,
        totalPengawasanInsidental,
        totalPengawasanProgress,
        totalTertibPengawasanRutin,
        pengawasanProgress,
    } = data;

    return (
        <>
            <div className="mb-4">
                <h1 className="font-medium text-xl text-slate-800">Dashboard</h1>
            </div>
            <div className="grid grid-cols-3 gap-5">
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800 group hover:bg-slate-100">
                        <Link href={`/admin/jenis-pengawasan/rutin/${tahun}`} className="flex items-center justify-between gap-x-2.5">
                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                <LiaCalendarDaySolid size={20} />
                            </div>
                            <div className="text-end">
                                <div className="font-light text-slate-500 text-[11px] uppercase">Total</div>
                                <div className="font-medium text-base leading-tight">
                                    {
                                        getDefaultData(totalTertibPengawasanRutin.tertibUsaha.tertibBUJK.totalTertib, 0) +
                                        getDefaultData(totalTertibPengawasanRutin.tertibUsaha.tertibBUJK.totalBelumTertib, 0) +
                                        getDefaultData(totalTertibPengawasanRutin.tertibPenyelenggaraan.totalTertib, 0) +
                                        getDefaultData(totalTertibPengawasanRutin.tertibPenyelenggaraan.totalBelumTertib, 0) +
                                        getDefaultData(totalTertibPengawasanRutin.tertibPemanfaatanProduk.totalTertib, 0) +
                                        getDefaultData(totalTertibPengawasanRutin.tertibPemanfaatanProduk.totalBelumTertib, 0)
                                    }
                                </div>
                                <div className="line-clamp-1 text-slate-500">Pengawasan Rutin</div>
                            </div>
                        </Link>
                    </Card.Body>
                </Card>
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800 group hover:bg-slate-100">
                        <Link href={`/admin/jenis-pengawasan/insidental/${tahun}`} className="flex items-center justify-between gap-x-2.5">
                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                <LiaExclamationTriangleSolid size={20} />
                            </div>
                            <div className="text-end">
                                <div className="font-light text-slate-500 text-[11px] uppercase">Total</div>
                                <div className="font-medium text-base leading-tight">{totalPengawasanInsidental}</div>
                                <div className="line-clamp-1 text-slate-500">Pengawasan Insidental</div>
                            </div>
                        </Link>
                    </Card.Body>
                </Card>
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800 group hover:bg-slate-100">
                        <Link href={`/admin/jenis-pengawasan/progress/${tahun}`} className="flex items-center justify-between gap-x-2.5">
                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                <LiaChartBar size={20} />
                            </div>
                            <div className="text-end">
                                <div className="font-light text-slate-500 text-[11px] uppercase">Total</div>
                                <div className="font-medium text-base leading-tight">{totalPengawasanProgress}</div>
                                <div className="line-clamp-1 text-slate-500">Pengawasan Progres</div>
                            </div>
                        </Link>
                    </Card.Body>
                </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-4">
                <div className="col-span-3 flex justify-between items-center">
                    <div>
                        <h1 className="font-medium text-xl text-slate-800">Pengawasan Rutin</h1>
                        <h2 className="font-light text-xs text-slate-500">Pengawasan Penyelenggaraan Jasa Konstruksi berdasarkan PERMEN PUPR Nomor 1 Tahun 2023</h2>
                    </div>
                    <div>
                        <Link
                            href={`/admin/jenis-pengawasan/rutin/${tahun}`}
                            className="w-full text-xs text-slate-500 text-center flex justify-center items-center gap-x-1 hover:text-blue-600"
                        >
                            <span>Lihat Semua</span>
                            <LiaAngleRightSolid size={14} />
                        </Link>
                    </div>
                </div>
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800 text-center">
                        <div className="uppercase text-slate-500 tracking-wide">Pengawasan Tertib Usaha <br /> Jasa Konstruksi</div>
                        <div className="text-2xl font-medium mt-1 mb-2">
                        {
                            getDefaultData(totalTertibPengawasanRutin.tertibUsaha.tertibBUJK.totalTertib, 0) + getDefaultData(totalTertibPengawasanRutin.tertibUsaha.tertibBUJK.totalBelumTertib, 0)
                        }
                        </div>
                        <div className="flex justify-center item-center gap-x-2.5">
                            <div className="text-right">
                                <div className="font-light text-slate-500 flex justify-end items-center gap-x-1.5">
                                    <span className="bg-green-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                    <span>
                                    {
                                        getDefaultData(totalTertibPengawasanRutin.tertibUsaha.tertibBUJK.totalTertib, 0)
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
                                        getDefaultData(totalTertibPengawasanRutin.tertibUsaha.tertibBUJK.totalBelumTertib, 0)
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
                        <div className="text-2xl font-medium mt-1 mb-2">{getDefaultData(totalTertibPengawasanRutin.tertibPenyelenggaraan.totalTertib, 0) + getDefaultData(totalTertibPengawasanRutin.tertibPenyelenggaraan.totalBelumTertib, 0)}</div>
                        <div className="flex justify-center item-center gap-x-2.5">
                            <div className="text-right">
                                <div className="font-light text-slate-500 flex justify-end items-center gap-x-1.5">
                                    <span className="bg-green-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                    <span>{getDefaultData(totalTertibPengawasanRutin.tertibPenyelenggaraan.totalTertib, 0)}</span>
                                    <span className="font-normal text-slate-700">Tertib</span>
                                </div>
                            </div>
                            <div className="border border-slate-100"></div>
                            <div className="text-left">
                                <div className="font-light text-slate-500 flex items-center gap-x-1.5">
                                    <span className="bg-red-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                    <span>{getDefaultData(totalTertibPengawasanRutin.tertibPenyelenggaraan.totalBelumTertib, 0)}</span>
                                    <span className="font-normal text-slate-700">Belum Tertib</span>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800 text-center">
                        <div className="uppercase text-slate-500 tracking-wide">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</div>
                        <div className="text-2xl font-medium mt-1 mb-2">{getDefaultData(totalTertibPengawasanRutin.tertibPemanfaatanProduk.totalTertib, 0) + getDefaultData(totalTertibPengawasanRutin.tertibPemanfaatanProduk.totalBelumTertib, 0)}</div>
                        <div className="flex justify-center item-center gap-x-2.5">
                            <div className="text-right">
                                <div className="font-light text-slate-500 flex justify-end items-center gap-x-1.5">
                                    <span className="bg-green-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                    <span>{getDefaultData(totalTertibPengawasanRutin.tertibPemanfaatanProduk.totalTertib, 0)}</span>
                                    <span className="font-normal text-slate-700">Tertib</span>
                                </div>
                            </div>
                            <div className="border border-slate-100"></div>
                            <div className="text-left">
                                <div className="font-light text-slate-500 flex items-center gap-x-1.5">
                                    <span className="bg-red-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                    <span>{getDefaultData(totalTertibPengawasanRutin.tertibPemanfaatanProduk.totalBelumTertib, 0)}</span>
                                    <span className="font-normal text-slate-700">Belum Tertib</span>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <div className="grid grid-cols-3 gap-5 my-4">
                <div className="col-span-3 flex justify-between items-center">
                    <div>
                        <h1 className="font-medium text-xl text-slate-800">Pengawasan Progress</h1>
                        {/* <h2 className="font-light text-xs text-slate-500">Pengawasan Penyelenggaraan Jasa Konstruksi berdasarkan PERMEN PUPR Nomor 1 Tahun 2023</h2> */}
                    </div>
                </div>
                <div className="col-span-2">
                    <Card className="w-full">
                        <Card.Body className="px-5 py-7 grid grid-cols-4 gap-x-5">
                            <div className="flex items-center gap-x-2.5">
                                <div className="font-medium text-3xl text-slate-800">{totalPengawasanProgress}</div>
                                <div className="font-light text-xs text-slate-500 leading-tight">Total<br />Pengawasan</div>
                            </div>
                            <div className="col-span-3 space-y-2.5">
                                <div className="flex items-center gap-x-5 text-xs">
                                    <div>
                                        <div className="font-light text-slate-500 flex justify-start items-center gap-x-2.5">
                                            <span className="bg-blue-600 rounded-full w-1.5 h-1.5 inline-block"></span>
                                            <span className="font-normal text-slate-700">Dalam Proses Pengerjaan ( {getDefaultData(pengawasanProgress.dalamProses, '0')} )</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-light text-slate-500 flex justify-start items-center gap-x-2.5">
                                            <span className="bg-red-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                            <span className="font-normal text-slate-700">Terlambat ( {getDefaultData(pengawasanProgress.terlambat, '0')} )</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-light text-slate-500 flex justify-start items-center gap-x-2.5">
                                            <span className="bg-green-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                            <span className="font-normal text-slate-700">Selesai ( {getDefaultData(pengawasanProgress.selesai, '0')} )</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2.5 flex items-center">
                                    <div className={`bg-blue-600 h-2.5 rounded-full rounded-r w-[${Math.ceil((pengawasanProgress.dalamProses / totalPengawasanProgress * 100) / 10)*10}%]`}></div>
                                    <div className={`bg-red-600 h-2.5 w-[${Math.ceil((pengawasanProgress.terlambat / totalPengawasanProgress * 100) / 10)*10}%]`}></div>
                                    <div className={`bg-green-400 h-2.5 rounded-full rounded-l w-[${Math.ceil((pengawasanProgress.selesai / totalPengawasanProgress * 100) / 10)*10}%]`}></div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div></div>
                <div className="col-span-3">
                    <Card>
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
                                            daftarPengawasanProgress.map(({ id, proyekKonstruksi, realisasiFisik, status }, i) => (
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
                                                    <td className="px-4 py-5 text-center">{realisasiFisik[0] && getRealisasiFisikProgressBar(realisasiFisik[0].target, realisasiFisik[0].realisasi)}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                        <Card.Footer className="group p-4">
                            <Link
                                href="/admin/jenis-pengawasan/progress"
                                className="w-full text-sm text-slate-500 text-center flex justify-center items-center gap-x-1 group-hover:text-blue-600"
                            >
                                <span>Lihat Semua</span>
                                <LiaAngleRightSolid size={14} />
                            </Link>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = page => <Layout children={page} />

export default Dashboard;
