import React from "react";

import Layout from "../../../../Components/Layout";
import Breadcrumb from "../../../../Components/Breadcrumb";

import { LiaHomeSolid } from "react-icons/lia";

const PengawasanRutinBUJKIndex = ({ data }) => {
    console.log(data);
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="#">...</Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/pengawasan/usaha/bujk">Badan Usaha Jasa Konstruksi</Breadcrumb.Item>
                <Breadcrumb.Item active>Nama BUJK</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-start mt-2 mb-4">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Pengawasan Tertib Usaha Jasa Konstruksi</h3>
                    <h1 className="font-medium text-xl text-slate-800 uppercase">Nama BUJK</h1>
                    {/* <h2 className="text-xs text-slate-600">{lingkupPengawasan.lingkupPengawasan}</h2> */}
                </div>
            </div>

        </>
    );
}

PengawasanRutinBUJKIndex.layout = page => <Layout children={page} />;

export default PengawasanRutinBUJKIndex;
