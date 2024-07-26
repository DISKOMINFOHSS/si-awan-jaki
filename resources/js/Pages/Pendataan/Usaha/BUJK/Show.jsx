import React from "react";

import Layout from "../../../../Components/Layout";
import Breadcrumb from "../../../../Components/Breadcrumb";
import Card from "../../../../Components/Card";
import DaftarSertifikatStandar from "../../../../Components/Usaha/DaftarSertifikatStandar";

import {
    LiaHomeSolid,
    LiaFileAlt,
    LiaCloudUploadAltSolid,
    LiaPlusCircleSolid,
    LiaEllipsisVSolid,
    LiaSearchSolid
} from "react-icons/lia";
import Modal from "../../../../Components/Modal";
import FormPaketPekerjaan from "../../../../Components/Usaha/FormPaketPekerjaan";


const PendataanBUJKShow = ({ data }) => {
    console.log(data);
    const { usaha } = data;
    const { dokumenNIB, jenisUsaha } = usaha;

    const [isModalPaketPekerjaanOpen, setIsModalPaketPekerjaan] = React.useState(false);

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pendataan/usaha/${jenisUsaha.slug}`}>Daftar {jenisUsaha.jenisUsaha}</Breadcrumb.Item>
                <Breadcrumb.Item active>{usaha.nama}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center my-2">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Detail Usaha Jasa Konstruksi</h3>
                    <h1 className="font-medium text-xl text-slate-800">{usaha.nama}</h1>
                </div>
                {/* <div className="flex items-center gap-x-2">
                    <Link
                        href={`/admin/pendataan/bangunan/${bangunan.id}/edit`}
                        className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white"
                    >
                        <LiaEditSolid size={18} />
                        <span>Edit Informasi</span>
                    </Link>
                </div> */}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <Card className="col-span-2 w-full h-fit">
                    <Card.Body className="p-4 text-xs">
                        <div className="pb-3 border-b border-slate-200">
                            <div className="font-medium">Nama {jenisUsaha.jenisUsaha}</div>
                            <div className="font-light text-slate-500 uppercase">{usaha.nama}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-x-4 border-b border-slate-200 py-3">
                            <div>
                                <div className="font-medium">NIB</div>
                                <div className="font-light text-slate-500 uppercase">{usaha.nib}</div>
                            </div>
                            <div className="col-span-2">
                                <div className="font-medium">Dokumen NIB</div>
                                <div className="flex gap-x-2 items-start mt-1 group">
                                    <div className="bg-blue-100 text-blue-600 rounded p-2">
                                        <LiaFileAlt size={18} />
                                    </div>
                                    <a href={dokumenNIB.filePath} target="_blank" className="group-hover:text-blue-600 group-hover:underline">
                                        <div className="font-normal uppercase">{usaha.nama}</div>
                                        <div className="font-light text-slate-500 line-clamp-1">{dokumenNIB.fileName}</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="pt-3 grid grid-cols-3 gap-x-4">
                            {
                                jenisUsaha.jenisUsaha !== "Usaha Orang Perseorangan" && (
                                    <div>
                                        <div className="font-medium">Penanggung Jawab (PJBU)</div>
                                        <div className="font-light text-slate-500">{usaha.pjbu}</div>
                                    </div>
                                )
                            }
                            <div className="col-span-2">
                                <div className="font-medium">Alamat</div>
                                <div className="font-light text-slate-500">{usaha.alamat ? usaha.alamat : "-"}</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <DaftarSertifikatStandar usaha={usaha} />
                <Card className="w-full h-fit">
                    <Card.Header className="flex justify-between items-center">
                        <h3 className="font-medium text-slate-700">Laporan</h3>
                    </Card.Header>
                    <Card.Body className="p-4 space-y-5">
                        <div className="space-y-2 text-xs">
                            <button
                                type="button"
                                className="group w-full py-5 rounded border border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100"
                            >
                                <div className="rounded bg-blue-100 group-hover:bg-blue-200 text-blue-600 w-fit mx-auto p-2">
                                    <LiaCloudUploadAltSolid size={24} />
                                </div>
                                <div className="mt-2 text-slate-700">
                                    <div className="">
                                        <span className="font-medium text-blue-600 group-hover:underline">Klik di sini</span> untuk menambah laporan
                                    </div>
                                    <div className="font-light text-slate-500">(Maks. 2 MB)</div>
                                </div>
                            </button>
                        </div>
                    </Card.Body>
                </Card>
                <div className="col-span-2">
                    <Card className="w-full">
                        <Card.Header>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium text-slate-700">Paket Pekerjaan</h3>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <div className="relative mx-2">
                                        <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
                                            <LiaSearchSolid size={18} className="text-slate-500 -scale-x-100" />
                                        </div>
                                        <input type="search" name="search" placeholder="Cari..."
                                        className="border border-slate-200 rounded py-2 pl-8 block w-56 text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs" />
                                    </div>
                                    <button
                                        onClick={() => setIsModalPaketPekerjaan(true)}
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
                                        <tr>
                                            <th scope="col" className="p-4 font-medium">#</th>
                                            <th scope="col" className="p-4 font-medium min-w-64">Nama Paket Pekerjaan</th>
                                            <th scope="col" className="p-4 font-medium min-w-40">Jenis Usaha</th>
                                            <th scope="col" className="p-4 font-medium min-w-32">Sifat Usaha</th>
                                            <th scope="col" className="p-4 font-medium min-w-72">Subklasifikasi Usaha</th>
                                            <th scope="col" className="p-4 font-medium min-w-40">Layanan Usaha</th>
                                            <th scope="col" className="p-4 font-medium min-w-36">Bentuk Usaha</th>
                                            <th scope="col" className="p-4 font-medium min-w-40">Kualifikasi Usaha</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <FormPaketPekerjaan
                isVisible={isModalPaketPekerjaanOpen}
                onClose={() => setIsModalPaketPekerjaan(false)}
                usahaId={usaha.id}
            />
        </>
    );
}

PendataanBUJKShow.layout = page => <Layout children={page} />;

export default PendataanBUJKShow;
