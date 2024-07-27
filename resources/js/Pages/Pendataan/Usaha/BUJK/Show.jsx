import React from "react";

import Layout from "../../../../Components/Layout";
import Breadcrumb from "../../../../Components/Breadcrumb";
import Card from "../../../../Components/Card";

import DaftarSertifikatStandar from "../../../../Components/Usaha/DaftarSertifikatStandar";
import DaftarPaketPekerjaan from "../../../../Components/Usaha/DaftarPaketPekerjaan";

import {
    LiaHomeSolid,
    LiaFileAlt,
    LiaCloudUploadAltSolid,
    LiaPlusCircleSolid,
    LiaEllipsisVSolid,
    LiaSearchSolid
} from "react-icons/lia";

const PendataanBUJKShow = ({ data }) => {
    console.log(data);
    const { usaha } = data;
    const { dokumenNIB, jenisUsaha, daftarPaketPekerjaan } = usaha;

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
                                {
                                    dokumenNIB ? (
                                        <div className="flex gap-x-2 items-start mt-1 group">
                                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                                <LiaFileAlt size={18} />
                                            </div>
                                            <a href={dokumenNIB.filePath} target="_blank" className="group-hover:text-blue-600 group-hover:underline">
                                                <div className="font-normal uppercase">{usaha.nama}</div>
                                                <div className="font-light text-slate-500 line-clamp-1">{dokumenNIB.fileName}</div>
                                            </a>
                                        </div>
                                    ) : (
                                        <label htmlFor="dokumenNIB">
                                            <div className="group mt-1 w-fit flex items-center justify-between gap-x-10 p-2 rounded border border-dashed border-slate-200 hover:bg-slate-100">
                                                <div className="flex items-start gap-x-2">
                                                    <div className="rounded bg-slate-100 group-hover:bg-slate-200 text-slate-500 w-fit p-2">
                                                        <LiaCloudUploadAltSolid size={18} />
                                                    </div>
                                                    <div>
                                                        <div className="font-normal text-xs ">Upload Dokumen NIB</div>
                                                        <div className="font-light text-slate-500 text-[11px]">Maks. 2 MB</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button className="text-[11px] text-slate-700 border border-slate-200 bg-white px-2 py-1 rounded">
                                                        Browse
                                                    </button>
                                                </div>
                                            </div>
                                            <input type="file" id="dokumenNIB" className="hidden" />
                                        </label>
                                    )
                                }
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
                    <DaftarPaketPekerjaan
                        daftarPaketPekerjaan={daftarPaketPekerjaan}
                        usahaId={usaha.id}
                    />
                </div>
            </div>
        </>
    );
}

PendataanBUJKShow.layout = page => <Layout children={page} />;

export default PendataanBUJKShow;
