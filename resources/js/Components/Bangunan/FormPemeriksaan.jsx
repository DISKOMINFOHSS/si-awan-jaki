import React from "react";

import Card from "../Card";
import ModalKonfirmasiPemeriksaan from "./ModalKonfirmasiPemeriksaan";

function InputPemeriksaan({ id, label, kesimpulan, catatan, onInputChange }) {
    const [value, setValue] = React.useState({
        label: label,
        kesimpulan: kesimpulan ? kesimpulan : '',
        catatan: catatan ? catatan : '',
    });

    function handleInputChange(e) {
        let val = e.target.value;

        if (val === "true" || val === "false") {
            val = val === "true";
        }

        setValue({
            ...value,
            [e.target.name.split('-')[0]]: val,
        });
        onInputChange({
            ...value,
            [e.target.name.split('-')[0]]: val,
        });
    }

    return (
        <>
            <div className="space-y-2 text-xs">
                <div>
                    <div className="font-medium text-slate-800">Kesimpulan Pemeriksaan</div>
                </div>
                <div className="space-y-2.5">
                    <div className="flex items-center gap-x-2">
                        <input
                            type="radio" id={`true-${id}`} name={`kesimpulan-${id}`} value={true}
                            onChange={handleInputChange} checked={value.kesimpulan === true}
                            className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor={`true-${id}`} className="text-slate-700">{label}</label>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <input
                            type="radio" id={`false-${id}`} name={`kesimpulan-${id}`} value={false}
                            onChange={handleInputChange} checked={value.kesimpulan === false}
                            className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor={`false-${id}`} className="text-slate-700">Tidak {label}</label>
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor={`catatan-${id}`} className="block mb-2 text-xs font-medium text-slate-800">Catatan Pemeriksaan</label>
                <textarea
                    name={`catatan-${id}`} id={`catatan-${id}`} rows="2"
                    value={value.catatan} onChange={handleInputChange}
                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                />
            </div>
        </>
    );
}

export default ({ pemeriksaan }) => {
    const [isModalKonfirmasiOpen, setIsModalKonfirmasiOpen] = React.useState(false);
    const [konfirmasiPemeriksaan, setKonfirmasiPemeriksaan] = React.useState({
        id: pemeriksaan.id,
        lingkupPengawasan: pemeriksaan.lingkupPengawasan,
        indikator: pemeriksaan.indikator,
        hasilPemeriksaan: pemeriksaan.hasilPemeriksaan,
    });

    const [hasilPemeriksaan, setHasilPemeriksaan] = React.useState(pemeriksaan.hasilPemeriksaan);

    function handleHasilPemeriksaanChange(p) {
        setHasilPemeriksaan(
            hasilPemeriksaan.map(hasil => {
                if (hasil.label === p.label) return { ...hasil, kesimpulan: p.kesimpulan, catatan: p.catatan };
                return hasil;
            })
        );
    }

    function handleClick() {
        setKonfirmasiPemeriksaan({ ...konfirmasiPemeriksaan, hasilPemeriksaan: hasilPemeriksaan });
        setIsModalKonfirmasiOpen(true);
    }

    return (
        <>
        <div className="grid grid-cols-3 gap-5 my-4">
            <div className="font-medium text-slate-800 space-y-2">
                {
                    pemeriksaan.detail && (
                        <div>
                            <h5 className="text-xs">Detail Lingkup Pengawasan</h5>
                            <p className="font-light text-xs text-slate-500 text-justify">
                                {pemeriksaan.detail}
                        </p>
                        </div>
                    )
                }
                <div>
                    <h5 className="text-xs">Indikator</h5>
                    <p className="font-light text-xs text-slate-500 text-justify">
                        {pemeriksaan.indikator}
                    </p>
                </div>
            </div>
            <div className="col-span-2">
                <Card>
                    <Card.Body className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div>
                                    <div className="font-medium text-xs text-slate-800 mb-1">Dokumen yang diperiksa</div>
                                    <p className="font-light text-xs text-slate-500 text-justify">
                                        {pemeriksaan.dokumen}
                                    </p>
                                </div>
                                <div>
                                    <div className="font-medium text-slate text-xs mb-1">Cara Pemeriksaan</div>
                                    <p className="font-light text-xs text-slate-500 text-justify">
                                        {pemeriksaan.caraPemeriksaan}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {
                                    pemeriksaan.hasilPemeriksaan.map(({ label, kesimpulan, catatan }, i) => (
                                        <InputPemeriksaan
                                            key={`${pemeriksaan.id}-${i}`}
                                            id={`${pemeriksaan.id}-${i}`}
                                            label={label}
                                            kesimpulan={kesimpulan}
                                            catatan={catatan}
                                            onInputChange={handleHasilPemeriksaanChange}
                                        />
                                    ))
                                }
                            </div>
                            <div className="col-span-2 flex justify-end items-center gap-x-2">
                                <button
                                    type="button"
                                    className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-3"
                                    onClick={() => handleClick()}
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
        <ModalKonfirmasiPemeriksaan
            isVisible={isModalKonfirmasiOpen}
            onClose={() => setIsModalKonfirmasiOpen(false)}
            pemeriksaan={konfirmasiPemeriksaan}
        />
        </>
    );
}
