import React from "react";
import Card from "../../Card";

import FormAddTargetRealisasiFisik from "./FormAddTargetRealisasiFisik";
import { formatDateToIndonesia } from "../../../Utils/formatDate";

import { LiaPlusCircleSolid, LiaCalendarDaySolid, LiaEditSolid } from "react-icons/lia";

function getRealisasiFisikProgressBar(target, realisasi) {
    if (realisasi === null) return;

    if (realisasi === 100) {
        return (
            <div className="flex items-center gap-x-2">
                <span className="text-blue-400">{realisasi}%</span>
                <div className="w-full bg-slate-200 rounded-full h-2.5 flex items-center">
                    <div className={`bg-green-500 h-2.5 rounded-full w-[100}%]`}></div>
                </div>
            </div>
        );
    }

    return realisasi >= target ? (
        <div className="flex items-center gap-x-2">
            <span className="text-blue-500">{realisasi}%</span>
            <div className="w-full bg-slate-200 rounded-full h-2.5 flex items-center">
                <div className={`bg-blue-500 h-2.5 rounded-full w-[${Math.ceil(realisasi / 5)*5}%]`}></div>
            </div>
        </div>
    ) : (
        <div className="flex items-center gap-x-2">
            <span className="text-red-500">{realisasi}%</span>
            <div className="w-full bg-slate-200 rounded-full h-2.5 flex items-center">
                <div className={`bg-red-500 h-2.5 rounded-full w-[${Math.ceil(realisasi / 5)*5}%]`}></div>
            </div>
        </div>
    );
}

export default ({ realisasiFisik, tahun, pengawasanId }) => {
    const [ isModalTargetRealisasiFisikOpen, setIsModalTargetRealisasiFisikOpen ] = React.useState(false);

    return (
        <>
            <Card>
                <Card.Header className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-medium text-sm text-slate-700">Daftar Realisasi Fisik</h3>
                            <h4 className="font-light text-xs text-slate-500">Pengawasan Progress Proyek Konstruksi</h4>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <button
                                onClick={() => setIsModalTargetRealisasiFisikOpen(true)}
                                className="w-full flex justify-center items-center space-x-1 text-white bg-blue-600 hover:bg-blue-800 rounded text-[11px] tracking-wide px-2.5 py-2 shadow-sm"
                            >
                                <LiaPlusCircleSolid size={16}/>
                                <span>Tambah</span>
                            </button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase">
                                <tr className="border-b border-slate-200">
                                    <th scope="col" className="p-4 font-medium border-r border-slate-200 w-48">Tanggal</th>
                                    <th scope="col" className="p-4 font-medium border-r border-slate-200">Target</th>
                                    <th scope="col" className="p-4 font-medium border-r border-slate-200 min-w-40">Realisasi</th>
                                    <th scope="col" className="p-4 font-medium border-r border-slate-200 min-w-56">Foto Lapangan</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                {
                                    realisasiFisik.map((realisasi, i) => (
                                        <tr key={realisasi.id} className="border-b border-slate-100 hover:bg-slate-50">
                                            <td className="px-4 py-5 w-52">
                                                <div className="flex items-center gap-x-2">
                                                    <div className="bg-blue-100 text-blue-600 w-8 aspect-square rounded flex items-center justify-center text-sm">
                                                        <LiaCalendarDaySolid size={18} />
                                                    </div>
                                                    <div className="text-xs text-slate-700">
                                                        <div className="font-light text-slate-500">Tanggal</div>
                                                        <div>{formatDateToIndonesia(realisasi.tanggal)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-5 text-center">{realisasi.target} %</td>
                                            <td className="px-4 py-5 text-center">{getRealisasiFisikProgressBar(realisasi.target, realisasi.realisasi)}</td>
                                            <td className="px-4 py-5 text-center"></td>
                                            <td className="px-4 py-5">
                                                <div className="flex justify-end gap-x-2">
                                                    <button
                                                        type="button"
                                                        className="flex items-center rounded border border-slate-200 text-slate-700 w-8 aspect-square justify-center hover:bg-slate-200"
                                                    >
                                                        <LiaEditSolid size={18} />
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
            <FormAddTargetRealisasiFisik
                isVisible={isModalTargetRealisasiFisikOpen}
                onClose={() => setIsModalTargetRealisasiFisikOpen(false)}
                tahun={tahun}
                pengawasanId={pengawasanId}
            />
        </>
    );
}
