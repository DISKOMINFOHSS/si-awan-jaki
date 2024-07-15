import React from "react";

import Layout from "../../../../Components/Layout";
import Breadcrumb from "../../../../Components/Breadcrumb";
import Card from "../../../../Components/Card";

import { LiaHomeSolid } from "react-icons/lia";

import {
    InformasiBangunan,
    InformasiTertibPengawasan,
    InformasiUmumPengawasan
} from "../../../../Components/Bangunan/InformasiPengawasan";
import FormRekomendasi from "../../../../Components/Pengawasan/FormRekomendasi";

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
                <div className="space-y-4">
                    <InformasiBangunan bangunan={bangunan} />
                    <InformasiUmumPengawasan pengawasan={pengawasan} />
                </div>
                <div className="space-y-4">
                    <InformasiTertibPengawasan pengawasan={pengawasan} />
                </div>
            </div>

            <FormRekomendasi
                pengawasan="Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi"
                link={`pemanfaatan-produk/${pengawasan.id}`}
            />

            {/* <div className="my-5">
                <div className="mb-2.5">
                    <h4 className="font-medium text-lg text-slate-800 leading-6" id="rekomendasi">Rekomendasi Hasil</h4>
                    <h5 className="font-light text-xs text-slate-500">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</h5>
                </div>
                <Card className="w-full h-fit">
                    <Card.Body className="grid grid-cols-3 gap-5 p-5 text-xs">
                        <div className="col-span-2">
                            <label htmlFor="rekomendasi" className="block mb-2 text-xs font-medium text-slate-800">Temuan dan Rekomendasi <span className="text-red-400">*</span></label>
                            <textarea
                                name="rekomendasi" id="rekomendasi" rows="6" placeholder="cth. Lorem ipsum dolor sit amet"
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="keterangan" className="block mb-2 text-xs font-medium text-slate-800">Keterangan</label>
                                <textarea
                                    name="keterangan" id="keterangan" rows="2" placeholder="cth. Lorem ipsum dolor sit amet"
                                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                            <div>
                                <label htmlFor="tanggalTemuan" className="block mb-2 text-xs font-medium text-slate-800">Tanggal Temuan</label>
                                <input
                                    type="date" name="tanggalTemuan" id="tanggalTemuan"
                                    className="px-3 py-2 block w-1/2 rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                        </div>
                        <div className="col-span-3 flex justify-end items-center gap-x-2.5">
                            <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-2.5">Kembali</button>
                            <button type="submit" className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-2.5">
                                Simpan
                            </button>
                        </div>
                    </Card.Body>
                </Card>
            </div> */}
            {/* <div className="grid grid-cols-4 gap-5 my-5 max-h-screen">
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
            </div> */}
        </>
    );
}

RekomendasiPengawasanPemanfaatanProdukCreate.layout = page => <Layout children={page} />;

export default RekomendasiPengawasanPemanfaatanProdukCreate;
