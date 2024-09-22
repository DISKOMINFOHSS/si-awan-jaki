import React from "react";
import { router } from "@inertiajs/react";

import Layout from "../../../../../Components/Layout";
import Breadcrumb from "../../../../../Components/Breadcrumb";
import Dropdown from "../../../../../Components/Dropdown";
import Card from "../../../../../Components/Card";
import ModalDelete from "../../../../../Components/ModalDelete";

import FormVerifikasiPengawasan from "../../../../../Components/Proyek/FormVerifikasiPengawasan";
import DaftarLingkupPengawasanInsidental from "../../../../../Components/Proyek/APBD/DaftarLingkupPengawasanInsidental";
import { InformasiProyekKonstruksi, InformasiTertibPengawasan, InformasiUmumPengawasan } from "../../../../../Components/Proyek/InformasiPengawasan";

import useToggleWithClickOutside from "../../../../../Hooks/useToggleWithClickOutside";
import { getTertibStatusBadge } from "../../../../../Utils/getStatusBadge";

import {
    LiaHomeSolid,
    LiaListAltSolid,
    LiaEllipsisHSolid,
    LiaInfoCircleSolid,
    LiaCheckCircleSolid,
    LiaTrashAltSolid,
    LiaPrintSolid
} from "react-icons/lia";

const PengawasanInsidentalPenyelenggaraanAPBDShow = ({ data }) => {
    console.log(data);
    const { pengawasan } = data;
    const {
        proyekKonstruksi,
        daftarLingkupPengawasan,
        rekomendasi,
        tertibPengawasan
    } = pengawasan;

    const [
        moreDropdownRef,
        isMoreDropdownOpened,
        toggleMoreDropdown
    ] = useToggleWithClickOutside(false);

    const [ isModalVerificationOpen, setIsModalVerificationOpen ] = React.useState(false);
    const [ isModalDeleteOpen, setIsModalDeleteOpen ] = React.useState(false);

    function handleRekomendasiClick() {
        if (tertibPengawasan !== null) {
            return router.get(`/admin/pengawasan/penyelenggaraan/APBD/insidental/${pengawasan.id}/rekomendasi`);
        }

        return setIsModalVerificationOpen(true);
    }

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
                    <h1 className="font-medium text-base text-slate-800 leading-tight">{proyekKonstruksi.namaPaket}</h1>
                </div>
                <div className="flex items-center gap-x-2.5">
                    {
                        rekomendasi ? (
                            <a
                                href={`/admin/pengawasan/penyelenggaraan/APBD/${pengawasan.jenisPengawasan.toLowerCase()}/${pengawasan.id}/simak`}
                                target="_blank"
                                className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white whitespace-nowrap"
                            >
                                <LiaPrintSolid size={16} />
                                <span>Cetak PDF</span>
                            </a>
                        ) : (
                            <button
                                className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white whitespace-nowrap"
                                onClick={() => handleRekomendasiClick()}
                            >
                                <LiaListAltSolid size={18} />
                                <span>Buat Rekomendasi</span>
                            </button>
                        )
                    }
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
                                <span>Informasi Proyek</span>
                            </a>
                            <button
                                type="button"
                                className="flex items-center gap-x-3 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                                onClick={() => handleRekomendasiClick()}
                            >
                                <LiaListAltSolid size={16} />
                                <span>Rekomendasi</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-x-3 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                                onClick={() => {toggleMoreDropdown(), setIsModalVerificationOpen(true)}}
                            >
                                <LiaCheckCircleSolid size={16} />
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
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full my-4">
                <InformasiProyekKonstruksi proyekKonstruksi={proyekKonstruksi} />
                <div className="space-y-4">
                    <InformasiUmumPengawasan pengawasan={pengawasan} />
                    <Card className="h-fit">
                        <Card.Body className="p-4 text-xs grid grid-cols-2 gap-4 items-center">
                            <div>
                                <div className="text-slate-800">Hasil Pengawasan</div>
                                <div className="font-light text-[11px] text-slate-500">Kesimpulan Verifikasi Pengawasan</div>
                            </div>
                            <div className="font-light">{getTertibStatusBadge(pengawasan.tertibPengawasan)}</div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-span-2">
                    <InformasiTertibPengawasan pengawasan={pengawasan} />
                </div>
            </div>
            <DaftarLingkupPengawasanInsidental
                pengawasanId={pengawasan.id}
                daftarLingkupPengawasan={daftarLingkupPengawasan}
            />
            <FormVerifikasiPengawasan
                isVisible={isModalVerificationOpen}
                onClose={() => setIsModalVerificationOpen(false)}
                pengawasan={pengawasan}
            />
            <ModalDelete
                isVisible={isModalDeleteOpen}
                onClose={() => setIsModalDeleteOpen(false)}
                url={`/admin/pengawasan/penyelenggaraan/APBD`}
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

PengawasanInsidentalPenyelenggaraanAPBDShow.layout = page => <Layout children={page} />;

export default PengawasanInsidentalPenyelenggaraanAPBDShow;
