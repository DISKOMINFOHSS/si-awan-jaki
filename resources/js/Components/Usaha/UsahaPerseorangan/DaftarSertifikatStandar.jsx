import React from "react";

import Card from "../../Card";
import Dropdown from "../../Dropdown";
import ModalDelete from "../../ModalDelete";

import useToggleWithClickOutside from "../../../Hooks/useToggleWithClickOutside";
import { getAktifStatusBadge } from "../../../Utils/getStatusBadge";

import {
    LiaEllipsisVSolid,
    LiaFileDownloadSolid,
    LiaTrashAltSolid,
    LiaFileAlt,
    LiaPlusCircleSolid,
    LiaCloudUploadAltSolid,
} from "react-icons/lia";
import FormSertifikatStandar from "./FormSertifikatStandar";

function FileDropdown({ sertifikatId, filePath, onDelete }) {
    const [
        fileDropdownRef,
        isFileDropdownOpened,
        toggleFileDropdown
    ] = useToggleWithClickOutside(false);

    return (
        <Dropdown ref={fileDropdownRef}>
            <Dropdown.Toggle
                onClick={toggleFileDropdown}
                className="rounded text-slate-500 py-0.5 hover:bg-slate-200"
            >
                <LiaEllipsisVSolid size={14} />
            </Dropdown.Toggle>
            <Dropdown.Menu
                isVisible={isFileDropdownOpened}
                className="min-w-36 flex flex-col right-0 py-2 space-y-0.5 text-xs text-slate-700"
            >
                <a
                    href={filePath}
                    className="flex items-center gap-x-2 px-4 py-2 hover:bg-slate-100 hover:text-blue-600"
                    target="_blank"
                    download
                >
                    <LiaFileDownloadSolid size={16} />
                    <span>Download File</span>
                </a>
                {/* <button
                    className="flex items-center gap-x-2 px-4 py-2 hover:text-blue-500 hover:bg-slate-100"
                >
                    <LiaEditSolid size={16} />
                    <span>Edit</span>
                </button> */}
                <button
                    className="flex items-center gap-x-2 px-4 py-2 text-red-500 hover:bg-slate-100"
                    onClick={() => {toggleFileDropdown(), onDelete(sertifikatId)}}
                >
                    <LiaTrashAltSolid size={16} />
                    <span>Hapus</span>
                </button>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ({ usaha, sertifikatStandar }) => {
    const [ isModalSKKOpen, setIsModalSKKOpen ] = React.useState(false);
    const [ selectedSKK, setSelectedSKK ] = React.useState({});

    const [ isModalDeleteOpen, setIsModalDeleteOpen ] = React.useState(false);
    const [ selectedSKKId, setSelectedSKKId ] = React.useState('');

    const handleDeleteClick = (sertifikatId) => {
        setSelectedSKKId(sertifikatId);
        setIsModalDeleteOpen(true);
    }

    return (
        <>
            <Card className="w-full h-fit">
                <Card.Header className="flex justify-between items-center">
                    <div>
                        <h3 className="font-medium text-slate-700 leading-tight">Sertifikat Kompetensi Kerja (SKK)</h3>
                        {/* <h4 className="font-light text-slate-500 text-[11px]">Daftar SKK Konstruksi Usaha Orang Perseorangan</h4> */}
                    </div>
                    <div>
                        <button
                            className="w-full flex justify-center items-center gap-x-1 text-blue-500 border border-blue-500 hover:bg-slate-100 rounded text-xs tracking-wide p-2 shadow-sm"
                            onClick={() => {setSelectedSKK({}), setIsModalSKKOpen(true)}}
                        >
                            <LiaPlusCircleSolid size={16} />
                            <span>Tambah</span>
                        </button>
                    </div>
                </Card.Header>
                <Card.Body className="p-4">
                    <div className="space-y-4 text-xs">
                        {
                            sertifikatStandar.length === 0 ? (
                                <button
                                    type="button"
                                    className="group w-full py-5 rounded border border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100"
                                    onClick={() => setIsModalSKKOpen(true)}
                                >
                                    <div className="rounded bg-blue-100 group-hover:bg-blue-200 text-blue-600 w-fit mx-auto p-2">
                                        <LiaCloudUploadAltSolid size={24} />
                                    </div>
                                    <div className="mt-2 text-slate-700">
                                        <div className="">
                                            <span className="font-medium text-blue-600 group-hover:underline">Klik di sini</span> untuk mengunggah SKK
                                        </div>
                                        <div className="font-light text-slate-500">(Maks. 2 MB)</div>
                                    </div>
                                </button>
                            ) : sertifikatStandar.map((sertifikat) => (
                                <div key={sertifikat.id} className="flex items-start justify-between gap-x-1 text-xs">
                                    <div className="flex gap-x-2 items-start group cursor-pointer" onClick={() => {setSelectedSKK(sertifikat), setIsModalSKKOpen(true)}}>
                                        <div className="bg-blue-100 text-blue-600 rounded p-2">
                                            <LiaFileAlt size={18} />
                                        </div>
                                        <div className="group-hover:text-blue-600 group-hover:underline">
                                            <div className="font-medium flex gap-x-2">
                                                <span>Sertifikat Kompetensi Kerja (SKK) Konstruksi</span>
                                                {getAktifStatusBadge(sertifikat.status)}
                                            </div>
                                            <div className="font-light text-slate-500">{`Nomor Sertifikat: ${sertifikat.nomorSertifikat}`}</div>
                                            <div className="font-light text-slate-500">{sertifikat.fileName}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <FileDropdown
                                            sertifikatId={sertifikat.id}
                                            filePath={sertifikat.filePath}
                                            onDelete={handleDeleteClick}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Card.Body>
            </Card>
            <FormSertifikatStandar
                isVisible={isModalSKKOpen}
                onClose={() => setIsModalSKKOpen(false)}
                usaha={usaha}
                sertifikatStandar={selectedSKK}
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
    )
}
