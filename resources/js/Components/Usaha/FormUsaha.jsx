import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../Modal";
import ModalError from "../ModalError";

import {
    LiaCloudUploadAltSolid,
    LiaFileAlt,
    LiaSpinnerSolid,
    LiaTimesSolid,
} from "react-icons/lia";

export default ({ isVisible, onClose, jenisUsaha }) => {
    const { data, setData, post, processing } = useForm({
        nama: '',
        nib: '',
        dokumenNIB: '',
        jenisUsahaId: jenisUsaha.id,
        jenisRantaiPasokId: '',
        pjbu: '',
        alamat: '',
    });

    const [isModalErrorOpened, setIsModalErrorOpened] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        post(`/admin/pendataan/usaha`, {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: () => {
                onClose();
                setIsModalErrorOpened(true)
            },
        });
    }

    return (
        <>
            <Modal isVisible={isVisible} className="h-fit w-full max-w-xl mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-7">
                        <h1 className="font-medium text-slate-800">Tambah {jenisUsaha.jenisUsaha}</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pendataan Usaha Jasa Konstruksi di Kab. Hulu Sungai Selatan</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form
                        method="post"
                        className="grid grid-cols-2 grid-flow-row-dense gap-5 mb-2"
                        onSubmit={handleSubmit}
                    >
                        <div className="col-span-2">
                            <label htmlFor="nama" className="block mb-2 text-xs font-medium text-slate-800">Nama {jenisUsaha.jenisUsaha} <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="nama" id="nama" placeholder="cth. CV Citra Bangunan"
                                value={data.nama} onChange={e => setData('nama', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="nib" className="block mb-2 text-xs font-medium text-slate-800">NIB <span className="text-red-400">*</span></label>
                                <input
                                    type="text" name="nib" id="nib" placeholder="cth. 1234567890123456"
                                    value={data.nib} onChange={e => setData('nib', e.target.value)} required
                                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                            {
                                jenisUsaha.jenisUsaha === "Usaha Orang Perseorangan" ?
                                <div>
                                    <label htmlFor="alamat" className="block mb-2 text-xs font-medium text-slate-800">Alamat</label>
                                    <textarea
                                        name="alamat" id="alamat" rows="3" placeholder="cth. Jalan Aluh Idut No 66 A Kandangan"
                                        value={data.alamat} onChange={e => setData('alamat', e.target.value)}
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div> :
                                <div>
                                    <div className="block mb-2 text-xs font-medium text-slate-800">Upload Dokumen NIB <span className="font-light text-slate-500">(Opsional)</span></div>
                                    {
                                        data.dokumenNIB === '' ?
                                        <label htmlFor="dokumen">
                                            <div className="group w-full px-2.5 py-5 rounded border border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100">
                                                <div className="rounded bg-blue-100 group-hover:bg-blue-200 text-blue-600 w-fit mx-auto p-2">
                                                    <LiaCloudUploadAltSolid size={24} />
                                                </div>
                                                <div className="mt-2 text-xs text-center text-slate-700">
                                                    <div className="">
                                                        <span className="font-medium text-blue-600 group-hover:underline">Klik di sini</span> untuk mengunggah
                                                    </div>
                                                    <div className="font-light text-slate-500">(Maks. 2 MB)</div>
                                                </div>
                                            </div>
                                            <input type="file" id="dokumen" className="hidden" onChange={e => setData('dokumenNIB', e.target.files[0])} />
                                        </label> :
                                        <div className="space-y-2 text-xs text-slate-800">
                                            <div className="flex justify-between border border-slate-200 p-2 rounded">
                                                <div className="flex gap-x-2">
                                                    <div className="bg-blue-100 text-blue-600 rounded p-2 h-fit">
                                                        <LiaFileAlt size={18} />
                                                    </div>
                                                    <div>
                                                        <div className="font-normal line-clamp-1">{data.dokumenNIB.name}</div>
                                                        <div className="font-light text-slate-500">{parseFloat(data.dokumenNIB.size/1000000).toFixed(1)} MB</div>
                                                    </div>
                                                </div>
                                                <button
                                                    className="text-slate-700 p-1 h-fit"
                                                    onClick={() => setData('dokumenNIB', '')}
                                                >
                                                    <LiaTimesSolid size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                        {
                            jenisUsaha.jenisUsaha === "Usaha Orang Perseorangan" ?
                            <div className="">
                                <div className="block mb-2 text-xs font-medium text-slate-800">Upload Dokumen NIB <span className="font-light text-slate-500">(Opsional)</span></div>
                                {
                                    data.dokumenNIB === '' ?
                                    <label htmlFor="dokumen">
                                        <div className="group w-full px-2.5 py-5 rounded border border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100">
                                            <div className="rounded bg-blue-100 group-hover:bg-blue-200 text-blue-600 w-fit mx-auto p-2">
                                                <LiaCloudUploadAltSolid size={24} />
                                            </div>
                                            <div className="mt-2 text-xs text-center text-slate-700">
                                                <div className="">
                                                    <span className="font-medium text-blue-600 group-hover:underline">Klik di sini</span> untuk mengunggah
                                                </div>
                                                <div className="font-light text-slate-500">(Maks. 2 MB)</div>
                                            </div>
                                        </div>
                                        <input type="file" id="dokumen" className="hidden" onChange={e => setData('dokumenNIB', e.target.files[0])} />
                                    </label> :
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
                                                className="text-slate-700 p-1 h-fit"
                                                onClick={() => setData('dokumenNIB', '')}
                                            >
                                                <LiaTimesSolid size={12} />
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div> :
                            <div className="space-y-5">
                                {
                                    jenisUsaha.daftarJenisRantaiPasok &&
                                    <div>
                                        <label htmlFor="jenisRantaiPasokId" className="block mb-2 text-xs font-medium text-slate-800">Jenis Usaha Rantai Pasok <span className="text-red-400">*</span></label>
                                        <select
                                            name="jenisRantaiPasokId" id="jenisRantaiPasokId"
                                            value={data.jenisRantaiPasokId} onChange={e => setData('jenisRantaiPasokId', Number(e.target.value))}
                                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                        >
                                            <option></option>
                                            {
                                                jenisUsaha.daftarJenisRantaiPasok.map(({ id, kategoriSumberDaya, pelakuUsaha }) => (
                                                    <option key={id} value={id}>{`${kategoriSumberDaya} Konstruksi - ${pelakuUsaha} Rantai Pasok`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                }
                                <div>
                                    <label htmlFor="pjbu" className="block mb-2 text-xs font-medium text-slate-800">Penanggung Jawab Badan Usaha (PJBU) <span className="text-red-400">*</span></label>
                                    <input
                                        type="text" name="pjbu" id="pjbu" placeholder="cth. Alana Nusa Indah"
                                        value={data.pjbu} onChange={e => setData('pjbu', e.target.value)}
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="alamat" className="block mb-2 text-xs font-medium text-slate-800">Alamat <span className="text-red-400">*</span></label>
                                    <textarea
                                        name="alamat" id="alamat" rows="3" placeholder="cth. Jalan Aluh Idut No 66 A Kandangan"
                                        value={data.alamat} onChange={e => setData('alamat', e.target.value)}
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                            </div>
                        }
                        <div className="col-span-2 flex justify-end items-center gap-x-2">
                            <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-3" onClick={onClose}>Batal</button>
                            <button type="submit" disabled={processing} className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-2.5">
                                { processing && <LiaSpinnerSolid className="animate-spin" />}
                                Tambah
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <ModalError
                isVisible={isModalErrorOpened}
                onClose={() => setIsModalErrorOpened(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal menambahkan usaha baru. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
