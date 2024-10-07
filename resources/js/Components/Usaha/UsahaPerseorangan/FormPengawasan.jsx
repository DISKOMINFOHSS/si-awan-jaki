import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../../Modal";
import ModalError from "../../ModalError";
import SelectUsaha from "../SelectUsaha";

import { LiaAngleDownSolid, LiaSpinnerSolid } from "react-icons/lia";

export default ({
    isVisible,
    onClose,
    lingkupPengawasan,
    daftarUsaha,
}) => {
    const [isSelectUsahaVisible, setIsSelectUsahaVisible] = React.useState(false);
    const [isModalErrorOpened, setIsModalErrorOpened] = React.useState(false);

    const { data, setData, processing, post, reset } = useForm({
        usaha: 'Pilih Usaha',
        usahaId: '',
        nib: '',
        tanggal: '',
        jenis: 'Rutin',
    });

    function handleUsahaSelect(usaha) {
        const { id, nama, nib } = usaha;
        setIsSelectUsahaVisible(false);
        setData({
            ...data,
            usaha: nama,
            usahaId: id,
            nib: nib,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        post(`/admin/pengawasan/usaha/${lingkupPengawasan.id}/usaha-perseorangan`, {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: () => {
                onClose();
                setIsModalErrorOpened(true);
            }
        });
    }

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-lg h-fit mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-7">
                        <h1 className="font-medium text-slate-800">Tambah Pengawasan Tertib Usaha</h1>
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
                                name="jenis" id="jenis"
                                value={data.jenis} onChange={e => setData('jenis', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            >
                                <option value="Rutin">Pengawasan Rutin</option>
                                <option value="Insidental">Pengawasan Insidental</option>
                            </select>
                        </div>
                        <div className="relative">
                            <div className="block mb-2 text-xs font-medium text-slate-800">Nama Usaha Orang Perseorangan</div>
                            <div
                                className="flex justify-between items-center px-3 py-2 w-full rounded-md border border-slate-200 text-slate-600 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                onClick={() => setIsSelectUsahaVisible(!isSelectUsahaVisible)}
                            >
                                <span className="text-slate-500">{data.usaha}</span>
                                <LiaAngleDownSolid size={12} />
                            </div>
                            <SelectUsaha
                                isVisible={isSelectUsahaVisible}
                                onSelect={handleUsahaSelect}
                                daftarUsaha={daftarUsaha}
                                jenisUsaha="Usaha Orang Perseorangan"
                            />
                        </div>
                        <div>
                            <label htmlFor="nib" className="block mb-2 text-xs font-medium text-slate-800">NIB</label>
                            <input
                                type="text" name="nib" id="nib" value={data.nib} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2 flex justify-end items-center gap-x-2">
                            <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-3" onClick={onClose}>Batal</button>
                            <button type="submit" disabled={processing} className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-3">
                                { processing && <LiaSpinnerSolid className="animate-spin" /> }
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
                    Gagal menambahkan pengawasan baru. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    );
}

