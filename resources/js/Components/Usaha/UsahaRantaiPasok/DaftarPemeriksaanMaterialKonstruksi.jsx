import React from "react";
import Card from "../../Card";
import {
    LiaAngleDownSolid,
    LiaFilterSolid,
    LiaPlusCircleSolid,
    LiaSearchSolid
} from "react-icons/lia";
import FormPemeriksaanMaterialKonstruksi from "./FormPemeriksaanMaterialKonstruksi";

export default ({
    jenisRantaiPasok,
    pengawasanId,
    daftarMaterialKonstruksi,
}) => {

    const [ isModalPemeriksaanOpen, setIsModalPemeriksaanOpen ] = React.useState(false);

    return (
        <>
            <Card className="w-full">
                <Card.Header>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-x-2">
                            <button
                                className="w-full flex justify-center items-center space-x-2.5 text-slate-500 group hover:bg-slate-50 hover:text-blue-500 border border-slate-200 rounded text-xs tracking-wide px-2.5 py-2"
                            >
                                <span className="flex items-center space-x-1">
                                    <LiaFilterSolid size={16} />
                                    <span className="group-hover:text-blue-500 text-slate-600">Filter</span>
                                </span>
                                <LiaAngleDownSolid size={12} />
                            </button>
                            <div className="relative mx-2">
                                <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
                                    <LiaSearchSolid size={18} className="text-slate-500 -scale-x-100" />
                                </div>
                                <input type="search" name="search" placeholder="Cari..."
                                className="border border-slate-200 rounded py-2 pl-8 block w-56 text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs" />
                            </div>
                        </div>
                        <div>
                            <button
                                className="w-full flex justify-center items-center space-x-1 text-white bg-blue-600 hover:bg-blue-800 rounded text-[11px] tracking-wide px-2.5 py-2 shadow-sm"
                                onClick={() => setIsModalPemeriksaanOpen(true)}
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
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
                                <tr className="border-b border-slate-200">
                                    <th scope="col" className="p-4 font-medium border-r border-slate-200">#</th>
                                    <th scope="col" className="p-4 font-medium min-w-64 border-r border-slate-200">Nama Varian dan Sub Varian Produk</th>
                                    <th scope="col" className="p-4 font-medium border-r border-slate-200">Merk Produk</th>
                                    <th scope="col" className="p-4 font-medium border-r border-slate-200">Sertifikat TKDN</th>
                                    <th scope="col" className="p-4 font-medium border-r border-slate-200">Sertifikat SNI / Sertifikat Standar yang Berlaku</th>
                                    {
                                        jenisRantaiPasok.pelakuUsaha === "Produsen" ? (
                                            <>
                                                <th scope="col" className="p-4 font-medium border-r border-slate-200">Pencatatan dalam SIMPK</th>
                                                <th scope="col" className="p-4 font-medium border-r border-slate-200">No. Registrasi Pencatatan dalam SIMPK</th>
                                            </>
                                        ) : (
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Tercantum dalam SIMPK</th>
                                        )
                                    }
                                    <th></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </Card.Body>
            </Card>
            <FormPemeriksaanMaterialKonstruksi
                isVisible={isModalPemeriksaanOpen}
                onClose={() => setIsModalPemeriksaanOpen(false)}
                pengawasanId={pengawasanId}
                jenisRantaiPasok={jenisRantaiPasok}
            />
        </>
    )
}
