import React from "react";

import Modal from "../../Modal";
import InputRadio from "../../InputRadio";

import { LiaSpinnerSolid } from "react-icons/lia";

export default ({
    isVisible,
    onClose,
    lingkupPengawasan,
    pengawasan
}) => {
    const {
        tertibPengembanganUsaha,
        tertibPengawasan,
        catatan
    } = pengawasan;

    const [values, setValues] = React.useState({
        pengembanganUsaha: tertibPengembanganUsaha,
        tertibPengawasan: tertibPengawasan,
        catatan: catatan ? catatan : '',
    });
    const handleInputChange = (value) => setValues({ ...values, ...value });

    const [processing, setProcessing] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setProcessing(true);
        console.log(values);
        onClose();
        setProcessing(false);
    }

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-lg h-fit mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="text-center mb-4">
                        <h1 className="font-medium text-slate-800">Verifikasi Pengawasan</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pengawasan Tertib Usaha Jasa Konstruksi</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-b border-slate-100 pb-4 text-xs">
                            <div className="col-span-2">
                                <div className="font-light text-slate-500">Lingkup Pengawasan {lingkupPengawasan.id}</div>
                                <div className="text-slate-800">{lingkupPengawasan.lingkupPengawasan} <span className="text-red-400">*</span></div>
                            </div>
                            <InputRadio
                                id="pengembanganUsaha"
                                isTrue={values.pengembanganUsaha}
                                onInputChange={handleInputChange}
                                label="Tertib"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                            <div className="space-y-2 text-xs">
                                <div>
                                    <div className="text-slate-800">Hasil Pengawasan <span className="text-red-400">*</span></div>
                                    <div className="font-light text-[11px] text-slate-500">Kesimpulan Verifikasi Pengawasan</div>
                                </div>
                                <InputRadio
                                    id="tertibPengawasan"
                                    isTrue={values.tertibPengawasan}
                                    onInputChange={handleInputChange}
                                    label="Tertib"
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
        </>
    );
}
