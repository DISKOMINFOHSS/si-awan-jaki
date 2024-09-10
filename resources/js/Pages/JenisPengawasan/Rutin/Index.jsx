import React from "react";

import Layout from "../../../Components/Layout";
import Card from "../../../Components/Card";
import Tabs from "../../../Components/Tabs";

import DaftarPengawasanTertibPenyelenggaraan from "../../../Components/Proyek/APBD/DaftarPengawasan";
import DaftarPengawasanTertibPemanfaatanProduk from "../../../Components/Bangunan/DaftarPengawasan";

import {
    LiaBuildingSolid,
    LiaHardHatSolid,
    LiaUserFriendsSolid,
    LiaSearchSolid,
} from "react-icons/lia";

const JenisPengawasanRutinIndex = () => {
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
                        <div className="uppercase text-slate-500 tracking-wide">Pengawasan Tertib Penyelenggaraan Jasa Konstruksi</div>
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
                        <div className="uppercase text-slate-500 tracking-wide">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</div>
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
                        </div>
                        <div className="flex items-center gap-x-2.5">
                            <div className="flex items-center min-w-32 gap-x-2.5">
                                <label htmlFor="" className="text-sm text-slate-500">Tahun:</label>
                                <select name="" id=""
                                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                >
                                    <option>2024</option>
                                    {/* <option>2023</option> */}
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
                                        <th scope="col" rowSpan="2" className="p-4 font-medium min-w-52 border-r border-slate-200">Nama Badan Usaha /<br />NIB</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium min-w-32 border-r border-slate-200">PJBU</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium min-w-24 border-r border-slate-200">Rentang Pengawasan</th>
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
                            </table>
                        </div>
                    </Card.Body>
                </Card>
                </Tabs.Tab>
                <Tabs.Tab>
                    <DaftarPengawasanTertibPenyelenggaraan daftarPengawasan={[]} />
                </Tabs.Tab>
                <Tabs.Tab>
                    <DaftarPengawasanTertibPemanfaatanProduk daftarPengawasan={[]} />
                </Tabs.Tab>
            </Tabs>
        </>
    );
}

JenisPengawasanRutinIndex.layout = page => <Layout children={page} />;

export default JenisPengawasanRutinIndex;
