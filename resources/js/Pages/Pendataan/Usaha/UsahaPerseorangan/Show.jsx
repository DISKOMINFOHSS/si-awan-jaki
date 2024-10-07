import React from "react";

import Layout from "../../../../Components/Layout";
import Breadcrumb from "../../../../Components/Breadcrumb";
import Card from "../../../../Components/Card";
import Dropdown from "../../../../Components/Dropdown";

import ModalDelete from "../../../../Components/ModalDelete";
import FormDokumenNIB from "../../../../Components/Usaha/FormDokumenNIB";

import useToggleWithClickOutside from "../../../../Hooks/useToggleWithClickOutside";

import {
    LiaHomeSolid,
    LiaFileAlt,
    LiaCloudUploadAltSolid,
    LiaTrashAltSolid,
    LiaEllipsisVSolid,
    LiaFileDownloadSolid,
    LiaPlusCircleSolid,
} from "react-icons/lia";
import DaftarSertifikatStandar from "../../../../Components/Usaha/UsahaPerseorangan/DaftarSertifikatStandar";

const PendataanUsahaPerseoranganShow = ({ data }) => {
    console.log(data);
    const { usaha } = data;
    const { dokumenNIB, jenisUsaha, sertifikatStandar } = usaha;

    const [
        dokumenNIBDropdownRef,
        isDokumenNIBDropdownOpen,
        toggleDokumenNIBDropdown,
    ] = useToggleWithClickOutside(false);

    const [ isModalDeleteOpen, setIsModalDeleteOpen ] = React.useState(false);
    const [ isModalNIBOpen, setIsModalNIBOpen ] = React.useState(false);

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pendataan/usaha/`}>Usaha Orang Perseorangan</Breadcrumb.Item>
                <Breadcrumb.Item active>{usaha.nama}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center my-2">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Detail Usaha Jasa Konstruksi</h3>
                    <h1 className="font-medium text-xl text-slate-800">{usaha.nama}</h1>
                </div>
                {/* <div className="flex items-center gap-x-2">
                    <Link
                        href={`/admin/pendataan/bangunan/${bangunan.id}/edit`}
                        className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white"
                    >
                        <LiaEditSolid size={18} />
                        <span>Edit Informasi</span>
                    </Link>
                </div> */}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <Card className="w-full h-fit">
                    <Card.Body className="p-4 text-xs">
                        <div className="pb-3 border-b border-slate-200">
                            <div className="font-medium">Nama {jenisUsaha.jenisUsaha}</div>
                            <div className="font-light text-slate-500 uppercase">{usaha.nama}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-x-4 border-b border-slate-200 py-3">
                            <div>
                                <div className="font-medium">NIB</div>
                                <div className="font-light text-slate-500 uppercase">{usaha.nib}</div>
                            </div>
                            <div className="col-span-2">
                                <div className="font-medium">Dokumen NIB</div>
                                {
                                    dokumenNIB ? (
                                        <div className="flex items-start gap-x-8 mt-1">
                                            <div className="flex gap-x-2 items-start group">
                                                <div className="bg-blue-100 text-blue-600 rounded p-2">
                                                    <LiaFileAlt size={18} />
                                                </div>
                                                <a href={dokumenNIB.filePath} target="_blank" className="group-hover:text-blue-600 group-hover:underline">
                                                    <div className="font-normal uppercase">{usaha.nama}</div>
                                                    <div className="font-light text-slate-500 line-clamp-1">{dokumenNIB.fileName}</div>
                                                </a>
                                            </div>
                                            <Dropdown ref={dokumenNIBDropdownRef}>
                                                <Dropdown.Toggle
                                                    onClick={toggleDokumenNIBDropdown}
                                                    className="rounded text-slate-500 py-0.5 hover:bg-slate-200"
                                                >
                                                    <LiaEllipsisVSolid size={14} />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    isVisible={isDokumenNIBDropdownOpen}
                                                    className="min-w-36 flex flex-col right-0 py-2 space-y-0.5 text-xs text-slate-700"
                                                >
                                                    <a
                                                        href={dokumenNIB.filePath}
                                                        className="flex items-center gap-x-2 px-4 py-2 hover:bg-slate-100 hover:text-blue-600"
                                                        target="_blank"
                                                        download
                                                    >
                                                        <LiaFileDownloadSolid size={16} />
                                                        <span>Download File</span>
                                                    </a>
                                                    <button
                                                        className="flex items-center gap-x-2 px-4 py-2 text-red-500 hover:bg-slate-100"
                                                        onClick={() => {toggleDokumenNIBDropdown(); setIsModalDeleteOpen(true)}}
                                                    >
                                                        <LiaTrashAltSolid size={16} />
                                                        <span>Hapus</span>
                                                    </button>
                                                </Dropdown.Menu>
                                            </Dropdown>
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
                        <div className="pt-3 grid grid-cols-3 gap-x-4">
                            {
                                jenisUsaha.jenisUsaha !== "Usaha Orang Perseorangan" && (
                                    <div>
                                        <div className="font-medium">Penanggung Jawab (PJBU)</div>
                                        <div className="font-light text-slate-500">{usaha.pjbu}</div>
                                    </div>
                                )
                            }
                            <div className="col-span-2">
                                <div className="font-medium">Alamat</div>
                                <div className="font-light text-slate-500">{usaha.alamat ? usaha.alamat : "-"}</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <DaftarSertifikatStandar
                    usaha={usaha}
                    sertifikatStandar={sertifikatStandar}
                />
            </div>
            {
                dokumenNIB ? (
                    <ModalDelete
                        isVisible={isModalDeleteOpen}
                        onClose={() => setIsModalDeleteOpen(false)}
                        url={`/admin/pendataan/usaha/${usaha.id}/nib`}
                        id={dokumenNIB.fileId}
                    >
                        <div className="font-medium text-sm text-slate-700 mb-1">Apakah Anda yakin ingin menghapus Dokumen NIB ini?</div>
                        <div className="font-light text-xs text-slate-500 mb-3">
                            Data yang telah dihapus tidak dapat dikembalikan.
                        </div>
                    </ModalDelete>
                ) : (
                    <FormDokumenNIB
                        isVisible={isModalNIBOpen}
                        onClose={() => setIsModalNIBOpen(false)}
                        usaha={usaha}
                    />
                )
            }
        </>
    );
}

PendataanUsahaPerseoranganShow.layout = page => <Layout children={page} />;

export default PendataanUsahaPerseoranganShow;
