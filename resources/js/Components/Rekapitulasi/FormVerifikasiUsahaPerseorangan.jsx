import React from "react";
import { useForm, usePage } from "@inertiajs/react";

import Modal from "../Modal";
import ModalError from "../ModalError";
import InputRadio from "../InputRadio";

import { LiaSpinnerSolid, LiaUser } from "react-icons/lia";
import { formatDateToIndonesia } from "../../Utils/formatDate";
import { getTertibStatusBadge } from "../../Utils/getStatusBadge";

export default ({ isVisible, onClose, usaha }) => {
    const { url } = usePage();
    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);

    const {
        skk,
        daftarPengawasan,
        tertibPengawasan,
        catatan,
    } = usaha;

    const { data, setData, processing, post, reset } = useForm({
        tertibPengawasan: '',
        catatan: '',
    });
    const handleInputChange = (value) => setData({ ...data, ...value });

    React.useEffect(() => {
        setData({
            ...data,
            usahaId: usaha.usahaId,
            tertibPengawasan: typeof(tertibPengawasan) === 'boolean' ? tertibPengawasan : '',
            catatan: catatan ? catatan : '',
        });
    }, [usaha]);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(url, data, usaha.id);

        post(`${url}/usaha-perseorangan`, {
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

    if (!Object.keys(usaha).length) return null;

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-xl h-fit my-10">
                <Modal.Header onClose={onClose}>
                    <div className="mb-5">
                        <h3 className="font-light text-xs text-slate-500">Rekapitulasi Pengawasan Tertib Usaha Jasa Konstruksi Tahunan</h3>
                        <h1 className="font-medium text-slate-800">Verifikasi Pengawasan Tahunan</h1>
                        <div className="flex gap-x-3 items-center text-xs">
                            <div className="flex items-center gap-x-1.5 text-slate-700">
                                <LiaUser size={16} />
                                <span className="uppercase">{usaha.nama}</span>
                            </div>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-xs">
                            <div className="col-span-2 pb-4 border-b border-slate-100">
                                <div className="font-light text-slate-500">Lingkup Pengawasan</div>
                                <div className="text-slate-800">Pemenuhan Persyaratan Usaha Jasa Konstruksi</div>
                            </div>
                            <div className="space-y-2 text-xs">
                                <div>
                                    <div className="text-slate-800">Hasil Pengawasan <span className="text-red-400">*</span></div>
                                    <div className="font-light text-[11px] text-slate-500">Kesimpulan Verifikasi Pengawasan</div>
                                </div>
                                <InputRadio
                                    id="tertibPengawasan"
                                    isTrue={data.tertibPengawasan}
                                    onInputChange={handleInputChange}
                                    label="Tertib"
                                />
                            </div>
                            <div className="space-y-2 text-xs">
                                <label htmlFor="catatan" className="block text-slate-800">Catatan Pengawasan</label>
                                <textarea
                                    name="catatan" id="catatan" rows="3"
                                    value={data.catatan} onChange={e => setData('catatan', e.target.value)}
                                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                            <div className="col-span-2 flex justify-end items-center gap-x-2">
                                <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-3" onClick={onClose}>Batal</button>
                                <button type="submit" disabled={processing} className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-3">
                                    { processing && <LiaSpinnerSolid className="animate-spin" />}
                                    Verifikasi
                                </button>
                            </div>
                        </form>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-xs border border-slate-200 rounded">
                                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
                                    <tr>
                                        <th scope="col" className="p-4 font-medium border-r border-slate-200">#</th>
                                        <th scope="col" className="p-4 font-medium min-w-32 border-r border-slate-200">Tanggal Pengawasan</th>
                                        <th scope="col" className="p-4 font-medium min-w-56 border-r border-slate-200 ">Nomor Sertifikat Standar yang telah terverifikasi</th>
                                        <th scope="col" className="p-4 font-medium border-r border-slate-200 ">Hasil Pengawasan</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700">
                                    <tr className="bg-slate-200">
                                        <td colSpan="4" className="px-4 py-2">Pengawasan Rutin</td>
                                    </tr>
                                    {
                                        daftarPengawasan.filter(({jenisPengawasan}) => jenisPengawasan === 'Rutin').map((pengawasan, i) => (
                                            <tr key={i} className="border-b border-slate-100 hover:bg-slate-100">
                                                <td className="px-4 py-5 text-center">{i + 1}</td>
                                                <td className="px-4 py-5 text-center">{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</td>
                                                <td className="px-4 py-5 text-center">
                                                {
                                                    usaha.skk.map(({ nomor_sertifikat }, i) => {
                                                        if (usaha.skk.length === i + 1) return nomor_sertifikat;
                                                        return `${nomor_sertifikat} , `;
                                                    })
                                                }
                                                </td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPengawasan)}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr className="bg-slate-200">
                                        <td colSpan="4" className="px-4 py-2">Pengawasan Insidental</td>
                                    </tr>
                                    {
                                        daftarPengawasan.filter(({jenisPengawasan}) => jenisPengawasan === 'Insidental').map((pengawasan, i) => (
                                            <tr key={i} className="border-b border-slate-100 hover:bg-slate-100">
                                                <td className="px-4 py-5 text-center">{i + 1}</td>
                                                <td className="px-4 py-5 text-center">{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</td>
                                                <td className="px-4 py-5 text-center">
                                                {
                                                    usaha.skk.map(({ nomor_sertifikat }, i) => {
                                                        if (usaha.skk.length === i + 1) return nomor_sertifikat;
                                                        return `${nomor_sertifikat} , `;
                                                    })
                                                }
                                                </td>
                                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPengawasan)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
