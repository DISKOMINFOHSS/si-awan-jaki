import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../../Modal";

import { LiaAngleDownSolid, LiaSpinnerSolid } from "react-icons/lia";
import ModalError from "../../ModalError";

export default ({
    isVisible,
    onClose,
    lingkupPengawasan,
    pengawasan,
}) => {
    const { usaha } = pengawasan;
    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState();

    const { data, setData, processing, put } = useForm({
        usaha: usaha.nama,
        nib: usaha.nib,
        pjbu: usaha.pjbu,
        tanggal: pengawasan.tanggalPengawasan,
        jenis: pengawasan.jenisPengawasan,
    });

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        put(`/admin/pengawasan/usaha/${lingkupPengawasan.id}/${pengawasan.id}`, {
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
            <Modal isVisible={isVisible} className="w-full max-w-lg h-fit mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-7">
                        <h1 className="font-medium text-slate-800">Edit Pengawasan Tertib Usaha</h1>
                        <h2 className="text-xs text-slate-500 font-light">{lingkupPengawasan.label}</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit={handleSubmit} className="grid grid-cols-2 gap-5 mb-2">
                        <div>
                            <label htmlFor="tanggal" className="block mb-2 text-xs font-medium text-slate-800">Tanggal Pengawasan</label>
                            <input
                                type="date" name="tanggal" id="tanggal"
                                value={data.tanggal} onChange={e => setData('tanggal', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="jenis" className="block mb-2 text-xs font-medium text-slate-800">Jenis Pengawasan</label>
                            <select
                                name="jenis" id="jenis" value={data.jenis} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            >
                                <option value="Rutin">Pengawasan Rutin</option>
                                <option value="Insidental">Pengawasan Insidental</option>
                            </select>
                        </div>
                        <div className="relative col-span-2">
                            <div className="block mb-2 text-xs font-medium text-slate-800">Nama Badan Usaha Jasa Konstruksi</div>
                            <div
                                className="flex justify-between items-center px-3 py-2 w-full rounded-md bg-slate-50 border border-slate-200 text-slate-600 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            >
                                <span className="text-slate-500">{data.usaha}</span>
                                <LiaAngleDownSolid size={12} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="nib" className="block mb-2 text-xs font-medium text-slate-800">NIB</label>
                            <input
                                type="text" name="nib" id="nib" value={data.nib} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="pjbu" className="block mb-2 text-xs font-medium text-slate-800">PJBU</label>
                            <input
                                type="text" name="pjbu" id="pjbu" value={data.pjbu} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2 flex justify-end items-center gap-x-2">
                            <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-3" onClick={onClose}>Batal</button>
                            <button type="submit" disabled={processing} className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-3">
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
                    Gagal mengubah informasi pengawasan. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
