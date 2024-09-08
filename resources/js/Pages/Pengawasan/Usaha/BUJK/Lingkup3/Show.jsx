import React from "react";

import Layout from "../../../../../Components/Layout";
import Breadcrumb from "../../../../../Components/Breadcrumb";
import Dropdown from "../../../../../Components/Dropdown";
import Card from "../../../../../Components/Card";
import ModalDelete from "../../../../../Components/ModalDelete";

import DaftarKesesuaianKegiatanLingkup3 from "../../../../../Components/Usaha/BUJK/DaftarKesesuaianKegiatanLingkup3";
import FormVerifikasiPengawasanLingkup3 from "../../../../../Components/Usaha/BUJK/FormVerifikasiPengawasanLingkup3";
import FormEditPengawasanKegiatan from "../../../../../Components/Usaha/BUJK/FormEditPengawasanKegiatan";
import {
    InformasiTambahanPengawasan,
    InformasiTertibPengawasanLingkup3,
    InformasiUmumPengawasan,
    InformasiUsaha
} from "../../../../../Components/Usaha/BUJK/InformasiPengawasan";

import useToggleWithClickOutside from "../../../../../Hooks/useToggleWithClickOutside";

import {
    LiaHomeSolid,
    LiaListAltSolid,
    LiaInfoCircleSolid,
    LiaEllipsisHSolid,
    LiaFileAlt,
    LiaEditSolid,
    LiaTrashAltSolid,
} from "react-icons/lia";

const PengawasanBUJKLingkup3Show = ({ data }) => {
    console.log(data);
    const { lingkupPengawasan, pengawasan } = data;
    const { usaha, daftarKesesuaianKegiatan } = pengawasan;

    const [
        moreDropdownRef,
        isMoreDropdownOpened,
        toggleMoreDropdown
    ] = useToggleWithClickOutside(false);

    const [ isModalEditOpen, setIsModalEditOpen ] = React.useState(false);
    const [isModalVerificationOpened, setIsModalVerificationOpened] = React.useState(false);
    const [ isModalDeleteOpen, setIsModalDeleteOpen ] = React.useState(false);

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
                                onClick={() => {toggleMoreDropdown(), setIsModalEditOpen(true)}}
                            >
                                <LiaEditSolid size={16} />
                                <span>Edit Pengawasan</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-x-2 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                                onClick={() => {toggleMoreDropdown(), setIsModalVerificationOpened(true)}}
                            >
                                <LiaListAltSolid size={16} />
                                <span>Verifikasi Pengawasan</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-x-2 px-4 py-2 text-left text-red-500 hover:bg-slate-100 hover:text-red-600 whitespace-nowrap"
                                onClick={() => {toggleMoreDropdown(), setIsModalDeleteOpen(true)}}
                            >
                                <LiaTrashAltSolid size={16} />
                                <span>Hapus Pengawasan</span>
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
                                <h3 className="font-medium text-slate-700 leading-tight">Sertifikat Badan Usaha (SBU)</h3>
                                <h4 className="font-light text-slate-500 text-[11px]">Daftar Sertifikat Standar Badan Usaha Jasa Konstruksi</h4>
                            </div>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <div className="space-y-4 text-xs">
                                {
                                    usaha.sertifikatStandar.map(({ id, fileId, fileName, filePath, status }) => (
                                        <div key={id} className="flex items-start justify-between gap-x-1 text-xs">
                                            <div className="flex gap-x-2 items-start group">
                                                <div className="bg-blue-100 text-blue-600 rounded p-2">
                                                    <LiaFileAlt size={18} />
                                                </div>
                                                <a href={filePath} target="_blank" className="group-hover:text-blue-600 group-hover:underline">
                                                    <div className="font-medium">Sertifikat {usaha.nama}</div>
                                                    <div className="font-light text-slate-500">{fileName}</div>
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
                    <InformasiTambahanPengawasan
                        statusIzinUsaha={pengawasan.statusIzinUsaha}
                        statusVerifikasiNIB={pengawasan.statusVerifikasiNIB}
                    />
                    <InformasiUmumPengawasan pengawasan={pengawasan} />
                    <InformasiTertibPengawasanLingkup3 pengawasan={pengawasan} />
                </div>
            </div>
            <div className="my-4">
                <DaftarKesesuaianKegiatanLingkup3
                    lingkupPengawasan={lingkupPengawasan}
                    pengawasanId={pengawasan.id}
                    daftarPaketPekerjaan={usaha.daftarPaketPekerjaan}
                    daftarKesesuaianKegiatan={daftarKesesuaianKegiatan}
                />
            </div>
            <FormVerifikasiPengawasanLingkup3
                isVisible={isModalVerificationOpened}
                onClose={() => setIsModalVerificationOpened(false)}
                lingkupPengawasan={lingkupPengawasan}
                pengawasan={pengawasan}
            />
            <FormEditPengawasanKegiatan
                isVisible={isModalEditOpen}
                onClose={() => setIsModalEditOpen(false)}
                lingkupPengawasan={lingkupPengawasan}
                pengawasan={pengawasan}
            />
            <ModalDelete
                isVisible={isModalDeleteOpen}
                onClose={() => setIsModalDeleteOpen(false)}
                url={`/admin/pengawasan/usaha/3`}
                id={pengawasan.id}
            >
                <div className="font-medium text-sm text-slate-700 mb-1">Apakah Anda yakin ingin menghapus pengawasan ini?</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Data yang telah dihapus tidak dapat dikembalikan.
                </div>
            </ModalDelete>
        </>
    );
}

PengawasanBUJKLingkup3Show.layout = page => <Layout children={page} />;

export default PengawasanBUJKLingkup3Show;
