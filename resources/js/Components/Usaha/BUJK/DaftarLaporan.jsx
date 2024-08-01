import React from "react";
import Card from "../../Card";

import Dropdown from "../../Dropdown";
import FormLaporan from "./FormLaporan";
import useToggleWithClickOutside from "../../../Hooks/useToggleWithClickOutside";

import {
    LiaPlusCircleSolid,
    LiaCloudUploadAltSolid,
    LiaEditSolid,
    LiaTrashAltSolid,
    LiaLinkSolid,
    LiaEllipsisVSolid,
} from "react-icons/lia";

function FileDropdown({ laporan, onEditButtonClick }) {
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
                <button
                    className="flex items-center gap-x-2 px-4 py-2 hover:text-blue-500 hover:bg-slate-100"
                    onClick={() => {toggleFileDropdown(), onEditButtonClick(laporan)}}
                >
                    <LiaEditSolid size={16} />
                    <span>Edit</span>
                </button>
                <button
                    className="flex items-center gap-x-2 px-4 py-2 text-red-500 hover:bg-slate-100"
                >
                    <LiaTrashAltSolid size={16} />
                    <span>Hapus</span>
                </button>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ({ usaha }) => {
    const [isModalLaporanOpen, setIsModalLaporanOpen] = React.useState(false);
    const { daftarLaporan } = usaha;

    const [selectedLaporan, setSelectedLaporan] = React.useState({});
    function handleSelectLaporan(laporan) {
        setSelectedLaporan(laporan);
        setIsModalLaporanOpen(true);
    };

    return (
        <>
            <Card className="w-full h-fit">
                <Card.Header className="flex justify-between items-center">
                    <div>
                        <h3 className="font-medium text-slate-700 leading-tight">Laporan Badan Usaha</h3>
                        <h4 className="font-light text-slate-500 text-[11px]">Daftar Laporan Badan Usaha Jasa Konstruksi</h4>
                    </div>
                    <div>
                        <button
                            className="w-full flex justify-center items-center gap-x-1 text-blue-500 border border-blue-500 hover:bg-slate-100 rounded text-xs tracking-wide p-2 shadow-sm"
                            onClick={() => {setSelectedLaporan({}), setIsModalLaporanOpen(true)}}
                        >
                            <LiaPlusCircleSolid size={16} />
                            <span>Tambah</span>
                        </button>
                    </div>
                </Card.Header>
                <Card.Body className="p-4">
                    <div className="space-y-4 text-xs">
                        {
                            daftarLaporan.length === 0 ?
                            <button
                                type="button"
                                className="group w-full py-5 rounded border border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100"
                                onClick={() => {setSelectedLaporan({}), setIsModalLaporanOpen(true)}}
                            >
                                <div className="rounded bg-blue-100 group-hover:bg-blue-200 text-blue-600 w-fit mx-auto p-2">
                                    <LiaCloudUploadAltSolid size={24} />
                                </div>
                                <div className="mt-2 text-slate-700">
                                    <div className="">
                                        <span className="font-medium text-blue-600 group-hover:underline">Klik di sini</span> untuk mengunggah Link Laporan
                                    </div>
                                    <div className="font-light text-slate-500">(Maks. 2 MB)</div>
                                </div>
                            </button> :
                            daftarLaporan.map((laporan) => (
                                <div key={laporan.id} className="flex items-start justify-between gap-x-1 text-xs">
                                    <div className="flex gap-x-2 items-start group">
                                        <div className="bg-blue-100 text-blue-600 rounded p-2">
                                            <LiaLinkSolid size={18} />
                                        </div>
                                        <a href={laporan.url} target="_blank" className="group-hover:text-blue-600 group-hover:underline">
                                            <div className="font-medium">Tahun {laporan.tahun} - {laporan.label}</div>
                                            <div className="font-light text-slate-500">{laporan.url}</div>
                                        </a>
                                    </div>
                                    <div>
                                        <FileDropdown laporan={laporan} onEditButtonClick={handleSelectLaporan} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Card.Body>
            </Card>
            <FormLaporan
                isVisible={isModalLaporanOpen}
                onClose={() => setIsModalLaporanOpen(false)}
                usahaId={usaha.id}
                laporan={selectedLaporan}
            />
        </>
    )
}
