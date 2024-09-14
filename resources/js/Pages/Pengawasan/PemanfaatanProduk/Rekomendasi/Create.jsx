import React from "react";

import Layout from "../../../../Components/Layout";
import Breadcrumb from "../../../../Components/Breadcrumb";
import FormRekomendasi from "../../../../Components/Pengawasan/OldFormRekomendasi";

import { LiaHomeSolid, LiaFileAltSolid } from "react-icons/lia";

import {
    InformasiBangunan,
    InformasiTertibPengawasan,
    InformasiUmumPengawasan
} from "../../../../Components/Bangunan/InformasiPengawasan";

const RekomendasiPengawasanPemanfaatanProdukCreate = ({ data }) => {
    console.log(data);
    const { pengawasan } = data;
    const { bangunan, rekomendasiPengawasan } = pengawasan;

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
                <div className="flex items-center gap-x-2">
                    <a
                        href={`/admin/pengawasan/pemanfaatan-produk/${pengawasan.id}/laporan`}
                        target="_blank"
                        className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white"
                        disabled={rekomendasiPengawasan.length === 0}
                    >
                        <LiaFileAltSolid size={18} />
                        <span>Lihat Laporan</span>
                    </a>
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
                rekomendasiPengawasan={rekomendasiPengawasan.length ? rekomendasiPengawasan[0] : {}}
                link={`pemanfaatan-produk/${pengawasan.id}`}
            />
        </>
    );
}

RekomendasiPengawasanPemanfaatanProdukCreate.layout = page => <Layout children={page} />;

export default RekomendasiPengawasanPemanfaatanProdukCreate;
