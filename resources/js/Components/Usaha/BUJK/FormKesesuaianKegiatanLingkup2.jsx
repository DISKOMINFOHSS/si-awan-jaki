import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../../Modal";
import ModalError from "../../ModalError";
import SelectPaketPekerjaan from "./SelectPaketPekerjaan";

import { LiaAngleDownSolid, LiaSpinnerSolid } from "react-icons/lia";

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
        jenisUsaha,
        kesesuaianJenis,
        sifatUsaha,
        kesesuaianSifat,
        subklasifikasiUsaha,
        kesesuaianSubklasifikasi,
        layananUsaha,
        kesesuaianLayanan,
    } = selectedPaketPekerjaan;

    const { data, setData, processing, post, reset } = useForm({
        id: '',
        paketPekerjaan: 'Pilih Paket Pekerjaan',
        paketId: '',
        jenis: '',
        kesesuaianJenis: '',
        sifat: '',
        kesesuaianSifat: '',
        subklasifikasi: '',
        kesesuaianSubklasifikasi: '',
        layanan: '',
        kesesuaianLayanan: '',
    });

    React.useEffect(() => {
        setData({
            ...data,
            id: id ? id : '',
            paketPekerjaan: namaPaket ? namaPaket : 'Pilih Paket Pekerjaan',
            paketId: paketId ? paketId : '',
            jenis: jenisUsaha ? jenisUsaha : '',
            kesesuaianJenis: typeof(kesesuaianJenis) === 'boolean' ? kesesuaianJenis : '',
            sifat: sifatUsaha ? sifatUsaha : '',
            kesesuaianSifat: typeof(kesesuaianSifat) === 'boolean' ? kesesuaianSifat : '',
            subklasifikasi: subklasifikasiUsaha ? subklasifikasiUsaha : '',
            kesesuaianSubklasifikasi: typeof(kesesuaianSubklasifikasi) === 'boolean' ? kesesuaianSubklasifikasi : '',
            layanan: layananUsaha ? layananUsaha : '',
            kesesuaianLayanan: typeof(kesesuaianLayanan) === 'boolean' ? kesesuaianLayanan : '',
        });
    }, [selectedPaketPekerjaan]);

    function handlePaketPekerjaanSelect(paketPekerjaan) {
        const {
            id,
            namaPaket,
            jenisUsaha,
            sifatUsaha,
            subklasifikasiUsaha,
            layananUsaha,
        } = paketPekerjaan;

        setIsSelectPaketPekerjaanVisible(false);
        setData({
            ...data,
            paketPekerjaan: namaPaket,
            paketId: id,
            jenis: jenisUsaha,
            sifat: sifatUsaha,
            subklasifikasi: subklasifikasiUsaha,
            layanan: layananUsaha
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(`/admin/pengawasan/usaha/2/${pengawasanId}/paket-pekerjaan`, {
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
                                className="text-left flex justify-between items-center px-3 py-2 w-full rounded-md border border-slate-200 text-slate-600 focus:ring-blue-400 focus:border-blue-400 text-xs cursor-pointer"
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
                            <label htmlFor="jenis" className="block mb-2 text-xs font-medium text-slate-800">Jenis Usaha</label>
                            <input
                                type="text" name="jenis" id="jenis" value={data.jenis} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="sifat" className="block mb-2 text-xs font-medium text-slate-800">Sifat Usaha</label>
                            <input
                                type="text" name="sifat" id="sifat" value={data.sifat} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="space-y-2 text-xs">
                            <div>
                                <div className="font-medium text-slate-800">Kesesuaian dengan SBU</div>
                                <div className="font-light text-[11px] text-slate-500">Jenis Usaha</div>
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="true-kesesuaianJenis" name="kesesuaianJenis" checked={data.kesesuaianJenis}
                                        value={true} onChange={e => setData('kesesuaianJenis', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="true-kesesuaianJenis" className="text-slate-700">Sesuai</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="false-kesesuaianJenis" name="kesesuaianJenis" checked={data.kesesuaianJenis === false}
                                        value={false} onChange={e => setData('kesesuaianJenis', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="false-kesesuaianJenis" className="text-slate-700">Tidak Sesuai</label>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 text-xs">
                            <div>
                                <div className="font-medium text-slate-800">Kesesuaian dengan SBU</div>
                                <div className="font-light text-[11px] text-slate-500">Sifat Usaha</div>
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="true-kesesuaianSifat" name="kesesuaianSifat" checked={data.kesesuaianSifat}
                                        value={true} onChange={e => setData('kesesuaianSifat', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="true-kesesuaianSifat" className="text-slate-700">Sesuai</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="false-kesesuaianSifat" name="kesesuaianSifat" checked={data.kesesuaianSifat === false}
                                        value="0" onChange={e => setData('kesesuaianSifat', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="false-kesesuaianSifat" className="text-slate-700">Tidak Sesuai</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subklasifikasi" className="block mb-2 text-xs font-medium text-slate-800">Subklasifikasi Usaha</label>
                            <textarea
                                name="subklasifikasi" id="subklasifikasi" rows="2" defaultValue={data.subklasifikasi}
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="layanan" className="block mb-2 text-xs font-medium text-slate-800">Layanan Usaha</label>
                            <input
                                type="text" name="layanan" id="layanan" value={data.layanan} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="space-y-2 text-xs">
                            <div>
                                <div className="font-medium text-slate-800">Kesesuaian dengan SBU</div>
                                <div className="font-light text-[11px] text-slate-500">Subklasifikasi Usaha</div>
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="true-kesesuaianSubklasifikasi" name="kesesuaianSubklasifikasi" checked={data.kesesuaianSubklasifikasi}
                                        value={true} onChange={e => setData('kesesuaianSubklasifikasi', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="true-kesesuaianSubklasifikasi" className="text-slate-700">Sesuai</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="false-kesesuaianSubklasifikasi" name="kesesuaianSubklasifikasi" checked={data.kesesuaianSubklasifikasi === false}
                                        value={false} onChange={e => setData('kesesuaianSubklasifikasi', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="false-kesesuaianSubklasifikasi" className="text-slate-700">Tidak Sesuai</label>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 text-xs">
                            <div>
                                <div className="font-medium text-slate-800">Kesesuaian dengan SBU</div>
                                <div className="font-light text-[11px] text-slate-500">Layanan Usaha</div>
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="true-kesesuaianLayanan" name="kesesuaianLayanan" checked={data.kesesuaianLayanan}
                                        value={true} onChange={e => setData('kesesuaianLayanan', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="true-kesesuaianLayanan" className="text-slate-700">Sesuai</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="false-kesesuaianLayanan" name="kesesuaianLayanan" checked={data.kesesuaianLayanan !== '' && !data.kesesuaianLayanan}
                                        value={false} onChange={e => setData('kesesuaianLayanan', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="false-kesesuaianLayanan" className="text-slate-700">Tidak Sesuai</label>
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
