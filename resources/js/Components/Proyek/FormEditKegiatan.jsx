import React from "react";
import { useForm } from "@inertiajs/react";

import Card from "../Card";
import SelectUsaha from "../Usaha/SelectUsaha";
import ModalError from "../ModalError";
import ModalSuccess from "../ModalSuccess";
import getFormData from "../../Utils/getFormData";

import {
    LiaSpinnerSolid,
    LiaCloudUploadAltSolid,
    LiaFileAlt,
    LiaTimesSolid,
} from "react-icons/lia";

function FormInformasi({ proyekKonstruksi }) {
    const {
        namaPaket,
        nomorKontrak,
        sumberDana,
        tanggalMulaiPelaksanaan,
        tanggalSelesaiPelaksanaan,
        tanggalKontrak,
        tahunAnggaran,
        nilaiKontrak,
        nilaiPagu,
    } = proyekKonstruksi;

    const { data, setData, put, processing, reset } = useForm({
        namaPaket: getFormData(namaPaket),
        nomorKontrak: getFormData(nomorKontrak),
        sumberDana: getFormData(sumberDana, 'APBD'),
        tanggalMulai: getFormData(tanggalMulaiPelaksanaan),
        tanggalSelesai: getFormData(tanggalSelesaiPelaksanaan),
        tanggalKontrak: getFormData(tanggalKontrak),
        tahunAnggaran: getFormData(tahunAnggaran, '2024'),
        nilaiKontrak: getFormData(nilaiKontrak),
        nilaiPagu: getFormData(nilaiPagu),
    });

    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);
    const [ isModalSuccessOpen, setIsModalSuccessOpen ] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        // put(`/admin/pendataan/proyek-konstruksi/${proyekKonstruksi.id}`, {
        //     preserveScroll: true,
        //     onSuccess: () => {
        //         setIsModalSuccessOpen(true);
        //     },
        //     onError: (errors) => {
        //         console.log(errors);
        //         setIsModalErrorOpen(true);
        //     },
        // });
    }
    return (
        <>
            <Card className="w-full">
                <Card.Body className="p-4">
                    <form method="post" onSubmit={handleSubmit} className="grid grid-cols-3 gap-6 mb-2">
                        <div className="col-span-3">
                            <label htmlFor="nama" className="block mb-2 text-xs font-medium text-slate-800">Nama Paket Pekerjaan <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="namaPaket" id="namaPaket" placeholder="cth. Peningkatan Struktur Jalan Tanah Habang Kec. Simpur (Peningkatan Jalan Wilayah Perkotaan)"
                                value={data.namaPaket} onChange={e => setData('namaPaket', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="nomorKontrak" className="block mb-2 text-xs font-medium text-slate-800">Nomor Kontrak <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="nomorKontrak" id="nomorKontrak" placeholder="cth. 800.1/XXX/I/2023"
                                value={data.nomorKontrak} onChange={e => setData('nomorKontrak', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2 w-3/4">
                            <label htmlFor="sumberDana" className="block mb-2 text-xs font-medium text-slate-800">Sumber Dana <span className="text-red-400">*</span></label>
                            <select
                                name="sumberDana" id="sumberDana" value={data.sumberDana} onChange={e => setData('sumberDana', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            >
                                <option value="APBD">APBD</option>
                                <option value="Masyarakat, swasta, atau badan usaha">Masyarakat, swasta, atau badan usaha</option>
                            </select>
                        </div>
                        <div className="col-span-2 space-y-2">
                            <div>
                                <div className="font-medium text-xs text-slate-800">Waktu Pelaksanaan <span className="text-red-400">*</span></div>
                                <div className="font-light text-[11px] text-slate-500">Isi dengan tanggal mulai dan selesai pelaksanaan sesuai kontrak</div>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-full">
                                    <input
                                        type="date" name="tanggalMulai" id="tanggalMulai"
                                        value={data.tanggalMulai} onChange={e => setData('tanggalMulai', e.target.value)}
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                                <div className="text-xs text-slate-800 font-light">s.d.</div>
                                <div className="w-full">
                                    <input
                                        type="date" name="tanggalSelesai" id="tanggalSelesai"
                                        value={data.tanggalSelesai} onChange={e => setData('tanggalSelesai', e.target.value)}
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 space-y-2">
                            <label htmlFor="tanggalKontrak">
                                <div className="font-medium text-xs text-slate-800">Tanggal Kontrak</div>
                                <div className="font-light text-[11px] text-slate-500">Isi dengan tanggal dilakukan kontrak</div>
                            </label>
                            <div className="flex items-center gap-1.5">
                                <div className="w-full">
                                    <input
                                        type="date" name="tanggalKontrak" id="tanggalKontrak"
                                        value={data.tanggalKontrak} onChange={e => setData('tanggalKontrak', e.target.value)}
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="tahun" className="block mb-2 text-xs font-medium text-slate-800">Tahun Anggaran <span className="text-red-400">*</span></label>
                            <select
                                name="tahunAnggaran" id="tahunAnggaran"
                                value={data.tahunAnggaran} onChange={e => setData('tahunAnggaran', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs">
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="nilaiKontrak" className="block mb-2 text-xs font-medium text-slate-800">Nilai Kontrak Paket <span className="font-light text-slate-500">(Rp)</span> <span className="text-red-400">*</span></label>
                            <div className="relative w-full">
                                <div className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-xs text-slate-500 font-light">Rp</div>
                                <input
                                    type="text" name="nilaiKontrak" id="nilaiKontrak" placeholder="10000000"
                                    value={data.nilaiKontrak} onChange={e => setData('nilaiKontrak', e.target.value)}
                                    className="border border-slate-200 rounded-md py-2.5 pl-8 block w-full text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="nilaiPagu" className="block mb-2 text-xs font-medium text-slate-800">Nilai Pagu <span className="font-light text-slate-500">(Rp)</span> <span className="text-red-400">*</span></label>
                            <div className="relative w-full">
                                <div className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-xs text-slate-500 font-light">Rp</div>
                                <input
                                    type="text" name="nilaiPagu" id="nilaiPagu" placeholder="10000000"
                                    value={data.nilaiPagu} onChange={e => setData('nilaiPagu', e.target.value)}
                                    className="border border-slate-200 rounded-md py-2.5 pl-8 block w-full text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                        </div>
                        <div className="col-span-3 flex items-center justify-end gap-x-2 5">
                            <button
                                type="button"
                                className="flex justify-center items-center gap-x-1 bg-white font-medium text-xs text-slate-700 rounded py-2.5 px-3 hover:bg-slate-100 border border-slate-200"
                                onClick={() => reset()}
                            >
                                Hapus
                            </button>
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
                </Card.Body>
            </Card>
            <ModalError
                isVisible={isModalErrorOpen}
                onClose={() => setIsModalErrorOpen(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal menambahkan proyek konstruksi baru. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
            <ModalSuccess
                isVisible={isModalSuccessOpen}
                onClose={() => setIsModalSuccessOpen(false)}
            >
                <div className="text-center my-2.5">
                    <div className="font-medium text-slate-700">Berhasil!</div>
                    <div className="font-light text-xs text-slate-500 mb-2">
                        Proyek konstruksi berhasil ditambahkan.
                    </div>
                </div>
                <div className="w-full">
                    <button
                        type="button"
                        className="w-full bg-slate-100 text-slate-700 font-medium text-xs rounded py-2 px-2.5"
                        onClick={() => setIsModalSuccessOpen(false)}
                    >
                        Tutup
                    </button>
                </div>
            </ModalSuccess>
        </>
    );
}

export {
    FormInformasi
}
