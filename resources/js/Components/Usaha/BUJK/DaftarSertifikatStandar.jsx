import React from "react";

import Card from "../../Card";
import Dropdown from "../../Dropdown";
import FormSertifikatStandar from "./FormSertifikatStandar";

import useToggleWithClickOutside from "../../../Hooks/useToggleWithClickOutside";

import {
    LiaEllipsisVSolid,
    LiaFileDownloadSolid,
    LiaTrashAltSolid,
    LiaFileAlt,
    LiaPlusCircleSolid,
    LiaCloudUploadAltSolid,
} from "react-icons/lia";
import { getAktifStatusBadge } from "../../../Utils/getStatusBadge";

function FileDropdown({ filePath }) {
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
                >
                    <LiaTrashAltSolid size={16} />
                    <span>Hapus</span>
                </button>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ({ usaha }) => {
    const { sertifikatStandar } = usaha;
    const [ isModalSBUOpen, setIsModalSBUOpen ] = React.useState(false);

    const [ isModalDetailSBUOpen, setIsModalDetailSBUOpen ] = React.useState(false);
    const [ selectedSertifikat, setSelectedSertifikat ] = React.useState({});

    return (
        <>
            <Card className="w-full h-fit">
                <Card.Header className="flex justify-between items-center">
                    <div>
                        <h3 className="font-medium text-slate-700 leading-tight">Sertifikat Badan Usaha (SBU)</h3>
                        <h4 className="font-light text-slate-500 text-[11px]">Daftar Sertifikat Standar Badan Usaha Jasa Konstruksi</h4>
                    </div>
                    <div>
                        <button
                            className="w-full flex justify-center items-center gap-x-1 text-blue-500 border border-blue-500 hover:bg-slate-100 rounded text-xs tracking-wide p-2 shadow-sm"
                            onClick={() => {setSelectedSertifikat({}), setIsModalSBUOpen(true)}}
                        >
                            <LiaPlusCircleSolid size={16} />
                            <span>Tambah</span>
                        </button>
                    </div>
                </Card.Header>
                <Card.Body className="p-4">
                    <div className="space-y-4 text-xs">
                        {
                            sertifikatStandar.length === 0 ?
                            <button
                                type="button"
                                className="group w-full py-5 rounded border border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100"
                                onClick={() => setIsModalSBUOpen(true)}
                            >
                                <div className="rounded bg-blue-100 group-hover:bg-blue-200 text-blue-600 w-fit mx-auto p-2">
                                    <LiaCloudUploadAltSolid size={24} />
                                </div>
                                <div className="mt-2 text-slate-700">
                                    <div className="">
                                        <span className="font-medium text-blue-600 group-hover:underline">Klik di sini</span> untuk mengunggah SBU
                                    </div>
                                    <div className="font-light text-slate-500">(Maks. 2 MB)</div>
                                </div>
                            </button> :
                            // sertifikatStandar.map(({ id, nomorSertifikat, fileId, fileName, filePath, status }) => (
                            //     <div key={id} className="flex items-start justify-between gap-x-1 text-xs">
                            //         <div className="flex gap-x-2 items-start group cursor-pointer" onClick={() => setIsModalDetailSBUOpen(true)}>
                            //             <div className="bg-blue-100 text-blue-600 rounded p-2">
                            //                 <LiaFileAlt size={18} />
                            //             </div>
                            //             <div className="group-hover:text-blue-600 group-hover:underline">
                            //                 <div className="font-medium flex gap-x-2">
                            //                     <span>Sertifikat Badan Usaha (SBU) Konstruksi</span>
                            //                     {getAktifStatusBadge(status)}
                            //                 </div>
                            //                 <div className="font-light text-slate-500">{`Nomor Sertifikat: ${nomorSertifikat}`}</div>
                            //                 <div className="font-light text-slate-500">{fileName}</div>
                            //             </div>

                            //         </div>
                            //         <div>
                            //             <FileDropdown filePath={filePath} />
                            //         </div>
                            //     </div>
                            // ))
                            sertifikatStandar.map((sertifikat) => (
                                <div key={sertifikat.id} className="flex items-start justify-between gap-x-1 text-xs">
                                    <div className="flex gap-x-2 items-start group cursor-pointer" onClick={() => {setSelectedSertifikat(sertifikat), setIsModalSBUOpen(true)}}>
                                        <div className="bg-blue-100 text-blue-600 rounded p-2">
                                            <LiaFileAlt size={18} />
                                        </div>
                                        <div className="group-hover:text-blue-600 group-hover:underline">
                                            <div className="font-medium flex gap-x-2">
                                                <span>Sertifikat Badan Usaha (SBU) Konstruksi</span>
                                                {getAktifStatusBadge(sertifikat.status)}
                                            </div>
                                            <div className="font-light text-slate-500">{`Nomor Sertifikat: ${sertifikat.nomorSertifikat}`}</div>
                                            <div className="font-light text-slate-500">{sertifikat.fileName}</div>
                                        </div>
                                        {/* <a href={filePath} target="_blank" className="group-hover:text-blue-600 group-hover:underline">
                                            <div className="font-medium">Sertifikat Standar {usaha.nama}</div>
                                            <div className="font-light text-slate-500">{`No. ${nomorSertifikat}`}</div>
                                            <div className="font-light text-slate-500">{fileName}</div>
                                        </a> */}
                                    </div>
                                    <div>
                                        <FileDropdown filePath={sertifikat.filePath} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Card.Body>
            </Card>
            <FormSertifikatStandar
                isVisible={isModalSBUOpen}
                onClose={() => setIsModalSBUOpen(false)}
                usaha={{
                    id: usaha.id,
                    nama: usaha.nama,
                    nib: usaha.nib,
                    pjbu: usaha.pjbu
                }}
                sertifikatStandar={selectedSertifikat}
            />
            {/* <FormDetailSertifikatStandar
                isVisible={isModalDetailSBUOpen}
                onClose={() => setIsModalDetailSBUOpen(false)}
                usaha={{
                    id: usaha.id,
                    nama: usaha.nama,
                    nib: usaha.nib,
                    pjbu: usaha.pjbu
                }}
                sertifikatStandar={selectedSertifikat}
            /> */}
        </>
    )
}
