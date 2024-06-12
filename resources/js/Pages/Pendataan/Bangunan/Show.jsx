import React from "react";

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";

import Informasi from "../../../Components/Bangunan/Informasi";
import PemilikPengelola from "../../../Components/Bangunan/PemilikPengelola";

import {
    LiaHomeSolid
} from "react-icons/lia";

const PendataanBangunanShow = ({ data }) => {
    const { bangunan } = data;
    console.log(data);

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/pendataan/bangunan">Daftar Bangunan Konstruksi</Breadcrumb.Item>
                <Breadcrumb.Item active>{bangunan.nama}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mt-2 mb-4">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Detail Bangunan Konstruksi</h3>
                    <h1 className="font-medium text-xl text-slate-800">{bangunan.nama}</h1>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                    <Informasi bangunan={bangunan} />
                </div>
                <PemilikPengelola
                    role="pemilik"
                    data={bangunan.pemilikBangunan}
                />
                <PemilikPengelola
                    role="pengelola"
                    data={bangunan.pengelolaBangunan}
                />
            </div>

        </>
    );
}

PendataanBangunanShow.layout = page => <Layout children={page} />;

export default PendataanBangunanShow;

