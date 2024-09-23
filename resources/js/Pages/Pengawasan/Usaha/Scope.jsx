import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import Card from "../../../Components/Card";

import { iconsJenisUsaha } from "../../../Utils/iconsUsaha";

const PengawasanUsahaScope = ({ data }) => {
    const { daftarLingkupPengawasan, daftarObjekPengawasan } = data;
    console.log(data);

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Tertib Usaha Jasa Konstruksi</h1>
                    <h2 className="font-light text-xs text-slate-500">Pengawasan Tertib Usaha Jasa Konstruksi berdasarkan PERMEN PUPR Nomor 1 Tahun 2023</h2>
                </div>
            </div>
            <div className="mb-4">
                <h3 className="text-slate-800">Berdasarkan Objek Pengawasan</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-3">
                {
                    daftarObjekPengawasan.map(({ id, jenisUsaha, slug }) => (
                        <Link key={id} href={`/admin/pengawasan/usaha/${slug}`}>
                            <Card>
                                <Card.Body className="flex flex-col justify-center items-center px-2.5 py-5 text-center group hover:bg-blue-100">
                                    <div className="rounded bg-blue-100 text-blue-500 mb-2.5 p-2.5 w-fit group-hover:bg-blue-200">{iconsJenisUsaha[slug.replace('-', '_')]}</div>
                                    <div className="text-sm text-slate-600 group-hover:text-blue-600 group-hover:underline">{jenisUsaha}</div>
                                </Card.Body>
                            </Card>
                        </Link>
                    ))
                }
                </div>
            </div>
            <div className="mb-4">
                <h3 className="text-slate-800">Berdasarkan Lingkup Pengawasan</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-3">
                    {
                        daftarLingkupPengawasan.map(({ id, lingkupPengawasan }) => (
                            <Link key={id} href={`/admin/pengawasan/usaha/${id}`}>
                                <Card className="h-full group hover:bg-blue-100">
                                    <Card.Body className="flex flex-col justify-center p-5">
                                        <div className="rounded bg-blue-100 text-blue-500 mb-2.5 py-2.5 w-fit aspect-square text-center group-hover:bg-blue-200">{id}</div>
                                        <div className="font-light text-sm text-slate-500 group-hover:text-blue-600 group-hover:underline">{lingkupPengawasan}</div>
                                    </Card.Body>
                                </Card>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

PengawasanUsahaScope.layout = page => <Layout children={page} />;

export default PengawasanUsahaScope;
