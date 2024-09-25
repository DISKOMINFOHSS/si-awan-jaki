import React from "react";
import Layout from "../../../../../Components/Layout";
import Breadcrumb from "../../../../../Components/Breadcrumb";
import FormRekomendasi from "../../../../../Components/Pengawasan/FormRekomendasi";
import {
    InformasiTambahanPengawasan,
    InformasiTertibPengawasanLingkup2,
    InformasiUmumPengawasan,
    InformasiUsaha
} from "../../../../../Components/Usaha/BUJK/InformasiPengawasan";

import { LiaHomeSolid, LiaPrintSolid } from "react-icons/lia";

const RekomendasiPengawasanBUJKLingkup2 = ({ data }) => {
    console.log(data);
    const { lingkupPengawasan, pengawasan } = data;
    const { usaha } = pengawasan;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pengawasan/usaha/${lingkupPengawasan.id}/${pengawasan.id}`}>Detail Pengawasan</Breadcrumb.Item>
                <Breadcrumb.Item active>Rekomendasi</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mt-2 mb-4">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Pengawasan Tertib Usaha Jasa Konstruksi</h3>
                    <h1 className="font-medium text-xl text-slate-800 uppercase">{usaha.nama}</h1>
                    <h2 className="text-xs text-slate-600">{lingkupPengawasan.lingkupPengawasan}</h2>
                </div>
                <div className="flex items-center gap-x-2">
                    <a
                        href={pengawasan.rekomendasi ? `/admin/pengawasan/usaha/bujk/rutin/${pengawasan.id}/simak` : '#'}
                        target="_blank"
                        className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white whitespace-nowrap"
                    >
                        <LiaPrintSolid size={18} />
                        <span>Cetak PDF</span>
                    </a>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                <div className="space-y-4">
                    <InformasiUsaha usaha={usaha} />
                    <InformasiTambahanPengawasan
                        statusIzinUsaha={pengawasan.statusIzinUsaha}
                        statusVerifikasiNIB={pengawasan.statusVerifikasiNIB}
                    />
                </div>
                <div className="space-y-4">
                    <InformasiUmumPengawasan pengawasan={pengawasan} />
                    <InformasiTertibPengawasanLingkup2 pengawasan={pengawasan} />
                </div>
            </div>
            <FormRekomendasi
                tertibPengawasan="Pengawasan Tertib Usaha Jasa Konstruksi"
                rekomendasi={{}}
                url={`usaha/${lingkupPengawasan.id}/${pengawasan.id}`}
            />
        </>
    );
}

RekomendasiPengawasanBUJKLingkup2.layout = page => <Layout children={page} />;

export default RekomendasiPengawasanBUJKLingkup2;
