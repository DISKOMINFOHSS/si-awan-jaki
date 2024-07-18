import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";
import Tabs from "../../../Components/Tabs";

import Informasi from "../../../Components/Bangunan/Informasi";
import PemilikPengelola from "../../../Components/Bangunan/PemilikPengelola";

import {
    LiaEditSolid,
    LiaHomeSolid
} from "react-icons/lia";

const PendataanBangunanShow = ({ data }) => {
    const { bangunan } = data;
    console.log(data);

    const tabList = [
        { label: 'Informasi Bangunan' },
        { label: 'Pengawasan' },
    ];

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/pendataan/bangunan">Daftar Bangunan Konstruksi</Breadcrumb.Item>
                <Breadcrumb.Item active>{bangunan.nama}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center my-2">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Detail Bangunan Konstruksi</h3>
                    <h1 className="font-medium text-xl text-slate-800">{bangunan.nama}</h1>
                </div>
                <div className="flex items-center gap-x-2">
                    <Link
                        href={`/admin/pendataan/bangunan/${bangunan.id}/edit`}
                        className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white"
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
                </Tabs.Tab>
                <Tabs.Tab>

                </Tabs.Tab>
            </Tabs>
        </>
    );
}

PendataanBangunanShow.layout = page => <Layout children={page} />;

export default PendataanBangunanShow;

