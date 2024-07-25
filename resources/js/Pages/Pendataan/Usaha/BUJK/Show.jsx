import React from "react";

import Layout from "../../../../Components/Layout";
import Breadcrumb from "../../../../Components/Breadcrumb";
import Card from "../../../../Components/Card";

import {
    LiaHomeSolid,
    LiaFileAlt,
    LiaCloudUploadAltSolid,
    LiaPlusSolid,
    LiaFileMedicalSolid,
    LiaEditSolid,
} from "react-icons/lia";
import Modal from "../../../../Components/Modal";
import FormSBU from "../../../../Components/Usaha/FormSBU";

const PendataanBUJKShow = ({ data }) => {
    console.log(data);
    const { usaha } = data;
    const { dokumenNIB, jenisUsaha } = usaha;

    const [isModalSBUOpen, setIsModalSBUOpen] = React.useState(false);

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pendataan/usaha/${jenisUsaha.slug}`}>{jenisUsaha.jenisUsaha}</Breadcrumb.Item>
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
                <Card className="w-full h-fit">
                    <Card.Header className="flex justify-between items-center">
                        <div>
                            <h3 className="font-medium text-slate-700 leading-tight">Sertifikat Badan Usaha (SBU)</h3>
                            <h4 className="font-light text-slate-500 text-xs">Lorem ipsum dolor sit amet</h4>
                        </div>
                        <div>
                            <button
                                className="w-full flex justify-center items-center space-x-1 text-blue-500 border border-blue-500 hover:bg-slate-100 rounded text-xs tracking-wide px-2.5 py-2 shadow-sm"
                            >
                                <LiaEditSolid size={16} />
                                <span>Edit</span>
                            </button>
                        </div>
                    </Card.Header>
                    <Card.Body className="p-4 space-y-5">
                        <div className="space-y-2 text-xs">
                            <button
                                type="button"
                                className="group w-full py-5 rounded border border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100"
                                onClick={() => setIsModalSBUOpen(true)}
                            >
                                <div className="rounded bg-blue-100 group-hover:bg-blue-200 text-blue-600 w-fit mx-auto p-2">
                                    <LiaCloudUploadAltSolid size={24} />
                                </div>
                                <div className="mt-2 text-slate-700">
                                    <div className="">
                                        <span className="font-medium text-blue-600 group-hover:underline">Klik di sini</span> untuk mengunggah SBU
                                    </div>
                                    <div className="font-light text-slate-500">(Maks. 2 MB)</div>
                                </div>
                            </button>
                        </div>
                    </Card.Body>
                </Card>
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
            </div>
            {/* <Modal
                isVisible={isModalSBUOpen}
                className="w-full max-w-lg h-fit mt-10"
            >
                <Modal.Header onClose={() => setIsModalSBUOpen(false)}>
                    <div className="text-center mb-7">
                        <h1 className="font-medium text-slate-800">Tambah Sertifikat Badan Usaha (SBU)</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pendataan Badan Usaha Jasa Konstruksi</h2>
                    </div>
                </Modal.Header>
               <Modal.Body>
                    <form method="post" className="grid grid-cols-2 gap-5 mb-2">
                        <div className="col-span-2">
                            <label htmlFor="nama" className="block mb-2 text-xs font-medium text-slate-800">Nama Badan Usaha Jasa Konstruksi</label>
                            <input
                                type="text" name="nama" id="nama" value={usaha.nama} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="nib" className="block mb-2 text-xs font-medium text-slate-800">NIB</label>
                            <input
                                type="text" name="nib" id="nib" value={usaha.nib} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="pjbu" className="block mb-2 text-xs font-medium text-slate-800">PJBU</label>
                            <input
                                type="text" name="pjbu" id="pjbu" value={usaha.pjbu} disabled
                                className="px-3 py-2 block w-full rounded-md bg-slate-50 border-slate-200 text-slate-500 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="block mb-2 text-xs font-medium text-slate-800">Upload Dokumen SBU</div>
                            <label htmlFor="dokumen">
                                <div className="group w-full px-2.5 py-5 rounded border border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100">
                                    <div className="rounded bg-blue-100 group-hover:bg-blue-200 text-blue-600 w-fit mx-auto p-2">
                                        <LiaCloudUploadAltSolid size={24} />
                                    </div>
                                    <div className="mt-2 text-xs text-center text-slate-700">
                                        <div className="">
                                            <span className="font-medium text-blue-600 group-hover:underline">Klik di sini</span> untuk mengunggah dokumen
                                        </div>
                                        <div className="font-light text-slate-500">(Maks. 2 MB)</div>
                                    </div>
                                </div>
                                <input type="file" id="dokumen" className="hidden" />
                            </label>
                        </div>
                        <div className="col-span-2 flex justify-end items-center gap-x-2">
                            <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-3">Batal</button>
                            <button type="submit" className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-2.5">
                                Tambah
                            </button>
                        </div>
                    </form>
               </Modal.Body>
            </Modal> */}
            <FormSBU
                isVisible={isModalSBUOpen}
                onClose={() => setIsModalSBUOpen(false)}
                usaha={{
                    id: usaha.id,
                    nama: usaha.nama,
                    nib: usaha.nib,
                    pjbu: usaha.pjbu
                }}
            />
        </>
    );
}

PendataanBUJKShow.layout = page => <Layout children={page} />;

export default PendataanBUJKShow;
