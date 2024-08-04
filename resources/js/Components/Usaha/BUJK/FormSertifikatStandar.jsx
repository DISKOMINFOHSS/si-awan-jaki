import React from "react";
import { router, useForm } from "@inertiajs/react";

import Modal from "../../Modal";
import ModalError from "../../ModalError";

import {
    LiaCloudUploadAltSolid,
    LiaFileAlt,
    LiaTimesSolid,
    LiaSpinnerSolid,
    LiaTrashAltSolid,
} from "react-icons/lia";

export default ({ isVisible, onClose, usaha, sertifikatStandar }) => {
    const { data, setData, post, processing, progress } = useForm({
        nomorSertifikat: '',
        dokumenSBU: '',
        jenis: 'Jasa Konsultansi Konstruksi',
        subklasifikasi: ''
    });

    React.useEffect(() => {
        setData({
            ...data,
            id: sertifikatStandar.id,
            nomorSertifikat: sertifikatStandar.nomorSertifikat ? sertifikatStandar.nomorSertifikat : '',
            jenis: sertifikatStandar.jenisUsaha ? sertifikatStandar.jenisUsaha : 'Jasa Konsultansi Konstruksi',
            subklasifikasi: sertifikatStandar.subklasifikasi ? sertifikatStandar.subklasifikasi : '',
            dokumenSBU: sertifikatStandar.fileId ? {
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
        if (data.id) {
            post(`/admin/pendataan/usaha/bujk/${usaha.id}/sbu/${data.id}`, {
                onSuccess: () => {
                    onClose();
                },
                onError: (errors) => {
                    console.log('put', errors);
                    onClose();
                    setIsModalErrorOpen(true);
                },
            });
        } else {
            post(`/admin/pendataan/usaha/bujk/${usaha.id}/sbu`, {
                onSuccess: () => {
                    onClose();
                },
                onError: (errors) => {
                    console.log('post', errors);
                    onClose();
                    setIsModalErrorOpen(true);
                },
            });
        }
    }

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-2xl h-fit mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-7">
                        <h1 className="font-medium text-slate-800">{sertifikatStandar.id ? "Detail" : "Tambah"} Sertifikat Badan Usaha (SBU) Konstruksi</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pendataan Badan Usaha Jasa Konstruksi</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form
                        method="post"
                        className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-2"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label htmlFor="nama" className="block mb-2 text-xs font-medium text-slate-800">Nama Badan Usaha</label>
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
                        <div>
                            <label htmlFor="nomorSertifikat" className="block mb-2 text-xs font-medium text-slate-800">Nomor Sertifikat Standar <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="nomorSertifikat" id="nomorSertifikat" placeholder="cth. 1234567890123456"
                                value={data.nomorSertifikat} onChange={e => setData('nomorSertifikat', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="block mb-2 text-xs font-medium text-slate-800">Dokumen SBU <span className="font-light text-slate-500">(Opsional)</span></div>
                            {
                                data.dokumenSBU === '' ? (
                                    <label htmlFor="dokumenSBU">
                                        <div className="group mt-1 w-full flex items-center justify-between gap-x-10 p-2 rounded border border-dashed border-slate-200 hover:bg-slate-100 cursor-pointer">
                                            <div className="flex items-start gap-x-2">
                                            <div className="rounded bg-blue-50 group-hover:bg-blue-100 text-blue-500 w-fit p-2">
                                                    <LiaCloudUploadAltSolid size={18} />
                                                </div>
                                                <div>
                                                    <div className="font-normal text-xs ">Upload Dokumen SBU</div>
                                                    <div className="font-light text-slate-500 text-[11px]">Maks. 2 MB</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[11px] text-slate-700 border border-slate-200 bg-white px-2 py-1 rounded">
                                                    Browse
                                                </div>
                                            </div>
                                        </div>
                                        <input type="file" id="dokumenSBU" className="hidden" onChange={e => setData('dokumenSBU', e.target.files[0])} />
                                    </label>
                                ) : data.dokumenSBU.fileId ? (
                                    <div className="flex items-center justify-between border border-slate-200 p-2 rounded mt-1 text-xs">
                                        <div className="rounded flex gap-x-2 items-start group">
                                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                                <LiaFileAlt size={18} />
                                            </div>
                                            <a href={data.dokumenSBU.filePath} target="_blank" className="group-hover:text-blue-600 group-hover:underline">
                                                <div className="font-normal">Sertifikat Badan Usaha (SBU) Konstruksi</div>
                                                <div className="font-light text-slate-500 line-clamp-1">{data.dokumenSBU.fileName}</div>
                                            </a>
                                        </div>
                                        <button
                                            className="rounded px-1 py-0.5 text-red-500 hover:bg-slate-100"
                                            onClick={() => setData('dokumenSBU', '')}
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
                                                    <div className="font-normal line-clamp-2">{data.dokumenSBU.name}</div>
                                                    <div className="font-light text-slate-500">{parseFloat(data.dokumenSBU.size/1000000).toFixed(1)} MB</div>
                                                </div>
                                            </div>
                                            <button
                                                type="button" className="text-slate-700 p-1 h-fit"
                                                onClick={() => setData('dokumenSBU', '')}
                                            >
                                                <LiaTimesSolid size={12} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div>
                            <label htmlFor="jenis" className="block mb-2 text-xs font-medium text-slate-800">Jenis Usaha <span className="text-red-400">*</span></label>
                            <select
                                name="jenis" id="jenis" value={data.jenis} onChange={e => setData('jenis', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            >
                                    <option value="Jasa Konsultansi Konstruksi">Jasa Konsultansi Konstruksi</option>
                                    <option value="Pekerjaan Konstruksi">Pekerjaan Konstruksi</option>
                                    <option value="Pekerjaan Konstruksi Terintegrasi">Pekerjaan Konstruksi Terintegrasi</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="subklasifikasi" className="block mb-2 text-xs font-medium text-slate-800">Subklasifikasi Usaha <span className="text-red-400">*</span></label>
                            <textarea
                                name="subklasifikasi" id="subklasifikasi" rows="2" placeholder="cth. Jasa Rekayasa Pekerjaan Teknik Sipil Transportasi - RK003 KBLI 2020"
                                value={data.subklasifikasi} onChange={e => setData('subklasifikasi', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
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
                                { sertifikatStandar.id ? "Simpan" : "Tambah"}
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
                    Gagal menambahkan Dokumen SBU. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
