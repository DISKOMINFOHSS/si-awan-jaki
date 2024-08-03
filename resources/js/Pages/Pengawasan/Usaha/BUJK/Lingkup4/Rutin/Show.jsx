import React from "react";

import Layout from "../../../../../../Components/Layout";
import Breadcrumb from "../../../../../../Components/Breadcrumb";
import Card from "../../../../../../Components/Card";
import Dropdown from "../../../../../../Components/Dropdown";
import { InformasiTertibPengawasanLingkup4, InformasiUmumPengawasan, InformasiUsaha } from "../../../../../../Components/Usaha/BUJK/InformasiPengawasan";

import useToggleWithClickOutside from "../../../../../../Hooks/useToggleWithClickOutside";

import {
    LiaHomeSolid,
    LiaListAltSolid,
    LiaEllipsisHSolid,
    LiaInfoCircleSolid,
    LiaFileAlt,
    LiaCloudUploadAltSolid,
} from "react-icons/lia";
import FormDokumenNIB from "../../../../../../Components/Usaha/FormDokumenNIB";

const PengawasanRutinBUJKLingkup4Show = ({ data }) => {
    console.log(data);
    const { lingkupPengawasan, pengawasan } = data;
    const { usaha } = pengawasan;

    const [
        moreDropdownRef,
        isMoreDropdownOpened,
        toggleMoreDropdown
    ] = useToggleWithClickOutside(false);

    const [ isModalNIBOpen, setIsModalNIBOpen ] = React.useState(false);

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pengawasan/usaha/${lingkupPengawasan.id}/bujk`}>Badan Usaha Jasa Konstruksi</Breadcrumb.Item>
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
                        // onClick={() => setIsModalVerificationOpened(true)}
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
                                href={`/admin/pendataan/usaha/bujk/${usaha.id}`}
                                target="_blank"
                                className="flex items-center gap-x-2 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                            >
                                <LiaInfoCircleSolid size={16} />
                                <span>Informasi Usaha</span>
                            </a>
                            <button
                                type="button"
                                className="flex items-center gap-x-2 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                                onClick={() => {toggleMoreDropdown(), setIsModalVerificationOpened(true)}}
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
                    {/* <InformasiUsaha usaha={usaha} /> */}
                    <Card className="h-fit">
                        <Card.Body className="p-4 text-xs">
                            <div className="pb-3 border-b border-slate-200">
                                <div className="font-medium">Nama Badan Usaha</div>
                                <div className="font-light text-slate-500 uppercase">{usaha.nama}</div>
                            </div>
                            <div className="grid grid-cols-3 gap-x-4 border-b border-slate-200 py-3">
                                <div>
                                    <div className="font-medium">NIB</div>
                                    <div className="font-light text-slate-500">{usaha.nib ? usaha.nib : "-"}</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="font-medium">Dokumen NIB</div>
                                    {
                                        usaha.dokumenNIB ? (
                                            <div className="flex gap-x-2 items-start mt-1 group">
                                                <div className="bg-blue-100 text-blue-600 rounded p-2">
                                                    <LiaFileAlt size={18} />
                                                </div>
                                                <a href={usaha.dokumenNIB.filePath} target="_blank" className="text-slate-800 group-hover:text-blue-600 group-hover:underline">
                                                    <div className="font-normal uppercase">{usaha.nama}</div>
                                                    <div className="font-light text-slate-500">NIB: {usaha.nib}</div>
                                                    <div className="font-light text-slate-500 line-clamp-1">{usaha.dokumenNIB.fileName}</div>
                                                </a>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                className="group mt-1 w-fit flex items-center justify-between gap-x-10 p-2 rounded border border-dashed border-slate-200 hover:bg-slate-100"
                                                onClick={() => setIsModalNIBOpen(true)}
                                            >
                                                <div className="flex items-start gap-x-2">
                                                    <div className="rounded bg-blue-50 group-hover:bg-blue-100 text-blue-500 w-fit p-2">
                                                        <LiaCloudUploadAltSolid size={18} />
                                                    </div>
                                                    <div className="text-left">
                                                        <div className="font-normal text-xs">Upload Dokumen NIB</div>
                                                        <div className="font-light text-slate-500 text-[11px]">Maks. 2 MB</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-[11px] text-slate-700 border border-slate-200 bg-white px-2 py-1 rounded">
                                                        Browse
                                                    </div>
                                                </div>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="py-3 border-b border-slate-200">
                                <div className="font-medium">Penanggung Jawab Badan Usaha (PJBU)</div>
                                <div className="font-light text-slate-500">{usaha.pjbu}</div>
                            </div>
                            <div className="pt-3">
                                <div className="font-medium">Alamat</div>
                                <div className="font-light text-slate-500">{usaha.alamat}</div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="space-y-4">
                    <InformasiUmumPengawasan pengawasan={pengawasan} />
                    <InformasiTertibPengawasanLingkup4 pengawasan={pengawasan} />
                </div>
            </div>
            <FormDokumenNIB
                isVisible={isModalNIBOpen}
                onClose={() => setIsModalNIBOpen(false)}
                usaha={usaha}
            />
        </>
    )
}

PengawasanRutinBUJKLingkup4Show.layout = page => <Layout children={page} />;

export default PengawasanRutinBUJKLingkup4Show;
