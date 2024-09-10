import React from "react";

import Layout from "../../../../../Components/Layout";
import Breadcrumb from "../../../../../Components/Breadcrumb";
import Dropdown from "../../../../../Components/Dropdown";

import DaftarLingkupPengawasanRutin from "../../../../../Components/Proyek/DaftarLingkupPengawasanRutin";
import FormVerifikasiPengawasan from "../../../../../Components/Proyek/FormVerifikasiPengawasan";
import { InformasiProyekKonstruksi, InformasiTertibPengawasan, InformasiUmumPengawasan } from "../../../../../Components/Proyek/InformasiPengawasan";

import useToggleWithClickOutside from "../../../../../Hooks/useToggleWithClickOutside";

import {
    LiaHomeSolid,
    LiaListAltSolid,
    LiaEllipsisHSolid,
    LiaInfoCircleSolid,
} from "react-icons/lia";


const PengawasanRutinPenyelenggaraanAPDBShow = ({ data }) => {
    console.log(data);
    const { pengawasan } = data;
    const { proyekKonstruksi, daftarLingkupPengawasan } = pengawasan;

    const [
        moreDropdownRef,
        isMoreDropdownOpened,
        toggleMoreDropdown
    ] = useToggleWithClickOutside(false);

    const [ isModalVerificationOpen, setIsModalVerificationOpen ] = React.useState(false);

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pengawasan/penyelenggaraan/APBD`}>Daftar Pengawasan Tertib Penyelenggaraan</Breadcrumb.Item>
                <Breadcrumb.Item active>Detail Pengawasan</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center gap-x-5 mt-2 mb-4">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Pengawasan Tertib Penyelenggaraan Jasa Konstruksi</h3>
                    <h1 className="text-lg text-slate-800 leading-tight">{proyekKonstruksi.namaPaket}</h1>
                </div>
                <div className="flex items-center gap-x-2.5">
                    <button
                        type="button"
                        className="w-fit whitespace-nowrap flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white"
                        onClick={() => setIsModalVerificationOpen(true)}
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
                                href={`/admin/pendataan/proyek-konstruksi/${proyekKonstruksi.id}`}
                                target="_blank"
                                className="flex items-center gap-x-3 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                            >
                                <LiaInfoCircleSolid size={16} />
                                <span>Informasi Proyek Konstruksi</span>
                            </a>
                            <button
                                type="button"
                                className="flex items-center gap-x-3 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                            >
                                <LiaListAltSolid size={16} />
                                <span>Verifikasi Pengawasan</span>
                            </button>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
                <InformasiProyekKonstruksi proyekKonstruksi={proyekKonstruksi} />
                <InformasiUmumPengawasan pengawasan={pengawasan} />
                <div className="col-span-2">
                    <InformasiTertibPengawasan pengawasan={pengawasan} />
                </div>
            </div>
            <DaftarLingkupPengawasanRutin
                pengawasanId={pengawasan.id}
                daftarLingkupPengawasan={daftarLingkupPengawasan}
            />
            <FormVerifikasiPengawasan
                isVisible={isModalVerificationOpen}
                onClose={() => setIsModalVerificationOpen(false)}
                pengawasan={pengawasan}
            />
        </>
    );
}

PengawasanRutinPenyelenggaraanAPDBShow.layout = page => <Layout children={page} />;

export default PengawasanRutinPenyelenggaraanAPDBShow;
