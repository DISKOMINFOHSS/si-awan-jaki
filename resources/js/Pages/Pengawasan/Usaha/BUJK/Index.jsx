import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../../../Components/Layout";
import Breadcrumb from "../../../../Components/Breadcrumb";
import Tabs from "../../../../Components/Tabs";
import Card from "../../../../Components/Card";

import { LiaHomeSolid } from "react-icons/lia";
import DaftarPengawasanRutin from "../../../../Components/Usaha/BUJK/Pengawasan/DaftarPengawasanRutin";

const PengawasanBUJKIndex = ({ data }) => {
    console.log(data);
    const { daftarUsaha, daftarPengawasanRutin, daftarLingkupPengawasan } = data;

    const tabList = [
        { label: 'Pengawasan Rutin' },
        { label: 'Pengawasan Insidental' },
    ];

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/pengawasan/usaha">Pilih Objek Pengawasan</Breadcrumb.Item>
                <Breadcrumb.Item active>Badan Usaha Jasa Konstruksi</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Tertib Usaha Jasa Konstruksi</h1>
                    <h2 className="font-light text-xs text-slate-500">Pengawasan Badan Usaha Jasa Konstruksi di Kab. Hulu Sungai Selatan</h2>
                </div>
            </div>
            <Tabs tabList={tabList}>
                <Tabs.Tab>
                    <DaftarPengawasanRutin
                        daftarPengawasan={daftarPengawasanRutin}
                        daftarUsaha={daftarUsaha}
                    />
                </Tabs.Tab>
                <Tabs.Tab>
                    <div>
                        <h3 className="text-slate-800 mb-2.5">Pilih Lingkup Pengawasan</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {
                            daftarLingkupPengawasan.filter(({id}) => id !== 1).map(({ id, lingkupPengawasan }, i) => (
                                <Link key={id} href={`/admin/pengawasan/usaha/${id}${id === 4 ? `/bujk` : ''}`}>
                                    <Card className="h-full group hover:bg-blue-100">
                                        <Card.Body className="flex flex-col justify-center p-5">
                                            <div className="rounded bg-blue-100 text-blue-500 mb-2.5 py-2.5 w-fit aspect-square text-center group-hover:bg-blue-200">{i+1}</div>
                                            <div className="font-light text-sm text-slate-500 group-hover:text-blue-600 group-hover:underline">{lingkupPengawasan}</div>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            ))
                        }
                        </div>
                    </div>
                </Tabs.Tab>
            </Tabs>
        </>
    )
}

PengawasanBUJKIndex.layout = page => <Layout children={page} />;

export default PengawasanBUJKIndex;
