import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../Modal";
import SelectBangunan from "./SelectBangunan";
import ModalError from "../ModalError";

import { LiaAngleDownSolid, LiaSpinnerSolid } from "react-icons/lia";

export default ({ isVisible, daftarBangunan, onClose }) => {
    const [isSelectBangunanVisible, setIsSelectBangunanVisible] = React.useState(false);
    const [isModalErrorOpened, setIsModalErrorOpened] = React.useState(false);

    const { data, setData, processing, post, reset } = useForm({
        bangunan: 'Pilih Bangunan',
        pemilikBangunan: '',
        pengelolaBangunan: '',
        bangunanId: '',
        tanggal: '',
        jenis: 'Rutin',
    });

    function handleBangunanSelect(bangunan) {
        const { id, nama, pemilikBangunan, pengelolaBangunan } = bangunan;
        setIsSelectBangunanVisible(false);
        setData({
            ...data,
            bangunan: nama,
            bangunanId: id,
            pemilikBangunan: pemilikBangunan,
            pengelolaBangunan: pengelolaBangunan,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        post('/admin/pengawasan/pemanfaatan-produk', {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: () => setIsModalErrorOpened(true),
        });
    }

    return (
        <>
            <Modal isVisible={isVisible} className="h-fit w-full max-w-lg mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-7">
                        <h1 className="font-medium text-slate-800">Tambah Pengawasan</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</h2>
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
                        <div className="relative col-span-2">
                            <div className="block mb-2 text-xs font-medium text-slate-800">Nama Bangunan Konstruksi</div>
                            <div
                                className="flex justify-between items-center px-3 py-2 w-full rounded-md border border-slate-200 text-slate-600 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                onClick={() => setIsSelectBangunanVisible(!isSelectBangunanVisible)}
                            >
                                <span className="text-slate-500">{data.bangunan}</span>
                                <LiaAngleDownSolid size={12} />
                            </div>
                            <SelectBangunan
                                isVisible={isSelectBangunanVisible}
                                onSelect={handleBangunanSelect}
                                daftarBangunan={daftarBangunan}
                            />
                        </div>
                        <div>
                            <label htmlFor="pemilik" className="block mb-2 text-xs font-medium text-slate-800">Nama Pemilik Bangunan</label>
                            <input
                                type="text" name="pemilik" id="pemilik"
                                value={data.pemilikBangunan} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="pengelola" className="block mb-2 text-xs font-medium text-slate-800">Nama Pengelola Bangunan</label>
                            <input
                                type="text" name="pengelola" id="pengelola"
                                value={data.pengelolaBangunan} disabled
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
    )
}
