import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../../Modal";
import ModalError from "../../ModalError";

import getDefaultData from "../../../Utils/getDefaultData";

import {
    LiaCloudUploadAltSolid,
    LiaFileAlt,
    LiaTimesSolid,
    LiaSpinnerSolid,
    LiaTrashAltSolid,
} from "react-icons/lia";

export default ({
    isVisible, onClose, usaha, sertifikatStandar
}) => {
    const { data, setData, post, processing, progress, reset } = useForm({
        nomorSertifikat: '',
        dokumenSKK: '',
        subklasifikasi: ''
    });

    React.useEffect(() => {
        setData({
            ...data,
            id: sertifikatStandar.id,
            nomorSertifikat: getDefaultData(sertifikatStandar.nomorSertifikat),
            subklasifikasi: getDefaultData(sertifikatStandar.subklasifikasi),
            dokumenSKK: sertifikatStandar.fileId ? {
                fileId: sertifikatStandar.fileId,
                fileName: sertifikatStandar.fileName,
                filePath: sertifikatStandar.filePath,
            } : '',
        });
    }, [sertifikatStandar]);

    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        post(`/admin/pendataan/usaha/usaha-perseorangan/${usaha.id}/skk`, {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: (errors) => {
                console.log(errors);
                onClose();
                setIsModalErrorOpen(true);
            },
        });
    }

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-xl h-fit mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-7">
                        <h1 className="font-medium text-slate-800">Sertifikat Kompetensi Kerja (SKK) Konstruksi</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pendataan Usaha Orang Perseorangan</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form
                        method="post"
                        className="grid grid-cols-1 md:grid-cols-6 gap-5 mb-2"
                        onSubmit={handleSubmit}
                    >
                        <div className="col-span-3">
                            <label htmlFor="nama" className="block mb-2 text-xs font-medium text-slate-800">Nama Usaha Orang Perseorangan</label>
                            <input
                                type="text" name="nama" id="nama" value={usaha.nama} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-3">
                            <label htmlFor="nib" className="block mb-2 text-xs font-medium text-slate-800">NIB</label>
                            <input
                                type="text" name="nib" id="nib" value={usaha.nib} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="nomorSertifikat" className="block mb-2 text-xs font-medium text-slate-800">Nomor Sertifikat Standar <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="nomorSertifikat" id="nomorSertifikat" placeholder="cth. 1234567890123456"
                                value={data.nomorSertifikat} onChange={e => setData('nomorSertifikat', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-4">
                            <div className="block mb-2 text-xs font-medium text-slate-800">Dokumen SKK <span className="font-light text-slate-500">(Opsional)</span></div>
                            {
                                data.dokumenSKK === '' ? (
                                    <label htmlFor="dokumenSKK">
                                        <div className="group mt-1 w-full flex items-center justify-between gap-x-10 p-2 rounded border border-dashed border-slate-200 hover:bg-slate-100 cursor-pointer">
                                            <div className="flex items-start gap-x-2">
                                            <div className="rounded bg-blue-50 group-hover:bg-blue-100 text-blue-500 w-fit p-2">
                                                    <LiaCloudUploadAltSolid size={18} />
                                                </div>
                                                <div>
                                                    <div className="font-normal text-xs ">Upload Dokumen SKK</div>
                                                    <div className="font-light text-slate-500 text-[11px]">Maks. 2 MB</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[11px] text-slate-700 border border-slate-200 bg-white px-2 py-1 rounded">
                                                    Browse
                                                </div>
                                            </div>
                                        </div>
                                        <input type="file" id="dokumenSKK" className="hidden" onChange={e => setData('dokumenSKK', e.target.files[0])} />
                                    </label>
                                ) : data.dokumenSKK.fileId ? (
                                    <div className="flex items-center justify-between border border-slate-200 p-2 rounded mt-1 text-xs">
                                        <div className="rounded flex gap-x-2 items-start group">
                                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                                <LiaFileAlt size={18} />
                                            </div>
                                            <a href={data.dokumenSKK.filePath} target="_blank" className="group-hover:text-blue-600 group-hover:underline">
                                                <div className="font-normal">Sertifikat Kompetensi Kerja (SKK) Konstruksi</div>
                                                <div className="font-light text-slate-500 line-clamp-1">{data.dokumenSKK.fileName}</div>
                                            </a>
                                        </div>
                                        <button
                                            className="rounded px-1 py-0.5 text-red-500 hover:bg-slate-100"
                                            onClick={() => setData('dokumenSKK', '')}
                                        >
                                            <LiaTrashAltSolid size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2 text-xs text-slate-800">
                                        <div className="flex justify-between border border-slate-200 p-2 rounded">
                                            <div className="flex gap-x-2">
                                                <div className="bg-blue-100 text-blue-600 rounded p-2 h-fit">
                                                    <LiaFileAlt size={18} />
                                                </div>
                                                <div>
                                                    <div className="font-normal line-clamp-2">{data.dokumenSKK.name}</div>
                                                    <div className="font-light text-slate-500">{parseFloat(data.dokumenSKK.size/1000000).toFixed(1)} MB</div>
                                                </div>
                                            </div>
                                            <button
                                                type="button" className="text-slate-700 p-1 h-fit"
                                                onClick={() => setData('dokumenSKK', '')}
                                            >
                                                <LiaTimesSolid size={12} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="col-span-6">
                            <label htmlFor="subklasifikasi" className="block mb-2 text-xs font-medium text-slate-800">Subklasifikasi Usaha <span className="text-red-400">*</span></label>
                            <textarea
                                name="subklasifikasi" id="subklasifikasi" rows="2" placeholder="cth. Jasa Rekayasa Pekerjaan Teknik Sipil Transportasi - RK003 KBLI 2020"
                                value={data.subklasifikasi} onChange={e => setData('subklasifikasi', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-6">
                            {
                                progress && (
                                <div className="w-full bg-slate-200 rounded h-2.5">
                                    <div className={`animate-pulse bg-blue-600 h-2.5 rounded-full w-[${progress.percentage}%]`}></div>
                                </div>
                            )}
                        </div>
                        <div className="col-span-6 flex justify-end items-center gap-x-2">
                            <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-3" onClick={onClose}>Batal</button>
                            <button type="submit" disabled={processing} className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-2.5">
                                { processing && <LiaSpinnerSolid className="animate-spin" /> }
                                Simpan
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <ModalError
                isVisible={isModalErrorOpen}
                onClose={() => setIsModalErrorOpen(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal menambahkan Dokumen SKK. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
