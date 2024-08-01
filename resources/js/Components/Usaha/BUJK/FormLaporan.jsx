import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../../Modal";
import ModalError from "../../ModalError";

import { LiaSpinnerSolid } from "react-icons/lia";

export default ({ isVisible, onClose, usahaId, laporan }) => {
    const { data, setData, post, processing } = useForm({
        tahun: '2024',
        label: '',
        url: '',
    });

    const [isModalErrorOpen, setIsModalErrorOpen] = React.useState(false);

    React.useEffect(() => {
        setData({
            ...data,
            id: laporan.id ? laporan.id : '',
            tahun: laporan.tahun ? laporan.tahun : '2024',
            label: laporan.label ? laporan.label : '',
            url: laporan.url ? laporan.url : '',
        });
    }, [laporan]);

    function handleSubmit(e) {
        e.preventDefault();
        post(`/admin/pendataan/usaha/bujk/${usahaId}/laporan`, {
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
                        <h1 className="font-medium text-slate-800">{laporan.id ? "Edit" : "Tambah"} Laporan Badan Usaha</h1>
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
                            <label htmlFor="tahun" className="block mb-2 text-xs font-medium text-slate-800">Tahun <span className="text-red-400">*</span></label>
                            <select
                                name="tahun" id="tahun" value={data.tahun} onChange={e => setData('tahun', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            >
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="label" className="block mb-2 text-xs font-medium text-slate-800">Label Folder <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="label" id="label" placeholder="cth. Laporan Tahunan BUJK"
                                value={data.label} onChange={e => setData('label', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-3 space-y-2.5">
                            <label htmlFor="url" className="space-y-0.5 text-xs">
                                <div className="font-medium text-slate-800">Link Folder Laporan <span className="text-red-400">*</span></div>
                                <div className="font-light text-[11px] text-slate-500">Isi dengan URL Google Drive Folder Laporan</div>
                            </label>
                            <input
                                type="text" name="url" id="url" placeholder="cth. https://drive.google.com/drive/folders/xxx?usp=drive_link"
                                value={data.url} onChange={e => setData('url', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-3 flex justify-end items-center gap-x-2">
                            <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-3" onClick={onClose}>Batal</button>
                            <button type="submit" disabled={processing} className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-2.5">
                                { processing && <LiaSpinnerSolid className="animate-spin" /> }
                                { laporan.id ? "Edit" : "Tambah" }
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
                    Gagal menambahkan laporan. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
