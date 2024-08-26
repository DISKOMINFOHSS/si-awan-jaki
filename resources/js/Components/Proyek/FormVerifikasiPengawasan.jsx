import React from "react";
import Modal from "../Modal";
import InputRadio from "../InputRadio";

import { LiaSpinnerSolid } from "react-icons/lia";
import { router } from "@inertiajs/react";
import ModalError from "../ModalError";

export default ({
    isVisible,
    onClose,
    pengawasan,
}) => {
    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);
    const [ processing, setProcessing ] = React.useState(false);

    const [ values, setValues ] = React.useState({
        prosesPemilihanPenyediaJasa: '',
        penerapanStandarKontrak: '',
        penggunaanTKKBersertifikat: '',
        pemberianPekerjaan: '',
        ketersediaanDokumenStandarK4: '',
        penerapanSMKK: '',
        antisipasiKecelakaan: '',
        penerapanManajemenMutu: '',
        pemenuhanPenyediaanMPK: '',
        penggunaanMPTK: '',
        penggunaanPDN: '',
        pemenuhanStandarLingkungan: '',
        tertibPengawasan: '',
        catatan: '',
    });
    const handleInputChange = (value) => setValues({ ...values, ...value });

    function handleSubmit(e) {
        e.preventDefault();
        setProcessing(true);

        router.post(
            `/admin/pengawasan/penyelenggaraan/APBD/${pengawasan.id}/verification`,
            values,
            {
                onSuccess: () => {
                    onClose();
                    setProcessing(false);
                },
                onError: (errors) => {
                    console.log(errors);
                    onClose();
                    setProcessing(false);
                    setIsModalErrorOpen(true);
                }
            }
        );

    }

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-5xl h-fit mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="mb-4">
                        <h1 className="font-medium text-slate-800">Verifikasi Pengawasan</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pengawasan Tertib Penyelenggaran Jasa Konstruksi</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-xs">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-b border-slate-100 pb-4">
                                <div className="col-span-2">
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 1</div>
                                    <div className="text-slate-800">Pengawasan terhadap proses pemilihan Penyedia Jasa <span className="text-red-400">*</span></div>
                                </div>
                                <div className="col-span-1">
                                    <InputRadio
                                        id="prosesPemilihanPenyediaJasa"
                                        isTrue={values.prosesPemilihanPenyediaJasa}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-b border-slate-100 pb-4">
                                <div className="col-span-2">
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 2</div>
                                    <div className="text-slate-800">Pengawasan terhadap penyusunan dan pelaksanaan Kontrak Kerja Konstruksi</div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-slate-800">Penerapan Standar Kontrak <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="penerapanStandarKontrak"
                                        isTrue={values.penerapanStandarKontrak}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-slate-800">Penggunaan TKK Bersertifikat <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="penggunaanTKKBersertifikat"
                                        isTrue={values.penggunaanTKKBersertifikat}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="col-span-2 grid grid-cols-2 gap-x-4 space-y-2">
                                    <div className="col-span-2 mt-1">
                                        <div className="text-slate-800">Pemberian Pekerjaan Utama dan/atau Penunjang kepada Subpenyedia Jasa <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="pemberianPekerjaan"
                                        isTrue={values.pemberianPekerjaan}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-b border-slate-100 pb-4">
                                <div className="col-span-2">
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 3</div>
                                    <div className="text-slate-800">Pengawasan terhadap penerapan Standar Keamanan, Keselamatan, Kesehatan, dan Keberlanjutan Konstruksi</div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-slate-800">Ketersediaan Dokumen Standar K4 <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="ketersediaanDokumenStandarK4"
                                        isTrue={values.ketersediaanDokumenStandarK4}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-slate-800">Penerapan SMKK <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="penerapanSMKK"
                                        isTrue={values.penerapanSMKK}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="col-span-2 grid grid-cols-2 gap-x-4 space-y-2">
                                    <div className="col-span-2 mt-1">
                                        <div className="text-slate-800">Antisipasi Kecelakaan Kerja <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="antisipasiKecelakaan"
                                        isTrue={values.antisipasiKecelakaan}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-b border-slate-100 pb-4">
                                <div className="col-span-2">
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 4</div>
                                    <div className="text-slate-800">Pengawasan terhadap penerapan manajemen mutu Konstruksi <span className="text-red-400">*</span></div>
                                </div>
                                <div className="col-span-1">
                                    <InputRadio
                                        id="penerapanManajemenMutu"
                                        isTrue={values.penerapanManajemenMutu}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-b border-slate-100 pb-4">
                                <div className="col-span-2">
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 5</div>
                                    <div className="text-slate-800">Pengawasan terhadap penggunaan material, peralatan dan teknologi konstruksi</div>
                                </div>
                                <div className="col-span-2 grid grid-cols-2 gap-x-4 space-y-2">
                                    <div className="col-span-2">
                                        <div className="text-slate-800 text-justify">Pemenuhan penyediaan material, peralatan, dan teknologi konstruksi dalam pelaksanaan proyek konstruksi <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="pemenuhanPenyediaanMPK"
                                        isTrue={values.pemenuhanPenyediaanMPK}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-slate-800">Penerapan Material Standar (SNI dan Standar Lain) <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="penggunaanMPTK"
                                        isTrue={values.penggunaanMPTK}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-slate-800">Penggunaan PDN untuk Teknologi dan MPK <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="penggunaanPDN"
                                        isTrue={values.penggunaanPDN}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-b border-slate-100 pb-4">
                                <div className="col-span-2">
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 6</div>
                                    <div className="text-slate-800">Pengawasan terhadap pengelolaan dan pemanfaatan sumber material Konstruksi</div>
                                </div>
                                <div className="col-span-2 grid grid-cols-2 gap-x-4 space-y-2">
                                    <div className="col-span-2 mt-1">
                                        <div className="text-slate-800">Pemenuhan terhadap standar teknis lingkungan <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="pemenuhanStandarLingkungan"
                                        isTrue={values.pemenuhanStandarLingkungan}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
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
                        </div>
                        <div className="col-span-2 flex justify-end items-center gap-x-2">
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
                isVisible={isModalErrorOpen}
                onClose={() => setIsModalErrorOpen(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal melakukan verifikasi pengawasan. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
