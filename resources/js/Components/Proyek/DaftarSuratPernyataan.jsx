import React from "react";
import Card from "../Card";

import {
    LiaPlusCircleSolid,
    LiaFileAlt,
    LiaEditSolid,
    LiaTrashAltSolid
} from "react-icons/lia";
import FormAddSuratPernyataan from "./FormAddSuratPernyataan";

export default ({ proyekKonstruksi }) => {
    const { daftarSuratPernyataan } = proyekKonstruksi;
    const [ isModalSuratPernyataanOpen, setIsModalSuratPernyataanOpen ] = React.useState(false);

    return (
        <>
            <Card className="w-full h-fit">
                <Card.Header className="flex justify-between items-center">
                    <div>
                        <h3 className="font-medium text-slate-700 leading-tight">Surat Pernyataan</h3>
                        <h4 className="font-light text-slate-500 text-xs">Bukti Dukung Pengawasan Rutin Tertib Penyelenggaraan Jasa Konstruksi</h4>
                    </div>
                    <div>
                        <button
                            className="w-full flex justify-center items-center space-x-1 text-white bg-blue-600 hover:bg-blue-800 rounded text-[11px] tracking-wide px-2.5 py-2 shadow-sm"
                            onClick={() => setIsModalSuratPernyataanOpen(true)}
                        >
                            <LiaPlusCircleSolid size={16} />
                            <span>Tambah</span>
                        </button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-xs">
                            <tbody>
                                {
                                    daftarSuratPernyataan.map((suratPernyataan) => {
                                        const daftarDokumen = suratPernyataan.suratPernyataan.map(
                                            (surat, i) => surat.suratPernyataanId && (
                                                <tr key={surat.kategoriId} className="border-b border-slate-100 hover:bg-slate-50">
                                                    <td className="px-4 py-2.5">
                                                        <a target="_blank" href={surat.filePath} className="flex gap-x-2 items-start group cursor-pointer">
                                                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                                                <LiaFileAlt size={18} />
                                                            </div>
                                                            <div className="group-hover:text-blue-600 group-hover:underline">
                                                                <div className="font-medium">
                                                                    Surat Pernyataan -
                                                                    {
                                                                        surat.kategoriId === 6 || surat.kategoriId === 8 ?
                                                                        " Pimpinan BUJK" :
                                                                        ` ${proyekKonstruksi.penggunaJasa.pelaku_pengadaan}`
                                                                    }
                                                                </div>
                                                                <div className="font-light text-slate-500 line-clamp-2">{surat.kategori}</div>
                                                            </div>
                                                        </a>
                                                    </td>
                                                    <td className="px-4 py-2.5 text-center">
                                                        <div className="flex justify-end gap-x-2">
                                                            <button
                                                                type="button"
                                                                className="rounded border border-slate-200 text-slate-500 p-2 hover:bg-slate-200"
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
                                        ));

                                        return (
                                            <React.Fragment key={suratPernyataan.id}>
                                                <tr className="bg-blue-100">
                                                    <td colSpan="2" className="px-4 py-2">{suratPernyataan.id}. {suratPernyataan.lingkupPengawasan}</td>
                                                </tr>
                                                {daftarDokumen}
                                            </React.Fragment>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </Card.Body>
            </Card>
            <FormAddSuratPernyataan
                isVisible={isModalSuratPernyataanOpen}
                onClose={() => setIsModalSuratPernyataanOpen(false)}
                proyekKonstruksi={proyekKonstruksi}
            />
        </>
    )
}
