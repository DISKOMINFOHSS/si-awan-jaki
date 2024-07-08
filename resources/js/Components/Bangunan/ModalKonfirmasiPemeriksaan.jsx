import React from "react";
import { router } from "@inertiajs/react";

import Modal from "../Modal";
import ModalError from "../ModalError";

import { LiaExclamationCircleSolid, LiaSpinnerSolid } from "react-icons/lia";

export default ({ isVisible, onClose, pengawasanId, pemeriksaan }) => {
    const [isModalErrorOpened, setIsModalErrorOpened] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setProcessing(true);

        const kesimpulanPemeriksaan = {};
        const catatanPemeriksaan = {};

        pemeriksaan.hasilPemeriksaan.map(({ label, kesimpulan, catatan }) => {
            kesimpulanPemeriksaan[label] = kesimpulan;
            catatanPemeriksaan[label] = catatan;
        });

        router.post(
            `/admin/pengawasan/pemanfaatan-produk/${pengawasanId}/${pemeriksaan.id}`,
            {
                kesimpulan: kesimpulanPemeriksaan,
                catatan: catatanPemeriksaan,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                    setProcessing(false);
                },
                onError: () => {
                    onClose();
                    setProcessing(false);
                    setIsModalErrorOpened(true);
                },
            }
        )
    }

    return (
        <>
            <Modal isVisible={isVisible} className="w-full h-fit mt-10 max-w-md">
                <Modal.Header onClose={onClose}>
                    <div className="rounded bg-blue-100 text-blue-500 w-fit mx-auto p-2">
                        <LiaExclamationCircleSolid size={24} />
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center mt-2.5 mb-5">
                        <div className="font-medium text-sm text-slate-700 mb-1">Apakah Anda yakin ingin menyimpan pemeriksaan ini?</div>
                        <div className="font-light text-xs text-slate-500 mb-2">
                            Pastikan semua informasi pemeriksaan <span className="font-semibold text-slate-700">{pemeriksaan.lingkupPengawasan}</span> telah diisi dengan benar sebelum melanjutkan.
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-xs text-left">
                            <div className="font-medium text-slate-700">Indikator</div>
                            <div className="col-span-3 font-light text-slate-500">
                                {pemeriksaan.indikator}
                            </div>
                            {
                                pemeriksaan.hasilPemeriksaan.map((p, i) => (
                                    <React.Fragment key={i}>
                                        <div className="font-medium text-slate-700">Kesimpulan</div>
                                        <div className="col-span-3 font-light text-slate-500">
                                            {p.kesimpulan === null ? 'null' : (p.kesimpulan ? p.label : `Tidak ${p.label}`)}
                                        </div>
                                        <div className="font-medium text-slate-700">Catatan</div>
                                        <div className="col-span-3 font-light text-slate-500">
                                            {p.catatan ? p.catatan : "-"}
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-2.5">
                        <button
                            type="button"
                            className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-2.5"
                            onClick={onClose}
                        >
                            Batal
                        </button>
                        <form method="post" onSubmit={handleSubmit}>
                            <button type="submit" disabled={processing} className="w-full flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-2.5">
                                { processing && <LiaSpinnerSolid className="animate-spin" />}
                                Simpan Pemeriksaan
                            </button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
            <ModalError
                isVisible={isModalErrorOpened}
                onClose={() => setIsModalErrorOpened(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal menambahkan hasil pemeriksaan. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
