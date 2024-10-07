import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../../Modal";
import ModalError from "../../ModalError";

import { LiaSpinnerSolid } from "react-icons/lia";

export default ({
    isVisible,
    onClose,
    pengawasanId,
    jenisRantaiPasok,
}) => {
    const { data, setData, processing, post, reset } = useForm({
        nama: '',
        bidangUsaha: '',
        haki: '',
        nomorHaki: '',
    });

    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        post(`/admin/pengawasan/usaha/1/${jenisRantaiPasok.slug}/${pengawasanId}/pemeriksaan`, {
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
            <Modal isVisible={isVisible} className="w-full max-w-lg h-fit mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-7">
                        <h1 className="font-medium text-slate-800">Tambah Teknologi</h1>
                        <h2 className="text-xs text-slate-500 font-light">{`${jenisRantaiPasok.pelakuUsaha} Rantai Pasok Teknologi Konstruksi`}</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                            <label htmlFor="nama" className="block mb-2 font-medium text-xs text-slate-800">Nama Teknologi <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="nama" id="nama"
                                value={data.nama} onChange={e => setData('nama', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="bidangUsaha" className="block mb-2 font-medium text-xs text-slate-800">Bidang Usaha Teknologi <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="bidangUsaha" id="bidangUsaha"
                                value={data.bidangUsaha} onChange={e => setData('bidangUsaha', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="space-y-2 text-xs">
                            <div>
                                <div className="font-medium text-slate-800">Tercantum dalam HAKI <span className="text-red-400">*</span></div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="true-haki" name="haki" checked={data.haki}
                                        value={true} onChange={e => setData('haki', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="true-haki" className="text-slate-700">Sudah</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="false-haki" name="haki" checked={data.haki === false}
                                        value={false} onChange={e => setData('haki', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="false-haki" className="text-slate-700">Belum Tercantum</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="nomorHaki" className="block mb-2 font-medium text-xs text-slate-800">Nomor HAKI</label>
                            <input
                                type="text" name="nomorHaki" id="nomorHaki"
                                value={data.nomorHaki} onChange={e => setData('nomorHaki', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2 flex justify-end items-center gap-x-2">
                            <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-2.5" onClick={onClose}>Batal</button>
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
                    Gagal menambahkan teknologi konstruksi. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
