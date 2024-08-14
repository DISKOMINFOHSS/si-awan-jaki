import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";

import {
    LiaHomeSolid,
    LiaToolsSolid,
} from "react-icons/lia";

const PendataanProyekEdit = ({ data }) => {
    console.log(data);
    const { proyekKonstruksi } = data;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pendataan/proyek-konstruksi`}>Daftar Proyek Konstruksi</Breadcrumb.Item>
                <Breadcrumb.Item active>Detail Proyek Konstruksi</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Edit Proyek Konstruksi</h1>
                    <h2 className="font-light text-xs text-slate-500">Pendataan Penyelenggaraan Jasa Konstruksi di Kab. Hulu Sungai Selatan</h2>
                </div>
                <div className="flex items-center gap-x-2">
                    <Link
                        href={`/admin/pendataan/proyek-konstruksi/${proyekKonstruksi.id}`}
                        className="w-fit flex justify-center items-center gap-x-2 text-white bg-blue-600 rounded text-xs tracking-wide px-3 py-2.5 shadow-sm hover:bg-blue-800 hover:text-white"
                    >
                        <LiaToolsSolid size={16} />
                        <span>Lihat Proyek Konstruksi</span>
                    </Link>
                </div>
            </div>
        </>
    );
}

PendataanProyekEdit.layout = page => <Layout children={page} />;

export default PendataanProyekEdit;
