import React from "react";

import Layout from "../../../../../Components/Layout";
import Breadcrumb from "../../../../../Components/Breadcrumb";
import Tabs from "../../../../../Components/Tabs";

import FormPengawasanKegiatan from "../../../../../Components/Usaha/BUJK/FormPengawasanKegiatan";
import DaftarPengawasanKegiatan from "../../../../../Components/Usaha/BUJK/DaftarPengawasanKegiatan";

import { LiaHomeSolid, LiaPlusSolid } from "react-icons/lia";

const PengawasanBUJKLingkup2Index = ({ data }) => {
    console.log(data);
    const { lingkupPengawasan, daftarPengawasan, daftarUsaha } = data;
    const [isModalPengawasanOpen, setIsModalPengawasanOpen] = React.useState(false);

    const tabList = [
        { label: 'Pengawasan Rutin' },
        { label: 'Pengawasan Insidental' },
    ];

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
                    <DaftarPengawasanKegiatan
                        daftarPengawasan={daftarPengawasan.filter(({jenisPengawasan}) => jenisPengawasan === 'Rutin')}
                    />
                </Tabs.Tab>
                <Tabs.Tab>
                    <DaftarPengawasanKegiatan
                        daftarPengawasan={daftarPengawasan.filter(({jenisPengawasan}) => jenisPengawasan === 'Insidental')}
                    />
                </Tabs.Tab>
            </Tabs>
            <FormPengawasanKegiatan
                isVisible={isModalPengawasanOpen}
                onClose={() => setIsModalPengawasanOpen(false)}
                daftarUsaha={daftarUsaha}
                lingkupPengawasan={lingkupPengawasan}
            />
        </>
    );
}

PengawasanBUJKLingkup2Index.layout = page => <Layout children={page} />;

export default PengawasanBUJKLingkup2Index;
