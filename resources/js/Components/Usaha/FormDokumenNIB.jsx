import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../Modal";
import ModalError from "../ModalError";

import {
    LiaCloudUploadAltSolid,
    LiaSpinnerSolid,
    LiaFileAlt,
    LiaTimesSolid,
} from "react-icons/lia";

export default ({ isVisible, onClose, usaha }) => {
    const { data, setData, post, processing, progress } = useForm({
        dokumenNIB: '',
    });

    const [isModalErrorOpen, setIsModalErrorOpen] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        post(`/admin/pendataan/usaha/${usaha.id}/nib`, {
            onSuccess: () => {
                onClose();
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
            <Modal isVisible={isVisible} className="h-fit w-full max-w-lg mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-5">
                        <h1 className="font-medium text-slate-800">Tambah Dokumen NIB</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pendataan Usaha Jasa Konstruksi di Kab. Hulu Sungai Selatan</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form
                        method="post"
                        className="grid grid-cols-3 gap-4 mb-2"
                        onSubmit={handleSubmit}
                    >
                        <div className="col-span-3">
                            <label htmlFor="nama" className="block mb-2 text-xs font-medium text-slate-800">Nama Usaha</label>
                            <input
                                type="text" name="nama" id="nama" value={usaha.nama} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="nib" className="block mb-2 text-xs font-medium text-slate-800">NIB</label>
                            <input
                                type="text" name="nib" id="nib" value={usaha.nib} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="block mb-2 text-xs font-medium text-slate-800">Dokumen NIB</div>
                            {
                                data.dokumenNIB === '' ? (
                                    <label htmlFor="dokumenNIB">
                                        <div className="group mt-1 w-full flex items-center justify-between gap-x-10 p-2 rounded border border-dashed border-slate-200 hover:bg-slate-100 cursor-pointer">
                                            <div className="flex items-start gap-x-2">
                                            <div className="rounded bg-blue-50 group-hover:bg-blue-100 text-blue-500 w-fit p-2">
                                                    <LiaCloudUploadAltSolid size={18} />
                                                </div>
                                                <div>
                                                    <div className="font-normal text-xs ">Upload Dokumen NIB</div>
                                                    <div className="font-light text-slate-500 text-[11px]">Maks. 2 MB</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[11px] text-slate-700 border border-slate-200 bg-white px-2 py-1 rounded">
                                                    Browse
                                                </div>
                                            </div>
                                        </div>
                                        <input type="file" id="dokumenNIB" className="hidden" onChange={e => setData('dokumenNIB', e.target.files[0])} />
                                    </label>
                                ) : (
                                    <div className="space-y-2 text-xs text-slate-800">
                                        <div className="flex justify-between border border-slate-200 p-2 rounded">
                                            <div className="flex gap-x-2">
                                                <div className="bg-blue-100 text-blue-600 rounded p-2 h-fit">
                                                    <LiaFileAlt size={18} />
                                                </div>
                                                <div>
                                                    <div className="font-normal line-clamp-2">{data.dokumenNIB.name}</div>
                                                    <div className="font-light text-slate-500">{parseFloat(data.dokumenNIB.size/1000000).toFixed(1)} MB</div>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="text-slate-700 p-1 h-fit"
                                                onClick={() => setData('dokumenNIB', '')}
                                            >
                                                <LiaTimesSolid size={12} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="col-span-3">
                            {
                                progress && (
                                <div className="w-full bg-slate-200 rounded h-2.5">
                                    <div className={`animate-pulse bg-blue-600 h-2.5 rounded-full w-[${progress.percentage}%]`}></div>
                                </div>
                            )}
                        </div>
                        <div className="col-span-3 flex justify-end items-center gap-x-2">
                            <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-3" onClick={onClose}>Batal</button>
                            <button type="submit" disabled={processing} className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-2.5">
                                { processing && <LiaSpinnerSolid className="animate-spin" /> }
                                Tambah
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
                    Gagal menambahkan Dokumen NIB. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
