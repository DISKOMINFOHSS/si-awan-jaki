import React from "react";
import { Link, usePage } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import Card from "../../../Components/Card";
import Badge from "../../../Components/Badge";

import { LiaSearchSolid, LiaPlusSolid } from "react-icons/lia";
import FormAddPengawasan from "../../../Components/Proyek/Progress/FormAddPengawasan";
import DaftarPengawasan from "../../../Components/Proyek/Progress/DaftarPengawasan";

import getDefaultData from "../../../Utils/getDefaultData";

const JenisPengawasanProgressIndex = ({ data }) => {
    const { url } = usePage();
    const tahun = url.split('/')[4];

    console.log(data);
    const {
        daftarProyekKonstruksi,
        daftarPengawasan,
        totalPengawasan,
    } = data;

    const [ isModalPengawasanOpen, setIsModalPengawasanOpen ] = React.useState(false);

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Pengawasan Progress - Tahun 2024</h1>
                    <h2 className="font-light text-xs text-slate-500">Pengawasan Penyelenggaraan Jasa Konstruksi di Kab. Hulu Sungai Selatan</h2>
                </div>
                <div>
                    <button
                        className="w-full flex justify-center items-center space-x-1 text-white bg-blue-600 hover:bg-blue-800 rounded text-xs tracking-wide p-2.5 shadow-sm"
                        onClick={() => setIsModalPengawasanOpen(true)}
                    >
                        <LiaPlusSolid className="stroke-2" />
                        <span>Tambah</span>
                    </button>
                </div>
            </div>
            <div className="my-5">
                <Card className="w-full">
                    <Card.Body className="p-5 grid grid-cols-5 gap-x-5">
                        <div className="flex items-center gap-x-2.5">
                            <div className="font-medium text-3xl text-slate-800">{daftarPengawasan.length}</div>
                            <div className="font-light text-xs text-slate-500 leading-tight">Total<br />Pengawasan</div>
                        </div>
                        <div className="col-span-4 space-y-2.5">
                            <div className="flex items-center gap-x-5 text-xs">
                                <div>
                                    <div className="font-light text-slate-500 flex justify-start items-center gap-x-2.5">
                                        <span className="bg-blue-600 rounded-full w-1.5 h-1.5 inline-block"></span>
                                        <span className="font-normal text-slate-700">Dalam Proses Pengerjaan ( {getDefaultData(totalPengawasan.dalamProses, '0')} )</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-light text-slate-500 flex justify-start items-center gap-x-2.5">
                                        <span className="bg-red-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                        <span className="font-normal text-slate-700">Terlambat ( {getDefaultData(totalPengawasan.terlambat, '0')} )</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-light text-slate-500 flex justify-start items-center gap-x-2.5">
                                        <span className="bg-green-400 rounded-full w-1.5 h-1.5 inline-block"></span>
                                        <span className="font-normal text-slate-700">Selesai ( {getDefaultData(totalPengawasan.selesai, '0')} )</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2.5 flex items-center">
                                <div className={`bg-blue-600 h-2.5 rounded-full rounded-r w-[${Math.ceil((totalPengawasan.dalamProses / daftarPengawasan.length * 100) / 10)*10}%]`}></div>
                                <div className={`bg-red-600 h-2.5 w-[${Math.ceil((totalPengawasan.terlambat / daftarPengawasan.length * 100) / 10)*10}%]`}></div>
                                {/* <div className={`bg-green-400 h-2.5 rounded-full rounded-l w-[${Math.floor(14/24*100)}%]`}></div> */}
                                <div className={`bg-green-400 h-2.5 rounded-full rounded-l w-[${Math.ceil((totalPengawasan.selesai / daftarPengawasan.length * 100) / 10)*10}%]`}></div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <div>
                {/* <Card>
                    <Card.Header className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium text-sm text-slate-700">Proyek Konstruksi</h3>
                                <h4 className="font-light text-xs text-slate-500">Sumber Dana dari Anggaran Pendapatan dan Belanja Daerah (APBD)</h4>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-2.5">
                            <div className="flex items-center min-w-32 gap-x-2.5">
                                <label htmlFor="" className="text-sm text-slate-500">Tahun:</label>
                                <select name="" id=""
                                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                >
                                    <option>2024</option>
                                </select>
                            </div>
                            <div className="relative mx-2">
                                <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
                                    <LiaSearchSolid size={18} className="text-slate-500 -scale-x-100" />
                                </div>
                                <input
                                    type="search" name="search" placeholder="Cari..."
                                    className="border border-slate-200 rounded py-2 pl-8 block w-56 text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
                                    <tr className="border-b border-slate-200">
                                        <th scope="col" className="p-4 font-medium border-r border-slate-200">#</th>
                                        <th scope="col" className="p-4 font-medium min-w-96 border-r border-slate-200">Nama Paket Pekerjaan</th>
                                        <th scope="col" className="p-4 font-medium min-w-40 border-r border-slate-200">Penyedia Jasa</th>
                                        <th scope="col" className="p-4 font-medium min-w-48 border-r border-slate-200">Konsultan Pengawas</th>
                                        <th scope="col" className="p-4 font-medium min-w-40 border-r border-slate-200">Waktu Pelaksanaan</th>
                                        <th scope="col" className="p-4 font-medium min-w-32 border-r border-slate-200">Status</th>
                                        <th scope="col" className="p-4 font-medium min-w-48 border-r border-slate-200">Progress <br />Penyelesaian</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700">
                                    <tr className="border-b border-slate-100 hover:bg-slate-100">
                                        <td className="px-4 py-5 text-center">{1}</td>
                                        <td className="px-4 py-5">
                                            <div>
                                                <Link href="#" className="text-justify hover:text-blue-600 hover:underline">
                                                    Normalisasi Sungai Garunggang Kec. Simpur (Normalisasi Sungai dengan Lebar Sungai 6 Meter)
                                                </Link>
                                                <div className="font-light text-slate-500 capitalize">{`Nomor Kontrak: XXX`}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 text-center"></td>
                                        <td className="px-4 py-5 text-center"></td>
                                        <td className="px-4 py-5 text-center"></td>
                                        <td className="px-4 py-5 text-center">
                                            <Badge bg="green">Selesai</Badge>
                                        </td>
                                        <td className="px-4 py-5 text-center">
                                            <div className="flex items-center gap-x-2">
                                                <span className="text-green-400">100%</span>
                                                <div className="w-full bg-slate-200 rounded-full h-2.5 flex items-center">
                                                    <div className={`bg-green-400 h-2.5 rounded-full w-[${100}%]`}></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-slate-100 hover:bg-slate-100">
                                        <td className="px-4 py-5 text-center">{1}</td>
                                        <td className="px-4 py-5">
                                            <div>
                                                <Link href="#" className="text-justify hover:text-blue-600 hover:underline">
                                                    Perbaikan Jalan Ruas Simpur - SP. 3 Muara Paring Agung - Taal Batang Kulur Kec. Simpur/Sungai Raya (Pemeliharaan Rutin Jalan)
                                                </Link>
                                                <div className="font-light text-slate-500 capitalize">{`Nomor Kontrak: XXX`}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 text-center"></td>
                                        <td className="px-4 py-5 text-center"></td>
                                        <td className="px-4 py-5 text-center"></td>
                                        <td className="px-4 py-5 text-center">
                                            <Badge bg="blue">Dalam Proses</Badge>
                                        </td>
                                        <td className="px-4 py-5 text-center">
                                            <div className="flex items-center gap-x-2">
                                                <span className="text-blue-400">60%</span>
                                                <div className="w-full bg-slate-200 rounded-full h-2.5 flex items-center">
                                                    <div className={`bg-blue-600 h-2.5 rounded-full w-[${60}%]`}></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card.Body>
                </Card> */}
                <DaftarPengawasan
                    tahun={tahun}
                    daftarPengawasan={daftarPengawasan}
                />
            </div>
            <FormAddPengawasan
                isVisible={isModalPengawasanOpen}
                onClose={() => setIsModalPengawasanOpen(false)}
                tahun={tahun}
                daftarProyekKonstruksi={daftarProyekKonstruksi.map(({
                    id,
                    namaPaket,
                    tahunAnggaran,
                    nomorKontrak,
                    tanggalMulaiPelaksanaan,
                    tanggalSelesaiPelaksanaan,
                    penyedia_jasa,
                    konsultan_pengawas,
                }) => ({
                    id: id,
                    namaPaket: namaPaket,
                    tahunAnggaran: tahunAnggaran,
                    nomorKontrak: nomorKontrak,
                    tanggalMulaiPelaksanaan: tanggalMulaiPelaksanaan,
                    tanggalSelesaiPelaksanaan: tanggalSelesaiPelaksanaan,
                    penyediaJasa: penyedia_jasa ? penyedia_jasa.nama : '',
                    konsultanPengawas: konsultan_pengawas ? konsultan_pengawas.nama : '',
                }))}
            />
        </>
    );
}

JenisPengawasanProgressIndex.layout = page => <Layout children={page} />;

export default JenisPengawasanProgressIndex;
