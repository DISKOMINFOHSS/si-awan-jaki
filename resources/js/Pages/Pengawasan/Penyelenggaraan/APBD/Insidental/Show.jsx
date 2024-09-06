import React from "react";

import Layout from "../../../../../Components/Layout";
import Breadcrumb from "../../../../../Components/Breadcrumb";
import { InformasiProyekKonstruksi, InformasiUmumPengawasan } from "../../../../../Components/Proyek/InformasiPengawasan";

import {
    LiaHomeSolid,
} from "react-icons/lia";

const PengawasanInsidentalPenyelenggaraanAPBDShow = ({ data }) => {
    console.log(data);
    const { pengawasan } = data;
    const { proyek_konstruksi } = pengawasan;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pengawasan/penyelenggaraan/APBD`}>Daftar Pengawasan Tertib Penyelenggaraan</Breadcrumb.Item>
                <Breadcrumb.Item active>Detail Pengawasan</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center gap-x-5 mt-2 mb-4">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Pengawasan Tertib Penyelenggaraan Jasa Konstruksi</h3>
                    <h1 className="text-base text-slate-800 leading-tight">{proyek_konstruksi.namaPaket}</h1>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
                {/* <InformasiProyekKonstruksi proyekKonstruksi={proyekKonstruksi} />
                <InformasiUmumPengawasan pengawasan={pengawasan} /> */}
            </div>
        </>
    );
}

PengawasanInsidentalPenyelenggaraanAPBDShow.layout = page => <Layout children={page} />;

export default PengawasanInsidentalPenyelenggaraanAPBDShow;
