import React from "react";

import Layout from "../../../../../Components/Layout";
import Breadcrumb from "../../../../../Components/Breadcrumb";
import Dropdown from "../../../../../Components/Dropdown";
import DaftarLingkupPengawasanInsidental from "../../../../../Components/Proyek/APBD/DaftarLingkupPengawasanInsidental";
import { InformasiProyekKonstruksi, InformasiUmumPengawasan } from "../../../../../Components/Proyek/InformasiPengawasan";

import useToggleWithClickOutside from "../../../../../Hooks/useToggleWithClickOutside";
import { getTertibStatusBadge } from "../../../../../Utils/getStatusBadge";

import {
    LiaHomeSolid,
    LiaEllipsisHSolid,
    LiaInfoCircleSolid,
    LiaListAltSolid
} from "react-icons/lia";
import Card from "../../../../../Components/Card";

const PengawasanInsidentalPenyelenggaraanAPBDShow = ({ data }) => {
    console.log(data);
    const { pengawasan } = data;
    const {
        proyekKonstruksi,
        daftarLingkupPengawasan,
        tertibProsesPemilihanPenyediaJasa,
        tertibPenerapanStandarKontrak,
        tertibPenggunaanTKK,
        tertibPemberianPekerjaan,
        tertibKetersediaanDokumenStandarK4,
        tertibPenerapanSMKK,
        tertibAntisipasiKecelakaan,
        tertibPenerapanManajemenMutu,
        tertibPemenuhanPenyediaanMPTK,
        tertibPenggunaanMPTK,
        tertibPenggunaanPDN,
        tertibPemenuhanStandarLingkungan,
        tertibPengawasan,
    } = pengawasan;

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
                <Breadcrumb.Item href={`/admin/pengawasan/penyelenggaraan/APBD`}>Daftar Pengawasan Tertib Penyelenggaraan</Breadcrumb.Item>
                <Breadcrumb.Item active>Detail Pengawasan</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center gap-x-5 mt-2 mb-4">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Pengawasan Tertib Penyelenggaraan Jasa Konstruksi</h3>
                    <h1 className="text-base text-slate-800 leading-tight">{proyekKonstruksi.namaPaket}</h1>
                </div>
                <div className="flex items-center gap-x-2.5">
                    {/* <button
                        type="button"
                        className="w-fit whitespace-nowrap flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white"
                        onClick={() => setIsModalVerificationOpen(true)}
                    >
                        <LiaListAltSolid size={18} />
                        <span>Verifikasi Pengawasan</span>
                    </button> */}
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
            <div className="grid grid-cols-2 gap-4 w-full my-4">
                <InformasiProyekKonstruksi proyekKonstruksi={proyekKonstruksi} />
                <InformasiUmumPengawasan pengawasan={pengawasan} />
                <div className="col-span-2">
                    <Card className="h-fit w-full">
                        <Card.Body className="p-4 grid grid-cols-2 gap-4 text-xs text-slate-800">
                            <div>
                                <div className="pb-3 border-b border-slate-200">
                                    <div className="space-y-2">
                                        <div>
                                            <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 1</div>
                                            <div>Pengawasan terhadap Proses Pemilihan Penyedia Jasa</div>
                                        </div>
                                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibProsesPemilihanPenyediaJasa)}</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 py-3 border-b border-slate-200">
                                    <div className="col-span-2">
                                        <div>
                                            <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 2</div>
                                            <div>Pengawasan terhadap Kontrak Kerja Konstruksi</div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <div>Penerapan Standar Kontrak</div>
                                        </div>
                                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenerapanStandarKontrak)}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <div>Penggunaan TKK Bersertifikat</div>
                                        </div>
                                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenggunaanTKK)}</div>
                                    </div>
                                    <div className="col-span-2 w-3/4 space-y-2">
                                        <div className="mt-1">
                                            <div>Pemberian Pekerjaan Utama dan/atau Penunjang kepada Subpenyedia Jasa</div>
                                        </div>
                                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPemberianPekerjaan)}</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-3">
                                    <div className="col-span-2">
                                        <div>
                                            <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 3</div>
                                            <div>Pengawasan terhadap Penerapan Standar K4</div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <div>Ketersediaan Dokumen Standar K4</div>
                                        </div>
                                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibKetersediaanDokumenStandarK4)}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <div >Penerapan SMKK</div>
                                        </div>
                                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenerapanSMKK)}</div>
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <div className="mt-1">
                                            <div>Kegiatan Antisipasi Kecelakaan Kerja</div>
                                        </div>
                                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibAntisipasiKecelakaan)}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="pb-3 border-b border-slate-200">
                                    <div className="space-y-2">
                                        <div>
                                            <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 4</div>
                                            <div>Pengawasan terhadap penerapan manajemen mutu Konstruksi</div>
                                        </div>
                                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenerapanManajemenMutu)}</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 py-3 border-b border-slate-200">
                                    <div className="col-span-2">
                                        <div>
                                            <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 5</div>
                                            <div>Pengelolaan dan Penggunaan Material, Peralatan dan Teknologi Konstruksi</div>
                                        </div>
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <div>
                                            <div>Pemenuhan penyediaan material, peralatan, dan teknologi konstruksi dalam pelaksanaan proyek konstruksi</div>
                                        </div>
                                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPemenuhanPenyediaanMPTK)}</div>
                                    </div>
                                    <div className="space-y-2 mt-1">
                                        <div>
                                            <div>Penerapan Material Standar (SNI dan Standar Lain)</div>
                                        </div>
                                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenggunaanMPTK)}</div>
                                    </div>
                                    <div className="space-y-2 mt-1">
                                        <div>
                                            <div>Penggunaan PDN untuk Teknologi dan MPK</div>
                                        </div>
                                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPenggunaanPDN)}</div>
                                    </div>
                                </div>
                                <div className="pt-3">
                                    <div className="space-y-2">
                                        <div>
                                            <div className="font-light text-[11px] text-slate-500">Lingkup Pengawasan 6</div>
                                            <div>Pengelolaan dan Pemanfaatan Sumber Material Konstruksi</div>
                                        </div>
                                        <div>Pemenuhan terhadap standar teknis lingkungan</div>
                                        <div className="font-light text-slate-500">{getTertibStatusBadge(tertibPemenuhanStandarLingkungan)}</div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <DaftarLingkupPengawasanInsidental
                pengawasanId={pengawasan.id}
                daftarLingkupPengawasan={daftarLingkupPengawasan}
            />
        </>
    );
}

PengawasanInsidentalPenyelenggaraanAPBDShow.layout = page => <Layout children={page} />;

export default PengawasanInsidentalPenyelenggaraanAPBDShow;
