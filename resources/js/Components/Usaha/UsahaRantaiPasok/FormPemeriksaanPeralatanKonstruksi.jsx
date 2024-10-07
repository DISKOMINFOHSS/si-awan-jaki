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
        varian: '',
        subvarian: '',
        merk: '',
        jumlahUnit: '',
        suratK3: '',
        buktiKepemilikan: '',
        simpk: '',
        nomorRegistrasi: '',
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
                        <h1 className="font-medium text-slate-800">Tambah Peralatan</h1>
                        <h2 className="text-xs text-slate-500 font-light">{`${jenisRantaiPasok.pelakuUsaha} Rantai Pasok Peralatan Konstruksi`}</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit={handleSubmit} className="grid grid-cols-4 gap-4 mb-2">
                        <div className="col-span-2">
                            <label htmlFor="varian" className="block mb-2 text-xs font-medium text-slate-800">Nama Varian Peralatan <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="varian" id="varian" placeholder="cth. ALAT BERAT"
                                value={data.varian} onChange={e => setData('varian', e.target.value.toUpperCase())} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="subvarian" className="block mb-2 text-xs font-medium text-slate-800">Nama Sub Varian Peralatan <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="subvarian" id="subvarian" placeholder="cth. BACKHOE LOADER"
                                value={data.subvarian} onChange={e => setData('subvarian', e.target.value.toUpperCase())} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-3">
                            <label htmlFor="merk" className="block mb-2 text-xs font-medium text-slate-800">Merk Peralatan <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="merk" id="merk" placeholder="cth. Komatsu"
                                value={data.merk} onChange={e => setData('merk', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="jumlahUnit" className="block mb-2 text-xs font-medium text-slate-800">Jumlah Unit <span className="text-red-400">*</span></label>
                            <input
                                type="number" name="jumlahUnit" id="jumlahUnit" placeholder="20"
                                value={data.jumlahUnit} onChange={e => setData('jumlahUnit', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-4 space-y-2 text-xs">
                            <div>
                                <div className="font-medium text-slate-800">Surat Keterangan Memenuhi Syarat K3 <span className="text-red-400">*</span></div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4">
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="true-suratK3" name="suratK3" checked={data.suratK3 === "Ada"}
                                        value="Ada" onChange={e => setData('suratK3', e.target.value)}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="true-suratK3" className="text-slate-700">Ada</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="false-suratK3" name="suratK3" checked={data.suratK3 === "Tidak Ada"}
                                        value="Tidak Ada" onChange={e => setData('suratK3', e.target.value)}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="false-suratK3" className="text-slate-700">Tidak Ada</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 space-y-2 text-xs">
                            <div>
                                <div className="font-medium text-slate-800">Bukti Kepemilikan <span className="text-red-400">*</span></div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="fakturPenjualan" name="buktiKepemilikan" checked={data.buktiKepemilikan === "Faktur Penjualan"}
                                        value="Faktur Penjualan" onChange={e => setData('buktiKepemilikan', e.target.value)}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="fakturPenjualan" className="text-slate-700">Faktur Penjualan</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="aktaJualBeli" name="buktiKepemilikan" checked={data.buktiKepemilikan === "Akta Jual Beli"}
                                        value="Akta Jual Beli" onChange={e => setData('buktiKepemilikan', e.target.value)}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="aktaJualBeli" className="text-slate-700">Akta Jual Beli</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="buktiPemilikKB" name="buktiKepemilikan" checked={data.buktiKepemilikan === "Bukti Pemilik Kendaraan Bermotor"}
                                        value="Bukti Pemilik Kendaraan Bermotor" onChange={e => setData('buktiKepemilikan', e.target.value)}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="buktiPemilikKB" className="text-slate-700">Bukti Pemilik Kendaraan Bermotor</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="kuitansiPembelian" name="buktiKepemilikan" checked={data.buktiKepemilikan === "Kuitansi Pembelian"}
                                        value="Kuitansi Pembelian" onChange={e => setData('buktiKepemilikan', e.target.value)}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="kuitansiPembelian" className="text-slate-700">Kuitansi Pembelian</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="perjanjianSewaBeli" name="buktiKepemilikan" checked={data.buktiKepemilikan === "Perjanjian Sewa Beli"}
                                        value="Perjanjian Sewa Beli" onChange={e => setData('buktiKepemilikan', e.target.value)}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="perjanjianSewaBeli" className="text-slate-700">Perjanjian Sewa Beli</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="buktiLain" name="buktiKepemilikan" checked={data.buktiKepemilikan === "Bukti Kepemilikan Sah Lain"}
                                        value="Bukti Kepemilikan Sah Lain" onChange={e => setData('buktiKepemilikan', e.target.value)}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="buktiLain" className="text-slate-700">Bukti Kepemilikan Sah Lain</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="suratHibah" name="buktiKepemilikan" checked={data.buktiKepemilikan === "Surat Hibah"}
                                        value="Surat Hibah" onChange={e => setData('buktiKepemilikan', e.target.value)}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="suratHibah" className="text-slate-700">Surat Hibah</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 space-y-2 text-xs">
                            <div>
                                <div className="font-medium text-slate-800">{jenisRantaiPasok.pelakuUsaha !== "Distributor/Agen Tunggal" ? "Pencatatan" : "Tercantum"} dalam SIMPK <span className="text-red-400">*</span></div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="true-simpk" name="simpk" checked={data.simpk}
                                        value={true} onChange={e => setData('simpk', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="true-simpk" className="text-slate-700">Sudah</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="false-simpk" name="simpk" checked={data.simpk === false}
                                        value={false} onChange={e => setData('simpk', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="false-simpk" className="text-slate-700">Belum {jenisRantaiPasok.pelakuUsaha !== "Distributor/Agen Tunggal" ? "Dicatatkan" : "Tercantum"}</label>
                                </div>
                            </div>
                        </div>
                        {
                            jenisRantaiPasok.pelakuUsaha !== "Distributor/Agen Tunggal" && (
                                <div className="col-span-2">
                                    <label htmlFor="nomorRegistrasi" className="block mb-2">
                                        <div className="font-medium text-xs text-slate-800">No. Registrasi</div>
                                        <div className="font-light text-[11px] text-slate-500">Pencatatan dalam SIMPK</div>
                                    </label>
                                    <input
                                        type="text" name="nomorRegistrasi" id="nomorRegistrasi"
                                        value={data.nomorRegistrasi} onChange={e => setData('nomorRegistrasi', e.target.value)}
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                            )
                        }
                        <div className="col-span-4 flex justify-end items-center gap-x-2">
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
                    Gagal menambahkan peralatan konstruksi. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
