import React from "react";

import Card from "../../Card";
import ModalKonfirmasiPemeriksaanLingkup5 from "./ModalKonfirmasiPemeriksaanLingkup5";

export default ({ pengawasanId, pemeriksaan }) => {
    const [hasilPemeriksaan, setHasilPemeriksaan] = React.useState({
        hasil: '',
        catatan: '',
    });

    function handleInputChange(e) {
        setHasilPemeriksaan({
            ...hasilPemeriksaan,
            [e.target.name.split('-')[0]]: e.target.value,
        });
    }

    const [isModalKonfirmasiOpen, setIsModalKonfirmasiOpen] = React.useState(false);
    const [konfirmasiPemeriksaan, setKonfirmasiPemeriksaan] = React.useState({
        id: pemeriksaan.id,
        namaPemeriksaan: pemeriksaan.namaPemeriksaan,
        indikator: pemeriksaan.indikator,
        subindikator: pemeriksaan.subindikator,
        hasilPemeriksaan: pemeriksaan.hasilPemeriksaan ? pemeriksaan.hasilPemeriksaan : {},
    });

    function handleSimpanButtonClick(e) {
        e.preventDefault();
        setKonfirmasiPemeriksaan({
            ...konfirmasiPemeriksaan,
            hasilPemeriksaan: hasilPemeriksaan,
        });
        setIsModalKonfirmasiOpen(true);
    }

    return (
        <>
            <div className="grid grid-cols-3 gap-5 my-4">
                <div className="font-medium text-slate-800 mt-1 space-y-2">
                    <div>
                        <h5 className="text-xs">Indikator</h5>
                        <p className="font-light text-xs text-slate-500 text-justify">
                            {pemeriksaan.id[1] && `${pemeriksaan.id[1]}.`} {pemeriksaan.indikator}
                        </p>
                    </div>
                    {
                        pemeriksaan.subindikator && (
                            <div>
                                <h5 className="text-xs">Sub Indikator</h5>
                                <p className="font-light text-xs text-slate-500 text-justify">
                                    {pemeriksaan.subindikator}
                                </p>
                            </div>
                        )
                    }
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
                                    <div className="space-y-2 text-xs">
                                        <div>
                                            <div className="font-medium text-slate-800">Hasil Pemeriksaan</div>
                                        </div>
                                        {
                                            pemeriksaan.id !== '4a' ?
                                            <div className="space-y-2.5">
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        type="radio" id={`sudah-${pemeriksaan.id}`} name={`hasil-${pemeriksaan.id}`} value="Sudah"
                                                        onChange={handleInputChange} checked={hasilPemeriksaan.hasil === "Sudah"}
                                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <label htmlFor={`sudah-${pemeriksaan.id}`} className="text-slate-700">Sudah</label>
                                                </div>
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        type="radio" id={`belum-${pemeriksaan.id}`} name={`hasil-${pemeriksaan.id}`} value="Belum"
                                                        onChange={handleInputChange} checked={hasilPemeriksaan.hasil === "Belum"}
                                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <label htmlFor={`belum-${pemeriksaan.id}`} className="text-slate-700">Belum</label>
                                                </div>
                                            </div> :
                                            <div className="space-y-2.5">
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        type="radio" id={`meningkat-${pemeriksaan.id}`} name={`hasil-${pemeriksaan.id}`} value="Meningkat"
                                                        onChange={handleInputChange} checked={hasilPemeriksaan.hasil === "Meningkat"}
                                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <label htmlFor={`meningkat-${pemeriksaan.id}`} className="text-slate-700">Meningkat</label>
                                                </div>
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        type="radio" id={`tetap-${pemeriksaan.id}`} name={`hasil-${pemeriksaan.id}`} value="Tetap"
                                                        onChange={handleInputChange} checked={hasilPemeriksaan.hasil === "Tetap"}
                                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <label htmlFor={`tetap-${pemeriksaan.id}`} className="text-slate-700">Tetap</label>
                                                </div>
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        type="radio" id={`menurun-${pemeriksaan.id}`} name={`hasil-${pemeriksaan.id}`} value="Menurun"
                                                        onChange={handleInputChange} checked={hasilPemeriksaan.hasil === "Menurun"}
                                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <label htmlFor={`menurun-${pemeriksaan.id}`} className="text-slate-700">Menurun</label>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div>
                                        <label htmlFor={`catatan-${pemeriksaan.id}`} className="block mb-2 text-xs font-medium text-slate-800">Catatan Pemeriksaan</label>
                                        <textarea
                                            name={`catatan-${pemeriksaan.id}`} id={`catatan-${pemeriksaan.id}`} rows="2"
                                            value={hasilPemeriksaan.catatan} onChange={handleInputChange}
                                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-2 flex justify-end items-center gap-x-2">
                                    <button
                                        type="button"
                                        className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-3"
                                        onClick={(e) => handleSimpanButtonClick(e)}
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <ModalKonfirmasiPemeriksaanLingkup5
                isVisible={isModalKonfirmasiOpen}
                onClose={() => setIsModalKonfirmasiOpen(false)}
                pengawasanId={pengawasanId}
                pemeriksaan={konfirmasiPemeriksaan}
            />
        </>
    )
}
