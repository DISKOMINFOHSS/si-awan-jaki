import React from "react";
import { router } from "@inertiajs/react";

import Modal from "../Modal";
import ModalError from "../ModalError";

import { LiaSpinnerSolid } from "react-icons/lia";

function InputRadioTertib({ id, isTrue, onInputChange }) {
    const [value, setValue] = React.useState(isTrue);

    function handleInputChange(e) {
        setValue(e.target.value === "true");
        onInputChange({ [e.target.name]: e.target.value === "true" });
    }

    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-x-2">
                <input
                    type="radio" id={`true-${id}`} name={id} value={true}
                    onChange={handleInputChange} checked={value === true}
                    className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={`true-${id}`} className="text-slate-700">Tertib</label>
            </div>
            <div className="flex items-center gap-x-2">
                <input
                    type="radio" id={`false-${id}`} name={id} value={false}
                    onChange={handleInputChange} checked={value === false}
                    className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={`false-${id}`} className="text-slate-700">Belum Tertib</label>
            </div>
        </div>
    );
}

export default ({ pengawasan, isVisible, onClose }) => {
    const {
        tertibKesesuaianFungsi,
        tertibKesesuaianLokasi,
        tertibRencanaUmurKonstruksi,
        tertibKapasitasBeban,
        tertibPemeliharaanBangunan,
        tertibProgramPemeliharaan,
        tertibPengawasan
    } = pengawasan;

    const [values, setValues] = React.useState({
        kesesuaianFungsi: tertibKesesuaianFungsi,
        kesesuaianLokasi: tertibKesesuaianLokasi,
        rencanaUmurKonstruksi: tertibRencanaUmurKonstruksi,
        kapasitasBeban: tertibKapasitasBeban,
        pemeliharaanBangunan: tertibPemeliharaanBangunan,
        programPemeliharaan: tertibProgramPemeliharaan,
        tertibPengawasan: tertibPengawasan,
        catatan: '',
    });

    const [isModalErrorOpened, setIsModalErrorOpened] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);

    function handleInputChange(value) {
        setValues({ ...values, ...value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setProcessing(true);

        console.log(values);

        router.post(
            `/admin/pengawasan/pemanfaatan-produk/${pengawasan.id}/verification`,
            values,
            {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                    setProcessing(false);
                    // router.get(`/admin/pengawasan/pemanfaatan-produk/${id}/rekomendasi/create`);
                },
                onError: (errors) => {
                    console.log(errors);
                    onClose();
                    setProcessing(false);
                    setIsModalErrorOpened(true);
                }
            }
        );
    }

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-[40rem] h-fit mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-4">
                        <h1 className="font-medium text-slate-800">Verifikasi Pengawasan</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-b border-slate-100 pb-4">
                            <div className="col-span-2 text-xs">
                                <div className="font-light text-slate-500">Lingkup Pengawasan 1</div>
                                <div className="text-slate-800">Pengawasan Fungsi Peruntukan terhadap Tertib Pemanfaatan Jasa Konstruksi</div>
                            </div>
                            <div className="space-y-2 text-xs">
                                <div>
                                    <div className="text-slate-800">Kesesuaian Fungsi <span className="text-red-400">*</span></div>
                                    <div className="font-light text-[11px] text-slate-500">Pengawasan Fungsi Peruntukan</div>
                                </div>
                                <InputRadioTertib
                                    id="kesesuaianFungsi"
                                    isTrue={values.kesesuaianFungsi}
                                    onInputChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2 text-xs">
                                <div>
                                    <div className="text-slate-800">Kesesuaian Lokasi <span className="text-red-400">*</span></div>
                                    <div className="font-light text-[11px] text-slate-500">Pengawasan Fungsi Peruntukan</div>
                                </div>
                                <InputRadioTertib
                                    id="kesesuaianLokasi"
                                    isTrue={values.kesesuaianLokasi}
                                    onInputChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-b border-slate-100 pb-4">
                            <div className="space-y-2 text-xs">
                                <div>
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 2</div>
                                    <div className="text-slate-800">Pengawasan terhadap Rencana Umur Konstruksi <span className="text-red-400">*</span></div>
                                </div>
                                <InputRadioTertib
                                    id="rencanaUmurKonstruksi"
                                    isTrue={values.rencanaUmurKonstruksi}
                                    onInputChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2 text-xs">
                                <div>
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 3</div>
                                    <div className="text-slate-800">Pengawasan terhadap Kapasitas dan Beban <span className="text-red-400">*</span></div>
                                </div>
                                <InputRadioTertib
                                    id="kapasitasBeban"
                                    isTrue={values.kapasitasBeban}
                                    onInputChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-b border-slate-100 pb-4">
                            <div className="col-span-2 text-xs">
                                <div className="font-light text-slate-500">Lingkup Pengawasan 4</div>
                                <div className="text-slate-800">Pengawasan terhadap Pemeliharaan Produk Jasa Konstruksi</div>
                            </div>
                            <div className="space-y-2 text-xs">
                                <div>
                                    <div className="text-slate-800">Pemeliharaan Bangunan <span className="text-red-400">*</span></div>
                                    <div className="font-light text-[11px] text-slate-500">Pemeliharaan Produk Konstruksi</div>
                                </div>
                                <InputRadioTertib
                                    id="pemeliharaanBangunan"
                                    isTrue={values.pemeliharaanBangunan}
                                    onInputChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2 text-xs">
                                <div>
                                    <div className="text-slate-800">Program Pemeliharaan <span className="text-red-400">*</span></div>
                                    <div className="font-light text-[11px] text-slate-500">Pemeliharaan Produk Konstruksi</div>
                                </div>
                                <InputRadioTertib
                                    id="programPemeliharaan"
                                    isTrue={values.programPemeliharaan}
                                    onInputChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                            <div className="space-y-2 text-xs">
                                <div>
                                    <div className="text-slate-800">Hasil Pengawasan <span className="text-red-400">*</span></div>
                                    <div className="font-light text-[11px] text-slate-500">Kesimpulan Verifikasi Pengawasan</div>
                                </div>
                                <InputRadioTertib
                                    id="tertibPengawasan"
                                    isTrue={values.tertibPengawasan}
                                    onInputChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2 text-xs">
                                <label htmlFor="catatan" className="block text-slate-800">Catatan Pengawasan</label>
                                <textarea
                                    name="catatan" id="catatan" rows="2"
                                    value={values.catatan} onChange={e => setValues({ ...values, catatan: e.target.value})}
                                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end items-center gap-x-2">
                            <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-3" onClick={onClose}>Batal</button>
                            <button type="submit" disabled={processing} className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-3">
                                { processing && <LiaSpinnerSolid className="animate-spin" />}
                                Verifikasi
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <ModalError
                isVisible={isModalErrorOpened}
                onClose={() => setIsModalErrorOpened(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal memverifikasi pengawasan. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
