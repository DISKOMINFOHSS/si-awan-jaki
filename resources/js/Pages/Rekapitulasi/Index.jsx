import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import { LiaCalendarDaySolid, LiaChartBar, LiaExclamationTriangleSolid } from "react-icons/lia";

const RekapitulasiIndex = () => {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Laporan Pengawasan Tahun 2024</h1>
                    <h2 className="font-light text-xs text-slate-500">Rekapitulasi Laporan Pengawasan Penyelenggaraan Jasa Konstruksi di Kab. Hulu Sungai Selatan</h2>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
                <div className="space-y-4">
                    <Card className="h-fit">
                        <Card.Body className="p-4 text-xs text-slate-800">
                            <div className="flex items-center justify-between gap-x-2.5">
                                <div className="bg-blue-100 text-blue-600 rounded p-2">
                                    <LiaCalendarDaySolid size={20} />
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
                            <div className="flex items-center justify-between gap-x-2.5">
                                <div className="bg-blue-100 text-blue-600 rounded p-2">
                                    <LiaExclamationTriangleSolid size={20} />
                                </div>
                                <div className="text-end">
                                    <div className="font-light text-slate-500 text-[11px]">Pengawasan</div>
                                    <div className="font-medium text-base leading-tight">16</div>
                                    <div className="line-clamp-1 text-slate-500">Total Pengawasan Insidental</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="h-fit">
                        <Card.Body className="p-4 text-xs text-slate-800">
                            <div className="flex items-center justify-between gap-x-2.5">
                                <div className="bg-blue-100 text-blue-600 rounded p-2">
                                    <LiaChartBar size={20} />
                                </div>
                                <div className="text-end">
                                    <div className="font-light text-slate-500 text-[11px]">Pengawasan</div>
                                    <div className="font-medium text-base leading-tight">16</div>
                                    <div className="line-clamp-1 text-slate-500">Total Pengawasan Progres</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-span-2 space-y-4">
                    <Card className="h-fit">
                        <Card.Body className="p-4">
                            <div className="text-sm text-slate-800 font-medium mb-4 hover:text-blue-600 hover:underline">
                                <Link href="/admin/laporan/2024/tertib-usaha">
                                    Tertib Usaha Jasa Konstruksi
                                </Link>
                            </div>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-xs">
                                    <tbody className="text-slate-600">
                                        <tr className="border-y border-slate-100 hover:bg-slate-50">
                                            <td className="pr-3 py-3 w-48">
                                                <div className="font-medium">
                                                    Badan Usaha
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div>
                                                    <div className="uppercase text-[11px]">Total</div>
                                                    <div className="font-light text-slate-500">16</div>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div>
                                                    <div className="uppercase text-[11px]">Tertib</div>
                                                    <div className="font-light text-slate-500 flex items-center gap-x-1.5">
                                                        <span className="bg-green-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                                        <span>16</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pl-3 p-3">
                                                <div>
                                                    <div className="uppercase text-[11px]">Belum Tertib</div>
                                                    <div className="font-light text-slate-500 flex items-center gap-x-1.5">
                                                        <span className="bg-red-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* <tr className="border-y border-slate-100 hover:bg-slate-50">
                                            <td className="pr-3 py-3 w-48">
                                                <div className="font-medium">
                                                    Usaha Orang Perseorangan
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div>
                                                    <div className="uppercase text-[11px]">Total</div>
                                                    <div className="font-light text-slate-500">16</div>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div>
                                                    <div className="uppercase text-[11px]">Tertib</div>
                                                    <div className="font-light text-slate-500 flex items-center gap-x-1">
                                                        <span className="bg-green-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                                        <span>16</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pl-3 py-3">
                                                <div>
                                                    <div className="uppercase text-[11px]">Belum Tertib</div>
                                                    <div className="font-light text-slate-500 flex items-center gap-x-1">
                                                        <span className="bg-red-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="h-fit">
                        <Card.Body className="p-4">
                            <div className="text-sm text-slate-800 font-medium mb-4 group-hover:text-blue-600 group-hover:underline">
                                Tertib Penyelenggaraan Jasa Konstruksi
                            </div>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-xs">
                                    <tbody className="text-slate-600">
                                        <tr className="border-y border-slate-100 hover:bg-slate-50">
                                            <td className="pr-3 py-3 w-48">
                                                <div className="font-medium">
                                                    Kegiatan Penyelenggaraan Konstruksi
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div>
                                                    <div className="uppercase text-[11px]">Total</div>
                                                    <div className="font-light text-slate-500">16</div>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div>
                                                    <div className="uppercase text-[11px]">Tertib</div>
                                                    <div className="font-light text-slate-500 flex items-center gap-x-1.5">
                                                        <span className="bg-green-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                                        <span>16</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pl-3 p-3">
                                                <div>
                                                    <div className="uppercase text-[11px]">Belum Tertib</div>
                                                    <div className="font-light text-slate-500 flex items-center gap-x-1.5">
                                                        <span className="bg-red-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="h-fit">
                        <Card.Body className="p-4">
                            <div className="text-sm text-slate-800 font-medium mb-4 hover:text-blue-600 hover:underline">
                                <Link href="/admin/rekapitulasi/2024/pemanfaatan-produk">
                                    Tertib Pemanfaatan Produk Jasa Konstruksi
                                </Link>
                            </div>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-xs">
                                    <tbody className="text-slate-600">
                                        <tr className="border-y border-slate-100 hover:bg-slate-50">
                                            <td className="pr-3 py-3 w-48">
                                                <div className="font-medium">
                                                    Bangunan Konstruksi
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div>
                                                    <div className="uppercase text-[11px]">Total</div>
                                                    <div className="font-light text-slate-500">16</div>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div>
                                                    <div className="uppercase text-[11px]">Tertib</div>
                                                    <div className="font-light text-slate-500 flex items-center gap-x-1.5">
                                                        <span className="bg-green-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                                        <span>16</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pl-3 p-3">
                                                <div>
                                                    <div className="uppercase text-[11px]">Belum Tertib</div>
                                                    <div className="font-light text-slate-500 flex items-center gap-x-1.5">
                                                        <span className="bg-red-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
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

RekapitulasiIndex.layout = page => <Layout children={page} />;

export default RekapitulasiIndex;
