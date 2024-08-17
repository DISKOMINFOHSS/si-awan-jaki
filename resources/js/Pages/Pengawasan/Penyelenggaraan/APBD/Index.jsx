import React from "react";

import Layout from "../../../../Components/Layout";
import Breadcrumb from "../../../../Components/Breadcrumb";

import { LiaHomeSolid, LiaPlusSolid } from "react-icons/lia";
import Tabs from "../../../../Components/Tabs";
import FormAddPengawasan from "../../../../Components/Proyek/FormAddPengawasan";

const PengawasanPenyelenggaraanAPBDIndex = ({ data }) => {
    console.log(data);
    const { daftarProyek } = data;

    const [ isModalPengawasanOpen, setIsModalPengawasanOpen ] = React.useState(false);
    const tabList = [
        { label: 'Pengawasan Rutin' },
        { label: 'Pengawasan Insidental' },
    ];

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">Pilih Objek Pengawasan</Breadcrumb.Item>
                <Breadcrumb.Item active>Daftar Pengawasan Tertib Penyelenggaraan</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Tertib Penyelenggaraan Konstruksi</h1>
                    <h2 className="font-light text-xs text-slate-500">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi dengan Sumber Dana dari APBD</h2>
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
                <Tabs.Tab>Pengawasan Rutin</Tabs.Tab>
                <Tabs.Tab>Pengawasan Insidental</Tabs.Tab>
            </Tabs>
            <FormAddPengawasan
                isVisible={isModalPengawasanOpen}
                onClose={() => setIsModalPengawasanOpen(false)}
                daftarProyek={daftarProyek.map(({
                    id,
                    namaPaket,
                    tahunAnggaran,
                    nomorKontrak,
                    tanggalMulaiPelaksanaan,
                    tanggalSelesaiPelaksanaan,
                    penyedia_jasa,
                    pengguna_jasa
                }) => ({
                    id: id,
                    namaPaket: namaPaket,
                    tahunAnggaran: tahunAnggaran,
                    nomorKontrak: nomorKontrak,
                    tanggalMulaiPelaksanaan: tanggalMulaiPelaksanaan,
                    tanggalSelesaiPelaksanaan, tanggalSelesaiPelaksanaan,
                    penyediaJasa: penyedia_jasa ? penyedia_jasa.nama : '',
                    penggunaJasa: pengguna_jasa ? (pengguna_jasa.instansi ? pengguna_jasa.instansi : '') : '',
                }))}
            />
        </>
    );
}

PengawasanPenyelenggaraanAPBDIndex.layout = page => <Layout children={page} />;

export default PengawasanPenyelenggaraanAPBDIndex;
