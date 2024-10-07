import React from "react";

import Layout from "../../../../../Components/Layout";
import Breadcrumb from "../../../../../Components/Breadcrumb";
import Tabs from "../../../../../Components/Tabs";

import {
    LiaHomeSolid,
    LiaPlusSolid,
} from "react-icons/lia";
import DaftarPengawasanRutinLingkup4 from "../../../../../Components/Usaha/BUJK/DaftarPengawasanRutinLingkup4";
import FormPengawasan from "../../../../../Components/Usaha/BUJK/FormPengawasan";

const PengawasanBUJKLingkup4Index = ({ data }) => {
    console.log(data);
    const { lingkupPengawasan, daftarUsaha, daftarPengawasan } = data;
    const [isModalPengawasanOpen, setIsModalPengawasanOpen] = React.useState(false);

    const tabList = [
        { label: 'Pengawasan Rutin' },
        { label: 'Pengawasan Insidental' },
    ];

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pengawasan/usaha/${lingkupPengawasan.id}`}>{`${lingkupPengawasan.id}. ${lingkupPengawasan.label}`}</Breadcrumb.Item>
                <Breadcrumb.Item active>Badan Usaha Jasa Konstruksi</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Tertib Usaha Jasa Konstruksi</h1>
                    <h2 className="font-light text-xs text-slate-500">{lingkupPengawasan.lingkupPengawasan}</h2>
                </div>
                <div>
                    <button
                        className="w-full flex justify-center items-center space-x-1 text-white bg-blue-600 hover:bg-blue-800 rounded text-xs tracking-wide p-2.5 shadow-sm"
                        onClick={() => setIsModalPengawasanOpen(true)}
                    >
                        <LiaPlusSolid className="stroke-2" />
                        <span>Tambah</span>
                    </button>
                </div>
            </div>
            <Tabs tabList={tabList}>
                <Tabs.Tab>
                    <DaftarPengawasanRutinLingkup4 daftarPengawasan={daftarPengawasan.filter(({jenisPengawasan}) => jenisPengawasan === 'Rutin')} />
                </Tabs.Tab>
                <Tabs.Tab>
                    <DaftarPengawasanRutinLingkup4 daftarPengawasan={daftarPengawasan.filter(({jenisPengawasan}) => jenisPengawasan === 'Insidental')} />
                </Tabs.Tab>
            </Tabs>
            <FormPengawasan
                isVisible={isModalPengawasanOpen}
                onClose={() => setIsModalPengawasanOpen(false)}
                lingkupPengawasan={lingkupPengawasan}
                daftarUsaha={daftarUsaha}
            />
        </>
    )
}

PengawasanBUJKLingkup4Index.layout = page => <Layout children={page} />;

export default PengawasanBUJKLingkup4Index;
