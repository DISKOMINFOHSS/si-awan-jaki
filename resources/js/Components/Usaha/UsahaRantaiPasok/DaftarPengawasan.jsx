import React from "react";
import { Link } from "@inertiajs/react";

import Card from "../../Card";
import { getTertibStatusBadge } from "../../../Utils/getStatusBadge";
import { formatDateToIndonesia } from "../../../Utils/formatDate";

import { LiaSearchSolid } from "react-icons/lia";

export default ({ jenisRantaiPasok, daftarPengawasan }) => {
    const [keyword, setKeyword] = React.useState('');
    const handleKeywordChange = (event) => setKeyword(event.target.value);

    const filteredDaftarPengawasan = keyword ? daftarPengawasan.filter(({ usaha }) => {
        return usaha.nama.toLowerCase().includes(keyword.toLowerCase());
    }) : daftarPengawasan;

    return (
        <Card>
            <Card.Header className="space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-medium text-sm text-slate-700">{`${jenisRantaiPasok.pelakuUsaha} Rantai Pasok`}</h3>
                        <h4 className="font-light text-xs text-slate-500">{`${jenisRantaiPasok.kategoriSumberDaya} Konstruksi`}</h4>
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
                            type="search" name="search" placeholder="Cari..." value={keyword} onChange={handleKeywordChange}
                            className="border border-slate-200 rounded py-2 pl-8 block w-56 text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase">
                            <tr>
                                <th scope="col" className="p-4 font-medium border-r border-slate-200">#</th>
                                <th scope="col" className="p-4 font-medium min-w-60 border-r border-slate-200">Nama Usaha Rantai Pasok</th>
                                <th scope="col" className="p-4 font-medium min-w-32 border-r border-slate-200">Tanggal Pengawasan</th>
                                <th scope="col" className="p-4 font-medium min-w-44 border-r border-slate-200">Kepemilikan dan Keabsahan Perizinan Berusaha</th>
                                <th scope="col" className="p-4 font-medium min-w-48 border-r border-slate-200">Kepemilikan dan Keabsahan Perizinan Penggunaan Material, Peralatan, dan Teknologi</th>
                                <th scope="col" className="p-4 font-medium min-w-36 border-r border-slate-200">Pencatatan dalam SIMPK</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700">
                        {
                            filteredDaftarPengawasan.map((pengawasan, i) => (
                            <tr key={pengawasan.id} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="px-4 py-5 text-center">{i + 1}</td>
                                <td className="px-4 py-5">
                                    <div>
                                        <Link href={`/admin/pengawasan/usaha/1/${jenisRantaiPasok.slug}/${pengawasan.id}`} className="uppercase hover:text-blue-600 hover:underline">
                                            {pengawasan.usaha.nama}
                                        </Link>
                                        <div className="font-light text-slate-500">NIB: {pengawasan.usaha.nib ? pengawasan.usaha.nib : "-"}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-5 text-center">{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</td>
                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPerizinanBerusaha)}</td>
                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPerizinanPenggunaan)}</td>
                                <td className="px-4 py-5 text-center">{getTertibStatusBadge(pengawasan.tertibPencatatanSIMPK)}</td>
                                <td className="px-4 py-5">
                                    <div className="flex justify-end gap-x-2">
                                        <Link
                                            href={`/admin/pengawasan/usaha/1/${jenisRantaiPasok.slug}/${pengawasan.id}`}
                                            className="flex items-center gap-x-1 rounded border border-slate-200 text-slate-500 px-2.5 py-1.5 hover:bg-slate-200"
                                        >
                                            Lihat
                                        </Link>
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
    )
}
