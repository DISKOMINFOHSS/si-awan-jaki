import React from "react";
import { useForm } from "@inertiajs/react";

import Card from "../../Card";
import InputPemeriksaan from "../../InputPemeriksaan";
import ModalError from "../../ModalError";
import ModalSuccess from "../../ModalSuccess";

import { LiaSpinnerSolid } from "react-icons/lia";

export default ({
    pengawasanId,
    daftarPemeriksaan,
    lingkupPengawasan,
}) => {
    const { data, setData, post, processing, transform } = useForm({
        lingkupId: lingkupPengawasan.id,
        daftarPemeriksaan: daftarPemeriksaan,
    });

    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);
    const [ isModalSuccessOpen, setIsModalSuccessOpen ] = React.useState(false);

    function handleHasilPemeriksaanChange(hasilPemeriksaan) {
        setData('daftarPemeriksaan',
            data.daftarPemeriksaan.map(pemeriksaan => {
                return hasilPemeriksaan.label === pemeriksaan.label ? { ...pemeriksaan, ...hasilPemeriksaan } : pemeriksaan
            })
        );
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);

        transform((data) => {
            const kesimpulanPemeriksaan = {};
            const catatanPemeriksaan = {};

            data.daftarPemeriksaan.map(({ label, kesimpulan, catatan }) => {
                kesimpulanPemeriksaan[label] = kesimpulan;
                catatanPemeriksaan[label] = catatan;
            })

            return {
                lingkupId: data.lingkupId,
                kesimpulan: kesimpulanPemeriksaan,
                catatan: catatanPemeriksaan,
            }
        });

        post(`/admin/pengawasan/penyelenggaraan/APBD/rutin/${pengawasanId}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsModalSuccessOpen(true);
            },
            onError: (errors) => {
                console.log(errors);
                setIsModalErrorOpen(true);
            }
        })

    }

    return (
        <>
            <Card>
                <Card.Body className="p-4">
                    {
                        data.daftarPemeriksaan.map((pemeriksaan, i) => (
                            <React.Fragment key={`${lingkupPengawasan.id}-${i}`}>
                                <div className="space-y-4 text-slate-800 mb-4">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-xs">
                                            <div className="font-medium text-xs mb-1">Cara Pemeriksaan</div>
                                            <p className="font-light text-slate-500">
                                                {pemeriksaan.caraPemeriksaan}
                                            </p>
                                        </div>
                                        <InputPemeriksaan
                                            id={`${lingkupPengawasan.id}-${i}`}
                                            label={pemeriksaan.label}
                                            kesimpulan={pemeriksaan.kesimpulan}
                                            catatan={pemeriksaan.catatan}
                                            onInputChange={handleHasilPemeriksaanChange}
                                        />
                                    </div>
                                </div>
                                { i % 2 == 0 && <div className="my-4 border-b border-slate-200"></div>}
                            </React.Fragment>
                        ))
                    }
                    <div className="w-full flex justify-end items-center gap-x-2">
                        <button
                            type="button"
                            disabled={processing}
                            className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2.5 px-3"
                            onClick={handleSubmit}
                        >
                            { processing && <LiaSpinnerSolid className="animate-spin" /> }
                            Simpan
                        </button>
                    </div>
                </Card.Body>
            </Card>
            <ModalError
                isVisible={isModalErrorOpen}
                onClose={() => setIsModalErrorOpen(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal menambahkan pemeriksaan {lingkupPengawasan.lingkupPengawasan}. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
            <ModalSuccess
                isVisible={isModalSuccessOpen}
                onClose={() => setIsModalSuccessOpen(false)}
            >
                <div className="text-center my-2.5">
                    <div className="font-medium text-slate-700">Berhasil!</div>
                    <div className="font-light text-xs text-slate-500 mb-4">
                        Pemeriksaan {lingkupPengawasan.lingkupPengawasan} berhasil ditambahkan.
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
    )
}
