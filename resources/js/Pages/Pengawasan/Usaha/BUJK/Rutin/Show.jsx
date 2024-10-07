import React from "react";
import { Link, router } from "@inertiajs/react";

import Layout from "../../../../../Components/Layout";
import Breadcrumb from "../../../../../Components/Breadcrumb";
import Card from "../../../../../Components/Card";
import Dropdown from "../../../../../Components/Dropdown";
import {
    InformasiTertibPengawasanLingkup2,
    InformasiTertibPengawasanLingkup3,
    InformasiTertibPengawasanLingkup4,
    InformasiTertibPengawasanLingkup5,
} from "../../../../../Components/Usaha/BUJK/InformasiPengawasan";

import useToggleWithClickOutside from "../../../../../Hooks/useToggleWithClickOutside";
import { formatDateToIndonesia } from "../../../../../Utils/formatDate";

import {
    LiaHomeSolid,
    LiaListAltSolid,
    LiaEllipsisHSolid,
    LiaInfoCircleSolid,
    LiaPrintSolid
} from "react-icons/lia";
import ModalError from "../../../../../Components/ModalError";
import { getTertibStatusBadge } from "../../../../../Utils/getStatusBadge";

const PengawasanRutinBUJKIndex = ({ data }) => {
    console.log(data);
    const { pengawasan } = data;
    const {
        usaha,
        tertibPengawasanLingkup2,
        tertibPengawasanLingkup3,
        tertibPengawasanLingkup4,
        tertibPengawasanLingkup5,
        rekomendasi,
    } = pengawasan;

    const [
        moreDropdownRef,
        isMoreDropdownOpened,
        toggleMoreDropdown
    ] = useToggleWithClickOutside(false);

    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);

    const tertibPengawasan = (
        tertibPengawasanLingkup2 === null ||
        tertibPengawasanLingkup3 === null ||
        tertibPengawasanLingkup4 === null ||
        tertibPengawasanLingkup5 === null
    ) ? null : (tertibPengawasanLingkup2 && tertibPengawasanLingkup3 && tertibPengawasanLingkup4 && tertibPengawasanLingkup5) === 1;

    function handleRekomendasiClick() {
        if (
            tertibPengawasanLingkup2 !== null &&
            tertibPengawasanLingkup3 !== null &&
            tertibPengawasanLingkup4 !== null &&
            tertibPengawasanLingkup5 !== null
        ) {
            router.get(`/admin/pengawasan/usaha/bujk/rutin/${pengawasan.id}/rekomendasi`);
        }

        return setIsModalErrorOpen(true);
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="#">...</Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/pengawasan/usaha/bujk">Daftar Pengawasan BUJK</Breadcrumb.Item>
                <Breadcrumb.Item active>{usaha.nama}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mt-2 mb-4">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Pengawasan Penyelenggaraan Jasa Konstruksi</h3>
                    <h1 className="font-medium text-xl text-slate-800 uppercase">{usaha.nama}</h1>
                    <h2 className="text-xs text-slate-600">Pengawasan Tertib Usaha Jasa Konstruksi secara Rutin</h2>
                </div>
                <div className="flex items-center gap-x-2.5">
                    {
                        rekomendasi ? (
                            <a
                                href={`/admin/pengawasan/usaha/bujk/rutin/${pengawasan.id}/simak`}
                                target="_blank"
                                className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white whitespace-nowrap"
                            >
                                <LiaPrintSolid size={16} />
                                <span>Cetak PDF</span>
                            </a>
                        ) : (

                            <button
                                className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white whitespace-nowrap"
                                onClick={handleRekomendasiClick}
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
                                href={`/admin/pendataan/usaha/${usaha.id}`}
                                target="_blank"
                                className="flex items-center gap-x-3 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                            >
                                <LiaInfoCircleSolid size={16} />
                                <span>Informasi Usaha</span>
                            </a>
                            <button
                                type="button"
                                className="flex items-center gap-x-3 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                                onClick={handleRekomendasiClick}
                            >
                                <LiaListAltSolid size={16} />
                                <span>Rekomendasi</span>
                            </button>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                <div className="space-y-4">
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
                                    <div className="font-medium">Penanggung Jawab Badan Usaha (PJBU)</div>
                                    <div className="font-light text-slate-500">{usaha.pjbu}</div>
                                </div>
                            </div>
                            <div className="pt-3">
                                <div className="font-medium">Alamat</div>
                                <div className="font-light text-slate-500">{usaha.alamat}</div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="h-fit">
                        <Card.Body className="p-4 text-xs">
                            <div className="grid grid-cols-2 gap-x-4 text-xs pb-3 border-b border-slate-200">
                                <div>
                                    <div className="font-medium text-slate-800">Status</div>
                                    <div className="font-light text-[11px] text-slate-500">Perizinan Berusaha</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-x-2">
                                        <input
                                            type="radio" id="kepemilikanIzinUsahaTrue" name="kepemilikanIzinUsaha" value="1" readOnly checked={pengawasan.statusIzinUsaha === "Aktif"}
                                            className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label htmlFor="kepemilikanIzinUsahaTrue" className="text-slate-700">Aktif</label>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <input
                                            type="radio" id="kepemilikanIzinUsahaFalse" name="kepemilikanIzinUsaha" value="0" readOnly checked={pengawasan.statusIzinUsaha === "Tidak Aktif"}
                                            className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label htmlFor="kepemilikanIzinUsahaFalse" className="text-slate-700">Tidak Aktif</label>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 grid grid-cols-2 gap-x-4 text-xs">
                                <div>
                                    <div className="font-medium text-slate-800">Nomor NIB</div>
                                    <div className="font-light text-[11px] text-slate-500">Status Verifikasi sesuai OSS</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-x-2">
                                        <input
                                            type="radio" id="keabsahanIzinUsahaTrue" name="keabsahanIzinUsaha" value="1" readOnly checked={pengawasan.statusVerifikasiNIB}
                                            className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label htmlFor="keabsahanIzinUsahaTrue" className="text-slate-700">Terverifikasi</label>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <input
                                            type="radio" id="keabsahanIzinUsahaFalse" name="keabsahanIzinUsaha" value="0" readOnly checked={!pengawasan.statusVerifikasiNIB}
                                            className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label htmlFor="keabsahanIzinUsahaFalse" className="text-slate-700">Belum Terverifikasi</label>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="h-fit w-full">
                        <Card.Body className="p-4 text-xs">
                            <div className="grid grid-cols-2 gap-x-4 pb-3 border-b border-slate-200">
                                <div>
                                    <div className="font-medium">Jenis Pengawasan</div>
                                    <div className="font-light text-slate-500">{pengawasan.jenisPengawasan}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Tanggal Pengawasan</div>
                                    <div className="font-light text-slate-500">{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 items-center pt-3">
                                <div>
                                    <div className="text-slate-800">Hasil Pengawasan</div>
                                    <div className="font-light text-[11px] text-slate-500">Kesimpulan Verifikasi Pengawasan</div>
                                </div>
                                <div className="font-light">{getTertibStatusBadge(tertibPengawasan)}</div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="space-y-5">
                    <div className="space-y-2">
                        <div className="flex items-start gap-x-2">
                            {/* <div className="rounded-full bg-blue-100 text-blue-500 h-9 w-9 flex items-center justify-center aspect-square text-center group-hover:bg-blue-200">{1}</div> */}
                            <div className="leading-5">
                                <h4 className="font-light text-slate-500 text-xs">Lingkup Pengawasan</h4>
                                <Link href={`/admin/pengawasan/usaha/2/${pengawasan.lingkup2Id}`} className="text-sm text-slate-700 hover:text-blue-600 hover:underline">Kesesuaian Kegiatan Konstruksi</Link>
                            </div>
                        </div>
                        <InformasiTertibPengawasanLingkup2 pengawasan={pengawasan} />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-start gap-x-2">
                            {/* <div className="rounded-full bg-blue-100 text-blue-500 h-9 w-9 flex items-center justify-center aspect-square text-center group-hover:bg-blue-200">{2}</div> */}
                            <div className="leading-5">
                                <h4 className="font-light text-slate-500 text-xs">Lingkup Pengawasan</h4>
                                <Link href={`/admin/pengawasan/usaha/3/${pengawasan.lingkup3Id}`} className="text-sm text-slate-700 hover:text-blue-600 hover:underline">Kesesuaian Kegiatan Konstruksi dan Segmentasi Pasar</Link>
                            </div>
                        </div>
                        <InformasiTertibPengawasanLingkup3 pengawasan={pengawasan} />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-start gap-x-2">
                            {/* <div className="rounded-full bg-blue-100 text-blue-500 h-9 w-9 flex items-center justify-center aspect-square text-center group-hover:bg-blue-200">{3}</div> */}
                            <div className="leading-5">
                                <h4 className="font-light text-slate-500 text-xs">Lingkup Pengawasan</h4>
                                <Link href={`/admin/pengawasan/usaha/4/bujk/${pengawasan.lingkup4Id}/rutin`} className="text-sm text-slate-700 hover:text-blue-600 hover:underline">Pemenuhan Persyaratan Usaha</Link>
                            </div>
                        </div>
                        <InformasiTertibPengawasanLingkup4 pengawasan={pengawasan} />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-start gap-x-2">
                            {/* <div className="rounded-full bg-blue-100 text-blue-500 h-9 w-9 flex items-center justify-center aspect-square text-center group-hover:bg-blue-200">{4}</div> */}
                            <div className="leading-5">
                                <h4 className="font-light text-slate-500 text-xs">Lingkup Pengawasan</h4>
                                <Link href={`/admin/pengawasan/usaha/5/${pengawasan.lingkup5Id}`} className="text-sm text-slate-700 hover:text-blue-600 hover:underline">Pengembangan Usaha Berkelanjutan</Link>
                            </div>
                        </div>
                        <InformasiTertibPengawasanLingkup5 pengawasan={pengawasan} />
                    </div>
                </div>
            </div>
            <ModalError
                isVisible={isModalErrorOpen}
                onClose={() => setIsModalErrorOpen(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Terdapat lingkup pengawasan yang masih belum diverifikasi. Silakan periksa kembali.
                </div>
            </ModalError>
        </>
    );
}

PengawasanRutinBUJKIndex.layout = page => <Layout children={page} />;

export default PengawasanRutinBUJKIndex;
