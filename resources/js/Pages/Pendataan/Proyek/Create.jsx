import React from "react";

import Breadcrumb from "../../../Components/Breadcrumb";
import Layout from "../../../Components/Layout";
import {
    FormInformasi
} from "../../../Components/Proyek/FormAddKegiatan";

import { LiaHomeSolid } from "react-icons/lia";

const PendataanProyekCreate = ({ data }) => {
    console.log(data);
    const { daftarUsaha } = data;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pendataan/proyek-konstruksi/`}>Daftar Proyek Konstruksi</Breadcrumb.Item>
                <Breadcrumb.Item active>Tambah Proyek Konstruksi</Breadcrumb.Item>
            </Breadcrumb>
            <div className="w-full mb-5">
                <h1 className="font-medium text-xl text-slate-800">Tambah Proyek Konstruksi</h1>
                <h2 className="font-light text-xs text-slate-500">Pendataan Penyelenggaraan Jasa Konstruksi di Kab. Hulu Sungai Selatan</h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div className="mt-1">
                    <h3 className="font-medium text-slate-800">Informasi Umum</h3>
                    <h4 className="font-light text-xs text-slate-500">Silakan lengkapi informasi terkait</h4>
                </div>
                <div className="col-span-3">
                    <FormInformasi />
                </div>
            </div>
        </>
    )
}

PendataanProyekCreate.layout = page => <Layout children={page} />;

export default PendataanProyekCreate;
