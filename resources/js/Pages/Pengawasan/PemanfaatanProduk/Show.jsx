import React from "react";
import { router } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";
import Dropdown from "../../../Components/Dropdown";

import FormPemeriksaan from "../../../Components/Bangunan/FormPemeriksaan";
import ModalError from "../../../Components/ModalError";
import FormVerifikasiPengawasan from "../../../Components/Bangunan/FormVerifikasiPengawasan";
import {
    InformasiBangunan,
    InformasiUmumPengawasan,
    InformasiTertibPengawasan
} from "../../../Components/Bangunan/InformasiPengawasan";

import useToggleWithClickOutside from "../../../Hooks/useToggleWithClickOutside";

import {
    LiaHomeSolid,
    LiaListAltSolid,
    LiaEllipsisHSolid,
    LiaFileAltSolid,
    LiaFolderSolid,
    LiaCheckCircleSolid,
    LiaInfoCircleSolid,
    LiaTrashAltSolid,
} from "react-icons/lia";
import Card from "../../../Components/Card";
import ModalDelete from "../../../Components/ModalDelete";

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
    const {
        bangunan,
        daftarPemeriksaan,
        tertibKesesuaianFungsi,
        tertibKesesuaianLokasi,
        tertibRencanaUmurKonstruksi,
        tertibKapasitasBeban,
        tertibPemeliharaanBangunan,
        tertibProgramPemeliharaan,
        tertibPengawasan,
        rekomendasiPengawasan,
    } = pengawasan;

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

    const [isModalErrorOpened, setIsModalErrorOpened] = React.useState(false);
    const [isModalVerificationOpened, setIsModalVerificationOpened] = React.useState(false);

    const [ isModalDeleteOpen, setIsModalDeleteOpen ] = React.useState(false);

    function handleRekomendasiClick() {
        const flag = daftarPemeriksaan.find(({ hasilPemeriksaan }) => {
            return hasilPemeriksaan.find(({ kesimpulan }) => kesimpulan === null);
        });

        if (flag) {
            return setIsModalErrorOpened(true);
        }

        if (
            tertibKesesuaianFungsi !== null &&
            tertibKesesuaianLokasi !== null &&
            tertibRencanaUmurKonstruksi !== null &&
            tertibKapasitasBeban !== null &&
            tertibPemeliharaanBangunan !== null &&
            tertibProgramPemeliharaan !== null &&
            tertibPengawasan !== null
        ) {
            return router.get(`/admin/pengawasan/pemanfaatan-produk/${pengawasan.id}/rekomendasi`);
        }

        return setIsModalVerificationOpened(true);
    }

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
                        <button
                            className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white"
                            onClick={() => handleRekomendasiClick()}
                        >
                            <LiaListAltSolid size={18} />
                            <span>Buat Rekomendasi</span>
                        </button>
                        {/* // <a
                        //     href={`/admin/pengawasan/pemanfaatan-produk/${pengawasan.id}/laporan`}
                        //     target="_blank"
                        //     className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white"

                        // >
                        //     <LiaFileAltSolid size={18} />
                        //     <span>Lihat Laporan</span>
                        // </a> */}
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
                                href={`/admin/pendataan/bangunan/${bangunan.id}`}
                                target="_blank"
                                className="flex items-center gap-x-2 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                            >
                                <LiaInfoCircleSolid size={16} />
                                <span>Informasi Bangunan</span>
                            </a>
                            <button
                                type="button"
                                className="flex items-center gap-x-2 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                                onClick={() => handleRekomendasiClick()}
                            >
                                <LiaListAltSolid size={16} />
                                <span>Rekomendasi</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-x-2 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                                onClick={() => {toggleMoreDropdown(), setIsModalVerificationOpened(true)}}
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
                            {/* <button
                                type="button"
                                className="px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"

                            >
                                Cetak Laporan
                            </button> */}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
                <div className="space-y-4">
                    <InformasiBangunan bangunan={bangunan} />
                    <Card>
                        <Card.Header className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium text-slate-700 leading-tight">Bukti Dukung</h3>
                                <h4 className="font-light text-slate-500 text-[11px]">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</h4>
                            </div>
                        </Card.Header>
                        <Card.Body className="p-4">
                            {
                                bangunan.daftarBuktiDukung.map((bukti) => (
                                    <div key={bukti.id} className="flex items-start justify-between gap-x-1 text-xs">
                                        <div className="flex gap-x-2.5 items-start group">
                                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                                <LiaFolderSolid size={18} />
                                            </div>
                                            <a href={bukti.url} target="_blank" className="group-hover:text-blue-600 group-hover:underline">
                                                <div className="font-medium line-clamp-1">{bukti.label} ({bukti.tahun})</div>
                                                <div className="font-light text-slate-500 line-clamp-1">{bukti.url}</div>
                                            </a>
                                        </div>
                                    </div>
                                ))
                            }
                        </Card.Body>
                    </Card>
                </div>
                <div className="space-y-4">
                    <InformasiUmumPengawasan pengawasan={pengawasan} />
                    <InformasiTertibPengawasan pengawasan={pengawasan} />
                </div>
            </div>
            <DaftarLingkupPengawasan
                pengawasanId={pengawasan.id}
                daftarLingkupPengawasan={daftarLingkupPengawasan}
            />
            <FormVerifikasiPengawasan
                isVisible={isModalVerificationOpened}
                onClose={() => setIsModalVerificationOpened(false)}
                pengawasan={pengawasan}
            />
            <ModalError
                isVisible={isModalErrorOpened}
                onClose={() => setIsModalErrorOpened(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Terdapat pemeriksaan yang masih belum diisi. Silakan periksa kembali.
                </div>
            </ModalError>
            <ModalDelete
                isVisible={isModalDeleteOpen}
                onClose={() => setIsModalDeleteOpen(false)}
                url={`/admin/pengawasan/pemanfaatan-produk`}
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

PengawasanPemanfaatanProdukShow.layout = page => <Layout children={page} />;

export default PengawasanPemanfaatanProdukShow;
