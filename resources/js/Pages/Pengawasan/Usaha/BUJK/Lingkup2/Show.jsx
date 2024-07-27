import React from "react";

import Layout from "../../../../../Components/Layout";
import Breadcrumb from "../../../../../Components/Breadcrumb";

import { LiaHomeSolid } from "react-icons/lia";
import Card from "../../../../../Components/Card";
import formatDateToIndonesia from "../../../../../Utils/formatDateToIndonesia";
import { getTertibStatusBadge } from "../../../../../Utils/getStatusBadge";

const PengawasanBUJKLingkup2Show = ({ data }) => {
    console.log(data);
    const { lingkupPengawasan, pengawasan } = data;
    const { usaha } = pengawasan;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pengawasan/usaha/${lingkupPengawasan.id}`}>{`${lingkupPengawasan.id}. ${lingkupPengawasan.label}`}</Breadcrumb.Item>
                <Breadcrumb.Item active>{usaha.nama}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mt-2 mb-4">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Pengawasan Tertib Usaha Jasa Konstruksi</h3>
                    <h1 className="font-medium text-xl text-slate-800 uppercase">{usaha.nama}</h1>
                    <h2 className="text-xs text-slate-600">{lingkupPengawasan.lingkupPengawasan}</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                <div className="space-y-4">
                    <Card className="h-fit">
                        <Card.Body className="p-4 text-xs">
                            <div className="pb-3 border-b border-slate-200">
                                <div className="font-medium">Nama Badan Usaha</div>
                                <div className="font-light text-slate-500 uppercase">{usaha.nama}</div>
                            </div>
                            <div className="grid grid-cols-3 gap-x-4 border-b border-slate-200 py-3">
                                <div>
                                    <div className="font-medium">NIB</div>
                                    <div className="font-light text-slate-500">{usaha.nib ? usaha.nib : "-"}</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="font-medium">Penanggung Jawab Badan Usaha (PJBU)</div>
                                    <div className="font-light text-slate-500">{usaha.pjbu}</div>
                                </div>
                            </div>
                            <div className="pt-3">
                                <div className="font-medium">Alamat</div>
                                <div className="font-light text-slate-500">{usaha.alamat}</div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="h-fit">
                        <Card.Body className="p-4 text-xs">
                            <div className="grid grid-cols-2 text-xs pb-3 border-b border-slate-100">
                                <div>
                                    <div className="font-medium text-slate-800">Status</div>
                                    <div className="font-light text-[11px] text-slate-500">Perizinan Berusaha</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-x-2">
                                        <input
                                            type="radio" id="kepemilikanIzinUsahaTrue" name="kepemilikanIzinUsaha" value="1" readOnly checked={pengawasan.statusIzinUsaha === "Aktif"}
                                            className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label htmlFor="kepemilikanIzinUsahaTrue" className="text-slate-700">Aktif</label>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <input
                                            type="radio" id="kepemilikanIzinUsahaFalse" name="kepemilikanIzinUsaha" value="0" readOnly checked={!pengawasan.statusIzinUsaha === "Aktif"}
                                            className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label htmlFor="kepemilikanIzinUsahaFalse" className="text-slate-700">Tidak Aktif</label>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 grid grid-cols-2 text-xs">
                                <div>
                                    <div className="font-medium text-slate-800">Nomor NIB</div>
                                    <div className="font-light text-[11px] text-slate-500">Status Verifikasi sesuai OSS</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-x-2">
                                        <input
                                            type="radio" id="keabsahanIzinUsahaTrue" name="keabsahanIzinUsaha" value="1" readOnly checked={pengawasan.statusVerifikasiNIB}
                                            className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label htmlFor="keabsahanIzinUsahaTrue" className="text-slate-700">Terverifikasi</label>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <input
                                            type="radio" id="keabsahanIzinUsahaFalse" name="keabsahanIzinUsaha" value="0" readOnly checked={!pengawasan.statusVerifikasiNIB}
                                            className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label htmlFor="keabsahanIzinUsahaFalse" className="text-slate-700">Belum Terverifikasi</label>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="space-y-4">
                    <Card className="h-fit w-full">
                        <Card.Body className="p-4 text-xs">
                            <div className="grid grid-cols-2 gap-x-4 pb-3 border-b border-slate-200">
                                <div>
                                    <div className="font-medium">Jenis Pengawasan</div>
                                    <div className="font-light text-slate-500">Pengawasan {pengawasan.jenisPengawasan}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Tanggal Pengawasan</div>
                                    <div className="font-light text-slate-500">{formatDateToIndonesia(new Date(pengawasan.tanggalPengawasan))}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 pt-3">
                                <div>
                                    <div className="font-medium">Tanggal Verifikasi</div>
                                    <div className="font-light text-slate-500">{pengawasan.verifiedAt ? formatDateToIndonesia(new Date(pengawasan.verifiedAt)) : '-'}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Verifikasi oleh</div>
                                    <div className="font-light text-slate-500">{pengawasan.verifiedBy ? pengawasan.verifiedBy : '-'}</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="h-fit w-full">
                        <Card.Body className="p-4 text-xs">
                            <div className="grid grid-cols-2 gap-x-4 pb-3 border-b border-slate-200">
                                <div className="space-y-2">
                                    <div>
                                        <div className="font-medium">Jenis Usaha</div>
                                    </div>
                                    <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibJenisUsaha)}</div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="font-medium">Sifat Usaha</div>
                                    </div>
                                    <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibSifatUsaha)}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 pt-3">
                                <div className="space-y-2">
                                    <div>
                                        <div className="font-medium">Klasifikasi Usaha</div>
                                    </div>
                                    <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibKlasifikasiUsaha)}</div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="font-medium">Layanan Usaha</div>
                                    </div>
                                    <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibLayananUsaha)}</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
}

PengawasanBUJKLingkup2Show.layout = page => <Layout children={page} />;

export default PengawasanBUJKLingkup2Show;
