import React from "react";

import Layout from "../../../../Components/Layout";
import Breadcrumb from "../../../../Components/Breadcrumb";
import Card from "../../../../Components/Card";

import { LiaHomeSolid, LiaTrashAltSolid } from "react-icons/lia";

const RekomendasiPengawasanPemanfaatanProdukCreate = ({ data }) => {
    console.log(data);
    const { pengawasan } = data;
    const { bangunan } = pengawasan;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item>...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pengawasan/pemanfaatan-produk/${pengawasan.id}`}>Detail Pengawasan</Breadcrumb.Item>
                <Breadcrumb.Item active>Rekomendasi</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mt-2 mb-4">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</h3>
                    <h1 className="font-medium text-xl text-slate-800 uppercase">{bangunan.nama}</h1>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 w-full mt-5">
                <Card className="w-full h-fit">
                    <Card.Body className="p-4 text-xs">
                        <div className="pb-3 border-b border-slate-200">
                            <div className="font-medium">Nama Bangunan Konstruksi</div>
                            <div className="font-light text-slate-500 uppercase">{bangunan.nama}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 border-b border-slate-200 py-3">
                            <div>
                                <div className="font-medium">Nama Pemilik Bangunan</div>
                                <div className="font-light text-slate-500 uppercase">{bangunan.pemilikBangunan}</div>
                            </div>
                            <div>
                                <div className="font-medium">Nama Pengelola Bangunan</div>
                                <div className="font-light text-slate-500 uppercase">{bangunan.pengelolaBangunan}</div>
                            </div>
                        </div>
                        <div className="pt-3">
                            <div className="font-medium">Lokasi Bangunan</div>
                            <div className="font-light text-slate-500 capitalize">
                                {bangunan.lokasi}
                                {bangunan.desaKelurahan && `, ${bangunan.desaKelurahan.toLowerCase()}`}
                                {bangunan.kecamatan && `, ${bangunan.kecamatan.toLowerCase()}`}
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="h-fit w-full">
                    <Card.Body className="p-4 text-xs">
                        <div className="grid grid-cols-2 gap-x-4 pb-3 border-b border-slate-200">
                            <div>
                                <div className="font-medium">Jenis Pengawasan</div>
                                <div className="font-light text-slate-500">Pengawasan {pengawasan.jenisPengawasan}</div>
                            </div>
                            <div>
                                <div className="font-medium">Tanggal Pengawasan</div>
                                <div className="font-light text-slate-500">{pengawasan.tanggalPengawasan}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 pt-3">
                            <div>
                                <div className="font-medium">Tanggal Verifikasi</div>
                                <div className="font-light text-slate-500">{pengawasan.verifiedAt ? pengawasan.verifiedAt : '-'}</div>
                            </div>
                            <div>
                                <div className="font-medium">Verifikasi oleh</div>
                                <div className="font-light text-slate-500">{pengawasan.verifiedBy ? pengawasan.verifiedBy : '-'}</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <div className="my-5">
                <div className="font-medium text-lg text-slate-800 space-y-2 mb-2.5">Temuan dan Rekomendasi</div>
                <Card className="mx-auto w-3/4 h-fit">
                    <Card.Body className="p-4 text-xs">
                        <div>
                            <label htmlFor="" className="block mb-2 text-xs font-medium text-slate-800">Temuan dan Rekomendasi</label>
                            <textarea
                                name="" id="" rows="3" placeholder="cth. Lorem ipsum dolor sit amet"

                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <div className="my-5">
                <Card>
                    <Card.Header>
                        <div>
                            <h4 className="font-medium">Temuan dan Rekomendasi</h4>
                            <h5 className="font-light text-xs text-slate-500">Judul Temuan dari Hasil Pengawasan dan Rekomendasi</h5>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <form action="">
                            <div className="flex flex-row justify-between gap-5 border-b border-slate-100 p-5">
                                <div className="grow grid grid-cols-2 gap-x-5">
                                    <div className="space-y-5">
                                        <div className="w-full">
                                            <label htmlFor="" className="block mb-2 text-xs font-medium text-slate-800">Judul Temuan Hasil Pengawasan</label>
                                            <input
                                                type="text" name="" id="" placeholder="cth. John Doe"

                                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                            />
                                        </div>
                                        <div className="w-3/5">
                                            <label htmlFor="" className="block mb-2 text-xs font-medium text-slate-800">Tanggal Temuan</label>
                                            <input
                                                type="date" name="" id=""

                                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="" className="block mb-2 text-xs font-medium text-slate-800">Rekomendasi</label>
                                            <textarea
                                                name="" id="" rows="3" placeholder="cth. Jalan Aluh Idut No 66 A Kandangan"

                                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="block mb-2 text-xs font-medium text-slate-800">Keterangan</label>
                                            <textarea
                                                name="" id="" rows="3" placeholder="cth. Jalan Aluh Idut No 66 A Kandangan"

                                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="rounded text-red-500 p-1 hover:bg-slate-50"
                                    >
                                        <LiaTrashAltSolid size={24} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-end items-center gap-x-2 border-b border-slate-100 p-5">
                                <button
                                    type="button"

                                    className="flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide py-2 px-2.5 shadow-sm hover:bg-blue-600 hover:text-white"
                                >
                                    Tambah Rekomendasi
                                </button>
                                <button type="submit" className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-2.5">
                                    Simpan
                                </button>
                                <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-2.5">Kembali</button>
                            </div>

                        </form>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

RekomendasiPengawasanPemanfaatanProdukCreate.layout = page => <Layout children={page} />;

export default RekomendasiPengawasanPemanfaatanProdukCreate;
