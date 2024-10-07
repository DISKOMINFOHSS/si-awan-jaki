import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";
import Tabs from "../../../Components/Tabs";

import {
    Informasi,
    InformasiPenyediaJasa,
    InformasiPenggunaJasa,
    InformasiKonsultanPengawas
} from "../../../Components/Proyek/Informasi";

import { LiaHomeSolid, LiaEditSolid } from "react-icons/lia";
import DaftarSuratPernyataan from "../../../Components/Proyek/DaftarSuratPernyataan";
import getDefaultData from "../../../Utils/getDefaultData";

const PendataanProyekShow = ({ data }) => {
    console.log(data);
    const { proyekKonstruksi } = data;

    const tabList = [
        { label: 'Informasi Proyek Konstruksi' },
        { label: 'Dokumen Bukti Dukung' },
    ];

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pendataan/proyek-konstruksi`}>Daftar Proyek Konstruksi</Breadcrumb.Item>
                <Breadcrumb.Item active>Detail Proyek Konstruksi</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Detail Proyek Konstruksi</h1>
                    <h2 className="text-xs text-slate-600 line-clamp-1">{proyekKonstruksi.namaPaket}</h2>
                </div>
                <div className="flex items-center gap-x-2">
                    <Link
                        href={`/admin/pendataan/proyek-konstruksi/${proyekKonstruksi.id}/edit`}
                        className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide px-3 py-2.5 shadow-sm hover:bg-blue-600 hover:text-white"
                    >
                        <LiaEditSolid size={18} />
                        <span>Edit Informasi</span>
                    </Link>
                </div>
            </div>
            <Tabs tabList={tabList}>
                <Tabs.Tab>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <Informasi proyekKonstruksi={proyekKonstruksi} />
                        </div>
                        <div className="space-y-4">
                            <InformasiPenyediaJasa penyediaJasa={proyekKonstruksi.penyediaJasa ? proyekKonstruksi.penyediaJasa : ''} />
                            <InformasiKonsultanPengawas konsultanPengawas={getDefaultData(proyekKonstruksi.konsultanPengawas)} namaPaket={proyekKonstruksi.namaPaketPengawasan} />
                        </div>
                        <InformasiPenggunaJasa penggunaJasa={proyekKonstruksi.penggunaJasa ? proyekKonstruksi.penggunaJasa : ''} />
                    </div>
                </Tabs.Tab>
                <Tabs.Tab>
                    <DaftarSuratPernyataan proyekKonstruksi={proyekKonstruksi}/>
                </Tabs.Tab>
            </Tabs>
        </>
    );
}

PendataanProyekShow.layout = page => <Layout children={page} />;

export default PendataanProyekShow;
