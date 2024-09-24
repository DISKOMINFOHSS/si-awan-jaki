import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../../Modal";
import ModalError from "../../ModalError";

import {
    LiaCloudUploadAltSolid,
    LiaSpinnerSolid,
    LiaTimesSolid,
} from "react-icons/lia";

export default ({
    isVisible,
    onClose,
    realisasiFisik,
    tahun,
    pengawasanId,
}) => {
    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);
    const { data, setData, processing, post, reset } = useForm({
        realisasi: '',
        fotoLapangan: '',
    });

    React.useEffect(() => reset(), [realisasiFisik]);

    function handleInputFileChange(e) {
        const files = [...data.fotoLapangan, ...e.target.files];
        if (!(files.length > 4)) {
            setData('fotoLapangan', files);
        }
    }

    function handleInputFileRemove(idx) {
        const files = Array.from(data.fotoLapangan).filter(({}, i) => idx !== i);
        setData('fotoLapangan', files);
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(`/admin/jenis-pengawasan/progress/${tahun}/${pengawasanId}/realisasi-fisik/${realisasiFisik.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
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
            <Modal isVisible={isVisible} className="w-full max-w-lg h-fit my-10 z-500">
                <Modal.Header onClose={onClose}>
                    <div className="mb-5">
                        <h1 className="font-medium text-slate-800">Realisasi Pekerjaan</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pengawasan Progress Proyek Konstruksi di Kab. HSS</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form
                        method="post"
                        className="grid grid-cols-3 gap-4 mb-2"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label htmlFor="tanggal" className="block mb-2 text-xs font-medium text-slate-800">Tanggal</label>
                            <input
                                type="date" name="tanggal" id="tanggal" value={realisasiFisik.tanggal} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="ml-4">
                            <label htmlFor="target" className="block mb-2 text-xs font-medium text-slate-800">Target Realisasi</label>
                            <div className="flex items-center gap-x-1.5 text-xs">
                                <input
                                    type="number" name="target" id="target" placeholder="50.00" value={realisasiFisik.target} disabled
                                    className="px-3 py-2 block w-24 rounded-md bg-slate-50 border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                                <span>%</span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="realisasi" className="block mb-2 text-xs font-medium text-slate-800">Realisasi Fisik <span className="text-red-400">*</span></label>
                            <div className="flex items-center gap-x-1.5 text-xs">
                                <input
                                    type="number" name="realisasi" id="realisasi" placeholder="50.00"
                                    value={data.realisasi} onChange={e => setData('realisasi', e.target.value)} min={0} max={100}
                                    className="px-3 py-2 block w-24 rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                                <span>%</span>
                            </div>
                        </div>
                        <div className="col-span-4 space-y-2">
                            <div className="block mb-2 text-xs font-medium text-slate-800">Upload Foto Lapangan <span className="font-light text-slate-500">(Maks. 4)</span> <span className="text-red-400">*</span></div>
                            <label htmlFor="fotoLapangan">
                                <div className="group w-full px-2.5 py-5 rounded border border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100">
                                    <div className="rounded bg-blue-100 group-hover:bg-blue-200 text-blue-600 w-fit mx-auto p-2">
                                        <LiaCloudUploadAltSolid size={24} />
                                    </div>
                                    <div className="mt-2 text-xs text-center text-slate-700">
                                        <div className="">
                                            <span className="font-medium text-blue-600 group-hover:underline">Klik di sini</span> untuk mengunggah foto
                                        </div>
                                        <div className="font-light text-slate-500">(Maks. 1 MB)</div>
                                    </div>
                                </div>
                                <input type="file" id="fotoLapangan" className="hidden" accept="image/*" multiple onChange={e => handleInputFileChange(e)} />
                            </label>
                            {
                                data.fotoLapangan && (
                                    <div className="grid grid-cols-2 gap-4 my-2">
                                        {
                                            Array.from(data.fotoLapangan).map((images, i) => (
                                                <div key={i} className="relative p-1 border border-slate-100 rounded">
                                                    <button
                                                        type="button"
                                                        className="absolute top-2 right-2"
                                                        onClick={() => handleInputFileRemove(i)}
                                                    >
                                                        <LiaTimesSolid size={14} />
                                                    </button>
                                                    <img src={URL.createObjectURL(images)} className="w-full aspect-video object-cover" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                        <div className="col-span-4 flex items-center justify-end gap-x-2 5">
                            <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-3" onClick={onClose}>Batal</button>
                            <button
                                type="submit"
                                className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2.5 px-3 hover:bg-blue-800"
                                disabled={processing}
                            >
                                { processing && <LiaSpinnerSolid className="animate-spin" />}
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
                    Gagal menambahkan realisasi fisik. Silakan periksa kembali.
                </div>
            </ModalError>
        </>
    )
}
