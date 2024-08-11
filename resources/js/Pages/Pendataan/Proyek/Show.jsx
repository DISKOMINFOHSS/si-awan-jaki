import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";
import {
    Informasi,
    InformasiPenggunaJasa,
    InformasiPenyediaJasa
} from "../../../Components/Proyek/Informasi";

import {
    LiaHomeSolid,
    LiaEditSolid,
} from "react-icons/lia";


const PendataanProyekShow = ({ data }) => {
    console.log(data);
    const { proyekKonstruksi } = data;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pendataan/proyek`}>Daftar Proyek Konstruksi</Breadcrumb.Item>
                <Breadcrumb.Item active>Detail Proyek Konstruksi</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Detail Proyek Konstruksi</h1>
                    <h2 className="text-xs text-slate-600 line-clamp-1">{proyekKonstruksi.namaPaket}</h2>
                </div>
                {/* <div className="flex items-center gap-x-2">
                    <Link
                        href={`/admin/pendataan/proyek/${proyekKonstruksi.id}/edit`}
                        className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white"
                    >
                        <LiaEditSolid size={18} />
                        <span>Edit Informasi</span>
                    </Link>
                </div> */}
            </div>
            <div className="my-4">
                <Informasi proyekKonstruksi={proyekKonstruksi} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InformasiPenyediaJasa penyediaJasa={proyekKonstruksi.penyediaJasa} />
                <InformasiPenggunaJasa penggunaJasa={proyekKonstruksi.penggunaJasa ? proyekKonstruksi.penggunaJasa : ''} />
            </div>
        </>
    );
}

PendataanProyekShow.layout = page => <Layout children={page} />;

export default PendataanProyekShow;
