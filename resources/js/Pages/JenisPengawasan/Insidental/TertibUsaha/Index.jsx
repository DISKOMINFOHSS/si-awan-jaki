import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../../../Components/Layout";
import Card from "../../../../Components/Card";

import getDefaultData from "../../../../Utils/getDefaultData";
import { formatDateToIndonesia } from "../../../../Utils/formatDate";
import { getTertibStatusBadge } from "../../../../Utils/getStatusBadge";

const JenisPengawasanInsidentalTertibUsahaIndex = ({ data }) => {
    console.log(data);
    const { totalTertibPengawasan } = data;
    const { tertibPenyelenggaraan, tertibPemanfaatanProduk } = totalTertibPengawasan;

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
            <div>
                <div className="flex flex-nowrap overflow-x-auto items-center gap-x-5 border-b border-slate-200 text-sm text-slate-500">
                    <Link
                        href="#"
                        className="flex items-center gap-x-1 px-1 py-2.5 whitespace-nowrap border-b-2 border-blue-600 text-blue-600"
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
                        href="/admin/jenis-pengawasan/insidental/2024/tertib-pemanfaatan-produk"
                        className="flex items-center gap-x-1 px-1 py-2.5 whitespace-nowrap"
                    >
                        <span>Tertib Pemanfaatan Produk</span>
                    </Link>
                </div>
                <div className="my-5 space-y-5">
                    <div className="grid grid-cols-3 gap-5">
                        <div className="space-y-2.5 text-justify text-slate-800">
                            <div>
                                {/* <h4 className="font-light text-xs text-slate-500">Lingkup Pengawasan</h4> */}
                                <h3 className="text-sm font-medium">Kesesuaian Jenis, Sifat, Klasifikasi, dan Layanan Usaha dengan Kegiatan Usaha Jasa Konstruksi</h3>
                            </div>
                            <div className="text-xs">
                                <h4 className="font-medium">Indikator</h4>
                                <p className="font-light text-xs text-slate-500">Kegiatan usaha Jasa Konstruksi yang telah dilaksanakan BUJK sesuai jenis, sifat, Klasifikasi, dan layanan usaha yang tertera dalam SBU.</p>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <Card>
                                <Card.Header className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium text-sm text-slate-700">Badan Usaha Jasa Konstruksi</h3>
                                            <h4 className="font-light text-xs text-slate-500">Pengawasan Tertib Usaha Jasa Konstruksi</h4>
                                        </div>
                                    </div>
                                </Card.Header>
                            </Card>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        <div className="space-y-2.5 text-justify text-slate-800">
                            <div>
                                <h3 className="text-sm font-medium">Kesesuaian Bentuk dan Kualifikasi dengan Kegiatan Usaha Jasa Konstruksi dan Segmentasi Pasar</h3>
                            </div>
                            <div className="text-xs">
                                <h4 className="font-medium">Indikator</h4>
                                <p className="font-light text-xs text-slate-500">Kegiatan usaha Jasa Konstruksi yang telah dilaksanakan BUJK sesuai bentuk dan Kualifikasi usaha yang tertera dalam SBU.</p>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <Card>
                                <Card.Header className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium text-sm text-slate-700">Badan Usaha Jasa Konstruksi</h3>
                                            <h4 className="font-light text-xs text-slate-500">Pengawasan Tertib Usaha Jasa Konstruksi</h4>
                                        </div>
                                    </div>
                                </Card.Header>
                            </Card>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        <div className="space-y-2.5 text-justify text-slate-800">
                            <div>
                                <h3 className="text-sm font-medium">Pemenuhan Persyaratan Usaha</h3>
                            </div>
                            <div className="text-xs">
                                <h4 className="font-medium">Indikator</h4>
                                <ol className="font-light text-xs text-slate-500 list-[lower-alpha] ml-4">
                                    <li>Kepemilikan dan keabsahan dokumen SBU</li>
                                    <li>Kepemilikan dan keabsahan dokumen NIB</li>
                                </ol>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <Card>
                                <Card.Header className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium text-sm text-slate-700">Badan Usaha Jasa Konstruksi</h3>
                                            <h4 className="font-light text-xs text-slate-500">Pengawasan Tertib Usaha Jasa Konstruksi</h4>
                                        </div>
                                    </div>
                                </Card.Header>
                            </Card>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        <div className="space-y-2.5 text-justify text-slate-800">
                            <div>
                                <h3 className="text-sm font-medium">Pengembangan Usaha Berkelanjutan</h3>
                            </div>
                            <div className="text-xs">
                                <h4 className="font-medium">Indikator</h4>
                                <p className="font-light text-xs text-slate-500">BUJK melaksanakan kegiatan pengembangan usaha berkelanjutan yang mencakup:</p>
                                <ol className="font-light text-xs text-slate-500 list-[lower-alpha] ml-4">
                                    <li>Peningkatan kapasitas sumber daya manusia badan usaha;</li>
                                    <li>Peningkatan Peralatan;</li>
                                    <li>Peningkatan teknologi;</li>
                                    <li>Peningkatan kualitas pengelolaan keuangan; dan/atau</li>
                                    <li>Peningkatan manajemen usaha.</li>
                                </ol>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <Card>
                                <Card.Header className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium text-sm text-slate-700">Badan Usaha Jasa Konstruksi</h3>
                                            <h4 className="font-light text-xs text-slate-500">Pengawasan Tertib Usaha Jasa Konstruksi</h4>
                                        </div>
                                    </div>
                                </Card.Header>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

JenisPengawasanInsidentalTertibUsahaIndex.layout = page => <Layout children={page} />;

export default JenisPengawasanInsidentalTertibUsahaIndex;
