import React from "react";
import { router } from "@inertiajs/react";

import Layout from "../../../../Components/Layout";
import Breadcrumb from "../../../../Components/Breadcrumb";
import Card from "../../../../Components/Card";
import Dropdown from "../../../../Components/Dropdown";
import ModalDelete from "../../../../Components/ModalDelete";

import FormDokumenNIB from "../../../../Components/Usaha/FormDokumenNIB";
import FormSertifikatStandar from "../../../../Components/Usaha/UsahaPerseorangan/FormSertifikatStandar";
import FormVerifikasiPengawasan from "../../../../Components/Usaha/UsahaPerseorangan/FormVerifikasiPengawasan";

import { getTertibStatusBadge } from "../../../../Utils/getStatusBadge";
import { formatDateToIndonesia } from "../../../../Utils/formatDate";
import useToggleWithClickOutside from "../../../../Hooks/useToggleWithClickOutside";

import {
    LiaCheckCircleSolid,
    LiaCloudUploadAltSolid,
    LiaEditSolid,
    LiaEllipsisHSolid,
    LiaFileAlt,
    LiaHomeSolid,
    LiaInfoCircleSolid,
    LiaListAltSolid,
    LiaPlusCircleSolid,
    LiaSearchSolid,
    LiaTrashAltSolid
} from "react-icons/lia";

const PengawasanUsahaPerseoranganShow = ({ data }) => {
    console.log(data);
    const { lingkupPengawasan, pengawasan } = data;
    const { usaha, daftarSertifikatStandar } = pengawasan;

    const [
        moreDropdownRef,
        isMoreDropdownOpened,
        toggleMoreDropdown
    ] = useToggleWithClickOutside(false);

    const [ isModalNIBOpen, setIsModalNIBOpen ] = React.useState(false);

    const [ isModalSKKOpen, setIsModalSKKOpen ] = React.useState(false);
    const [ selectedSKK, setSelectedSKK ] = React.useState({});

    const [ isModalDeleteOpen, setIsModalDeleteOpen ] = React.useState(false);
    const [ selectedSKKId, setSelectedSKKId ] = React.useState('');

    const [ isModalVerificationOpen, setIsModalVerificationOpen ] = React.useState(false);

    function handleRekomendasiClick() {
        if (pengawasan.tertibPengawasan !== null) {
            return router.get(`/admin/pengawasan/usaha/${lingkupPengawasan.id}/usaha-perseorangan/${pengawasan.id}/rekomendasi`);
        }

        return setIsModalVerificationOpen(true);
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pengawasan/usaha/${lingkupPengawasan.id}/usaha-perseorangan`}>Usaha Orang Perseorangan</Breadcrumb.Item>
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
                        onClick={() => handleRekomendasiClick()}
                    >
                        <LiaListAltSolid size={18} />
                        <span>Rekomendasi</span>
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
                                href={`/admin/pendataan/usaha/usaha-perseorangan/${usaha.id}`}
                                target="_blank"
                                className="flex items-center gap-x-2 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                            >
                                <LiaInfoCircleSolid size={16} />
                                <span>Informasi Usaha</span>
                            </a>
                            <button
                                type="button"
                                className="flex items-center gap-x-2 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                                onClick={() => {toggleMoreDropdown(), handleRekomendasiClick()}}
                            >
                                <LiaListAltSolid size={16} />
                                <span>Rekomendasi</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-x-2 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                                onClick={() => {toggleMoreDropdown(), setIsModalVerificationOpen(true)}}
                            >
                                <LiaCheckCircleSolid size={16} />
                                <span>Verifikasi Pengawasan</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-x-2 px-4 py-2 text-left text-red-500 hover:bg-slate-100 hover:text-red-600 whitespace-nowrap"
                                onClick={() => {toggleMoreDropdown(), setIsModalDeletePengawasanOpen(true)}}
                            >
                                <LiaTrashAltSolid size={16} />
                                <span>Hapus Pengawasan</span>
                            </button>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                <Card>
                    <Card.Body className="p-4 text-xs">
                        <div className="pb-3 border-b border-slate-200">
                            <div className="font-medium">Nama Usaha Orang Perseorangan</div>
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
                        <div className="pt-3">
                            <div className="font-medium">Alamat</div>
                            <div className="font-light text-slate-500">{usaha.alamat}</div>
                        </div>
                    </Card.Body>
                </Card>
                <div className="space-y-4">
                    <Card className="h-fit w-full">
                        <Card.Body className="p-4 text-xs">
                            <div className="grid grid-cols-2 gap-x-4 pb-3 border-b border-slate-200">
                                <div>
                                    <div className="font-medium">Jenis Pengawasan</div>
                                    <div className="font-light text-slate-500">Pengawasan {pengawasan.jenisPengawasan}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Tanggal Pengawasan</div>
                                    <div className="font-light text-slate-500">{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 pt-3">
                                <div>
                                    <div className="font-medium">Tanggal Verifikasi</div>
                                    <div className="font-light text-slate-500">{pengawasan.verifiedAt ? formatDateToIndonesia(pengawasan.verifiedAt) : '-'}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Verifikasi oleh</div>
                                    <div className="font-light text-slate-500">{pengawasan.verifiedBy ? pengawasan.verifiedBy : '-'}</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="h-fit w-full">
                        <Card.Body className="p-4 text-xs">
                            <div className="grid grid-cols-2 gap-x-4">
                                <div className="space-y-2">
                                    <div>
                                        <div className="font-medium">Sertifikat Kompetensi Kerja (SKK)</div>
                                        <div className="font-light text-[11px] text-slate-500">Pemenuhan Persyaratan Usaha</div>
                                    </div>
                                    <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibPersyaratanSKK)}</div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="font-medium">Nomor Induk Berusaha (NIB)</div>
                                        <div className="font-light text-[11px] text-slate-500">Pemenuhan Persyaratan Usaha</div>
                                    </div>
                                    <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibPersyaratanNIB)}</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="my-4">
                <Card className="w-full h-fit">
                    <Card.Header className="flex justify-between items-center">
                        <div>
                            <h3 className="font-medium text-slate-700 leading-tight">Sertifikat Kompetensi Kerja (SKK)</h3>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <div className="relative mx-2">
                                <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
                                    <LiaSearchSolid size={18} className="text-slate-500 -scale-x-100" />
                                </div>
                                <input type="search" name="search" placeholder="Cari..."
                                className="border border-slate-200 rounded py-2 pl-8 block w-56 text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs" />
                            </div>
                            <button
                                className="w-full flex justify-center items-center space-x-1 text-white bg-blue-600 hover:bg-blue-800 rounded text-[11px] tracking-wide px-2.5 py-2 shadow-sm"
                                onClick={() => {setSelectedSertifikat({}), setIsModalSKKOpen(true)}}
                            >
                                <LiaPlusCircleSolid size={16}/>
                                <span>Tambah</span>
                            </button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
                                    <tr>
                                        <th scope="col" className="p-4 font-medium border-r border-slate-200">#</th>
                                        <th scope="col" className="p-4 font-medium min-w-72 border-r border-slate-200">Nomor Sertifikasi Standar</th>
                                        <th scope="col" className="p-4 font-medium min-w-44 border-r border-slate-200">Pemegang Sertifikat Standar</th>
                                        <th scope="col" className="p-4 font-medium min-w-72 border-r border-slate-200">Subklasifikasi Usaha</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700">
                                    {
                                        daftarSertifikatStandar.map((sertifikat, i) => (
                                            <tr key={sertifikat.id} className="border-b border-slate-100 hover:bg-slate-50">
                                                <td className="px-4 py-5 text-center">{i + 1}</td>
                                                <td className="px-4 py-5">
                                                    <div>
                                                        <div>Sertifikat Kompetensi Kerja (SKK) Konstruksi</div>
                                                        <div className="font-light text-slate-500">Nomor Sertifikat: {sertifikat.nomorSertifikat}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-5 text-center">{sertifikat.pemegang}</td>
                                                <td className="px-4 py-5 font-light">{sertifikat.subklasifikasi}</td>
                                                <td className="px-4 py-5 text-center">
                                                    <div className="flex gap-x-2">
                                                        <button
                                                            type="button"
                                                            className="rounded border border-slate-200 text-slate-500 p-2 hover:bg-slate-200"
                                                            onClick={() => {setSelectedSKK(sertifikat), setIsModalSKKOpen(true)}}
                                                        >
                                                            <LiaEditSolid size={18} />
                                                        </button>
                                                        <button
                                                            className="rounded border border-slate-200 text-red-500 p-2 hover:bg-slate-200"
                                                            onClick={() => {setSelectedSKKId(sertifikat.id), setIsModalDeleteOpen(true)}}
                                                        >
                                                            <LiaTrashAltSolid size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <FormDokumenNIB
                isVisible={isModalNIBOpen}
                onClose={() => setIsModalNIBOpen(false)}
                usaha={usaha}
            />
            <FormSertifikatStandar
                isVisible={isModalSKKOpen}
                onClose={() => setIsModalSKKOpen(false)}
                usaha={usaha}
                sertifikatStandar={selectedSKK}
            />
            <FormVerifikasiPengawasan
                isVisible={isModalVerificationOpen}
                onClose={() => setIsModalVerificationOpen(false)}
                lingkupPengawasan={lingkupPengawasan}
                pengawasan={pengawasan}
            />
            <ModalDelete
                isVisible={isModalDeleteOpen}
                onClose={() => setIsModalDeleteOpen(false)}
                url={`/admin/pendataan/usaha/usaha-perseorangan/${usaha.id}/skk`}
                id={selectedSKKId}
            >
                <div className="font-medium text-sm text-slate-700 mb-1">Apakah Anda yakin ingin menghapus Dokumen SKK ini?</div>
                <div className="font-light text-xs text-slate-500 mb-3">
                    Data yang telah dihapus tidak dapat dikembalikan.
                </div>
            </ModalDelete>
        </>
    );
}

PengawasanUsahaPerseoranganShow.layout = page => <Layout children={page} />;

export default PengawasanUsahaPerseoranganShow;
