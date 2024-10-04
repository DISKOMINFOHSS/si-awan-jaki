import React from "react";

import Layout from "../../../../Components/Layout";
import Breadcrumb from "../../../../Components/Breadcrumb";
import Card from "../../../../Components/Card";
import FormDokumenNIB from "../../../../Components/Usaha/FormDokumenNIB";

import { formatDateToIndonesia } from "../../../../Utils/formatDate";
import { LiaCloudUploadAltSolid, LiaFileAlt, LiaHomeSolid } from "react-icons/lia";
import { getTertibStatusBadge } from "../../../../Utils/getStatusBadge";

const PengawasanUsahaRantaiPasokShow = ({ data }) => {
    console.log(data);
    const { lingkupPengawasan, jenisRantaiPasok, pengawasan } = data;
    const {
        usaha,
        kepemilikanPerizinanBerusaha,
        keabsahanPerizinanBerusaha,
        kapasitasTerpasang,
        kepemilikanPerizinanPenggunaan,
        keabsahanPerizinanPenggunaan,
    } = pengawasan;

    const [ isModalNIBOpen, setIsModalNIBOpen ] = React.useState(false);

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pengawasan/usaha/${lingkupPengawasan.id}/${jenisRantaiPasok.slug}`}>{`${jenisRantaiPasok.pelakuUsaha} - ${jenisRantaiPasok.kategoriSumberDaya} Konstruksi`}</Breadcrumb.Item>
                <Breadcrumb.Item active>{usaha.nama}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-start mt-2 mb-4">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Pengawasan Tertib Usaha Jasa Konstruksi</h3>
                    <h1 className="font-medium text-xl text-slate-800 uppercase">{usaha.nama}</h1>
                    <h2 className="text-xs text-slate-600">{lingkupPengawasan.lingkupPengawasan}</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                <div className="space-y-4">
                    <Card className="h-fit">
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
                                                type="button"
                                                className="group mt-1 w-fit flex items-center justify-between gap-x-10 p-2 rounded border border-dashed border-slate-200 hover:bg-slate-100"
                                                onClick={() => setIsModalNIBOpen(true)}
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
                            <div className="py-3 border-b border-slate-200">
                                <div className="font-medium">Penanggung Jawab Badan Usaha (PJBU)</div>
                                <div className="font-light text-slate-500">{usaha.pjbu}</div>
                            </div>
                            <div className="pt-3">
                                <div className="font-medium">Alamat</div>
                                <div className="font-light text-slate-500">{usaha.alamat}</div>
                            </div>
                        </Card.Body>
                    </Card>
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
                </div>
                <div className="space-y-4">
                    <Card className="h-fit">
                        <Card.Body className="p-4 text-xs">
                            <div className="grid grid-cols-2 text-xs pb-3 border-b border-slate-200">
                                <div>
                                    <div className="font-medium text-slate-800">Kepemilikan</div>
                                    <div className="font-light text-[11px] text-slate-500">Perizinan Berusaha</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-x-2">
                                        <input
                                            type="radio" id="kepemilikanPerizinanUsahaTrue" name="kepemilikanPerizinanUsaha" value="1" readOnly checked={kepemilikanPerizinanBerusaha}
                                            className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label htmlFor="kepemilikanPerizinanUsahaTrue" className="text-slate-700">Memiliki</label>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <input
                                            type="radio" id="kepemilikanPerizinanUsahaFalse" name="kepemilikanPerizinanUsaha" value="0" readOnly checked={!kepemilikanPerizinanBerusaha}
                                            className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label htmlFor="kepemilikanPerizinanUsahaFalse" className="text-slate-700">Tidak Memiliki</label>
                                    </div>
                                </div>
                            </div>
                            {
                                jenisRantaiPasok.pelakuUsaha === "Produsen" && jenisRantaiPasok.kategoriSumberDaya === "Material" ? (
                                    <>
                                        <div className="grid grid-cols-2 text-xs py-3 border-b border-slate-200">
                                            <div>
                                                <div className="font-medium text-slate-800">Keabsahan</div>
                                                <div className="font-light text-[11px] text-slate-500">Perizinan Berusaha</div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        type="radio" id="keabsahanPerizinanUsahaTrue" name="keabsahanPerizinanUsaha" value="1" readOnly checked={keabsahanPerizinanBerusaha}
                                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <label htmlFor="keabsahanPerizinanUsahaTrue" className="text-slate-700">Sah</label>
                                                </div>
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        type="radio" id="keabsahanIzinUsahaFalse" name="keabsahanPerizinanUsaha" value="0" readOnly checked={!keabsahanPerizinanBerusaha}
                                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <label htmlFor="keabsahanPerizinanUsahaFalse" className="text-slate-700">Tidak Sah</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 text-xs py-3 border-b border-slate-200">
                                            <div>
                                                <div className="font-medium text-slate-800">Kapasitas Terpasang</div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        type="radio" id="kapasitasTerpasangTrue" name="kapasitasTerpasang" value="1" readOnly checked={kapasitasTerpasang}
                                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <label htmlFor="kapasitasTerpasangTrue" className="text-slate-700">Sesuai</label>
                                                </div>
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        type="radio" id="kapasitasTerpasangFalse" name="kapasitasTerpasang" value="0" readOnly checked={!kapasitasTerpasang}
                                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <label htmlFor="kapasitasTerpasangFalse" className="text-slate-700">Tidak Sesuai dengan Perizinan</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 text-xs py-3 border-b border-slate-200">
                                            <div>
                                                <div className="font-medium text-slate-800">Kepemilikan</div>
                                                <div className="font-light text-[11px] text-slate-500">Perizinan Penggunaan Bahan Baku</div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        type="radio" id="kepemilikanPerizinanPenggunaanTrue" name="kepemilikanPerizinanPenggunaan" value="1" readOnly checked={kepemilikanPerizinanPenggunaan}
                                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <label htmlFor="kepemilikanPerizinanPenggunaan" className="text-slate-700">Memiliki</label>
                                                </div>
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        type="radio" id="kepemilikanPerizinanPenggunaanFalse" name="kepemilikanPerizinanPenggunaan" value="0" readOnly checked={!kepemilikanPerizinanPenggunaan}
                                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <label htmlFor="kepemilikanPerizinanPenggunaanFalse" className="text-slate-700">Tidak Memiliki</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-3 grid grid-cols-2 text-xs">
                                            <div>
                                                <div className="font-medium text-slate-800">Keabsahan</div>
                                                <div className="font-light text-[11px] text-slate-500">Perizinan Penggunaan Bahan Baku</div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        type="radio" id="keabsahanPerizinanPenggunaanTrue" name="keabsahanPerizinanPenggunaan" value="1" readOnly checked={keabsahanPerizinanPenggunaan}
                                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <label htmlFor="keabsahanPerizinanPenggunaan" className="text-slate-700">Sah</label>
                                                </div>
                                                <div className="flex items-center gap-x-2">
                                                    <input
                                                        type="radio" id="keabsahanPerizinanPenggunaanFalse" name="keabsahanPerizinanPenggunaan" value="0" readOnly checked={!keabsahanPerizinanPenggunaan}
                                                        className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <label htmlFor="keabsahanPerizinanPenggunaanFalse" className="text-slate-700">Tidak Sah</label>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="pt-3 grid grid-cols-2 text-xs">
                                        <div>
                                            <div className="font-medium text-slate-800">Keabsahan</div>
                                            <div className="font-light text-[11px] text-slate-500">Perizinan Berusaha</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-x-2">
                                                <input
                                                    type="radio" id="keabsahanPerizinanUsahaTrue" name="keabsahanPerizinanUsaha" value="1" readOnly checked={keabsahanPerizinanBerusaha}
                                                    className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                />
                                                <label htmlFor="keabsahaPerizinanUsahaaTrue" className="text-slate-700">Sah</label>
                                            </div>
                                            <div className="flex items-center gap-x-2">
                                                <input
                                                    type="radio" id="keabsahanIzinUsahaFalse" name="keabsahanPerizinanUsaha" value="0" readOnly checked={!keabsahanPerizinanBerusaha}
                                                    className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                />
                                                <label htmlFor="keabsahanPerizinanUsahaFalse" className="text-slate-700">Tidak Sah</label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </Card.Body>
                    </Card>
                    <Card className="h-fit w-full">
                        <Card.Body className="p-4 text-xs">
                            <div className="grid grid-cols-2 gap-x-4 pb-3 border-b border-slate-200">
                                <div className="space-y-2">
                                    <div>
                                        <div className="font-medium">Perizinan Berusaha</div>
                                    </div>
                                    <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibPerizinanBerusaha)}</div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="font-medium">Pencatatan dalam SIMPK</div>
                                    </div>
                                    <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibPerizinanBerusaha)}</div>
                                </div>
                            </div>
                            <div className="pt-3">
                                <div className="space-y-2">
                                    <div>
                                        <div className="font-medium">Perizinan Penggunaan Bahan Baku</div>
                                    </div>
                                    <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibPerizinanPenggunaan)}</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <FormDokumenNIB
              isVisible={isModalNIBOpen}
              onClose={() => setIsModalNIBOpen(false)}
              usaha={usaha}
            />
        </>
    );
}

PengawasanUsahaRantaiPasokShow.layout = page => <Layout children={page} />;

export default PengawasanUsahaRantaiPasokShow;
