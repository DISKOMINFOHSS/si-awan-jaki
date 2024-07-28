import React from "react";
import Modal from "../../Modal";

import { LiaAngleDownSolid } from "react-icons/lia";

export default ({ isVisible, onClose }) => {
    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-xl h-fit mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-7">
                        <h1 className="font-medium text-slate-800">Tambah Paket Pekerjaan</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pendataan Badan Usaha Jasa Konstruksi</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                <form method="post" className="grid grid-cols-2 gap-5 mb-2">
                    <div className="relative col-span-2">
                        <label htmlFor="usaha" className="block mb-2 text-xs font-medium text-slate-800">Nama Paket Pekerjaan</label>
                        <div
                            className="flex justify-between items-center px-3 py-2 w-full rounded-md border border-slate-200 text-slate-600 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        >
                            <span className="text-slate-500">Pilih Paket Pekerjaan</span>
                            <LiaAngleDownSolid size={12} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="jenis" className="block mb-2 text-xs font-medium text-slate-800">Jenis Usaha</label>
                        <input
                            type="text" name="jenis" id="jenis" value={``} disabled
                            className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>
                    <div>
                        <label htmlFor="sifat" className="block mb-2 text-xs font-medium text-slate-800">Sifat Usaha</label>
                        <input
                            type="text" name="sifat" id="sifat" value={``} disabled
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
                                    type="radio" id="kesesuaianJenisTrue" name="kesesuaianJenis" value="1" onChange={e => setData('kesesuaianJenis', e.target.value)}
                                    className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                />
                                <label htmlFor="kesesuaianJenisTrue" className="text-slate-700">Sesuai</label>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <input
                                    type="radio" id="kesesuaianJenisFalse" name="kesesuaianJenis" value="0" onChange={e => setData('kesesuaianJenis', e.target.value)}
                                    className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                />
                                <label htmlFor="kesesuaianJenisFalse" className="text-slate-700">Tidak Sesuai</label>
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
                                    type="radio" id="kesesuaianSifatTrue" name="kesesuaianSifat" value="1" onChange={e => setData('kesesuaianSifat', e.target.value)}
                                    className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                />
                                <label htmlFor="kesesuaianSifatTrue" className="text-slate-700">Sesuai</label>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <input
                                    type="radio" id="kesesuaianSifatFalse" name="kesesuaianSifat" value="0" onChange={e => setData('kesesuaianSifat', e.target.value)}
                                    className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                />
                                <label htmlFor="kesesuaianSifatFalse" className="text-slate-700">Tidak Sesuai</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="subklasifikasi" className="block mb-2 text-xs font-medium text-slate-800">Subklasifikasi Usaha</label>
                        <textarea
                            name="subklasifikasi" id="subklasifikasi" rows="2" defaultValue={``}
                            className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>
                    <div>
                        <label htmlFor="layanan" className="block mb-2 text-xs font-medium text-slate-800">Layanan Usaha</label>
                        <input
                            type="text" name="layanan" id="layanan" value={``} disabled
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
                                    type="radio" id="kesesuaianSubklasifikasiTrue" name="kesesuaianSubklasifikasi" value="1" onChange={e => setData('kesesuaianSubklasifikasi', e.target.value)}
                                    className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                />
                                <label htmlFor="kesesuaianSubklasifikasiTrue" className="text-slate-700">Sesuai</label>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <input
                                    type="radio" id="kesesuaianSubklasifikasiFalse" name="kesesuaianSubklasifikasi" value="0" onChange={e => setData('kesesuaianSubklasifikasi', e.target.value)}
                                    className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                />
                                <label htmlFor="kesesuaianSubklasifikasiFalse" className="text-slate-700">Tidak Sesuai</label>
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
                                    type="radio" id="kesesuaianLayananTrue" name="kesesuaianLayanan" value="1" onChange={e => setData('kesesuaianLayanan', e.target.value)}
                                    className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                />
                                <label htmlFor="kesesuaianLayananTrue" className="text-slate-700">Sesuai</label>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <input
                                    type="radio" id="kesesuaianLayananFalse" name="kesesuaianLayanan" value="0" onChange={e => setData('kesesuaianLayanan', e.target.value)}
                                    className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                />
                                <label htmlFor="kesesuaianLayananFalse" className="text-slate-700">Tidak Sesuai</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex justify-end items-center gap-x-2">
                            <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-2.5" onClick={onClose}>Batal</button>
                            <button type="submit" className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-2.5">
                                Tambah
                            </button>
                        </div>
                </form>
            </Modal.Body>
            </Modal>
        </>
    )
}
