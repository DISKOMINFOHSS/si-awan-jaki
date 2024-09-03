import React from "react";
import { usePage } from "@inertiajs/react";

import Breadcrumb from "../../../Components/Breadcrumb";

import {
    LiaHomeSolid
} from "react-icons/lia";
import Layout from "../../../Components/Layout";

const RekapitulasiTertibPenyelenggaraanIndex = ({ data }) => {
    console.log(data);
    const { url } = usePage();

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/rekapitulasi">Pengawasan Tahunan</Breadcrumb.Item>
                <Breadcrumb.Item active>Tertib Penyelenggaraan</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Pengawasan Tertib Penyelenggaraan Jasa Konstruksi</h1>
                    <h2 className="font-light text-xs text-slate-500">Rekapitulasi Laporan Pengawasan Penyelenggaraan Jasa Konstruksi Tahun {url.split('/')[3]}</h2>
                </div>
            </div>
        </>
    );
}

RekapitulasiTertibPenyelenggaraanIndex.layout = page => <Layout children={page} />;

export default RekapitulasiTertibPenyelenggaraanIndex;
