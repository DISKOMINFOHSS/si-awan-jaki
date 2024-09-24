import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../../Modal";
import ModalError from "../../ModalError";

import { LiaSpinnerSolid } from "react-icons/lia";

export default ({
    isVisible,
    onClose,
    realisasiKeuangan,
    tahun,
    pengawasanId,
}) => {
    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);
    const [ errorMessage, setErrorMessage ] = React.useState('');

    const { data, setData, processing, post, reset } = useForm({
        tanggalDibayar: '',
        realisasi: '',
        url: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        // post(`/admin/jenis-pengawasan/progress/${tahun}/${pengawasanId}/realisasi-fisik/${realisasiFisik.id}`, {
        //     preserveScroll: true,
        //     onSuccess: () => {
        //         reset();
        //         onClose();
        //     },
        //     onError: (errors) => {
        //         console.log(errors);
        //         onClose();
        //         setErrorMessage(errors.message);
        //         setIsModalErrorOpen(true);
        //     },
        // });
    }

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-lg h-fit my-10 z-500">
                <Modal.Header onClose={onClose}>
                    <div className="mb-5">
                        <h1 className="font-medium text-slate-800">Realisasi Keuangan</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pengawasan Progress Proyek Konstruksi di Kab. HSS</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form
                        method="post"
                        className="grid grid-cols-2 gap-4 mb-2"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label htmlFor="tanggal" className="block mb-2 text-xs font-medium text-slate-800">Tanggal</label>
                            <input
                                type="date" name="tanggal" id="tanggal" value={realisasiKeuangan.tanggal} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="jumlahPembayaran" className="block mb-2 text-xs font-medium text-slate-800">Jumlah Pembayaran</label>
                            <div className="relative w-full">
                                <div className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-xs text-slate-500 font-light">Rp</div>
                                <input
                                    type="text" name="jumlahPembayaran" id="jumlahPembayaran" placeholder="10000000" disabled value={realisasiKeuangan.jumlahPembayaran}
                                    className="border border-slate-200 rounded-md py-2 pl-8 block w-full bg-slate-50 text-slate-600 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="tanggal" className="block mb-2 text-xs font-medium text-slate-800">Tanggal Dibayar <span className="text-red-400">*</span></label>
                            <input
                                type="date" name="tanggalDibayar" id="tanggalDibayar"
                                value={data.tanggalDibayar} onChange={e => setData('tanggalDibayar', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="realisasi" className="block mb-2 text-xs font-medium text-slate-800">Realisasi <span className="text-red-400">*</span></label>
                            <div className="relative w-full">
                                <div className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-xs text-slate-500 font-light">Rp</div>
                                <input
                                    type="text" name="realisasi" id="realisasi" placeholder="10000000" required
                                    value={data.realisasi} onChange={e => setData('realisasi', e.target.value)}
                                    className="border border-slate-200 rounded-md py-2 pl-8 block w-full text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label htmlFor="url" className="space-y-0.5 text-xs">
                                <div className="font-medium text-slate-800">Link Folder Bukti Dukung <span className="font-light text-slate-500">(Opsional)</span></div>
                                <div className="font-light text-[11px] text-slate-500">Isi dengan URL Google Drive Folder Bukti Dukung</div>
                            </label>
                            <input
                                type="text" name="url" id="url" placeholder="cth. https://drive.google.com/drive/folders/xxx?usp=drive_link"
                                value={data.url} onChange={e => setData('url', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2 flex items-center justify-end gap-x-2 5">
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
                    Gagal menambahkan realisasi keuangan. {errorMessage} Silakan periksa kembali.
                </div>
            </ModalError>
        </>
    )
}
