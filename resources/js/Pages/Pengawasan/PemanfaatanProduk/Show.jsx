import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";
import Card from "../../../Components/Card";
import Dropdown from "../../../Components/Dropdown";

import FormPemeriksaan from "../../../Components/Bangunan/FormPemeriksaan";
import useToggleWithClickOutside from "../../../Hooks/useToggleWithClickOutside";

import {
    LiaHomeSolid,
    LiaListAltSolid,
    LiaEllipsisHSolid
} from "react-icons/lia";

function DaftarLingkupPengawasan({ pengawasanId, daftarLingkupPengawasan }) {
    const daftar = daftarLingkupPengawasan.map((lingkupPengawasan, i) => {
        const daftarPemeriksaan = lingkupPengawasan.map((pemeriksaan) => (
            <FormPemeriksaan
                key={pemeriksaan.id}
                pengawasanId={pengawasanId}
                pemeriksaan={pemeriksaan}
            />
        ));

        return (
            <div
                key={i}
                className="border-b border-slate-200 py-5"
            >
                <div className="font-medium text-slate-800 space-y-2">
                    {`${i+1}. ${lingkupPengawasan[0].lingkupPengawasan}`}
                </div>
                {daftarPemeriksaan}
            </div>
        );
    })

    return <>{daftar}</>;
}

const PengawasanPemanfaatanProdukShow = ({ data }) => {
    console.log(data);
    const { pengawasan } = data;
    const { bangunan, daftarPemeriksaan } = pengawasan;

    const [
        moreDropdownRef,
        isMoreDropdownOpened,
        toggleMoreDropdown
    ] = useToggleWithClickOutside(false);

    const daftarLingkupPengawasan = Array(4).fill([]);
    daftarPemeriksaan.map((pemeriksaan) => {
        const i = Number(pemeriksaan.id[0]) - 1;
        daftarLingkupPengawasan[i] = [...daftarLingkupPengawasan[i], pemeriksaan];
    });

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/pengawasan/pemanfaatan-produk">Daftar Pengawasan Tertib Pemanfaatan Produk</Breadcrumb.Item>
                <Breadcrumb.Item active>Detail Pengawasan</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mt-2 mb-4">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</h3>
                    <h1 className="font-medium text-xl text-slate-800 uppercase">{bangunan.nama}</h1>
                </div>
                <div className="flex items-center gap-x-2">
                    <Link
                        href={`/admin/pengawasan/pemanfaatan-produk/${pengawasan.id}/rekomendasi`}
                        className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white"
                    >
                        <LiaListAltSolid size={18} />
                        <span>Buat Rekomendasi</span>
                    </Link>
                    <Dropdown ref={moreDropdownRef}>
                        <Dropdown.Toggle
                            onClick={toggleMoreDropdown}
                            className="w-fit min-h-10 flex justify-center items-center space-x-1 text-slate-500 border border-slate-200 rounded text-xs tracking-wide p-2.5 shadow-sm"
                        >
                            <LiaEllipsisHSolid size={16} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                            isVisible={isMoreDropdownOpened}
                            className="min-w-36 flex flex-col right-0 py-2 space-y-0.5 text-xs text-slate-700"
                        >
                            <a href="#" className="px-4 py-2 hover:bg-slate-100 hover:text-blue-600">Pengaturan</a>
                            <a href="#" className="px-4 py-2 hover:bg-slate-100 hover:text-blue-600">Pengaturan</a>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 w-full mt-5">
                <Card className="w-full h-fit">
                    <Card.Body className="p-4 text-xs">
                        <div className="pb-3 border-b border-slate-200">
                            <div className="font-medium">Nama Bangunan Konstruksi</div>
                            <div className="font-light text-slate-500 uppercase">{bangunan.nama}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 border-b border-slate-200 py-3">
                            <div>
                                <div className="font-medium">Nama Pemilik Bangunan</div>
                                <div className="font-light text-slate-500 uppercase">{bangunan.pemilikBangunan}</div>
                            </div>
                            <div>
                                <div className="font-medium">Nama Pengelola Bangunan</div>
                                <div className="font-light text-slate-500 uppercase">{bangunan.pengelolaBangunan}</div>
                            </div>
                        </div>
                        <div className="pt-3">
                            <div className="font-medium">Lokasi Bangunan</div>
                            <div className="font-light text-slate-500 capitalize">
                                {bangunan.lokasi}
                                {bangunan.desaKelurahan && `, ${bangunan.desaKelurahan.toLowerCase()}`}
                                {bangunan.kecamatan && `, ${bangunan.kecamatan.toLowerCase()}`}
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="h-fit w-full">
                    <Card.Body className="p-4 text-xs">
                        <div className="grid grid-cols-2 gap-x-4 pb-3 border-b border-slate-200">
                            <div>
                                <div className="font-medium">Jenis Pengawasan</div>
                                <div className="font-light text-slate-500">Pengawasan {pengawasan.jenisPengawasan}</div>
                            </div>
                            <div>
                                <div className="font-medium">Tanggal Pengawasan</div>
                                <div className="font-light text-slate-500">{pengawasan.tanggalPengawasan}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 pt-3">
                            <div>
                                <div className="font-medium">Tanggal Verifikasi</div>
                                <div className="font-light text-slate-500">{pengawasan.verifiedAt ? pengawasan.verifiedAt : '-'}</div>
                            </div>
                            <div>
                                <div className="font-medium">Verifikasi oleh</div>
                                <div className="font-light text-slate-500">{pengawasan.verifiedBy ? pengawasan.verifiedBy : '-'}</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <DaftarLingkupPengawasan
                pengawasanId={pengawasan.id}
                daftarLingkupPengawasan={daftarLingkupPengawasan}
            />
        </>
    );
}

PengawasanPemanfaatanProdukShow.layout = page => <Layout children={page} />;

export default PengawasanPemanfaatanProdukShow;
