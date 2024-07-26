import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../Modal";
import ModalError from "../ModalError";
import { LiaSpinnerSolid } from "react-icons/lia";

export default ({ isVisible, onClose, paketPekerjaan, usahaId }) => {
    const {
        id,
        namaPaket,
        tahunAnggaran,
        jenisUsaha,
        sifatUsaha,
        subklasifikasiUsaha,
        layananUsaha,
        bentukUsaha,
        kualifikasiUsaha,
    } = paketPekerjaan;

    const { data, setData, post, processing, reset } = useForm({
        namaPaket: '',
        tahun: '2024',
        jenis: 'Jasa Konsultansi Konstruksi',
        sifat: 'Umum',
        subklasifikasi: '',
        layanan: '',
        bentuk: '',
        kualifikasi: '',
    });

    React.useEffect(() => {
        setData({
            ...data,
            id: id,
            namaPaket: namaPaket ? namaPaket : '',
            tahun: tahunAnggaran ? tahunAnggaran : '2024',
            jenis: jenisUsaha ? jenisUsaha : 'Jasa Konsultansi Konstruksi',
            sifat: sifatUsaha ? sifatUsaha : 'Umum',
            subklasifikasi: subklasifikasiUsaha ? subklasifikasiUsaha : '',
            layanan: layananUsaha ? layananUsaha : '',
            bentuk: bentukUsaha ? bentukUsaha : '',
            kualifikasi: kualifikasiUsaha ? kualifikasiUsaha : '',
        });
    }, [paketPekerjaan]);

    const [isModalErrorOpen, setIsModalErrorOpen] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        post(`/admin/pendataan/usaha/bujk/${usahaId}/paket-pekerjaan`, {
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
            <Modal
                isVisible={isVisible}
                className="w-full max-w-2xl h-fit mt-10"
            >
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-7">
                        <h1 className="font-medium text-slate-800">Tambah Paket Pekerjaan</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pendataan Badan Usaha Jasa Konstruksi</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit={handleSubmit} className="grid grid-cols-6 gap-5 mb-2">
                        <div className="col-span-4">
                            <label htmlFor="namaPaket" className="block mb-2 text-xs font-medium text-slate-800">Nama Paket Pekerjaan <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="namaPaket" id="namaPaket" placeholder="cth. Paket 10 Pengawasan Pembangunan Jalan"
                                value={data.namaPaket} onChange={e => setData('namaPaket', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="tahun" className="block mb-2 text-xs font-medium text-slate-800">Tahun Anggaran <span className="text-red-400">*</span></label>
                            <select
                                name="tahun" id="tahun" value={data.tahun} onChange={e => setData('tahun', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs">
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                            </select>
                        </div>
                        <div className="col-span-3">
                            <label htmlFor="jenis" className="block mb-2 text-xs font-medium text-slate-800">Jenis Usaha <span className="text-red-400">*</span></label>
                            <select
                                name="jenis" id="jenis" value={data.jenis} onChange={e => setData('jenis', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            >
                                    <option value="Jasa Konsultansi Konstruksi">Jasa Konsultansi Konstruksi</option>
                                    <option value="Pekerjaan Konstruksi">Pekerjaan Konstruksi</option>
                                    <option value="Pekerjaan Konstruksi Terintegrasi">Pekerjaan Konstruksi Terintegrasi</option>
                            </select>
                        </div>
                        <div className="col-span-3">
                            <label htmlFor="sifat" className="block mb-2 text-xs font-medium text-slate-800">Sifat Usaha <span className="text-red-400">*</span></label>
                            <select
                                name="sifat" id="sifat" value={data.sifat} onChange={e => setData('sifat', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs">
                                    <option value="Umum">Umum</option>
                                    <option value="Spesialis">Spesialis</option>
                            </select>
                        </div>
                        <div className="col-span-6">
                            <label htmlFor="subklasifikasi" className="block mb-2 text-xs font-medium text-slate-800">Subklasifikasi Usaha <span className="text-red-400">*</span></label>
                            <textarea
                                name="subklasifikasi" id="subklasifikasi" rows="2" placeholder="cth. Jasa Pengawasan Pekerjaan Konstruksi Teknik Sipil Transportasi - RE 202 KBLI 2017 atau Jasa Rekayasa Pekerjaan Teknik Sipil Transportasi - RK003 KBLI 2020"
                                value={data.subklasifikasi} onChange={e => setData('subklasifikasi', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="layanan" className="block mb-2 text-xs font-medium text-slate-800">Layanan Usaha <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="layanan" id="layanan" placeholder="cth. Pekerjaan Konstruksi"
                                value={data.layanan} onChange={e => setData('layanan', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="bentuk" className="block mb-2 text-xs font-medium text-slate-800">Bentuk Usaha <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="bentuk" id="bentuk" placeholder="cth. Badan Usaha"
                                value={data.bentuk} onChange={e => setData('bentuk', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="kualifikasi" className="block mb-2 text-xs font-medium text-slate-800">Kualifikasi Usaha <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="kualifikasi" id="kualifikasi" placeholder="cth. Kualifikasi Usaha Besar"
                                value={data.kualifikasi} onChange={e => setData('kualifikasi', e.target.value)} required
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-6 flex justify-end items-center gap-x-2">
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
                    Gagal menambahkan paket pekerjaan. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
