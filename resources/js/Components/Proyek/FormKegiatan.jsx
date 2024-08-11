import React from "react";
import { useForm } from "@inertiajs/react";

import Card from "../Card";
import SelectUsaha from "../Usaha/SelectUsaha";

import {
    LiaSpinnerSolid,
    LiaCloudUploadAltSolid,
    LiaFileAlt,
    LiaTimesSolid,
} from "react-icons/lia";
import ModalError from "../ModalError";

function FormInformasi() {
    const { data, setData, post, processing, reset } = useForm({
        namaPaket: '',
        nomorKontrak: '',
        sumberDana: 'APBD',
        tanggalMulai: '',
        tanggalSelesai: '',
        tanggalKontrak: '',
        tahunAnggaran: '2024',
        nilaiKontrak: '',
        nilaiPagu: '',
    });

    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        post(`/admin/pendataan/proyek`, {
            preserveScroll: true,
            onError: (errors) => {
                console.log(errors);
                setIsModalErrorOpen(true);
            },
        });
    }

    return (
        <>
            <Card className="w-full">
                <Card.Body className="p-4">
                    <form method="post" onSubmit={handleSubmit} className="grid grid-cols-3 gap-6 mb-2">
                        <div className="col-span-3">
                            <label htmlFor="nama" className="block mb-2 text-xs font-medium text-slate-800">Nama Paket Pekerjaan <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="namaPaket" id="namaPaket" placeholder="cth. Peningkatan Struktur Jalan Tanah Habang Kec. Simpur (Peningkatan Jalan Wilayah Perkotaan)"
                                value={data.namaPaket} onChange={e => setData('namaPaket', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="nomorKontrak" className="block mb-2 text-xs font-medium text-slate-800">Nomor Kontrak <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="nomorKontrak" id="nomorKontrak" placeholder="cth. 800.1/XXX/I/2023"
                                value={data.nomorKontrak} onChange={e => setData('nomorKontrak', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2 w-3/4">
                            <label htmlFor="sumberDana" className="block mb-2 text-xs font-medium text-slate-800">Sumber Dana <span className="text-red-400">*</span></label>
                            <select
                                name="sumberDana" id="sumberDana" value={data.sumberDana} onChange={e => setData('sumberDana', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            >
                                <option value="APBD">APBD</option>
                                <option value="Masyarakat, swasta, atau badan usaha">Masyarakat, swasta, atau badan usaha</option>
                            </select>
                        </div>
                        <div className="col-span-2 space-y-2">
                            <div>
                                <div className="font-medium text-xs text-slate-800">Waktu Pelaksanaan <span className="text-red-400">*</span></div>
                                <div className="font-light text-[11px] text-slate-500">Isi dengan tanggal mulai dan selesai pelaksanaan sesuai kontrak</div>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-full">
                                    <input
                                        type="date" name="tanggalMulai" id="tanggalMulai"
                                        value={data.tanggalMulai} onChange={e => setData('tanggalMulai', e.target.value)}
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                                <div className="text-xs text-slate-800 font-light">s.d.</div>
                                <div className="w-full">
                                    <input
                                        type="date" name="tanggalSelesai" id="tanggalSelesai"
                                        value={data.tanggalSelesai} onChange={e => setData('tanggalSelesai', e.target.value)}
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 space-y-2">
                            <label htmlFor="tanggalKontrak">
                                <div className="font-medium text-xs text-slate-800">Tanggal Kontrak</div>
                                <div className="font-light text-[11px] text-slate-500">Isi dengan tanggal dilakukan kontrak</div>
                            </label>
                            <div className="flex items-center gap-1.5">
                                <div className="w-full">
                                    <input
                                        type="date" name="tanggalKontrak" id="tanggalKontrak"
                                        value={data.tanggalKontrak} onChange={e => setData('tanggalKontrak', e.target.value)}
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="tahun" className="block mb-2 text-xs font-medium text-slate-800">Tahun Anggaran <span className="text-red-400">*</span></label>
                            <select
                                name="tahunAnggaran" id="tahunAnggaran"
                                value={data.tahunAnggaran} onChange={e => setData('tahunAnggaran', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs">
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="nilaiKontrak" className="block mb-2 text-xs font-medium text-slate-800">Nilai Kontrak Paket <span className="font-light text-slate-500">(Rp)</span> <span className="text-red-400">*</span></label>
                            <div className="relative w-full">
                                <div className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-xs text-slate-500 font-light">Rp</div>
                                <input
                                    type="text" name="nilaiKontrak" id="nilaiKontrak" placeholder="10000000"
                                    value={data.nilaiKontrak} onChange={e => setData('nilaiKontrak', e.target.value)}
                                    className="border border-slate-200 rounded-md py-2.5 pl-8 block w-full text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="nilaiPagu" className="block mb-2 text-xs font-medium text-slate-800">Nilai Pagu <span className="font-light text-slate-500">(Rp)</span> <span className="text-red-400">*</span></label>
                            <div className="relative w-full">
                                <div className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-xs text-slate-500 font-light">Rp</div>
                                <input
                                    type="text" name="nilaiPagu" id="nilaiPagu" placeholder="10000000"
                                    value={data.nilaiPagu} onChange={e => setData('nilaiPagu', e.target.value)}
                                    className="border border-slate-200 rounded-md py-2.5 pl-8 block w-full text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                        </div>
                        <div className="col-span-3 flex items-center justify-end gap-x-2 5">
                            <button
                                type="button"
                                className="flex justify-center items-center gap-x-1 bg-white font-medium text-xs text-slate-700 rounded py-2.5 px-3 hover:bg-slate-100 border border-slate-200"
                                onClick={() => reset()}
                            >
                                Hapus
                            </button>
                            <button
                                type="submit"
                                className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2.5 px-3 hover:bg-blue-800"
                                disabled={processing}
                            >
                                { processing && <LiaSpinnerSolid className="animate-spin" />}
                                Simpan
                            </button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
            <ModalError
                isVisible={isModalErrorOpen}
                onClose={() => setIsModalErrorOpen(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal menambahkan proyek konstruksi baru. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    );
}

function FormPenyediaJasa({ proyekId, daftarUsaha }) {
    const { data, setData, post, processing, reset } = useForm({
        usaha: '',
        nib: '',
        dokumenNIB: '',
        jenisUsaha: 'Badan Usaha Jasa Konstruksi',
        pjbu: '',
        alamat: '',
    });
    const [ isSelectUsahaVisible, setIsSelectUsahaVisible ] = React.useState(false);
    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);

    React.useEffect(() => {
        const timeoutId = setTimeout(() => setIsSelectUsahaVisible(false), 1000);
        return () => clearTimeout(timeoutId);
    }, [data.usaha]);

    function handleUsahaSelect(usaha) {
        const { id, nama, nib, pjbu, alamat } = usaha;
        setIsSelectUsahaVisible(false);
        setData({
            ...data,
            usaha: nama,
            usahaId: id,
            nib: nib,
            dokumenNIB: usaha.fileId ? {
                fileId: usaha.fileId,
                fileName: usaha.fileName,
                filePath: usaha.filePath,
            } : '',
            pjbu: pjbu,
            alamat: alamat,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (proyekId) {
            post(`/admin/pendataan/proyek/${proyekId}/penyedia-jasa`, {
                preserveScroll: true,
                onError: (errors) => {
                    console.log(errors);
                    setIsModalErrorOpen(true);
                }
            });
        } else {
            setIsModalErrorOpen(true);
        }
    }

    return (
        <>
            <Card className="w-full">
                <Card.Body className="p-4">
                    <form
                        method="post"
                        className="grid grid-cols-5 grid-flow-row-dense gap-5 mb-2"
                        onSubmit={handleSubmit}
                    >
                        <div className="relative col-span-4">
                            <label htmlFor="usaha" className="block mb-2 text-xs font-medium text-slate-800">Nama Usaha <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="usaha" id="usaha" placeholder="cth. CV Citra Bangunan"
                                value={data.usaha} onChange={e => setData('usaha', e.target.value)} onClick={() => setIsSelectUsahaVisible(!isSelectUsahaVisible)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                            <SelectUsaha
                                isVisible={isSelectUsahaVisible}
                                onSelect={handleUsahaSelect}
                                daftarUsaha={daftarUsaha}
                            />
                        </div>
                        <div></div>
                        <div className="col-span-2">
                            <label htmlFor="nib" className="block mb-2 text-xs font-medium text-slate-800">NIB <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="nib" id="nib" placeholder="cth. 1234567890123456"
                                value={data.nib} onChange={e => setData('nib', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-3">
                            <div className="block mb-2 text-xs font-medium text-slate-800">Dokumen NIB <span className="font-light text-slate-500">(Opsional)</span></div>
                            {
                                data.dokumenNIB === '' ? (
                                    <label htmlFor="dokumenNIB">
                                        <div className="group mt-1 w-full flex items-center justify-between gap-x-10 p-2 rounded border border-dashed border-slate-200 hover:bg-slate-100 cursor-pointer">
                                            <div className="flex items-start gap-x-2">
                                            <div className="rounded bg-blue-50 group-hover:bg-blue-100 text-blue-500 w-fit p-2">
                                                    <LiaCloudUploadAltSolid size={18} />
                                                </div>
                                                <div>
                                                    <div className="font-normal text-xs ">Upload Dokumen NIB</div>
                                                    <div className="font-light text-slate-500 text-[11px]">Maks. 2 MB</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[11px] text-slate-700 border border-slate-200 bg-white px-2 py-1 rounded">
                                                    Browse
                                                </div>
                                            </div>
                                        </div>
                                        <input type="file" id="dokumenNIB" className="hidden" onChange={e => setData('dokumenNIB', e.target.files[0])} />
                                    </label>
                                ) : data.dokumenNIB.fileId ? (
                                    <div className="flex items-center justify-between border border-slate-200 p-2 rounded mt-1 text-xs">
                                        <div className="rounded flex gap-x-2 items-start group">
                                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                                <LiaFileAlt size={18} />
                                            </div>
                                            <a href={data.dokumenNIB.filePath} target="_blank" className="group-hover:text-blue-600 group-hover:underline">
                                                <div className="font-normal uppercase line-clamp-1">{data.usaha}</div>
                                                <div className="font-light text-slate-500 line-clamp-1">{data.dokumenNIB.fileName}</div>
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2 text-xs text-slate-800">
                                        <div className="flex justify-between border border-slate-200 p-2 rounded">
                                            <div className="flex gap-x-2">
                                                <div className="bg-blue-100 text-blue-600 rounded p-2 h-fit">
                                                    <LiaFileAlt size={18} />
                                                </div>
                                                <div>
                                                    <div className="font-normal line-clamp-2">{data.dokumenNIB.name}</div>
                                                    <div className="font-light text-slate-500">{parseFloat(data.dokumenNIB.size/1000000).toFixed(1)} MB</div>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="text-slate-700 p-1 h-fit"
                                                onClick={() => setData('dokumenNIB', '')}
                                            >
                                                <LiaTimesSolid size={12} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="pjbu" className="block mb-2 text-xs font-medium text-slate-800">Penanggung Jawab Badan Usaha (PJBU) <span className="text-red-400">*</span></label>
                            <input
                                type="text" name="pjbu" id="pjbu" placeholder="cth. Alana Nusa Indah"
                                value={data.pjbu} onChange={e => setData('pjbu', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-3">
                            <label htmlFor="alamat" className="block mb-2 text-xs font-medium text-slate-800">Alamat <span className="text-red-400">*</span></label>
                            <textarea
                                name="alamat" id="alamat" rows="3" placeholder="cth. Jalan Aluh Idut No 66 A Kandangan"
                                value={data.alamat} onChange={e => setData('alamat', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-5 flex items-center justify-end gap-x-2 5">
                            <button
                                type="button"
                                className="flex justify-center items-center gap-x-1 bg-white font-medium text-xs text-slate-700 rounded py-2.5 px-3 hover:bg-slate-100 border border-slate-200"
                                onClick={() => reset()}
                            >
                                Hapus
                            </button>
                            <button
                                type="submit"
                                className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2.5 px-3 hover:bg-blue-800"
                                disabled={processing}
                            >
                                { processing && <LiaSpinnerSolid className="animate-spin" />}
                                Simpan
                            </button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
            <ModalError
                isVisible={isModalErrorOpen}
                onClose={() => setIsModalErrorOpen(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal menambahkan penyedia jasa proyek konstruksi. Silakan periksa kembali.
                </div>
            </ModalError>
        </>
    );
}

function FormPenggunaJasa({ proyekId }) {
    const { data, setData, post, processing, reset } = useForm({
        nama: '',
        pelakuPengadaan: 'KPA',
        nip: '',
        jabatan: '',
        sk: '',
        instansi: '',
        alamat: '',
    });

    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (proyekId) {
            post(`/admin/pendataan/proyek/${proyekId}/pengguna-jasa`, {
                preserveScroll: true,
                onError: (errors) => {
                    console.log(errors);
                    setIsModalErrorOpen(true);
                }
            });
        } else {
            setIsModalErrorOpen(true);
        }
    }

    return (
        <>
            <Card className="w-full">
                <Card.Body className="p-4">
                    <form
                        method="post"
                        className="grid grid-cols-6 gap-5 mb-2"
                        onSubmit={handleSubmit}
                    >
                        <div className="col-span-4 space-y-2">
                            <label htmlFor="nama">
                                <div className="font-medium text-xs text-slate-800">Nama Pengguna Jasa <span className="text-red-400">*</span></div>
                                <div className="font-light text-[11px] text-slate-500">Kuasa Pengguna Anggaran / Pejabat Pembuat Komitmen / Perwakilan</div>
                            </label>
                            <input
                                type="text" name="nama" id="nama" placeholder="cth. John Doe"
                                value={data.nama} onChange={e => setData('nama', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label htmlFor="pelakuPengadaan">
                                <div className="font-medium text-xs text-slate-800">Pelaku Pengadaan <span className="text-red-400">*</span></div>
                                <div className="font-light text-[11px] text-slate-500">Pilih Pengguna Jasa</div>
                            </label>
                            <select
                                name="pelakuPengadaan" id="pelakuPengadaan" value={data.pelakuPengadaan} onChange={e => setData('pelakuPengadaan', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            >
                                <option value="Kuasa Pengguna Anggaran">Kuasa Pengguna Anggaran</option>
                                <option value="Pejabat Pembuat Komitmen">Pejabat Pembuat Komitmen</option>
                                <option value="Perwakilan Masyarakat, Swasta, atau Badan Usaha">Perwakilan Masyarakat, Swasta, atau Badan Usaha</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="nip" className="block mb-2 text-xs font-medium text-slate-800">NIP <span className="font-light text-[11px] text-slate-500">diisi untuk ASN</span></label>
                            <input
                                type="text" name="nip" id="nip" placeholder="cth. 19990101 202001 1 001"
                                value={data.nip} onChange={e => setData('nip', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-4">
                            <label htmlFor="jabatan" className="block mb-2 text-xs font-medium text-slate-800">Jabatan</label>
                            <input
                                type="text" name="jabatan" id="jabatan" placeholder="cth. Pengelola Sarana dan Prasarana Kantor"
                                value={data.jabatan} onChange={e => setData('jabatan', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-6 space-y-2">
                            <label htmlFor="sk">
                                <div className="font-medium text-xs text-slate-800">Dasar Pengangkatan SK Lembaga</div>
                                <div className="font-light text-[11px] text-slate-500">Isi dengan Nomor dan Judul SK</div>
                            </label>
                            <textarea
                                name="sk" id="sk" rows="2" placeholder="cth. Keputusan Kepala Dinas Nomor 23 Tahun 2023 tentang"
                                value={data.sk} onChange={e => setData('sk', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-3">
                            <label htmlFor="instansi" className="block mb-2 text-xs font-medium text-slate-800">Instansi</label>
                            <input
                                type="text" name="instansi" id="instansi" placeholder="cth. Dinas Pekerjaan Umum dan Tata Ruang"
                                value={data.instansi} onChange={e => setData('instansi', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-3">
                            <label htmlFor="alamat" className="block mb-2 text-xs font-medium text-slate-800">Alamat Kantor</label>
                            <textarea
                                name="alamat" id="alamat" rows="2" placeholder="cth. Jalan Aluh Idut No 66 A Kandangan"
                                value={data.alamat} onChange={e => setData('alamat', e.target.value)}
                                className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-6 flex items-center justify-end gap-x-2 5">
                            <button
                                type="button"
                                className="flex justify-center items-center gap-x-1 bg-white font-medium text-xs text-slate-700 rounded py-2.5 px-3 hover:bg-slate-100 border border-slate-200"
                                onClick={() => reset()}
                            >
                                Hapus
                            </button>
                            <button
                                type="submit"
                                className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2.5 px-3 hover:bg-blue-800"
                                disabled={processing}
                            >
                                { processing && <LiaSpinnerSolid className="animate-spin" />}
                                Simpan
                            </button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
            <ModalError
                isVisible={isModalErrorOpen}
                onClose={() => setIsModalErrorOpen(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal menambahkan pengguna jasa proyek konstruksi. Silakan periksa kembali.
                </div>
            </ModalError>
        </>
    )
}

export { FormInformasi, FormPenyediaJasa, FormPenggunaJasa };
