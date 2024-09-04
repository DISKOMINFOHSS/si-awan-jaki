import React from "react";
import Modal from "../Modal";
import InputRadio from "../InputRadio";
import { LiaToolsSolid } from "react-icons/lia";
import { formatDateWithWeekdayToIndonesia } from "../../Utils/formatDate";
import { getTertibStatusBadge } from "../../Utils/getStatusBadge";
import { usePage } from "@inertiajs/react";

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
                        <form className="grid grid-cols-4 gap-4 text-xs">
                            <div className="space-y-4 border-b border-slate-100 pb-4">
                                <div>
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 1</div>
                                    <div className="text-slate-800">Pengawasan terhadap proses pemilihan Penyedia Jasa <span className="text-red-400">*</span></div>
                                </div>
                                <div>
                                    <InputRadio
                                        id="prosesPemilihanPenyediaJasa"
                                        isTrue={''}
                                        onInputChange={() => {}}
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
                                        isTrue={''}
                                        onInputChange={() => {}}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-slate-800">Penggunaan TKK Bersertifikat <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="penggunaanTKKBersertifikat"
                                        isTrue={''}
                                        onInputChange={() => {}}
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
                                        isTrue={''}
                                        onInputChange={() => {}}
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
                                        isTrue={''}
                                        onInputChange={() => {}}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-slate-800">Penerapan SMKK <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="penerapanSMKK"
                                        isTrue={''}
                                        onInputChange={() => {}}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-slate-800">Antisipasi Kecelakaan Kerja <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="antisipasiKecelakaan"
                                        isTrue={''}
                                        onInputChange={() => {}}
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
                                        isTrue={''}
                                        onInputChange={() => {}}
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
                                        isTrue={''}
                                        onInputChange={() => {}}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-slate-800 text-justify">Penerapan Material Standar (SNI dan Standar Lain) <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="penggunaanMPTK"
                                        isTrue={''}
                                        onInputChange={() => {}}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-slate-800">Penggunaan PDN untuk Teknologi dan MPK <span className="text-red-400">*</span></div>
                                    </div>
                                    <InputRadio
                                        id="penggunaanPDN"
                                        isTrue={''}
                                        onInputChange={() => {}}
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
                                        isTrue={''}
                                        onInputChange={() => {}}
                                        label="Tertib"
                                    />
                                </div>
                            </div>
                            <div className="col-span-4 flex justify-end items-center gap-x-2">
                                <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-3" onClick={onClose}>Batal</button>
                                <button type="submit" className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-3">
                                    {/* { processing && <LiaSpinnerSolid className="animate-spin" />} */}
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
        </>
    );
}
