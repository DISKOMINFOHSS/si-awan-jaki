import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import Card from "../../../Components/Card";

import { LiaBoxesSolid, LiaStoreSolid, LiaUserAltSolid } from "react-icons/lia";

const PendataanUsahaCategory = ({ data }) => {
    console.log(data);
    const { daftarJenisUsaha } = data;

    const logo = [ <LiaBoxesSolid size={24} />, <LiaStoreSolid size={24} />, <LiaUserAltSolid size={24} /> ];

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <div className="flex gap-x-2 items-center">
                        <h1 className="font-medium text-xl text-slate-800">Usaha Jasa Konstruksi</h1>
                        <span className="rounded-full text-[11px] px-2 py-0.5 bg-blue-100 text-blue-500 font-medium">{daftarJenisUsaha.reduce((n, {jumlahUsaha}) => n + jumlahUsaha, 0)}</span>
                    </div>
                    <h2 className="font-light text-xs text-slate-500">Pendataan Usaha Jasa Konstruksi di Kab. Hulu Sungai Selatan</h2>
                </div>
            </div>
            <div>
                <h3 className="text-slate-800">Pilih Usaha</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-3">
                    {
                        daftarJenisUsaha.map(({ id, jenisUsaha, slug, jumlahUsaha }, i) => (
                            <Link key={id} href={`/admin/pendataan/usaha/${slug}`}>
                                <Card>
                                    <Card.Body className="flex flex-col justify-center items-center px-2.5 py-5 text-center group hover:bg-blue-100">
                                        <div className="rounded bg-blue-100 text-blue-500 mb-2.5 p-2.5 w-fit group-hover:bg-blue-200">
                                            {logo[i]}
                                        </div>
                                        <div className="text-sm text-slate-600 capitalize group-hover:text-blue-600 group-hover:underline">{jenisUsaha}</div>
                                        <div className="font-light text-xs text-slate-500">{jumlahUsaha} Usaha</div>
                                    </Card.Body>
                                </Card>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

PendataanUsahaCategory.layout = page => <Layout children={page} />;

export default PendataanUsahaCategory;

