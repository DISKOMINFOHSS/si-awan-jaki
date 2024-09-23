import React from "react";
import Card from "../../Card";

import { LiaPlusCircleSolid, LiaCalendarDaySolid, LiaEditSolid } from "react-icons/lia";
import ModalError from "../../ModalError";
import FormAddTargetRealisasiKeuangan from "./FormAddTargetRealisasiKeuangan";

export default ({ realisasiKeuangan, tahun, pengawasanId }) => {
    const [ isModalTargetRealisasiKeuanganOpen, setIsModalTargetRealisasiKeuanganOpen ] = React.useState(false);
    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);

    const [ isModalRealisasiKeuanganOpen, setIsModalRealisasiKeuanganOpen ] = React.useState(false);
    const [ selectedRealisasi, setSelectedRealisasi ] = React.useState({});

    return (
        <>
            <Card>
                <Card.Header className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-medium text-sm text-slate-700">Daftar Realisasi Keuangan</h3>
                            <h4 className="font-light text-xs text-slate-500">Pengawasan Progress Proyek Konstruksi</h4>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <button
                                onClick={() => setIsModalTargetRealisasiKeuanganOpen(true)}
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
                                    <th scope="col" className="p-4 font-medium border-r border-slate-200">Jumlah Pembayaran</th>
                                    <th scope="col" className="p-4 font-medium border-r border-slate-200 min-w-40">Tanggal Dibayar</th>
                                    <th scope="col" className="p-4 font-medium border-r border-slate-200 min-w-40">Realisasi /<br /> Jumlah Dibayar</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">

                            </tbody>
                        </table>
                    </div>
                </Card.Body>
            </Card>
            <FormAddTargetRealisasiKeuangan
                isVisible={isModalTargetRealisasiKeuanganOpen}
                onClose={() => setIsModalTargetRealisasiKeuanganOpen(false)}
                tahun={tahun}
                pengawasanId={pengawasanId}
            />
            <ModalError
                isVisible={isModalErrorOpen}
                onClose={() => setIsModalErrorOpen(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Realisasi sebelumnya belum diisi. Silakan isi realisasi sebelumnya terlebih dahulu.
                </div>
            </ModalError>
        </>
    )
}
