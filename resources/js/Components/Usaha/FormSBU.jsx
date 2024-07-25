import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../Modal";
import ModalError from "../ModalError";

import { LiaCloudUploadAltSolid, LiaFileAlt, LiaSpinnerSolid, LiaTimesSolid } from "react-icons/lia";

export default ({ isVisible, onClose, usaha }) => {
    const { data, setData, post, processing, progress } = useForm({
        dokumenSBU: '',
    });

    const [isModalErrorOpen, setIsModalErrorOpen] = React.useState(false);

    function handleInputFileChange(e) {
        const files = [...data.dokumenSBU, ...e.target.files];
        setData('dokumenSBU', files);
    }

    function handleInputFileRemove(idx) {
        const files = Array.from(data.dokumenSBU).filter(({}, i) => idx !== i);
        setData('dokumenSBU', files);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data, typeof(data.dokumenSBU));
        // post(`/admin/pendataan/usaha/bujk/${usaha.id}/sbu`, {
        //     onSuccess: () => {
        //         onClose();
        //         reset();
        //     },
        //     onError: () => {
        //         onClose();
        //         setIsModalErrorOpen(true);
        //     },
        // });
    }

    return (
        <>
            <Modal
                isVisible={isVisible}
                className="w-full max-w-lg h-fit mt-10"
            >
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-7">
                        <h1 className="font-medium text-slate-800">Tambah Sertifikat Badan Usaha (SBU)</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pendataan Badan Usaha Jasa Konstruksi</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form
                        method="post"
                        className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2"
                        onSubmit={handleSubmit}
                    >
                        <div className="col-span-2">
                            <label htmlFor="nama" className="block mb-2 text-xs font-medium text-slate-800">Nama Badan Usaha Jasa Konstruksi</label>
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
                        <div>
                            <label htmlFor="pjbu" className="block mb-2 text-xs font-medium text-slate-800">PJBU</label>
                            <input
                                type="text" name="pjbu" id="pjbu" value={usaha.pjbu} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <div className="block mb-2 text-xs font-medium text-slate-800">Upload Dokumen SBU</div>
                                <label htmlFor="dokumenSBU">
                                    <div className="group w-full px-2.5 py-5 rounded border border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100">
                                        <div className="rounded bg-blue-100 group-hover:bg-blue-200 text-blue-600 w-fit mx-auto p-2">
                                            <LiaCloudUploadAltSolid size={24} />
                                        </div>
                                        <div className="mt-2 text-xs text-center text-slate-700">
                                            <div className="">
                                                <span className="font-medium text-blue-600 group-hover:underline">Klik di sini</span> untuk mengunggah dokumen
                                            </div>
                                            <div className="font-light text-slate-500">(Maks. 2 MB)</div>
                                        </div>
                                    </div>
                                    <input type="file" id="dokumenSBU" className="hidden" multiple onChange={e => handleInputFileChange(e)}/>
                                </label>
                                {
                                    Array.from(data.dokumenSBU).map(({ name, size }, i) => (
                                        <div key={i} className="space-y-2 text-xs text-slate-800">
                                            <div className="flex justify-between border border-slate-200 p-2 rounded">
                                                <div className="flex gap-x-2">
                                                    <div className="bg-blue-100 text-blue-600 rounded p-2 h-fit">
                                                        <LiaFileAlt size={18} />
                                                    </div>
                                                    <div>
                                                        <div className="font-normal line-clamp-2">{name}</div>
                                                        <div className="font-light text-slate-500">{parseFloat(size/1000000).toFixed(1)} MB</div>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="text-slate-700 p-1 h-fit"
                                                    onClick={() => handleInputFileRemove(i)}
                                                >
                                                    <LiaTimesSolid size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                        </div>
                        <div className="col-span-2 flex justify-end items-center gap-x-2">
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
                    Gagal menambahkan sertifikat. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
