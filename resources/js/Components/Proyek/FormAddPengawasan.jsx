import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../Modal";
import SelectProyekKonstruksi from "./SelectProyekKonstruksi";
import ModalError from "../ModalError";

import { LiaAngleDownSolid, LiaSpinnerSolid } from "react-icons/lia";

export default ({
    isVisible,
    onClose,
    daftarProyek,
    sumberDana = 'APBD',
}) => {
    const [ isSelectProyekKonstruksiVisible, setIsSelectProyekKonstruksiVisible ] = React.useState(false);
    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);

    const { data, setData, processing, post, reset } = useForm({
        proyek: 'Pilih Proyek Konstruksi',
        proyekId: '',
        nomorKontrak: '',
        tanggalMulai: '',
        tanggalSelesai: '',
        penyediaJasa: '',
        penggunaJasa: '',
        tanggal: '',
        jenis: 'Rutin',
    });

    function handleProyekKonstruksiSelect(proyekKonstruksi) {
        const {
            id,
            namaPaket,
            nomorKontrak,
            tanggalMulaiPelaksanaan,
            tanggalSelesaiPelaksanaan,
            penyediaJasa,
            penggunaJasa,
        } = proyekKonstruksi;

        setIsSelectProyekKonstruksiVisible(false);
        setData({
            ...data,
            proyek: namaPaket,
            proyekId: id,
            nomorKontrak: nomorKontrak,
            tanggalMulai: tanggalMulaiPelaksanaan,
            tanggalSelesai: tanggalSelesaiPelaksanaan,
            penyediaJasa: penyediaJasa,
            penggunaJasa: penggunaJasa,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        post(`/admin/pengawasan/penyelenggaraan/${sumberDana}`, {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: (errors) => {
                console.log(errors);
                setIsModalErrorOpen(true);
            },
        });
    }

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-xl h-fit mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-7">
                        <h1 className="font-medium text-slate-800">Tambah Pengawasan</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pengawasan Tertib Penyelenggaraan Konstruksi</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit={handleSubmit} className="grid grid-cols-3 gap-5 mb-2">
                        <div>
                            <label htmlFor="tanggal" className="block mb-2 text-xs font-medium text-slate-800">Tanggal Pengawasan</label>
                            <input
                                type="date" name="tanggal" id="tanggal"
                                value={data.tanggal} onChange={e => setData('tanggal', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2">
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
                        <div className="relative col-span-3">
                            <div className="block mb-2 text-xs font-medium text-slate-800">Nama Proyek Konstruksi</div>
                            <div
                                className="flex justify-between items-center px-3 py-2 w-full rounded-md border border-slate-200 text-slate-600 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                onClick={() => setIsSelectProyekKonstruksiVisible(!isSelectProyekKonstruksiVisible)}
                            >
                                <span className="text-slate-500">{data.proyek}</span>
                                <LiaAngleDownSolid size={12} />
                            </div>
                            <SelectProyekKonstruksi
                                isVisible={isSelectProyekKonstruksiVisible}
                                onSelect={handleProyekKonstruksiSelect}
                                daftarProyekKonstruksi={daftarProyek}
                            />
                        </div>
                        <div>
                            <label htmlFor="nomorKontrak" className="block mb-2 text-xs font-medium text-slate-800">Nomor Kontrak</label>
                            <input
                                type="text" name="nomorKontrak" id="nomorKontrak"
                                value={data.nomorKontrak} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <div>
                                <div className="font-medium text-xs text-slate-800">Waktu Pelaksanaan</div>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-full">
                                    <input
                                        type="date" name="tanggalMulai" id="tanggalMulai"
                                        value={data.tanggalMulai} disabled
                                        className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                                <div className="text-xs text-slate-800 font-light">s.d.</div>
                                <div className="w-full">
                                    <input
                                        type="date" name="tanggalSelesai" id="tanggalSelesai"
                                        value={data.tanggalSelesai} disabled
                                        className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="penyediaJasa" className="block mb-2 text-xs font-medium text-slate-800">Penyedia Jasa</label>
                            <input
                                type="text" name="penyediaJasa" id="penyediaJasa"
                                value={data.penyediaJasa} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="penggunaJasa" className="block mb-2 text-xs font-medium text-slate-800">Nama Satuan Kerja Perangkat Daerah</label>
                            <input
                                type="text" name="penggunaJasa" id="penggunaJasa"
                                value={data.penggunaJasa} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-3 flex items-center justify-end gap-x-2 5">
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
                    Gagal menambahkan pengawasan baru. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
