import React from "react";
import { Link, useForm, usePage } from "@inertiajs/react";

import Modal from "../Modal";
import InputRadio from "../InputRadio";
import ModalError from "../ModalError";

import { getTertibStatusBadge } from "../../Utils/getStatusBadge";
import { formatDateWithWeekdayToIndonesia } from "../../Utils/formatDate";

import { LiaCitySolid, LiaMapMarkerAltSolid, LiaSpinnerSolid } from "react-icons/lia";
import getFormData from "../../Utils/getFormData";

const DaftarPengawasan = ({ daftarPengawasan }) => {
    return (
        <>
            {
                daftarPengawasan.map((pengawasan, i) => (
                    <tr key={pengawasan.id} className="border-b border-slate-100 hover:bg-slate-100">
                        <td className="px-4 py-5 text-center">{i + 1}</td>
                        <td className="px-4 py-5">
                            <a target="_blank" href={`/admin/pengawasan/pemanfaatan-produk/${pengawasan.id}`} className="hover:text-blue-600 hover:underline">
                                {formatDateWithWeekdayToIndonesia(pengawasan.tanggalPengawasan)}
                            </a>
                        </td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibKesesuaianFungsi)}</td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibKesesuaianLokasi)}</td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibRencanaUmurKonstruksi)}</td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibKapasitasBeban)}</td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPemeliharaanBangunan)}</td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibProgramPemeliharaan)}</td>
                    </tr>
                ))
            }
        </>
    );
}

export default ({ isVisible, onClose, bangunan }) => {
    const { url } = usePage();
    const { daftarPengawasan } = bangunan;
    const {
        tertibKesesuaianFungsi,
        tertibKesesuaianLokasi,
        tertibRencanaUmurKonstruksi,
        tertibKapasitasBeban,
        tertibPemeliharaanBangunan,
        tertibProgramPemeliharaan,
        tertibPengawasan,
        catatan
    }  = bangunan;

    const { data: values, setData: setValues, processing, post, reset } = useForm({
        kesesuaianFungsi: '',
        kesesuaianLokasi: '',
        rencanaUmurKonstruksi: '',
        kapasitasBeban: '',
        pemeliharaanBangunan: '',
        programPemeliharaan: '',
        tertibPengawasan: '',
        catatan: '',
    })
    const handleInputChange = (value) => setValues({ ...values, ...value });

    React.useEffect(() => {
        setValues({
            ...values,
            bangunanId: bangunan.id,
            kesesuaianFungsi: typeof(tertibKesesuaianFungsi) === 'boolean' ? tertibKesesuaianFungsi : '',
            kesesuaianLokasi: typeof(tertibKesesuaianLokasi) === 'boolean' ? tertibKesesuaianFungsi : '',
            rencanaUmurKonstruksi: typeof(tertibRencanaUmurKonstruksi) === 'boolean' ? tertibKesesuaianFungsi : '',
            kapasitasBeban: typeof(tertibKapasitasBeban) === 'boolean' ? tertibKesesuaianFungsi : '',
            pemeliharaanBangunan: typeof(tertibPemeliharaanBangunan) === 'boolean' ? tertibKesesuaianFungsi : '',
            programPemeliharaan: typeof(tertibProgramPemeliharaan) === 'boolean' ? tertibKesesuaianFungsi : '',
            tertibPengawasan: typeof(tertibPengawasan) === 'boolean' ? tertibKesesuaianFungsi : '',
            catatan: catatan ? catatan : '',
        });
    }, [bangunan]);

    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        // console.log(url, values, bangunan.id);

        post(`${url}`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: (errors) => {
                console.log(errors);
                onClose();
                setIsModalErrorOpen(true);
            },
        });
    }

    if (!Object.keys(bangunan).length) return null;

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-5xl h-fit mt-10">
                <Modal.Header onClose={onClose}>
                    <div className="mb-5">
                        <h3 className="font-light text-xs text-slate-500">Rekapitulasi Pengawasan Tertib Pemanfaatan Jasa Konstruksi Tahunan</h3>
                        <h1 className="font-medium text-slate-800">Verifikasi Pengawasan Tahunan</h1>
                        <span className="flex gap-x-3 items-center text-xs">
                            <div className="flex items-center gap-x-1 text-slate-800">
                                <LiaCitySolid size={16} />
                                <span>{bangunan.nama}</span>
                            </div>
                            <div className="flex items-center gap-x-0.5 text-slate-700">
                                <LiaMapMarkerAltSolid size={16} />
                                <span className="capitalize">{`${bangunan.desaKelurahan.toLowerCase()}, ${bangunan.kecamatan.toLowerCase()}`}</span>
                            </div>
                        </span>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4 text-xs">
                            <div className="col-span-2 space-y-1.5 pb-4 border-b border-slate-100">
                                <div>
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 1</div>
                                    <div className="text-slate-800">Pengawasan Fungsi Peruntukan terhadap Tertib Pemanfaatan Jasa Konstruksi</div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4">
                                    <div className="space-y-2 text-xs">
                                        <div>
                                            <div className="text-slate-800">Kesesuaian Fungsi <span className="text-red-400">*</span></div>
                                            <div className="font-light text-[11px] text-slate-500">Pengawasan Fungsi Peruntukan</div>
                                        </div>
                                        <InputRadio
                                            id="kesesuaianFungsi"
                                            isTrue={values.kesesuaianFungsi}
                                            onInputChange={handleInputChange}
                                            label="Tertib"
                                        />
                                    </div>
                                    <div className="space-y-2 text-xs">
                                        <div>
                                            <div className="text-slate-800">Kesesuaian Lokasi <span className="text-red-400">*</span></div>
                                            <div className="font-light text-[11px] text-slate-500">Pengawasan Fungsi Peruntukan</div>
                                        </div>
                                        <InputRadio
                                            id="kesesuaianLokasi"
                                            isTrue={values.kesesuaianLokasi}
                                            onInputChange={handleInputChange}
                                            label="Tertib"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 space-y-1.5 pb-4 border-b border-slate-100">
                                <div>
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 4</div>
                                    <div className="text-slate-800">Pengawasan terhadap Pemeliharaan Produk Jasa Konstruksi</div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4">
                                    <div className="space-y-2 text-xs">
                                        <div>
                                            <div className="text-slate-800">Pemeliharaan Bangunan <span className="text-red-400">*</span></div>
                                            <div className="font-light text-[11px] text-slate-500">Pemeliharaan Produk Konstruksi</div>
                                        </div>
                                        <InputRadio
                                            id="pemeliharaanBangunan"
                                            isTrue={values.pemeliharaanBangunan}
                                            onInputChange={handleInputChange}
                                            label="Tertib"
                                        />
                                    </div>
                                    <div className="space-y-2 text-xs">
                                        <div>
                                            <div className="text-slate-800">Program Pemeliharaan <span className="text-red-400">*</span></div>
                                            <div className="font-light text-[11px] text-slate-500">Pemeliharaan Produk Konstruksi</div>
                                        </div>
                                        <InputRadio
                                            id="programPemeliharaan"
                                            isTrue={values.programPemeliharaan}
                                            onInputChange={handleInputChange}
                                            label="Tertib"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <div>
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 2</div>
                                    <div className="text-slate-800">Pengawasan terhadap Rencana Umur Konstruksi <span className="text-red-400">*</span></div>
                                </div>
                                <InputRadio
                                    id="rencanaUmurKonstruksi"
                                    isTrue={values.rencanaUmurKonstruksi}
                                    onInputChange={handleInputChange}
                                    label="Tertib"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <div>
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 3</div>
                                    <div className="text-slate-800">Pengawasan terhadap Kapasitas dan Beban <span className="text-red-400">*</span></div>
                                </div>
                                <InputRadio
                                    id="kapasitasBeban"
                                    isTrue={values.kapasitasBeban}
                                    onInputChange={handleInputChange}
                                    label="Tertib"
                                />
                            </div>
                            <div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
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
                            <div className="col-span-4 flex justify-end items-center gap-x-2">
                                <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-3" onClick={onClose}>Batal</button>
                                <button type="submit" disabled={processing} className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-3">
                                    { processing && <LiaSpinnerSolid className="animate-spin" />}
                                    Verifikasi
                                </button>
                            </div>
                        </form>
                        <div className="relative max-h-80 overflow-auto">
                            <table className="w-full text-xs rounded border border-slate-200">
                                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
                                    <tr className="border-b border-slate-200">
                                        <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">#</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium min-w-48 border-r border-slate-200">Tanggal<br />Pengawasan</th>
                                        <th scope="col" colSpan="2" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Fungsi Peruntukannya</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">Rencana Umur Konstruksi</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">Kapasitas dan Beban</th>
                                        <th scope="col" colSpan="2" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Pemeliharaan Produk Konstruksi</th>
                                    </tr>
                                    <tr className="border-b border-slate-200">
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Kesesuaian Fungsi</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Kesesuaian Lokasi</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Pemeliharaan Bangunan</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Program Pemeliharaan</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700">
                                    <tr className="bg-slate-200">
                                        <td colSpan="8" className="px-4 py-2">Pengawasan Rutin</td>
                                    </tr>
                                    <DaftarPengawasan
                                        daftarPengawasan={daftarPengawasan.filter(({jenisPengawasan}) => jenisPengawasan === 'Rutin')}
                                    />
                                    <tr className="bg-slate-200">
                                        <td colSpan="8" className="px-4 py-2">Pengawasan Insidental</td>
                                    </tr>
                                    <DaftarPengawasan
                                        daftarPengawasan={daftarPengawasan.filter(({jenisPengawasan}) => jenisPengawasan === 'Insidental')}
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <ModalError
                isVisible={isModalErrorOpen}
                onClose={() => setIsModalErrorOpen(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal melakukan verifikasi pengawasan tahunan. Silakan periksa kembali.
                </div>
            </ModalError>
        </>
    );
}
