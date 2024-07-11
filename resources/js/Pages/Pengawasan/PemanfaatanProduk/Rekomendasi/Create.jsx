import React from "react";

import Layout from "../../../../Components/Layout";
import Breadcrumb from "../../../../Components/Breadcrumb";
import Card from "../../../../Components/Card";

import { LiaCitySolid, LiaClipboardListSolid, LiaComment, LiaHomeSolid, LiaListAltSolid, LiaTrashAltSolid } from "react-icons/lia";

import Modal from "../../../../Components/Modal";

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
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
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
            {/* <div className="grid grid-cols-3 gap-5 my-5">
                <div>
                    <div className="mb-2.5">
                        <h4 className="font-medium text-lg text-slate-800">Verifikasi</h4>
                    </div>
                    <Card className="w-full h-fit">
                        <Card.Body className="p-4">
                            <div className="flex justify-end items-center gap-x-2.5">
                                <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-2.5">Kembali</button>
                                <button type="submit" className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-2.5">
                                    Simpan
                                </button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-span-2">
                    <div className="mb-2.5">
                        <h4 className="font-medium text-lg text-slate-800">Hasil Pengawasan</h4>
                    </div>
                    <Card className="w-full h-fit">
                        <Card.Body className="grid grid-cols-3 gap-5 p-5 text-xs">
                            <div className="col-span-3">
                                <label htmlFor="rekomendasi" className="block mb-2 text-xs font-medium text-slate-800">Temuan dan Rekomendasi <span className="text-red-400">*</span></label>
                                <textarea
                                    name="rekomendasi" id="rekomendasi" rows="5" placeholder="cth. Lorem ipsum dolor sit amet"
                                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="keterangan" className="block mb-2 text-xs font-medium text-slate-800">Keterangan</label>
                                <textarea
                                    name="keterangan" id="keterangan" rows="2" placeholder="cth. Lorem ipsum dolor sit amet"
                                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                            <div className="">
                                <label htmlFor="tanggalTemuan" className="block mb-2 text-xs font-medium text-slate-800">Tanggal Temuan</label>
                                <input
                                    type="date" name="tanggalTemuan" id="tanggalTemuan"
                                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                            <div className="col-span-3 flex justify-end items-center gap-x-2.5">
                                <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-2.5">Kembali</button>
                                <button type="submit" className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-2.5">
                                    Simpan
                                </button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div> */}

            {/* <FormRekomendasi
                namaPengawasan="Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi"
            /> */}
            <div className="grid grid-cols-4 gap-5 my-5 max-h-screen">
                <div>
                    <Card className="w-full h-fit">
                        <Card.Body className="p-4 text-sm text-slate-700 space-y-4">

                            <a href="#rekomendasi" className="group flex items-center space-x-2.5 hover:text-blue-600">
                                <span><LiaComment size={18} /></span>
                                <span>Rekomendasi</span>
                            </a>
                            <a href="#informasi" className="group flex items-center space-x-2.5 hover:text-blue-600">
                                <span><LiaListAltSolid size={18} /></span>
                                <span>Verifikasi</span>
                            </a>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-span-3 space-y-5 overflow-y-auto">
                    <div>
                        <div className="mb-2.5">
                            <h4 className="font-medium text-lg text-slate-800 leading-6" id="rekomendasi">Rekomendasi Hasil</h4>
                            <h5 className="font-light text-xs text-slate-500">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</h5>
                        </div>
                        <Card className="w-full h-fit">
                            <Card.Body className="grid grid-cols-3 gap-5 p-5 text-xs">
                                <div className="col-span-3">
                                    <label htmlFor="rekomendasi" className="block mb-2 text-xs font-medium text-slate-800">Temuan dan Rekomendasi <span className="text-red-400">*</span></label>
                                    <textarea
                                        name="rekomendasi" id="rekomendasi" rows="5" placeholder="cth. Lorem ipsum dolor sit amet"
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="keterangan" className="block mb-2 text-xs font-medium text-slate-800">Keterangan</label>
                                    <textarea
                                        name="keterangan" id="keterangan" rows="2" placeholder="cth. Lorem ipsum dolor sit amet"
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="tanggalTemuan" className="block mb-2 text-xs font-medium text-slate-800">Tanggal Temuan</label>
                                    <input
                                        type="date" name="tanggalTemuan" id="tanggalTemuan"
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                                <div className="col-span-3 flex justify-end items-center gap-x-2.5">
                                    <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-2.5">Kembali</button>
                                    <button type="submit" className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-2.5">
                                        Simpan
                                    </button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

RekomendasiPengawasanPemanfaatanProdukCreate.layout = page => <Layout children={page} />;

export default RekomendasiPengawasanPemanfaatanProdukCreate;
