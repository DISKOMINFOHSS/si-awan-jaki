import React from "react";
import { usePage, Link } from "@inertiajs/react";

import Breadcrumb from "../../../Components/Breadcrumb";
import Layout from "../../../Components/Layout";
import {
    FormInformasi,
    FormPenggunaJasa,
    FormPenyediaJasa
} from "../../../Components/Proyek/FormKegiatan";

import { LiaHomeSolid, LiaToolsSolid } from "react-icons/lia";

const PendataanProyekCreate = ({ data }) => {
    console.log(data);
    const { proyekId } = usePage().props;
    const { daftarUsaha } = data;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pendataan/proyek/`}>Daftar Proyek Konstruksi</Breadcrumb.Item>
                <Breadcrumb.Item active>Tambah Proyek Konstruksi</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Tambah Proyek Konstruksi</h1>
                    <h2 className="font-light text-xs text-slate-500">Pendataan Penyelenggaraan Jasa Konstruksi di Kab. Hulu Sungai Selatan</h2>
                </div>
                {/* <div className="flex items-center gap-x-2">
                    {
                        proyekId && (
                            <Link
                                href={`/admin/pendataan/proyek/${proyekId}`}
                                className="w-fit flex justify-center items-center gap-x-2 text-blue-600 border border-blue-600 rounded text-xs tracking-wide px-3 py-2.5 shadow-sm hover:bg-blue-600 hover:text-white"
                            >
                                <LiaToolsSolid size={16} />
                                <span>Lihat Proyek Konstruksi</span>
                            </Link>
                        )
                    }
                </div> */}
            </div>
            <div className="grid grid-cols-4 gap-4 pb-5 border-b border-slate-200">
                <div className="mt-1">
                    <h3 className="font-medium text-slate-800">Informasi Umum</h3>
                    <h4 className="font-light text-xs text-slate-500">Silakan lengkapi informasi terkait</h4>
                </div>
                <div className="col-span-3">
                    <FormInformasi proyekKonstruksi={{}} />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 py-5 border-b border-slate-200">
                <div className="mt-1">
                    <h3 className="font-medium text-slate-800">Penyedia Jasa</h3>
                    <h4 className="font-light text-xs text-slate-500">Silakan lengkapi informasi terkait</h4>
                </div>
                <div className="col-span-3">
                    <FormPenyediaJasa proyekId={proyekId} daftarUsaha={daftarUsaha} />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 pt-5">
                <div className="mt-1">
                    <h3 className="font-medium text-slate-800">Pengguna Jasa</h3>
                    <h4 className="font-light text-xs text-slate-500">Silakan lengkapi informasi terkait</h4>
                </div>
                <div className="col-span-3">
                    <FormPenggunaJasa proyekId={proyekId} />
                </div>
            </div>

        </>
    )
}

PendataanProyekCreate.layout = page => <Layout children={page} />;

export default PendataanProyekCreate;
