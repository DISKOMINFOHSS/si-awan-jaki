import React from "react";
import Card from "../Card";

import {
    LiaPlusCircleSolid,
    LiaFolderSolid,
    LiaEditSolid,
    LiaTrashAltSolid,
} from "react-icons/lia";
import FormBuktiDukung from "./FormBuktiDukung";

export default ({ bangunanId, daftarBuktiDukung }) => {
    const [ isModalBuktiDukungOpen, setIsModalBuktiDukungOpen ] = React.useState(false);

    const [ selectedBuktiDukung, setSelectedBuktiDukung ] = React.useState({});
    function handleSelectBuktiDukung(bukti) {
        setSelectedBuktiDukung(bukti);
        setIsModalBuktiDukungOpen(true);
    }

    return (
        <>
            <Card className="w-full h-fit">
                <Card.Header className="flex justify-between items-center">
                    <div>
                        <h3 className="font-medium text-slate-700 leading-tight">Dokumen Bukti Dukung</h3>
                        <h4 className="font-light text-slate-500 text-xs">Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</h4>
                    </div>
                    <div>
                        <button
                            className="w-full flex justify-center items-center space-x-1 text-white bg-blue-600 hover:bg-blue-800 rounded text-[11px] tracking-wide px-2.5 py-2 shadow-sm"
                            onClick={() => setIsModalBuktiDukungOpen(true)}
                        >
                            <LiaPlusCircleSolid size={16} />
                            <span>Tambah</span>
                        </button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-xs">
                            <tbody className="text-slate-700">
                                {
                                    daftarBuktiDukung.map((bukti) => (
                                        <tr key={bukti.id} className="border-b border-slate-100 hover:bg-slate-50">
                                            <td className="px-4 py-2.5">
                                                <a target="_blank" href={bukti.url} className="flex gap-x-2 items-start group cursor-pointer">
                                                    <div className="bg-blue-100 text-blue-600 rounded p-2">
                                                        <LiaFolderSolid size={18} />
                                                    </div>
                                                    <div className="group-hover:text-blue-600 group-hover:underline">
                                                        <div className="font-medium">{bukti.label} - Tahun {bukti.tahun}</div>
                                                        <div className="font-light text-slate-500 line-clamp-2">{bukti.url}</div>
                                                    </div>
                                                </a>
                                            </td>
                                            <td className="px-4 py-2.5 text-center">
                                                <div className="flex justify-end gap-x-2">
                                                    <button
                                                        type="button"
                                                        className="rounded border border-slate-200 text-slate-500 p-2 hover:bg-slate-200"
                                                        onClick={() => handleSelectBuktiDukung(bukti)}
                                                    >
                                                        <LiaEditSolid size={18} />
                                                    </button>
                                                    <button
                                                        className="rounded border border-slate-200 text-red-500 p-2 hover:bg-slate-200"
                                                    >
                                                        <LiaTrashAltSolid size={18} />
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
            <FormBuktiDukung
                isVisible={isModalBuktiDukungOpen}
                onClose={() => setIsModalBuktiDukungOpen(false)}
                bangunanId={bangunanId}
                buktiDukung={selectedBuktiDukung}
            />
        </>
    )
}
