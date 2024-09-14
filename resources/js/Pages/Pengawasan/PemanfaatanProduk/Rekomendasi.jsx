import React from "react";

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";
import Card from "../../../Components/Card";
import FormRekomendasi from "../../../Components/Pengawasan/FormRekomendasi";
import {
    InformasiBangunan,
    InformasiTertibPengawasan,
    InformasiUmumPengawasan
} from "../../../Components/Bangunan/InformasiPengawasan";

import {
    LiaHomeSolid,
    LiaFolderSolid,
} from "react-icons/lia";

const PengawasanPemanfaatanProdukRekomendasi = ({ data }) => {
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
                {/* <div className="flex items-center gap-x-2">
                    <a
                        href={`/admin/pengawasan/pemanfaatan-produk/${pengawasan.id}/laporan`}
                        target="_blank"
                        className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white"
                        disabled={rekomendasiPengawasan.length === 0}
                    >
                        <LiaFileAltSolid size={18} />
                        <span>Lihat Laporan</span>
                    </a>
                </div> */}
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
                <div className="space-y-4">
                    <InformasiBangunan bangunan={bangunan} />
                    <Card>
                        <Card.Header className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium text-slate-700 leading-tight">Bukti Dukung</h3>
                                <h4 className="font-light text-slate-500 text-[11px]">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</h4>
                            </div>
                        </Card.Header>
                        <Card.Body className="p-4">
                            {
                                bangunan.daftarBuktiDukung.map((bukti) => (
                                    <div key={bukti.id} className="flex items-start justify-between gap-x-1 text-xs">
                                        <div className="flex gap-x-2.5 items-start group">
                                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                                <LiaFolderSolid size={18} />
                                            </div>
                                            <a href={bukti.url} target="_blank" className="group-hover:text-blue-600 group-hover:underline">
                                                <div className="font-medium line-clamp-1">{bukti.label} ({bukti.tahun})</div>
                                                <div className="font-light text-slate-500 line-clamp-1">{bukti.url}</div>
                                            </a>
                                        </div>
                                    </div>
                                ))
                            }
                        </Card.Body>
                    </Card>
                </div>
                <div className="space-y-4">
                    <InformasiUmumPengawasan pengawasan={pengawasan} />
                    <InformasiTertibPengawasan pengawasan={pengawasan} />
                </div>
            </div>
            <FormRekomendasi
                tertibPengawasan="Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi"
                url={`pemanfaatan-produk/${pengawasan.id}`}
            />
        </>
    );
}

PengawasanPemanfaatanProdukRekomendasi.layout = page => <Layout children={page} />;

export default PengawasanPemanfaatanProdukRekomendasi;

