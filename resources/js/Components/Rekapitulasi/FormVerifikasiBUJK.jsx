import React from "react";
import { useForm, usePage } from "@inertiajs/react";

import Modal from "../Modal";
import InputRadio from "../InputRadio";

import { LiaSpinnerSolid, LiaStoreSolid, LiaUser } from "react-icons/lia";
import { getTertibStatusBadge } from "../../Utils/getStatusBadge";

export default ({ isVisible, onClose, usaha }) => {
    const { url } = usePage();
    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);

    const { daftarPengawasanRutin } = usaha;

    const { data, setData, processing, post, reset } = useForm({
        jenisUsaha: '',
        sifatUsaha: '',
        klasifikasiUsaha: '',
        layananUsaha: '',
        bentukUsaha: '',
        kualifikasiUsaha: '',
        syaratSBU: '',
        syaratNIB: '',
        pengembanganUsaha: '',
        tertibPengawasan: '',
        catatan: '',
    });
    const handleInputChange = (value) => setData({ ...data, ...value });

    if (!Object.keys(usaha).length) return null;

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-4xl h-fit my-10">
                <Modal.Header onClose={onClose}>
                    <div className="mb-5">
                        <h3 className="font-light text-xs text-slate-500">Rekapitulasi Pengawasan Tertib Usaha Jasa Konstruksi Tahunan</h3>
                        <h1 className="font-medium text-slate-800">Verifikasi Pengawasan Tahunan</h1>
                        <div className="flex gap-x-3 items-center text-xs">
                            <div className="flex items-center gap-x-1.5 text-slate-700">
                                <LiaStoreSolid size={16} className="mt-0.5" />
                                <span className="uppercase">{usaha.nama}</span>
                            </div>
                            <div className="flex items-center gap-x-1.5 text-slate-700">
                                <LiaUser size={16} />
                                <span>{usaha.pjbu}</span>
                            </div>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <form className="grid grid-cols-2 gap-4 text-xs">
                            <div className="col-span-2 grid grid-cols-4 h-fit gap-x-4 gap-y-2 pb-4 border-b border-slate-100">
                                <div className="col-span-4">
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 2</div>
                                    <div className="text-slate-800">Kesesuaian Jenis, Sifat, Klasifikasi, dan Layanan Usaha dengan Kegiatan Usaha Jasa Konstruksi</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-slate-800">Jenis Usaha <span className="text-red-400">*</span></div>
                                    <InputRadio
                                        id="jenisUsaha"
                                        isTrue={data.jenisUsaha}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-slate-800">Sifat Usaha <span className="text-red-400">*</span></div>
                                    <InputRadio
                                        id="sifatUsaha"
                                        isTrue={data.sifatUsaha}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-slate-800">Klasifikasi Usaha <span className="text-red-400">*</span></div>
                                    <InputRadio
                                        id="klasifikasiUsaha"
                                        isTrue={data.klasifikasiUsaha}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-slate-800">Layanan Usaha <span className="text-red-400">*</span></div>
                                    <InputRadio
                                        id="layananUsaha"
                                        isTrue={data.layananUsaha}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pb-4 border-b border-slate-100">
                                <div className="col-span-2">
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 3</div>
                                    <div className="text-slate-800">Kesesuaian Bentuk dan Kualifikasi dengan Kegiatan Usaha Jasa Konstruksi dan Segmentasi Pasar</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-slate-800">Bentuk Usaha <span className="text-red-400">*</span></div>
                                    <InputRadio
                                        id="bentukUsaha"
                                        isTrue={data.bentukUsaha}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-slate-800">Kualifikasi Usaha <span className="text-red-400">*</span></div>
                                    <InputRadio
                                        id="kualifikasiUsaha"
                                        isTrue={data.kualifikasiUsaha}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pb-4 border-b border-slate-100">
                                <div className="col-span-2">
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 4</div>
                                    <div className="text-slate-800">Pemenuhan Persyaratan Usaha Jasa Konstruksi</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-slate-800">Sertifikat Badan Usaha (SBU) <span className="text-red-400">*</span></div>
                                    <InputRadio
                                        id="syaratSBU"
                                        isTrue={data.syaratSBU}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-slate-800">Nomor Induk Berusaha (NIB) <span className="text-red-400">*</span></div>
                                    <InputRadio
                                        id="syaratNIB"
                                        isTrue={data.syaratNIB}
                                        onInputChange={handleInputChange}
                                        label="Tertib"
                                    />
                                </div>
                            </div>
                            <div className="h-fit grid grid-cols-2 gap-x-4 gap-y-2">
                                <div className="col-span-2">
                                    <div className="font-light text-slate-500">Lingkup Pengawasan 5</div>
                                    <div className="text-slate-800">Pemenuhan Persyaratan Usaha Jasa Konstruksi <span className="text-red-400">*</span></div>
                                </div>
                                <InputRadio
                                    id="pengembanganUsaha"
                                    isTrue={data.pengembanganUsaha}
                                    onInputChange={handleInputChange}
                                    label="Tertib"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
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
                                <div className="space-y-2 text-xs">
                                    <label htmlFor="catatan" className="block text-slate-800">Catatan Pengawasan</label>
                                    <textarea
                                        name="catatan" id="catatan" rows="2"
                                        value={data.catatan} onChange={e => setData({ ...data, catatan: e.target.value})}
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
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
                        <div className="relative max-h-80 overflow-auto">
                            <table className="w-full text-xs rounded border border-slate-200">
                                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
                                    <tr className="border-b border-slate-200">
                                        <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">#</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium min-w-24 border-r border-slate-200">Rentang Pengawasan</th>
                                        <th scope="col" colSpan="4" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Kesesuaian Kegiatan Konstruksi</th>
                                        <th scope="col" colSpan="2" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Kesesuaian Kegiatan Usaha Jasa Konstruksi dan Segmentasi Pasar Jasa Konstruksi</th>
                                        <th scope="col" colSpan="2" className="px-4 pt-4 pb-2 font-medium border-r border-slate-200">Pemenuhan Persyaratan Usaha</th>
                                        <th scope="col" rowSpan="2" className="p-4 font-medium border-r border-slate-200">Pelaksanaan Pengembangan Usaha Berkelanjutan</th>
                                    </tr>
                                    <tr className="border-b border-slate-200">
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Jenis</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Sifat</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Klasifikasi</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Layanan</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Bentuk</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200">Kualifikasi</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200 min-w-20">SBU</th>
                                        <th scope="col" className="px-4 pt-2 pb-4 font-medium border-r border-slate-200 min-w-20">NIB</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700">
                                    <tr className="bg-slate-200">
                                        <td colSpan="11" className="px-4 py-2">Pengawasan Rutin</td>
                                    </tr>
                                    {
                                        daftarPengawasanRutin.map((pengawasan, i) => (
                                            <tr key={i} className="border-b border-slate-100 hover:bg-slate-100">
                                                <td className="px-4 py-5 text-center">{i + 1}</td>
                                                <td className="px-4 py-5 text-center">Semester  {i === 0 ? 'I' : 'II' }</td>
                                                <td className="px-4 py-5 text-center">
                                                    <a target="_blank" href={`/admin/pengawasan/usaha/2/${pengawasan.pengawasanLingkup2Id}`} className="hover:text-blue-600 hover:underline">
                                                        {getTertibStatusBadge(pengawasan.tertibJenisUsaha)}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-5 text-center">
                                                    <a target="_blank" href={`/admin/pengawasan/usaha/2/${pengawasan.pengawasanLingkup2Id}`} className="hover:text-blue-600 hover:underline">
                                                        {getTertibStatusBadge(pengawasan.tertibSifatUsaha)}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-5 text-center">
                                                    <a target="_blank" href={`/admin/pengawasan/usaha/2/${pengawasan.pengawasanLingkup2Id}`} className="hover:text-blue-600 hover:underline">
                                                        {getTertibStatusBadge(pengawasan.tertibKlasifikasiUsaha)}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-5 text-center">
                                                    <a target="_blank" href={`/admin/pengawasan/usaha/2/${pengawasan.pengawasanLingkup2Id}`} className="hover:text-blue-600 hover:underline">
                                                        {getTertibStatusBadge(pengawasan.tertibLayananUsaha)}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-5 text-center">
                                                    <a target="_blank" href={`/admin/pengawasan/usaha/3/${pengawasan.pengawasanLingkup3Id}`} className="hover:text-blue-600 hover:underline">
                                                        {getTertibStatusBadge(pengawasan.tertibBentukUsaha)}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-5 text-center">
                                                    <a target="_blank" href={`/admin/pengawasan/usaha/3/${pengawasan.pengawasanLingkup3Id}`} className="hover:text-blue-600 hover:underline">
                                                        {getTertibStatusBadge(pengawasan.tertibKualifikasiUsaha)}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-5 text-center">
                                                    <a target="_blank" href={`/admin/pengawasan/usaha/4/bujk/${pengawasan.pengawasanLingkup4Id}/rutin`} className="hover:text-blue-600 hover:underline">
                                                        {getTertibStatusBadge(pengawasan.tertibPersyaratanSBU)}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-5 text-center">
                                                    <a target="_blank" href={`/admin/pengawasan/usaha/4/bujk/${pengawasan.pengawasanLingkup4Id}/rutin`} className="hover:text-blue-600 hover:underline">
                                                        {getTertibStatusBadge(pengawasan.tertibPersyaratanNIB)}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-5 text-center">
                                                    <a target="_blank" href={`/admin/pengawasan/usaha/5${pengawasan.pengawasanLingkup4Id}`} className="hover:text-blue-600 hover:underline">
                                                        {getTertibStatusBadge(pengawasan.tertibPengembanganUsaha)}
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
