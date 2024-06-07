import React from "react";
import Card from "../Card";

export default ({ data, onChange }) => {
    const [values, setValues] = React.useState({
        nama: data.nama ? data.nama : '',
        nomorKontrak: data.nomorKontrak ? data.nomorKontrak : '',
        sumberDana: data.sumberDana ? data.sumberDana : 'APBD',
        umurKonstruksi: data.umurKonstruksi ? data.umurKonstruksi : '',
        tanggalMulaiBangun: data.tanggalMulaiBangun ? data.tanggalMulaiBangun : '',
        tanggalSelesaiBangun: data.tanggalSelesaiBangun ? data.tanggalSelesaiBangun : '',
        tanggalPemanfaatan: data.tanggalPemanfaatan ? data.tanggalPemanfaatan : '',
        lokasi: data.lokasi ? data.lokasi : '',
        desa: data.desa ? data.desa : '',
        kecamatan: data.kecamatan ? data.kecamatan : 'ANGKINANG',
    });

    function handleInputChange(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
        onChange({
            ...values,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <Card className="w-full">
            <Card.Body className="p-4">
                <form className="grid grid-cols-12 gap-5 mb-2">
                    <div className="col-span-6">
                        <label htmlFor="nama" className="block mb-2 text-xs font-medium text-slate-800">Nama Bangunan Konstruksi <span className="text-red-400">*</span></label>
                        <input
                            type="text" name="nama" id="nama" placeholder="cth. Gedung Kantor Bupati"
                            value={values.nama} onChange={e => handleInputChange(e)}
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>
                    <div className="col-span-6"></div>
                    <div className="col-span-4">
                        <label htmlFor="nomorKontrak" className="block mb-2 text-xs font-medium text-slate-800">Nomor Kontrak (Pembangunan) <span className="text-red-400">*</span></label>
                        <input
                            type="text" name="nomorKontrak" id="nomorKontrak" placeholder="cth. 800.1/XXX/I/2023"
                            value={values.nomorKontrak} onChange={e => handleInputChange(e)}
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>
                    <div className="col-span-4">
                        <label htmlFor="sumberDana" className="block mb-2 text-xs font-medium text-slate-800">Sumber Dana <span className="text-red-400">*</span></label>
                        <select
                            name="sumberDana" id="sumberDana" required
                            value={values.sumberDana} onChange={e => handleInputChange(e)}
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        >
                            <option value="APBD">APBD</option>
                            <option value="Masyarakat, swasta, atau badan usaha">Masyarakat, swasta, atau badan usaha</option>
                            {/* <option value="">APBD dan masyarakat, swasta, atau badan usaha</option> */}
                        </select>
                    </div>
                    <div className="col-span-3">
                        <label htmlFor="umurKonstruksi" className="block mb-2 text-xs font-medium text-slate-800">Umur Konstruksi <span className="text-red-400">*</span></label>
                        <input
                            type="text" name="umurKonstruksi" id="umurKonstruksi" placeholder="cth. 10 tahun"
                            value={values.umurKonstruksi} onChange={e => handleInputChange(e)}
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>
                    <div className="col-span-6 space-y-2.5">
                        <div className="space-y-0.5 text-xs">
                            <div className="font-medium text-slate-800">Tanggal dan Tahun Pembangunan <span className="text-red-400">*</span></div>
                            <div className="font-light text-[11px] text-slate-500">Isi dengan tanggal mulai dan selesai pembangunan</div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-full">
                                <input
                                    type="date" name="tanggalMulaiBangun" id="tanggalMulaiBangun"
                                    value={values.tanggalMulaiBangun} onChange={e => handleInputChange(e)}
                                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                            <div className="text-xs text-slate-800 font-light">s.d.</div>
                            <div className="w-full">
                                <input
                                    type="date" name="tanggalSelesaiBangun" id="tanggalSelesaiBangun"
                                    value={values.tanggalSelesaiBangun} onChange={e => handleInputChange(e)}
                                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 space-y-2.5">
                        <div className="space-y-0.5 text-xs">
                            <div className="font-medium text-slate-800">Tanggal dan Tahun Pemanfaatan <span className="text-red-400">*</span></div>
                            <div className="font-light text-[11px] text-slate-500">Isi dengan tanggal mulai</div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-full">
                                <input
                                    type="date" name="tanggalPemanfaatan" id="tanggalPemanfaatan" required
                                    value={values.tanggalPemanfaatan} onChange={e => handleInputChange(e)}
                                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <label htmlFor="lokasi" className="block mb-2 text-xs font-medium text-slate-800">Lokasi Bangunan <span className="text-red-400">*</span></label>
                        <textarea
                            name="lokasi" id="lokasi" rows="2" placeholder="cth. Jalan Aluh Idut No 66 A Kandangan"
                            value={values.lokasi} onChange={e => handleInputChange(e)}
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>

                    <div className="col-span-3">
                        <label htmlFor="desa" className="block mb-2 text-xs font-medium text-slate-800">Desa/Kelurahan</label>
                        <input
                            type="text" name="desa" id="desa" placeholder="cth. KANDANGAN KOTA"
                            value={values.desa} onChange={e => handleInputChange(e)}
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>
                    <div className="col-span-3">
                        <label htmlFor="kecamatan" className="block mb-2 text-xs font-medium text-slate-800">Kecamatan <span className="text-red-400">*</span></label>
                        <select
                            name="kecamatan" id="kecamatan" required
                            value={values.kecamatan} onChange={e => handleInputChange(e)}
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        >
                            <option value="ANGKINANG">ANGKINANG</option>
                            <option value="DAHA BARAT">DAHA BARAT</option>
                            <option value="DAHA SELATAN">DAHA SELATAN</option>
                            <option value="DAHA UTARA">DAHA UTARA</option>
                            <option value="KALUMPANG">KALUMPANG</option>
                            <option value="KANDANGAN">KANDANGAN</option>
                            <option value="LOKSADO">LOKSADO</option>
                            <option value="PADANG BATUNG">PADANG BATUNG</option>
                            <option value="SIMPUR">SIMPUR</option>
                            <option value="SUNGAI RAYA">SUNGAI RAYA</option>
                            <option value="TELAGA LANGSAT">TELAGA LANGSAT</option>
                        </select>
                    </div>
                    {/* <div className="col-span-12 flex justify-end items-center gap-x-2.5">
                        <button
                            className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2.5 px-4"
                        >
                            Kembali
                        </button>
                        <button
                            className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2.5 px-4"
                        >
                            Simpan
                        </button>
                    </div> */}
                </form>
            </Card.Body>
        </Card>
    )
}
