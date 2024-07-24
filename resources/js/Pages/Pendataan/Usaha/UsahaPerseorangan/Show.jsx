import React from "react";

import Layout from "../../../../Components/Layout";
import Breadcrumb from "../../../../Components/Breadcrumb";

import {
    LiaHomeSolid
} from "react-icons/lia";

const PendataanBUJKShow = ({ data }) => {
    console.log(data);
    // const { usaha } = data;
    // const { jenisUsaha } = usaha;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pendataan/usaha/`}>Usaha Orang Perseorangan</Breadcrumb.Item>
                <Breadcrumb.Item active>Contoh Usaha</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center my-2">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Detail Usaha Jasa Konstruksi</h3>
                    <h1 className="font-medium text-xl text-slate-800">Contoh Usaha</h1>
                </div>
                {/* <div className="flex items-center gap-x-2">
                    <Link
                        href={`/admin/pendataan/bangunan/${bangunan.id}/edit`}
                        className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white"
                    >
                        <LiaEditSolid size={18} />
                        <span>Edit Informasi</span>
                    </Link>
                </div> */}
            </div>
        </>
    );
}

PendataanBUJKShow.layout = page => <Layout children={page} />;

export default PendataanBUJKShow;
