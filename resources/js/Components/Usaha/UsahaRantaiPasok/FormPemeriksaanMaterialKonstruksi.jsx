import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../../Modal";
import ModalError from "../../ModalError";

import { LiaSpinnerSolid } from "react-icons/lia";

export default ({
    isVisible,
    onClose,
    pengawasanId,
    jenisRantaiPasok
}) => {
    const { data, setData, processing, post, reset } = useForm({
        varian: '',
        subvarian: '',
        merk: '',
        sertifikatTKDN: '',
        sertifikatStandar: '',
        simpk: '',
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
                        <h1 className="font-medium text-slate-800">Tambah Material</h1>
                        <h2 className="text-xs text-slate-500 font-light">{`${jenisRantaiPasok.pelakuUsaha} Rantai Pasok Materil Konstruksi`}</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit={handleSubmit} className="grid grid-cols-2 gap-5 mb-2">
                        <div>
                            <label htmlFor="varian" className="block mb-2 text-xs font-medium text-slate-800">Nama Varian Produk <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="varian" id="varian" placeholder="cth. SEMEN"
                                value={data.varian} onChange={e => setData('varian', e.target.value.toUpperCase())} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="subvarian" className="block mb-2 text-xs font-medium text-slate-800">Nama Sub Varian Produk <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="subvarian" id="subvarian" placeholder="cth. PCC"
                                value={data.subvarian} onChange={e => setData('subvarian', e.target.value.toUpperCase())} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="merk" className="block mb-2 text-xs font-medium text-slate-800">Nama Sub Varian Produk <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="merk" id="merk" placeholder="cth. Semen Gresik"
                                value={data.merk} onChange={e => setData('merk', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2 space-y-2 text-xs">
                            <div>
                                <div className="font-medium text-slate-800">Sertifikat TKDN</div>
                                <div className="font-light text-[11px] text-slate-500">Informasi melalui website tkdn.kemenperin.go.id</div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-5">
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="true-sertifikatTKDN" name="sertifikatTKDN" checked={data.sertifikatTKDN}
                                        value={true} onChange={e => setData('sertifikatTKDN', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="true-sertifikatTKDN" className="text-slate-700">Bersertifikat TKDN</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="false-sertifikatTKDN" name="sertifikatTKDN" checked={data.sertifikatTKDN === false}
                                        value={false} onChange={e => setData('sertifikatTKDN', e.target.value === "true")}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="false-sertifikatTKDN" className="text-slate-700">Tidak Bersertifikat TKDN</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 space-y-2 text-xs">
                            <div>
                                <div className="font-medium text-slate-800">Sertifikat SNI / Sertifikat Standar yang Berlaku</div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="true-sertifikatStandar" name="sertifikatStandar" checked={data.sertifikatStandar === "Bersertifikat SNI"}
                                        value="Bersertifikat SNI" onChange={e => setData('sertifikatStandar', e.target.value)}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="true-sertifikatStandar" className="text-slate-700">Bersertifikat SNI</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="false-sertifikatStandar" name="sertifikatStandar" checked={data.sertifikatStandar === "Tidak Bersertifikat SNI"}
                                        value="Tidak Bersertifikat SNI" onChange={e => setData('sertifikatStandar', e.target.value)}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="false-sertifikatStandar" className="text-slate-700">Tidak Bersertifikat SNI</label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="radio" id="lainnya-sertifikatStandar" name="sertifikatStandar" checked={data.sertifikatStandar === "Bersertifikat Standar Lain"}
                                        value="Bersertifikat Standar Lain" onChange={e => setData('sertifikatStandar', e.target.value)}
                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="lainnya-sertifikatStandar" className="text-slate-700">Bersertifikat Standar Lain</label>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 text-xs">
                            <div>
                                <div className="font-medium text-slate-800">{jenisRantaiPasok.pelakuUsaha === "Produsen" ? "Pencatatan" : "Tercantum"} dalam SIMPK</div>
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
                                    <label htmlFor="false-simpk" className="text-slate-700">Belum {jenisRantaiPasok.pelakuUsaha === "Produsen" ? "Dicatatkan" : "Tercantum"}</label>
                                </div>
                            </div>
                        </div>
                        {
                            jenisRantaiPasok.pelakuUsaha === "Produsen" && (
                                <div>
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
                    Gagal menambahkan material konstruksi. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
