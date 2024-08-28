import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";
import {
    FormInformasi,
    FormPenggunaJasa,
    FormPenyediaJasa
} from "../../../Components/Proyek/FormEditKegiatan";

import {
    LiaHomeSolid,
    LiaToolsSolid,
} from "react-icons/lia";

const PendataanProyekEdit = ({ data }) => {
    console.log(data);
    const { proyekKonstruksi, daftarUsaha } = data;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pendataan/proyek-konstruksi/${proyekKonstruksi.id}`}>Detail Proyek Konstruksi</Breadcrumb.Item>
                <Breadcrumb.Item active>Edit Proyek Konstruksi</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Edit Proyek Konstruksi</h1>
                    <h2 className="font-light text-xs text-slate-500">Pendataan Penyelenggaraan Jasa Konstruksi di Kab. Hulu Sungai Selatan</h2>
                </div>
                <div className="flex items-center gap-x-2">
                    <Link
                        href={`/admin/pendataan/proyek-konstruksi/${proyekKonstruksi.id}`}
                        className="w-fit flex justify-center items-center gap-x-2 text-blue-600 bg-blue-50 rounded text-xs tracking-wide px-3 py-2.5 shadow-sm hover:bg-blue-600 hover:text-white"
                    >
                        <LiaToolsSolid size={16} />
                        <span>Lihat Proyek Konstruksi</span>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 pb-5 border-b border-slate-200">
                <div className="mt-1">
                    <h3 className="font-medium text-slate-800">Informasi Umum</h3>
                    <h4 className="font-light text-xs text-slate-500">Silakan lengkapi informasi terkait</h4>
                </div>
                <div className="col-span-3">
                    <FormInformasi proyekKonstruksi={proyekKonstruksi} />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 py-5 border-b border-slate-200">
                <div className="mt-1">
                    <h3 className="font-medium text-slate-800">Penyedia Jasa</h3>
                    <h4 className="font-light text-xs text-slate-500">Silakan lengkapi informasi terkait</h4>
                </div>
                <div className="col-span-3">
                    <FormPenyediaJasa
                        proyekId={proyekKonstruksi.id}
                        selectedUsaha={proyekKonstruksi.penyediaJasa ? proyekKonstruksi.penyediaJasa : ''}
                        daftarUsaha={daftarUsaha}
                    />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 pt-5">
                <div className="mt-1">
                    <h3 className="font-medium text-slate-800">Pengguna Jasa</h3>
                    <h4 className="font-light text-xs text-slate-500">Silakan lengkapi informasi terkait</h4>
                </div>
                <div className="col-span-3">
                    <FormPenggunaJasa
                        proyekId={proyekKonstruksi.id}
                        penggunaJasa={proyekKonstruksi.penggunaJasa ? proyekKonstruksi.penggunaJasa : ''}
                    />
                </div>
            </div>
        </>
    );
}

PendataanProyekEdit.layout = page => <Layout children={page} />;

export default PendataanProyekEdit;
