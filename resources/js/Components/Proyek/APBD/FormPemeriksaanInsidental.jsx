import React from "react";
import { useForm } from "@inertiajs/react";

import Card from "../../Card";

import {
    LiaSpinnerSolid
} from "react-icons/lia";
import ModalError from "../../ModalError";
import ModalSuccess from "../../ModalSuccess";

const KesimpulanPemeriksaan = ({
    indikatorId,
    pemeriksaanId,
    id,
    kesimpulan,
    hasil,
    onHasilChange
}) => {
    const [ hasilPemeriksaan, setHasilPemeriksaan ] = React.useState(hasil ? hasil : '');

    function handleInputChange(e) {
        setHasilPemeriksaan(e.target.value);
        onHasilChange({ id: id, hasil: e.target.value });
    }

    return kesimpulan.split(' / ').length !== 1 ? (
        <>
            <div className="flex items-start gap-x-2">
                <input
                    type="radio" id={`true-${indikatorId}-${pemeriksaanId}-${id}`} name={`kesimpulan-${indikatorId}-${pemeriksaanId}-${id}`}
                    // value={true} onChange={handleInputChange} checked={hasilPemeriksaan === true}
                    value={kesimpulan.split(' / ')[0]} onChange={handleInputChange} checked={hasilPemeriksaan === kesimpulan.split(' / ')[0]}
                    className="w-3.5 h-3.5 mt-0.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={`true-${indikatorId}-${pemeriksaanId}-${id}`} className="text-slate-700">{kesimpulan.split(' / ')[0]}</label>
            </div>
            <div className="flex items-start gap-x-2">
                <input
                    type="radio" id={`false-${indikatorId}-${pemeriksaanId}-${id}`} name={`kesimpulan-${indikatorId}-${pemeriksaanId}-${id}`}
                    // value={false} onChange={handleInputChange} checked={hasilPemeriksaan === false}
                    value={kesimpulan.split(' / ')[1]} onChange={handleInputChange} checked={hasilPemeriksaan === kesimpulan.split(' / ')[1]}
                    className="w-3.5 h-3.5 mt-0.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={`false-${indikatorId}-${pemeriksaanId}-${id}`} className="text-slate-700">{kesimpulan.split(' / ')[1]} {kesimpulan.split(' / ')[0]}</label>
            </div>
        </>
    ) : (
        <>
            <div>{kesimpulan.split(/[()]/)[0]}</div>
            <div className="flex items-center gap-x-2 mt-1">
                <input
                    type="text" name={`kesimpulan-${indikatorId}-${pemeriksaanId}-${id}`}
                    value={hasilPemeriksaan} onChange={handleInputChange}
                    className="px-2 py-1 block w-10 rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                />
                <span>{kesimpulan.split(/[()]/)[1]}</span>
            </div>
        </>
    );
}

const FormPemeriksaan = ({
    indikatorId,
    id,
    pemeriksaan,
    kesimpulan,
    hasil,
    onHasilChange,
    catatan,
    onCatatanChange,
}) => {
    const [ values, setValues ] = React.useState({
        hasil: hasil ? hasil : Array(kesimpulan.length).fill(undefined),
        catatan: catatan ? catatan : '',
    });

    function handleHasilChange(hasilPemeriksaan) {
        const updatedHasil = values.hasil.map((h, i) => hasilPemeriksaan.id === i ? hasilPemeriksaan.hasil : h);
        setValues({ ...values, hasil: updatedHasil});
        onHasilChange({
            id: id,
            hasil: updatedHasil,
        });
    }

    function handleCatatanChange(e) {
        setValues({ ...values, catatan: e.target.value});
        onCatatanChange({
            id: id,
            catatan: e.target.value,
        });
    }

    return (
        <div className="space-y-4 text-slate-800 mb-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="text-xs">
                    <div className="font-medium text-xs mb-1">Cara Pemeriksaan</div>
                    <p className="font-light text-justify text-slate-500">
                        {pemeriksaan}
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2 text-xs">
                        <div>
                            <div className="font-medium text-slate-800">Kesimpulan Pemeriksaan</div>
                        </div>
                        {
                            kesimpulan.map((k, i) => (
                                <div key={i} className="grid grid-cols-2 gap-2.5 items-start">
                                    <KesimpulanPemeriksaan
                                        indikatorId={indikatorId}
                                        pemeriksaanId={id}
                                        id={i}
                                        kesimpulan={k}
                                        hasil={values.hasil[i]}
                                        onHasilChange={handleHasilChange}
                                    />
                                    { i+1 !== kesimpulan.length && <div className="col-span-2 border-b border-slate-100"></div> }
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <label htmlFor={`catatan-${indikatorId}-${id}`} className="block mb-2 text-xs font-medium text-slate-800">Catatan Pemeriksaan</label>
                        <textarea
                            name={`catatan-${indikatorId}-${id}`} id={`catatan-${indikatorId}-${id}`} rows="2"
                            value={values.catatan} onChange={handleCatatanChange}
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ({
    pengawasanId,
    indikator,
    lingkupPengawasan,
}) => {
    const { id, indikator: namaIndikator, caraPemeriksaan, kesimpulan, hasilPemeriksaan } = indikator;

    const { data, setData, processing, post } = useForm({
        indikatorId: id,
        hasil: hasilPemeriksaan.hasil ? hasilPemeriksaan.hasil : Array(caraPemeriksaan.length).fill(undefined),
        catatan: hasilPemeriksaan.catatan ? hasilPemeriksaan.catatan : Array(caraPemeriksaan.length).fill(undefined),
    });

    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);
    const [ isModalSuccessOpen, setIsModalSuccessOpen ] = React.useState(false);

    function handleHasilChange(hasil) {
        setData('hasil', data.hasil.map((h, i) => hasil.id === i ? hasil.hasil : h));
    }

    function handleCatatanChange(catatan) {
        setData('catatan', data.catatan.map((c, i) => catatan.id === i ? catatan.catatan : c ));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);

        post(`/admin/pengawasan/penyelenggaraan/APBD/insidental/${pengawasanId}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsModalSuccessOpen(true);
            },
            onError: (errors) => {
                console.log(errors);
                setIsModalErrorOpen(true);
            }
        });
    }

    return (
        <>
            <div className="grid grid-cols-4 gap-5 my-4">
                <div className="text-xs space-y-2">
                    <div>
                        <h4 className="font-medium text-slate-800">Indikator</h4>
                        <div className="flex gap-x-1 font-light text-xs text-slate-500">
                            { id[1] && <span className="flex-none w-5">{`${id[1]}.`}</span> }
                            <span className="text-justify">{namaIndikator}</span>
                        </div>
                    </div>
                    {/* <div>
                        <h4 className="font-medium text-slate-800">Dokumen yang diperiksa</h4>
                        <p className="font-light text-slate-500 text-justify">
                        </p>
                    </div> */}
                </div>
                <div className="col-span-3">
                    <Card>
                        <Card.Body className="p-4">
                            {
                                caraPemeriksaan.map((pemeriksaan, i) => (
                                    <React.Fragment key={i}>
                                        <FormPemeriksaan
                                            indikatorId={id}
                                            id={i}
                                            pemeriksaan={pemeriksaan}
                                            kesimpulan={kesimpulan[i]}
                                            catatan={data.catatan[i]}
                                            onCatatanChange={handleCatatanChange}
                                            hasil={data.hasil[i]}
                                            onHasilChange={handleHasilChange}
                                        />
                                        { i+1 !== caraPemeriksaan.length && <div className="my-4 border-b border-slate-200"></div> }
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
                </div>
            </div>
            <ModalError
                isVisible={isModalErrorOpen}
                onClose={() => setIsModalErrorOpen(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal menambahkan pemeriksaan {lingkupPengawasan} pada indikator {namaIndikator}. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
            <ModalSuccess
                isVisible={isModalSuccessOpen}
                onClose={() => setIsModalSuccessOpen(false)}
            >
                <div className="my-2.5">
                    <div className="font-medium text-center text-slate-700">Berhasil!</div>
                    <div className="font-light text-justify text-xs text-slate-500 mb-4">
                        Pemeriksaan {lingkupPengawasan} pada indikator {namaIndikator} berhasil ditambahkan.
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
