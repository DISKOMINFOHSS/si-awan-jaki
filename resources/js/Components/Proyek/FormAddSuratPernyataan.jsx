import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../Modal";

import {
    LiaCloudUploadAltSolid,
    LiaAngleDownSolid,
    LiaFileAlt,
    LiaTimesSolid,
    LiaSpinnerSolid
} from "react-icons/lia";

const SelectKategoriSurat = ({ isVisible, onSelect, daftarSuratPernyataan }) => {
    if (!isVisible) return null;

    const kategoriSuratPernyataan = [];
    daftarSuratPernyataan.map(({ id, suratPernyataan }) => {
        suratPernyataan.map(({ id: kategoriId, kategori }) => {
            kategoriSuratPernyataan.push({
                lingkupId: id,
                kategoriId: kategoriId,
                kategori: kategori
            });
        });
    });

    return (
        <div className= "absolute flex z-20 bg-white mt-1.5 py-2 rounded shadow-xl min-w-full max-h-40 overflow-y-auto flex-col space-y-0.5 text-xs text-slate-700">
            {
                kategoriSuratPernyataan.map(({ lingkupId, kategoriId, kategori }) => (
                    <div
                        key={kategoriId} className="px-5 py-2 border-b border-slate-100 space-y-1 group hover:bg-slate-100 hover:text-blue-600"
                        onClick={() => onSelect({ kategoriId: kategoriId, kategori: kategori })}
                    >
                        <div>
                            <span className="font-light text-slate-500 group-hover:text-blue-600">Lingkup Pengawasan {lingkupId} - </span>
                            <span>{kategori}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default ({ isVisible, onClose, proyekKonstruksi }) => {
    const { daftarSuratPernyataan } = proyekKonstruksi;
    const [ isSelectKategoriSuratVisible, setIsSelectKategoriSuratVisible ] = React.useState(false);

    const { data, setData, post, processing, progress } = useForm({
        dokumenSurat: '',
        kategoriId: '',
        kategori: 'Pilih Kategori Surat Pernyataan',
    });

    function handleKategoriSuratSelect({ kategoriId, kategori }) {
        setIsSelectKategoriSuratVisible(false);
        setData({
            ...data,
            kategoriId: kategoriId,
            kategori: kategori,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
    }

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-lg h-fit mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-7">
                        <h1 className="font-medium text-slate-800">Tambah Surat Pernyataan</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pendataan Penyelenggaraan Jasa Konstruksi</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form
                        method="post"
                        className="grid grid-cols-2 gap-5 mb-2"
                        onSubmit={handleSubmit}
                    >
                        <div className="col-span-2">
                            <label htmlFor="nama" className="block mb-2 text-xs font-medium text-slate-800">Nama Paket Pekerjaan</label>
                            <textarea
                                rows="2" name="nama" id="nama" value={proyekKonstruksi.namaPaket} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="nomorKontrak" className="block mb-2 text-xs font-medium text-slate-800">Nomor Kontrak</label>
                            <input
                                type="text" name="nomorKontrak" id="nomorKontrak" value={proyekKonstruksi.nomorKontrak} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="penyediaJasa" className="block mb-2 text-xs font-medium text-slate-800">Nama Penyedia Jasa</label>
                            <input
                                type="text" name="penyediaJasa" id="penyediaJasa" value={''} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="relative col-span-2">
                            <div className="block mb-2 text-xs font-medium text-slate-800">Kategori Surat Pernyataan</div>
                            <div
                                className="flex justify-between items-center px-3 py-2 w-full rounded-md border border-slate-200 text-slate-600 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                onClick={() => setIsSelectKategoriSuratVisible(!isSelectKategoriSuratVisible)}
                            >
                                <span className="text-slate-500">{data.kategori}</span>
                                <LiaAngleDownSolid size={12} />
                            </div>
                            <SelectKategoriSurat
                                isVisible={isSelectKategoriSuratVisible}
                                onSelect={handleKategoriSuratSelect}
                                daftarSuratPernyataan={daftarSuratPernyataan}
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="block mb-2 text-xs font-medium text-slate-800">Dokumen Surat Pernyataan</div>
                            {
                                data.dokumenSurat === '' ? (
                                    <label htmlFor="dokumenSurat">
                                        <div className="group mt-1 w-full flex items-center justify-between gap-x-10 p-2 rounded border border-dashed border-slate-200 hover:bg-slate-100 cursor-pointer">
                                            <div className="flex items-start gap-x-2">
                                            <div className="rounded bg-blue-50 group-hover:bg-blue-100 text-blue-500 w-fit p-2">
                                                    <LiaCloudUploadAltSolid size={18} />
                                                </div>
                                                <div>
                                                    <div className="font-normal text-xs ">Upload Dokumen Surat Pernyataan</div>
                                                    <div className="font-light text-slate-500 text-[11px]">Maks. 2 MB</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[11px] text-slate-700 border border-slate-200 bg-white px-2 py-1 rounded">
                                                    Browse
                                                </div>
                                            </div>
                                        </div>
                                        <input type="file" id="dokumenSurat" className="hidden" onChange={e => setData('dokumenSurat', e.target.files[0])} />
                                    </label>
                                ) : (
                                    <div className="space-y-2 text-xs text-slate-800">
                                        <div className="flex justify-between border border-slate-200 p-2 rounded">
                                            <div className="flex gap-x-2">
                                                <div className="bg-blue-100 text-blue-600 rounded p-2 h-fit">
                                                    <LiaFileAlt size={18} />
                                                </div>
                                                <div>
                                                    <div className="font-normal line-clamp-2">{data.dokumenSurat.name}</div>
                                                    <div className="font-light text-slate-500">{parseFloat(data.dokumenSurat.size/1000000).toFixed(1)} MB</div>
                                                </div>
                                            </div>
                                            <button
                                                type="button" className="text-slate-700 p-1 h-fit"
                                                onClick={() => setData('dokumenSurat', '')}
                                            >
                                                <LiaTimesSolid size={12} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                         <div className="col-span-2 flex justify-end items-center gap-x-2">
                            <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-3" onClick={onClose}>Batal</button>
                            <button type="submit" className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-2.5">
                                { processing && <LiaSpinnerSolid className="animate-spin" /> }
                                <span>Simpan</span>
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
