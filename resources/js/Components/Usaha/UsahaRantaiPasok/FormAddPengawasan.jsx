import React from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../../Modal";
import ModalError from "../../ModalError";
import SelectUsaha from "../SelectUsaha";
import InputRadio from "../../InputRadio";

import { LiaAngleDownSolid, LiaSpinnerSolid } from "react-icons/lia";

export default ({
    isVisible,
    onClose,
    lingkupPengawasan,
    jenisRantaiPasok,
    daftarUsaha,
}) => {
    const [ isSelectUsahaVisible, setIsSelectUsahaVisible ] = React.useState(false);
    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);

    const { data, setData, processing, post, reset } = useForm({
        usaha: 'Pilih Badan Usaha',
        usahaId: '',
        nib: '',
        pjbu: '',
        tanggal: '',
        jenis: 'Rutin',
        kepemilikanPerizinanBerusaha: '',
        keabsahanPerizinanBerusaha: '',
    });
    const handleInputChange = (value) => setData({ ...data, ...value });

    function handleUsahaSelect(usaha) {
        const { id, nama, nib, pjbu } = usaha;
        setIsSelectUsahaVisible(false);
        setData({
            ...data,
            usaha: nama,
            usahaId: id,
            nib: nib,
            pjbu: pjbu,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        post(`/admin/pengawasan/usaha/${lingkupPengawasan.id}/${jenisRantaiPasok.slug}`, {
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: () => {
                onClose();
                setIsModalErrorOpened(true);
            }
        });
    }

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-xl h-fit mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-7">
                        <h1 className="font-medium text-slate-800">Tambah Pengawasan Tertib Usaha</h1>
                        <h2 className="text-xs text-slate-500 font-light">{lingkupPengawasan.lingkupPengawasan}</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit={handleSubmit} className="grid grid-cols-2 gap-5 mb-2">
                        <div>
                            <label htmlFor="tanggal" className="block mb-2 text-xs font-medium text-slate-800">Tanggal Pengawasan</label>
                            <input
                                type="date" name="tanggal" id="tanggal"
                                value={data.tanggal} onChange={e => setData('tanggal', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
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
                        <div className="relative col-span-2">
                            <div className="block mb-2 text-xs font-medium text-slate-800">{`Nama ${jenisRantaiPasok.pelakuUsaha} Rantai Pasok ${jenisRantaiPasok.kategoriSumberDaya} Konstruksi`}</div>
                            <div
                                className="flex justify-between items-center px-3 py-2 w-full rounded-md border border-slate-200 text-slate-600 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                onClick={() => setIsSelectUsahaVisible(!isSelectUsahaVisible)}
                            >
                                <span className="text-slate-500">{data.usaha}</span>
                                <LiaAngleDownSolid size={12} />
                            </div>
                            <SelectUsaha
                                isVisible={isSelectUsahaVisible}
                                onSelect={handleUsahaSelect}
                                daftarUsaha={daftarUsaha}
                            />
                        </div>
                        <div>
                            <label htmlFor="nib" className="block mb-2 text-xs font-medium text-slate-800">NIB</label>
                            <input
                                type="text" name="nib" id="nib" value={data.nib} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="pjbu" className="block mb-2 text-xs font-medium text-slate-800">PJBU</label>
                            <input
                                type="text" name="pjbu" id="pjbu" value={data.pjbu} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <div className="font-medium text-slate-800">Kepemilikan</div>
                                <div className="font-light text-[11px] text-slate-500">Perizinan Berusaha</div>
                            </div>
                            <InputRadio
                                id="kepemilikanPerizinanBerusaha"
                                isTrue={data.kepemilikanPerizinanBerusaha}
                                onInputChange={handleInputChange}
                                label="Memiliki"
                                labelFalse="Tidak"
                                style="col"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <div className="font-medium text-slate-800">Keabsahan</div>
                                <div className="font-light text-[11px] text-slate-500">Perizinan Berusaha</div>
                            </div>
                            <InputRadio
                                id="keabsahanPerizinanBerusaha"
                                isTrue={data.keabsahanPerizinanBerusaha}
                                onInputChange={handleInputChange}
                                label="Sah"
                                labelFalse="Tidak"
                                style="col"
                            />
                        </div>
                        {
                            `${jenisRantaiPasok.pelakuUsaha} Rantai Pasok ${jenisRantaiPasok.kategoriSumberDaya} Konstruksi` === "Produsen Rantai Pasok Material Konstruksi" && (
                               <>
                                <div className="col-span-2 space-y-2 text-xs">
                                    <div>
                                        <div className="font-medium text-slate-800">Kapasitas Terpasang</div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center">
                                        <div className="flex items-start gap-x-1.5">
                                            <input
                                                type="radio" id="true-kapasitasTerpasang" name="kapasitasTerpasang" value={true} onChange={e => setData('kapasitasTerpasang', e.target.value === "true")}
                                                className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                />
                                            <label htmlFor="true-kapasitasTerpasang" className="-mt-0.5 text-slate-700">Sesuai</label>
                                        </div>
                                        <div className="col-span-2 flex items-start gap-x-1.5">
                                            <input
                                                type="radio" id="false-kapasitasTerpasang" name="kapasitasTerpasang" value={false} onChange={e => setData('kapasitasTerpasang', e.target.value === "true")}
                                                className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                />
                                            <label htmlFor="false-kapasitasTerpasang" className="-mt-0.5 text-slate-700">Tidak Sesuai dengan Perizinan</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <div className="font-medium text-slate-800">Kepemilikan</div>
                                        <div className="font-light text-[11px] text-slate-500">Perizinan Penggunaan Bahan Baku</div>
                                    </div>
                                    <InputRadio
                                        id="kepemilikanPerizinanPenggunaan"
                                        isTrue={data.kepemilikanPerizinanPenggunaan}
                                        onInputChange={handleInputChange}
                                        label="Memiliki"
                                        labelFalse="Tidak"
                                        style="col"
                                        />
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <div className="font-medium text-slate-800">Keabsahan</div>
                                        <div className="font-light text-[11px] text-slate-500">Perizinan Penggunaan Bahan Baku</div>
                                    </div>
                                    <InputRadio
                                        id="keabsahanPerizinanPenggunaan"
                                        isTrue={data.keabsahanPerizinanPenggunaan}
                                        onInputChange={handleInputChange}
                                        label="Sah"
                                        labelFalse="Tidak"
                                        style="col"
                                        />
                                </div>
                                </>
                             )
                         }
                        <div className="col-span-2 flex justify-end items-center gap-x-2">
                            <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-3" onClick={onClose}>Batal</button>
                            <button type="submit" disabled={processing} className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-3">
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
                    Gagal menambahkan pengawasan baru. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
