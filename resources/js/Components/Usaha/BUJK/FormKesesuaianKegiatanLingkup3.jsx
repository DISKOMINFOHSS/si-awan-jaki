import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../../Modal";
import SelectPaketPekerjaan from "./SelectPaketPekerjaan";
import ModalError from "../../ModalError";

import {
    LiaAngleDownSolid,
    LiaSpinnerSolid,
} from "react-icons/lia";

export default ({
    isVisible,
    onClose,
    pengawasanId,
    daftarPaketPekerjaan,
    selectedPaketPekerjaan,
}) => {
    const [isSelectPaketPekerjaanVisible, setIsSelectPaketPekerjaanVisible] = React.useState(false);
    const [isModalErrorOpen, setIsModalErrorOpen] = React.useState(false);

    const {
        id,
        paketId,
        namaPaket,
        bentukUsaha,
        kesesuaianBentuk,
        kualifikasiUsaha,
        kesesuaianKualifikasi,
    } = selectedPaketPekerjaan;

    const { data, setData, processing, post, reset } = useForm({
        id: '',
        paketPekerjaan: 'Pilih Paket Pekerjaan',
        paketId: '',
        bentuk: '',
        kesesuaianBentuk: '',
        kualifikasi: '',
        kesesuaianKualifikasi: '',
    });

    React.useEffect(() => {
        setData({
            ...data,
            id: id ? id : '',
            paketPekerjaan: namaPaket ? namaPaket : 'Pilih Paket Pekerjaan',
            paketId: paketId ? paketId : '',
            bentuk: bentukUsaha ? bentukUsaha : '',
            kesesuaianBentuk: typeof(kesesuaianBentuk) === 'boolean' ? kesesuaianBentuk : '',
            kualifikasi: kualifikasiUsaha ? kualifikasiUsaha : '',
            kesesuaianSifat: typeof(kesesuaianKualifikasi) === 'boolean' ? kesesuaianKualifikasi : '',
        });
    }, [selectedPaketPekerjaan]);

    function handlePaketPekerjaanSelect(paketPekerjaan) {
        const {
            id,
            namaPaket,
            bentukUsaha,
            kualifikasiUsaha,
        } = paketPekerjaan;

        setIsSelectPaketPekerjaanVisible(false);
        setData({
            ...data,
            paketPekerjaan: namaPaket,
            paketId: id,
            bentuk: bentukUsaha,
            kualifikasi: kualifikasiUsaha,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        // post(`/admin/pengawasan/usaha/3/${pengawasanId}/paket-pekerjaan`, {
        //     preserveScroll: true,
        //     onSuccess: () => {
        //         reset();
        //         onClose();
        //     },
        //     onError: (errors) => {
        //         console.log(errors);
        //         onClose();
        //         setIsModalErrorOpen(true);
        //     },
        // });
    }

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-xl h-fit mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-7">
                        <h1 className="font-medium text-slate-800">Tambah Pemeriksaan Kesesuaian Kegiatan</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pengawasan Tertib Usaha Jasa Konstruksi</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit={handleSubmit} className="grid grid-cols-2 gap-5 mb-2">
                        <div className="relative col-span-2">
                            <label htmlFor="paketPekerjaan" className="block mb-2 text-xs font-medium text-slate-800">Nama Paket Pekerjaan</label>
                            <button
                                type="button"
                                disabled={data.id !== ''}
                                className="flex justify-between items-center px-3 py-2 w-full rounded-md border border-slate-200 text-slate-600 focus:ring-blue-400 focus:border-blue-400 text-xs cursor-pointer"
                                onClick={() => setIsSelectPaketPekerjaanVisible(!isSelectPaketPekerjaanVisible)}
                            >
                                <span className="text-slate-500">{data.paketPekerjaan}</span>
                                <LiaAngleDownSolid size={12} />
                            </button>
                            <SelectPaketPekerjaan
                                isVisible={isSelectPaketPekerjaanVisible}
                                onSelect={handlePaketPekerjaanSelect}
                                daftarPaketPekerjaan={daftarPaketPekerjaan}
                            />
                        </div>
                        <div>
                            <label htmlFor="bentuk" className="block mb-2 text-xs font-medium text-slate-800">Bentuk Usaha</label>
                            <input
                                type="text" name="bentuk" id="bentuk" value={data.bentuk} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="kualifikasi" className="block mb-2 text-xs font-medium text-slate-800">Kualifikasi Usaha</label>
                            <input
                                type="text" name="kualifikasi" id="kualifikasi" value={data.kualifikasi} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="space-y-2 text-xs">
                            <div>
                                <div className="font-medium text-slate-800">Kesesuaian dengan SBU</div>
                                <div className="font-light text-[11px] text-slate-500">Bentuk Usaha</div>
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="true-kesesuaianBentuk" name="kesesuaianBentuk" checked={data.kesesuaianBentuk}
                                        value={true} onChange={e => setData('kesesuaianBentuk', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="true-kesesuaianBentuk" className="text-slate-700">Sesuai</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="false-kesesuaianBentuk" name="kesesuaianBentuk" checked={data.kesesuaianBentuk === false}
                                        value={false} onChange={e => setData('kesesuaianBentuk', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="false-kesesuaianBentuk" className="text-slate-700">Tidak Sesuai</label>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 text-xs">
                            <div>
                                <div className="font-medium text-slate-800">Kesesuaian dengan SBU</div>
                                <div className="font-light text-[11px] text-slate-500">Kualifikasi Usaha</div>
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="true-kesesuaianKualifikasi" name="kesesuaianKualifikasi" checked={data.kesesuaianKualifikasi}
                                        value={true} onChange={e => setData('kesesuaianKualifikasi', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="true-kesesuaianKualifikasi" className="text-slate-700">Sesuai</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="false-kesesuaianKualifikasi" name="kesesuaianKualifikasi" checked={data.kesesuaianKualifikasi === false}
                                        value="0" onChange={e => setData('kesesuaianKualifikasi', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="false-kesesuaianKualifikasi" className="text-slate-700">Tidak Sesuai</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 flex justify-end items-center gap-x-2">
                            <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-2.5" onClick={onClose}>Batal</button>
                            <button type="submit" className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-2.5">
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
                    Gagal menambahkan pemeriksaan kesesuaian kegiatan. Silakan periksa kembali.
                </div>
            </ModalError>
        </>
    )
}
