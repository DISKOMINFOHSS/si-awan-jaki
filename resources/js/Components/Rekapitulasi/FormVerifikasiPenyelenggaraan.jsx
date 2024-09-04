import React from "react";
import { useForm, usePage } from "@inertiajs/react";

import Modal from "../Modal";
import InputRadio from "../InputRadio";

import { formatDateWithWeekdayToIndonesia } from "../../Utils/formatDate";
import { getTertibStatusBadge } from "../../Utils/getStatusBadge";

import { LiaSpinnerSolid } from "react-icons/lia";
import ModalError from "../ModalError";

const DaftarPengawasan = ({ daftarPengawasan }) => {
    return (
        <>
            {
                daftarPengawasan.map((pengawasan, i) => (
                    <tr key={pengawasan.id} className="border-b border-slate-100 hover:bg-slate-100">
                        <td className="px-4 py-5 text-center">{i + 1}</td>
                        <td className="px-4 py-5">
                            <a target="_blank" href={`/admin/pengawasan/penyelenggaraan/APBD/${pengawasan.jenisPengawasan.toLowerCase()}/${pengawasan.id}`} className="hover:text-blue-600 hover:underline">
                                {formatDateWithWeekdayToIndonesia(pengawasan.tanggalPengawasan)}
                            </a>
                        </td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibProsesPemilihanPenyediaJasa)}</td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPenerapanStandarKontrak)}</td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPenggunaanTKK)}</td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPemberianPekerjaan)}</td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibKetersediaanDokumenStandarK4)}</td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPenerapanSMKK)}</td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibAntisipasiKecelakaan)}</td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPenerapanManajemenMutu)}</td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPemenuhanPenyediaanMPTK)}</td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPenggunaanMPTK)}</td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPenggunaanPDN)}</td>
                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPemenuhanStandarLingkungan)}</td>
                    </tr>
                ))
            }
        </>
    )
}

export default ({ isVisible, onClose, proyekKonstruksi }) => {
    const { url } = usePage();
    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);

    const { daftarPengawasan } = proyekKonstruksi;
    const {
        tertibProsesPemilihanPenyediaJasa,
        tertibPenerapanStandarKontrak,
        tertibPenggunaanTKK,
        tertibPemberianPekerjaan,
        tertibKetersediaanDokumenStandarK4,
        tertibPenerapanSMKK,
        tertibAntisipasiKecelakaan,
        tertibPenerapanManajemenMutu,
        tertibPemenuhanPenyediaanMPTK,
        tertibPenggunaanMPTK,
        tertibPenggunaanPDN,
        tertibPemenuhanStandarLingkungan,
        tertibPengawasan,
        catatan,
    } = proyekKonstruksi;

    const { data, setData, processing, post, reset } = useForm({
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
    const handleInputChange = (value) => setData({ ...data, ...value });

    React.useEffect(() => {
        setData({
            ...data,
            proyekId: proyekKonstruksi.id,
            prosesPemilihanPenyediaJasa: typeof(tertibProsesPemilihanPenyediaJasa) === 'boolean' ? tertibProsesPemilihanPenyediaJasa : '',
            penerapanStandarKontrak: typeof(tertibPenerapanStandarKontrak) === 'boolean' ? tertibPenerapanStandarKontrak :  '',
            penggunaanTKKBersertifikat: typeof(tertibPenggunaanTKK) === 'boolean' ? tertibPenggunaanTKK :  '',
            pemberianPekerjaan: typeof(tertibPemberianPekerjaan) === 'boolean' ? tertibPemberianPekerjaan :  '',
            ketersediaanDokumenStandarK4: typeof(tertibKetersediaanDokumenStandarK4) === 'boolean' ? tertibKetersediaanDokumenStandarK4 :  '',
            penerapanSMKK: typeof(tertibPenerapanSMKK) === 'boolean' ? tertibPenerapanSMKK :  '',
            antisipasiKecelakaan: typeof(tertibAntisipasiKecelakaan) === 'boolean' ? tertibAntisipasiKecelakaan :  '',
            penerapanManajemenMutu: typeof(tertibPenerapanManajemenMutu) === 'boolean' ? tertibPenerapanManajemenMutu :  '',
            pemenuhanPenyediaanMPK: typeof(tertibPemenuhanPenyediaanMPTK) === 'boolean' ? tertibPemenuhanPenyediaanMPTK :  '',
            penggunaanMPTK: typeof(tertibPenggunaanMPTK) === 'boolean' ? tertibPenggunaanMPTK :  '',
            penggunaanPDN: typeof(tertibPenggunaanPDN) === 'boolean' ? tertibPenggunaanPDN :  '',
            pemenuhanStandarLingkungan: typeof(tertibPemenuhanStandarLingkungan) === 'boolean' ? tertibPemenuhanStandarLingkungan :  '',
            tertibPengawasan: typeof(tertibPengawasan) === 'boolean' ? tertibPengawasan :  '',
            catatan: catatan ? catatan : '',
        });
    }, [proyekKonstruksi]);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(url, data, proyekKonstruksi.id);

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

    if (!Object.keys(proyekKonstruksi).length) return null;

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-5xl h-fit my-10">
                <Modal.Header onClose={onClose}>
                    <div className="mb-5">
                        <h3 className="font-light text-xs text-slate-500">Rekapitulasi Pengawasan Tertib Penyelenggaraan Jasa Konstruksi Tahunan</h3>
                        <h1 className="font-medium text-slate-800">Verifikasi Pengawasan Tahunan</h1>
                        <span className="flex gap-x-3 items-center text-xs">
                            <div className="flex items-center gap-x-1 text-slate-800">
                                <span>{proyekKonstruksi.namaPaket}</span>
                            </div>
                        </span>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4 text-xs">
                            <div className="space-y-4 border-b border-slate-100 pb-4">
                                <div>
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 1</div>
                                    <div className="text-slate-800">Pengawasan terhadap proses pemilihan Penyedia Jasa <span className="text-red-400">*</span></div>
                                </div>
                                <div>
                                    <InputRadio
                                        id="prosesPemilihanPenyediaJasa"
                                        isTrue={data.prosesPemilihanPenyediaJasa}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                            </div>
                            <div className="col-span-3 grid grid-cols-3 gap-x-4 gap-y-2 border-b border-slate-100 pb-4">
                                <div className="col-span-3">
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 2</div>
                                    <div className="text-slate-800">Pengawasan terhadap penyusunan dan pelaksanaan Kontrak Kerja Konstruksi</div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-slate-800">Penerapan Standar Kontrak <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="penerapanStandarKontrak"
                                        isTrue={data.penerapanStandarKontrak}
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
                                        isTrue={data.penggunaanTKKBersertifikat}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-slate-800 flex items-center gap-x-0.5">
                                        <span className="text-nowrap overflow-x-auto">Pemberian Pekerjaan Utama dan/atau Penunjang kepada Subpenyedia Jasa</span>
                                        <span className="text-red-400">*</span>
                                    </div>
                                    <InputRadio
                                        id="pemberianPekerjaan"
                                        isTrue={data.pemberianPekerjaan}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                            </div>
                            <div className="col-span-3 grid grid-cols-3 gap-x-4 gap-y-2 border-b border-slate-100 pb-4">
                                <div className="col-span-3">
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 3</div>
                                    <div className="text-slate-800">Pengawasan terhadap penerapan Standar Keamanan, Keselamatan, Kesehatan, dan Keberlanjutan Konstruksi</div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-slate-800">Ketersediaan Dokumen Standar K4 <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="ketersediaanDokumenStandarK4"
                                        isTrue={data.ketersediaanDokumenStandarK4}
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
                                        isTrue={data.penerapanSMKK}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-slate-800">Antisipasi Kecelakaan Kerja <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="antisipasiKecelakaan"
                                        isTrue={data.antisipasiKecelakaan}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 border-b border-slate-100 pb-4">
                                <div>
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 4</div>
                                    <div className="text-slate-800">Pengawasan terhadap penerapan manajemen mutu Konstruksi <span className="text-red-400">*</span></div>
                                </div>
                                <div>
                                    <InputRadio
                                        id="penerapanManajemenMutu"
                                        isTrue={data.penerapanManajemenMutu}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                            </div>
                            <div className="col-span-3 grid grid-cols-3 gap-x-4 gap-y-2 border-b border-slate-100 pb-4">
                                <div className="col-span-3">
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 5</div>
                                    <div className="text-slate-800">Pengawasan terhadap penggunaan material, peralatan dan teknologi konstruksi</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="col-span-2">
                                        <div className="text-slate-800 text-justify">Pemenuhan penyediaan material, peralatan, dan teknologi konstruksi dalam pelaksanaan proyek konstruksi <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="pemenuhanPenyediaanMPK"
                                        isTrue={data.pemenuhanPenyediaanMPK}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-slate-800 text-justify">Penerapan Material Standar (SNI dan Standar Lain) <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="penggunaanMPTK"
                                        isTrue={data.penggunaanMPTK}
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
                                        isTrue={data.penggunaanPDN}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 border-b border-slate-100 pb-4">
                                <div>
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 6</div>
                                    <div className="text-slate-800">Pengelolaan dan pemanfaatan sumber material Konstruksi</div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-slate-800">Pemenuhan terhadap standar teknis lingkungan <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="pemenuhanStandarLingkungan"
                                        isTrue={data.pemenuhanStandarLingkungan}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                            </div>
                            <div className="col-span-3 grid grid-cols-3 gap-x-4 gap-y-1.5">
                                <div className="space-y-2 text-xs">
                                    <div>
                                        <div className="text-slate-800">Hasil Pengawasan <span className="text-red-400">*</span></div>
                                        <div className="font-light text-[11px] text-slate-500">Kesimpulan Verifikasi Pengawasan</div>
                                    </div>
                                    <InputRadio
                                        id="tertibPengawasan"
                                        isTrue={data.tertibPengawasan}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="col-span-2 space-y-2 text-xs">
                                    <label htmlFor="catatan" className="block text-slate-800">Catatan Pengawasan</label>
                                    <textarea
                                        name="catatan" id="catatan" rows="2"
                                        value={data.catatan} onChange={e => setData({ ...data, catatan: e.target.value})}
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 flex justify-end items-end gap-x-2">
                                <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-3" onClick={onClose}>Batal</button>
                                <button type="submit" className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-3">
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
                                        <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">Proses Pemilihan Penyedia Jasa</th>
                                        <th scope="col" colSpan="3" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Pengawasan terhadap Kontrak Kerja Konstruksi</th>
                                        <th scope="col" colSpan="3" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Pengawasan terhadap Penerapan Standar Keamanan, Keselamatan, Kesehatan, dan Keberlanjutan Konstruksi</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">Penerapan Sistem Manajemen Mutu Konstruksi</th>
                                        <th scope="col" colSpan="3" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Pengelolaan dan Penggunaan Material, Peralatan, dan Teknologi Konstruksi</th>
                                        <th scope="col" colSpan="1" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200 min-w-48">Pengelolaan dan Pemanfaatan Sumber Material Konstruksi</th>
                                    </tr>
                                    <tr className="border-b border-slate-200">
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Penerapan Standar Kontrak</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200 min-w-44">Penggunaan Tenaga Kerja Konstruksi Bersertifikat</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200 min-w-48">Pemberian Pekerjaan Utama dan/atau Penunjang kepada Subpenyedia Jasa</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Ketersediaan Dokumen Standar K4</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Penerapan SMKK</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Kegiatan Antisipasi Kecelakaan Kerja</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200 min-w-48">Pemenuhan Penyediaan Peralatan dalam Pelaksanaan Proyek Konstruksi</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200 min-w-40">Penggunaan Material Standar (SNI dan Standar Lain)</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200 min-w-40">Penggunaan PDN untuk Teknologi dan MPK</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Pemenuhan terhadap Standar Teknis Lingkungan</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700">
                                    <tr className="bg-slate-200">
                                        <td colSpan="14" className="px-4 py-2">Pengawasan Rutin</td>
                                    </tr>
                                    <DaftarPengawasan
                                        daftarPengawasan={daftarPengawasan.filter(({jenisPengawasan}) => jenisPengawasan === 'Rutin')}
                                    />
                                    <tr className="bg-slate-200">
                                        <td colSpan="14" className="px-4 py-2">Pengawasan Insidental</td>
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
