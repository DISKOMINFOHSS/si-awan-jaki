import React from "react";

import Layout from "../../../../../Components/Layout";
import Breadcrumb from "../../../../../Components/Breadcrumb";
import Dropdown from "../../../../../Components/Dropdown";
import { InformasiTertibPengawasanLingkup5, InformasiUmumPengawasan, InformasiUsaha } from "../../../../../Components/Usaha/BUJK/InformasiPengawasan";

import useToggleWithClickOutside from "../../../../../Hooks/useToggleWithClickOutside";

import {
    LiaHomeSolid,
    LiaFileAlt,
    LiaListAltSolid,
    LiaEllipsisHSolid,
    LiaInfoCircleSolid,
    LiaLinkSolid,
} from "react-icons/lia";
import FormPemeriksaanPengembanganUsaha from "../../../../../Components/Usaha/BUJK/FormPemeriksaanPengembanganUsaha";
import Card from "../../../../../Components/Card";

function DaftarPengembanganUsaha({ pengawasanId, daftarPengembanganUsaha }) {
    const daftar = daftarPengembanganUsaha.map((pengembanganUsaha, i) => {
        const daftarPemeriksaan = pengembanganUsaha.map((pemeriksaan) => (
            <FormPemeriksaanPengembanganUsaha
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
                    {`${i+1}. ${pengembanganUsaha[0].namaPemeriksaan}`}
                </div>
                {daftarPemeriksaan}
            </div>
        )
    });

    return <>{daftar}</>;
}

const PengawasanUBUJKLingkup5Show = ({ data }) => {
    console.log(data);
    const { lingkupPengawasan, pengawasan } = data;
    const { usaha, daftarPemeriksaan } = pengawasan;

    const daftarPengembanganUsaha = Array(5).fill([]);
    daftarPemeriksaan.map((pemeriksaan) => {
        const i = Number(pemeriksaan.id[0]) - 1;
        daftarPengembanganUsaha[i] = [...daftarPengembanganUsaha[i], pemeriksaan];
    });

    const [
        moreDropdownRef,
        isMoreDropdownOpened,
        toggleMoreDropdown
    ] = useToggleWithClickOutside(false);

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pengawasan/usaha/${lingkupPengawasan.id}`}>{`${lingkupPengawasan.id}. ${lingkupPengawasan.label}`}</Breadcrumb.Item>
                <Breadcrumb.Item active>{usaha.nama}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-start mt-2 mb-4">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Pengawasan Tertib Usaha Jasa Konstruksi</h3>
                    <h1 className="font-medium text-xl text-slate-800 uppercase">{usaha.nama}</h1>
                    <h2 className="text-xs text-slate-600">{lingkupPengawasan.lingkupPengawasan}</h2>
                </div>
                <div className="flex items-center gap-x-2">
                    <button
                        type="button"
                        className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white"
                        onClick={() => setIsModalVerificationOpened(true)}
                    >
                        <LiaListAltSolid size={18} />
                        <span>Verifikasi Pengawasan</span>
                    </button>
                    <Dropdown ref={moreDropdownRef}>
                    <Dropdown.Toggle
                            onClick={toggleMoreDropdown}
                            className="w-fit min-h-10 flex justify-center items-center space-x-1 text-slate-500 border border-slate-200 rounded text-xs tracking-wide p-2.5 shadow-sm"
                        >
                            <LiaEllipsisHSolid size={16} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                            isVisible={isMoreDropdownOpened}
                            className="min-w-full flex flex-col right-0 py-2 space-y-0.5 text-xs text-slate-700"
                        >
                            <a
                                href={`/admin/pendataan/usaha/${usaha.id}`}
                                target="_blank"
                                className="flex items-center gap-x-2 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                            >
                                <LiaInfoCircleSolid size={16} />
                                <span>Informasi Usaha</span>
                            </a>
                            <button
                                type="button"
                                className="flex items-center gap-x-2 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                                // onClick={() => {toggleMoreDropdown(), setIsModalVerificationOpened(true)}}
                            >
                                <LiaListAltSolid size={16} />
                                <span>Verifikasi Pengawasan</span>
                            </button>
                            {/* <button
                                type="button"
                                className="px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                            >
                                Buat Rekomendasi
                            </button> */}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                <div className="space-y-4">
                    <InformasiUsaha usaha={usaha} />
                    <Card className="w-full h-fit">
                        <Card.Header className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium text-slate-700 leading-tight">Laporan Badan Usaha</h3>
                                {/* <h4 className="font-light text-slate-500 text-[11px]">Daftar Laporan Badan Usaha Jasa Konstruksi</h4> */}
                            </div>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <div className="space-y-4 text-xs">
                                {
                                    usaha.daftarLaporan.map(({ id, tahun, label, url }) => (
                                        <div key={id} className="flex items-start justify-between gap-x-1 text-xs">
                                            <div className="flex gap-x-2 items-start group">
                                                <div className="bg-blue-100 text-blue-600 rounded p-2">
                                                    <LiaLinkSolid size={18} />
                                                </div>
                                                <a href={url} target="_blank" className="group-hover:text-blue-600 group-hover:underline">
                                                    <div className="font-medium">Tahun {tahun} - {label}</div>
                                                    <div className="font-light text-slate-500">{url}</div>
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="space-y-4">
                    <InformasiUmumPengawasan pengawasan={pengawasan} />
                    <InformasiTertibPengawasanLingkup5 pengawasan={pengawasan} />
                </div>
            </div>
            <DaftarPengembanganUsaha
                pengawasanId={pengawasan.id}
                daftarPengembanganUsaha={daftarPengembanganUsaha}
            />
        </>
    );
}

PengawasanUBUJKLingkup5Show.layout = page => <Layout children={page} />;

export default PengawasanUBUJKLingkup5Show;
