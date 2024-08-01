import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";
import Card from "../../../Components/Card";

import { LiaHomeSolid, LiaSquare } from "react-icons/lia";
import { iconsJenisUsaha } from "../../../Utils/iconsUsaha";

const PengawasanUsahaCategory = ({ data }) => {
    console.log(data);
    const { lingkupPengawasan, daftarObjekPengawasan } = data;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/pengawasan/usaha">Pilih Lingkup Pengawasan</Breadcrumb.Item>
                <Breadcrumb.Item active>{`${lingkupPengawasan.id}. ${lingkupPengawasan.label}`}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Tertib Usaha Jasa Konstruksi</h1>
                    <h2 className="font-light text-xs text-slate-500">{lingkupPengawasan.lingkupPengawasan}</h2>
                </div>
            </div>
            <div>
                <h3 className="text-slate-800">Pilih Objek Pengawasan</h3>
                <div className="grid grid-cols-3 gap-5 my-3">
                    {
                        daftarObjekPengawasan.map((objek) => (
                            <Link key={objek.id} href={`/admin/pengawasan/usaha/${lingkupPengawasan.id}/${objek.slug}`}>
                                <Card>
                                    <Card.Body className="flex flex-col justify-center items-center px-2.5 py-5 text-center group hover:bg-blue-100">
                                        {
                                            lingkupPengawasan.id === 1 ?
                                            <>
                                                <div className="rounded bg-blue-100 text-blue-500 mb-2.5 p-2.5 w-fit group-hover:bg-blue-200">
                                                    <LiaSquare size={24} />
                                                </div>
                                                <div className="text-sm text-slate-600 group-hover:text-blue-600 group-hover:underline">{`${objek.pelakuUsaha} Rantai Pasok`}</div>
                                                <div className="font-light text-xs text-slate-500">{objek.kategoriSumberDaya} Konstruksi</div>
                                            </> :
                                            <>
                                                <div className="rounded bg-blue-100 text-blue-500 mb-2.5 p-2.5 w-fit group-hover:bg-blue-200">{iconsJenisUsaha[objek.slug.replace('-', '_')]}</div>
                                                <div className="text-sm text-slate-600 group-hover:text-blue-600 group-hover:underline">{objek.jenisUsaha}</div>
                                            </>
                                        }
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

PengawasanUsahaCategory.layout = page => <Layout children={page} />;

export default PengawasanUsahaCategory;
