import React from "react";

import Layout from "../../../Components/Layout";
import Tabs from "../../../Components/Tabs";

import FormPengawasan from "../../../Components/Bangunan/FormPengawasan";
import DaftarPengawasan from "../../../Components/Bangunan/DaftarPengawasan";

import { LiaPlusSolid } from "react-icons/lia";

const PengawasanPemanfaatanProdukIndex = ({ data }) => {
    console.log(data);

    const { daftarBangunan, daftarPengawasan } = data;

    const tabList = [
        { label: 'Pengawasan Rutin' },
        { label: 'Pengawasan Insidental' },
    ];

    const [isModalPengawasanOpen, setIsModalPengawasanOpen] = React.useState(false);

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Tertib Pemanfaatan Produk Konstruksi</h1>
                    <h2 className="font-light text-xs text-slate-500">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi berdasarkan PERMEN PUPR Nomor 1 Tahun 2023</h2>
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
                    <DaftarPengawasan
                        daftarPengawasan={daftarPengawasan.filter(({jenisPengawasan}) => jenisPengawasan === 'Rutin')}
                    />
                </Tabs.Tab>
                <Tabs.Tab>
                    <DaftarPengawasan
                        daftarPengawasan={daftarPengawasan.filter(({jenisPengawasan}) => jenisPengawasan === 'Insidental')}
                    />
                </Tabs.Tab>
            </Tabs>
            <FormPengawasan
                isVisible={isModalPengawasanOpen}
                onClose={() => setIsModalPengawasanOpen(false)}
                daftarBangunan={daftarBangunan}
            />
        </>
    );
}

PengawasanPemanfaatanProdukIndex.layout = page => <Layout children={page} />;

export default PengawasanPemanfaatanProdukIndex;
