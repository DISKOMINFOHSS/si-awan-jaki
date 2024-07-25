import React from "react";
import { Link } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";
import Card from "../../../Components/Card";

import FormUsaha from "../../../Components/Usaha/FormUsaha";

import {
    LiaHomeSolid,
    LiaSearchSolid,
    LiaPlusSolid,
    LiaFilterSolid,
    LiaAngleDownSolid,
    LiaAngleRightSolid,
    LiaCircleSolid
} from "react-icons/lia";

const PendataanUsahaIndex = ({ data }) => {
    console.log(data);
    const { jenisUsaha } = data;
    const [isModalUsahaOpen, setIsModalUsahaOpen] = React.useState(false);

    const { daftarUsaha } = jenisUsaha;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/pendataan/usaha">Pilih Usaha</Breadcrumb.Item>
                <Breadcrumb.Item active>Daftar {jenisUsaha.jenisUsaha}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                <div>
                    <div className="flex gap-x-2 items-center">
                        <h1 className="font-medium text-xl text-slate-800">{jenisUsaha.jenisUsaha}</h1>
                        <span className="rounded-full text-[11px] px-2 py-0.5 bg-blue-100 text-blue-500 font-medium">{daftarUsaha.length}</span>
                    </div>
                    <h2 className="font-light text-xs text-slate-500">Pendataan Usaha Jasa Konstruksi di Kab. Hulu Sungai Selatan</h2>
                </div>
            </div>
            <div className="mb-5 flex justify-between gap-x-4">
                <div className="relative w-2/3">
                    <div className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center">
                        <LiaSearchSolid size={18} className="text-slate-500 -scale-x-100" />
                    </div>
                    <input
                        type="search" name="search" placeholder="Cari..."
                        className="border border-slate-200 rounded-md py-2.5 pl-9 block w-full text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs"
                    />
                </div>
                <div className="flex items-center gap-x-3">
                    <button
                        className="w-full flex justify-center items-center space-x-1 text-white bg-blue-600 hover:bg-blue-800 rounded text-xs tracking-wide p-2.5 shadow-sm"
                        onClick={() => setIsModalUsahaOpen(true)}
                    >
                        <LiaPlusSolid className="stroke-2" />
                        <span>Tambah</span>
                    </button>
                    <button
                        className="w-full flex justify-center items-center space-x-2.5 text-slate-500 group hover:bg-slate-50 hover:text-blue-500 border border-slate-200 rounded text-xs tracking-wide px-3 py-2.5 shadow-sm"
                    >
                        <span className="flex items-center space-x-1">
                            <LiaFilterSolid size={16} />
                            <span className="group-hover:text-blue-500 text-slate-600">Filter</span>
                        </span>
                        <LiaAngleDownSolid size={12} />
                    </button>
                </div>
            </div>
            <Card className="w-full">
                <Card.Body>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-xs">
                            <tbody>
                            {
                                daftarUsaha.map((usaha) => (
                                    <tr key={usaha.id} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="px-4 py-5">
                                            <div>
                                                <Link href={`/admin/pendataan/usaha/${jenisUsaha.slug}/${usaha.id}`} className="uppercase hover:text-blue-600 hover:underline">{usaha.nama}</Link>
                                                <div className="font-light text-slate-500 flex gap-x-2 items-center">
                                                    <span>NIB: {usaha.nib ? usaha.nib : "-"}</span>
                                                    <LiaCircleSolid size={4} className="stroke-2 text-slate-800"/>
                                                    <span>{usaha.pjbu}</span>
                                                </div>
                                            </div>
                                        </td>
                                        {
                                            jenisUsaha.jenisUsaha === 'Usaha Rantai Pasok' && (
                                                <td className="px-4 py-5 hidden md:table-cell">
                                                    <div>
                                                        <div>{usaha.jenisRantaiPasok.pelakuUsaha} Rantai Pasok</div>
                                                        <div className="font-light text-slate-500 flex gap-x-2 items-center">{usaha.jenisRantaiPasok.kategoriSumberDaya} Konstruksi</div>
                                                    </div>
                                                </td>
                                            )
                                        }
                                        <td className="px-4 py-5 flex justify-end">
                                            <Link href={`/admin/pendataan/usaha/${jenisUsaha.slug}/${usaha.id}`} className="w-fit p-2 flex items-center gap-x-1.5 text-slate-600 hover:text-blue-600">
                                                <LiaAngleRightSolid size={16} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </Card.Body>

            </Card>
            <FormUsaha
                isVisible={isModalUsahaOpen}
                onClose={() => setIsModalUsahaOpen(false)}
                jenisUsaha={{
                    id: jenisUsaha.id,
                    jenisUsaha: jenisUsaha.jenisUsaha,
                    daftarJenisRantaiPasok: jenisUsaha.daftarJenisRantaiPasok,
                }}
            />
        </>
    );
}

PendataanUsahaIndex.layout = page => <Layout children={page} />;

export default PendataanUsahaIndex;
