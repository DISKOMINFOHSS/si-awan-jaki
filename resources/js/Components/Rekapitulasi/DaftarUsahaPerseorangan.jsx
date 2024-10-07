import React from "react";

import Card from "../Card";
import { LiaCheckCircleSolid, LiaFileExportSolid, LiaSearchSolid } from "react-icons/lia";
import getDefaultData from "../../Utils/getDefaultData";
import { getTertibStatusBadge } from "../../Utils/getStatusBadge";
import FormVerifikasiUsahaPerseorangan from "./FormVerifikasiUsahaPerseorangan";

export default ({ daftarTertibUsaha }) => {
    const [keyword, setKeyword] = React.useState('');
    const handleKeywordChange = (event) => setKeyword(event.target.value);

    const filteredDaftarTertibUsaha = keyword ? daftarTertibUsaha.filter(({ nama }) => {
        return nama.toLowerCase().includes(keyword.toLowerCase());
    }) : daftarTertibUsaha;

    const [ isModalVerificationOpen, setIsModalVerificationOpen ] = React.useState(false);
    const [ selectedUsaha, setSelectedUsaha ] = React.useState({});

    function handleVerificationButtonClick(pengawasan) {
        setSelectedUsaha(pengawasan);
        setIsModalVerificationOpen(true);
    }

    return (
        <>
            <Card>
                <Card.Header className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-medium text-sm text-slate-700">Usaha Orang Perseorangan</h3>
                            <h4 className="font-light text-xs text-slate-500">Pengawasan Tertib Usaha Jasa Konstruksi</h4>
                        </div>
                        {/* <div>
                            <a
                                href={`/admin/rekapitulasi/${tahun}/tertib-usaha/rekapitulasi-tertib-usaha-${tahun}.pdf`}
                                target="_blank"
                                className="w-full flex justify-center items-center space-x-1 text-blue-500 border border-blue-400 rounded text-xs tracking-wide px-3 py-2.5 hover:bg-slate-100 hover:text-blue-500 focus:border-blue-400 focus:ring-blue-400 focus:text-blue-500"
                            >
                                <LiaFileExportSolid size={16} />
                                <span>Export PDF</span>
                            </a>
                        </div> */}
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
                                type="search" name="search" placeholder="Cari..." value={keyword} onChange={handleKeywordChange}
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
                                    <th scope="col" className="p-4 font-medium min-w-60 border-r border-slate-200">Nama Usaha Orang Perseorangan / NIB</th>
                                    <th scope="col" className="p-4 font-medium w-56 border-r border-slate-200 ">Nomor Sertifikat Standar yang telah terverifikasi</th>
                                    <th scope="col" className="p-4 font-medium min-w-40 border-r border-slate-200 ">Alamat</th>
                                    <th scope="col" className="p-4 font-medium border-r border-slate-200 ">Hasil Pengawasan</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                            {
                                filteredDaftarTertibUsaha.map((pengawasan, i) => (
                                    <tr key={pengawasan.usahaId} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="px-4 py-5 text-center">{i + 1}</td>
                                        <td className="px-4 py-5">
                                            <div>
                                                <div className="uppercase hover:text-blue-600 hover:underline">{pengawasan.nama}</div>
                                                <div className="font-light text-slate-500">NIB: {pengawasan.nib ? pengawasan.nib : "-"}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 text-center">
                                            {
                                                pengawasan.skk.map(({ nomor_sertifikat }, i) => {
                                                    if (pengawasan.skk.length === i + 1) return nomor_sertifikat;
                                                    return `${nomor_sertifikat} , `;
                                                })
                                            }
                                        </td>
                                        <td className="px-4 py-5 text-center">{getDefaultData(pengawasan.alamat, '-')}</td>
                                        <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPengawasan)}</td>
                                        <td className="px-4 py-5 text-center">
                                            <div className="flex justify-end gap-x-2">
                                                <button
                                                    type="button"
                                                    className="flex items-center gap-x-1 rounded border border-slate-200 text-blue-500 p-2 hover:bg-slate-200"
                                                    onClick={() => handleVerificationButtonClick(pengawasan)}
                                                >
                                                    <LiaCheckCircleSolid size={18} />
                                                    <span>Verifikasi</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </Card.Body>
            </Card>
            <FormVerifikasiUsahaPerseorangan
                isVisible={isModalVerificationOpen}
                onClose={() => setIsModalVerificationOpen(false)}
                usaha={selectedUsaha}
            />
        </>
    )
}
