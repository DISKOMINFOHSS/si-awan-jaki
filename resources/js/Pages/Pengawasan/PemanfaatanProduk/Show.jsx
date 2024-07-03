import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";
import Card from "../../../Components/Card";
import Dropdown from "../../../Components/Dropdown";

import useToggleWithClickOutside from "../../../Hooks/useToggleWithClickOutside";

import {
    LiaHomeSolid,
    LiaListAltSolid,
    LiaEllipsisHSolid
} from "react-icons/lia";
import FormPemeriksaan from "../../../Components/Bangunan/FormPemeriksaan";

function Pemeriksaan({ pemeriksaan }) {
    return (
        <div className="grid grid-cols-3 gap-5 my-4">
            <div className="font-medium text-slate-800 space-y-2">
                {
                    pemeriksaan.detail && (
                        <div>
                            <h5 className="text-xs">Detail Lingkup Pengawasan</h5>
                            <p className="font-light text-xs text-slate-500 text-justify">
                                {pemeriksaan.detail}
                            </p>
                        </div>
                    )
                }
                <div>
                    <h5 className="text-xs">Indikator</h5>
                    <p className="font-light text-xs text-slate-500 text-justify">
                        {pemeriksaan.indikator}
                    </p>
                </div>
            </div>
            <div className="col-span-2">
                <Card>
                    <Card.Body className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div>
                                    <div className="font-medium text-xs text-slate-800 mb-1">Dokumen yang diperiksa</div>
                                    <p className="font-light text-xs text-slate-500 text-justify">
                                        {pemeriksaan.dokumen}
                                    </p>
                                </div>
                                <div>
                                    <div className="font-medium text-slate text-xs mb-1">Cara Pemeriksaan</div>
                                    <p className="font-light text-xs text-slate-500 text-justify">
                                        {pemeriksaan.caraPemeriksaan}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2 text-xs">
                                    <div>
                                        <div className="font-medium text-slate-800">Kesimpulan Pemeriksaan</div>
                                    </div>
                                    <div className="space-y-2.5">
                                        <div className="flex items-center gap-x-2">
                                            <input
                                                type="radio" value="true"
                                                className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                            />
                                            <label htmlFor="" className="text-slate-700">Sesuai</label>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <input
                                                type="radio" value="false"
                                                className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                            />
                                            <label htmlFor="" className="text-slate-700">Tidak Sesuai</label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="catatan" className="block mb-2 text-xs font-medium text-slate-800">Catatan Pemeriksaan</label>
                                    <textarea
                                        name="catatan" id="catatan" rows="2"
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                            </div>
                            <div className="col-span-2 flex justify-end items-center gap-x-2">
                                <button
                                    type="button"
                                    className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-3"
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

function DaftarLingkupPengawasan({ daftarLingkupPengawasan }) {
    const daftar = daftarLingkupPengawasan.map((lingkupPengawasan, i) => {
        const daftarPemeriksaan = lingkupPengawasan.map((pemeriksaan) => (
            // <Pemeriksaan
            //     key={pemeriksaan.id}
            //     pemeriksaan={pemeriksaan}
            // />
            <FormPemeriksaan
                key={pemeriksaan.id}
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
                daftarLingkupPengawasan={daftarLingkupPengawasan}
            />
        </>
    );
}

PengawasanPemanfaatanProdukShow.layout = page => <Layout children={page} />;

export default PengawasanPemanfaatanProdukShow;
