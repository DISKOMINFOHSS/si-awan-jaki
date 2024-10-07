import React from "react";

import Layout from "../../../../Components/Layout";
import Breadcrumb from "../../../../Components/Breadcrumb";
import Card from "../../../../Components/Card";
import FormRekomendasi from "../../../../Components/Pengawasan/FormRekomendasi";

import getDefaultData from "../../../../Utils/getDefaultData";
import { getTertibStatusBadge } from "../../../../Utils/getStatusBadge";
import { formatDateToIndonesia } from "../../../../Utils/formatDate";

import { LiaCloudUploadAltSolid, LiaFileAlt, LiaHomeSolid } from "react-icons/lia";

const RekomendasiPengawasanUsahaPerseorangan = ({ data }) => {
    console.log(data);
    const { lingkupPengawasan, pengawasan } = data;
    const { usaha } = pengawasan;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pengawasan/usaha/${lingkupPengawasan.id}/usaha-perseorangan/${pengawasan.id}`}>{usaha.nama}</Breadcrumb.Item>
                <Breadcrumb.Item active>Rekomendasi</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mt-2 mb-4">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Pengawasan Tertib Usaha Jasa Konstruksi</h3>
                    <h1 className="font-medium text-xl text-slate-800 uppercase">{usaha.nama}</h1>
                    <h2 className="text-xs text-slate-600">{lingkupPengawasan.lingkupPengawasan}</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                <Card>
                    <Card.Body className="p-4 text-xs">
                        <div className="pb-3 border-b border-slate-200">
                            <div className="font-medium">Nama Usaha Orang Perseorangan</div>
                            <div className="font-light text-slate-500 uppercase">{usaha.nama}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-x-4 border-b border-slate-200 py-3">
                            <div>
                                <div className="font-medium">NIB</div>
                                <div className="font-light text-slate-500">{usaha.nib ? usaha.nib : "-"}</div>
                            </div>
                            <div className="col-span-2">
                                <div className="font-medium">Dokumen NIB</div>
                                {
                                    usaha.dokumenNIB ? (
                                        <div className="flex gap-x-2 items-start mt-1 group">
                                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                                <LiaFileAlt size={18} />
                                            </div>
                                            <a href={usaha.dokumenNIB.filePath} target="_blank" className="text-slate-800 group-hover:text-blue-600 group-hover:underline">
                                                <div className="font-normal uppercase">{usaha.nama}</div>
                                                <div className="font-light text-slate-500">NIB: {usaha.nib}</div>
                                                <div className="font-light text-slate-500 line-clamp-1">{usaha.dokumenNIB.fileName}</div>
                                            </a>
                                        </div>
                                    ) : (
                                        <button
                                            type="button" disabled
                                            className="group mt-1 w-fit flex items-center justify-between gap-x-10 p-2 rounded border border-dashed border-slate-200 hover:bg-slate-100"
                                        >
                                            <div className="flex items-start gap-x-2">
                                                <div className="rounded bg-blue-50 group-hover:bg-blue-100 text-blue-500 w-fit p-2">
                                                    <LiaCloudUploadAltSolid size={18} />
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-normal text-xs">Upload Dokumen NIB</div>
                                                    <div className="font-light text-slate-500 text-[11px]">Maks. 2 MB</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[11px] text-slate-700 border border-slate-200 bg-white px-2 py-1 rounded">
                                                    Browse
                                                </div>
                                            </div>
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                        <div className="pt-3">
                            <div className="font-medium">Alamat</div>
                            <div className="font-light text-slate-500">{usaha.alamat}</div>
                        </div>
                    </Card.Body>
                </Card>
                <div className="space-y-4">
                    <Card className="h-fit w-full">
                        <Card.Body className="p-4 text-xs">
                            <div className="grid grid-cols-2 gap-x-4 pb-3 border-b border-slate-200">
                                <div>
                                    <div className="font-medium">Jenis Pengawasan</div>
                                    <div className="font-light text-slate-500">Pengawasan {pengawasan.jenisPengawasan}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Tanggal Pengawasan</div>
                                    <div className="font-light text-slate-500">{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 pt-3">
                                <div>
                                    <div className="font-medium">Tanggal Verifikasi</div>
                                    <div className="font-light text-slate-500">{pengawasan.verifiedAt ? formatDateToIndonesia(pengawasan.verifiedAt) : '-'}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Verifikasi oleh</div>
                                    <div className="font-light text-slate-500">{pengawasan.verifiedBy ? pengawasan.verifiedBy : '-'}</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="h-fit w-full">
                        <Card.Body className="p-4 text-xs">
                            <div className="grid grid-cols-2 gap-x-4">
                                <div className="space-y-2">
                                    <div>
                                        <div className="font-medium">Sertifikat Kompetensi Kerja (SKK)</div>
                                        <div className="font-light text-[11px] text-slate-500">Pemenuhan Persyaratan Usaha</div>
                                    </div>
                                    <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibPersyaratanSKK)}</div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="font-medium">Nomor Induk Berusaha (NIB)</div>
                                        <div className="font-light text-[11px] text-slate-500">Pemenuhan Persyaratan Usaha</div>
                                    </div>
                                    <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibPersyaratanNIB)}</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <FormRekomendasi
                tertibPengawasan="Pengawasan Tertib Usaha Jasa Konstruksi"
                rekomendasi={getDefaultData(pengawasan.rekomendasi, {})}
                url={`usaha/${lingkupPengawasan.id}/usaha-perseorangan/${pengawasan.id}`}
            />
        </>
    );
}

RekomendasiPengawasanUsahaPerseorangan.layout = page => <Layout children={page} />;

export default RekomendasiPengawasanUsahaPerseorangan;
