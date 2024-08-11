import React from "react";

import Card from "../../Card";
import formatDateToIndonesia from "../../../Utils/formatDateToIndonesia";

import { getTertibStatusBadge } from "../../../Utils/getStatusBadge";

const InformasiUsaha = ({ usaha }) => {
    return (
        <Card className="h-fit">
            <Card.Body className="p-4 text-xs">
                <div className="pb-3 border-b border-slate-200">
                    <div className="font-medium">Nama Badan Usaha</div>
                    <div className="font-light text-slate-500 uppercase">{usaha.nama}</div>
                </div>
                <div className="grid grid-cols-3 gap-x-4 border-b border-slate-200 py-3">
                    <div>
                        <div className="font-medium">NIB</div>
                        <div className="font-light text-slate-500">{usaha.nib ? usaha.nib : "-"}</div>
                    </div>
                    <div className="col-span-2">
                        <div className="font-medium">Penanggung Jawab Badan Usaha (PJBU)</div>
                        <div className="font-light text-slate-500">{usaha.pjbu}</div>
                    </div>
                </div>
                <div className="pt-3">
                    <div className="font-medium">Alamat</div>
                    <div className="font-light text-slate-500">{usaha.alamat}</div>
                </div>
            </Card.Body>
        </Card>
    );
}

const InformasiTambahanPengawasan = ({ statusIzinUsaha, statusVerifikasiNIB }) => {
    return (
        <Card className="h-fit">
            <Card.Body className="p-4 text-xs">
                <div className="grid grid-cols-2 text-xs pb-3 border-b border-slate-200">
                    <div>
                        <div className="font-medium text-slate-800">Status</div>
                        <div className="font-light text-[11px] text-slate-500">Perizinan Berusaha</div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-x-2">
                            <input
                                type="radio" id="kepemilikanIzinUsahaTrue" name="kepemilikanIzinUsaha" value="1" readOnly checked={statusIzinUsaha === "Aktif"}
                                className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                            />
                            <label htmlFor="kepemilikanIzinUsahaTrue" className="text-slate-700">Aktif</label>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <input
                                type="radio" id="kepemilikanIzinUsahaFalse" name="kepemilikanIzinUsaha" value="0" readOnly checked={!statusIzinUsaha === "Aktif"}
                                className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                            />
                            <label htmlFor="kepemilikanIzinUsahaFalse" className="text-slate-700">Tidak Aktif</label>
                        </div>
                    </div>
                </div>
                <div className="pt-3 grid grid-cols-2 text-xs">
                    <div>
                        <div className="font-medium text-slate-800">Nomor NIB</div>
                        <div className="font-light text-[11px] text-slate-500">Status Verifikasi sesuai OSS</div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-x-2">
                            <input
                                type="radio" id="keabsahanIzinUsahaTrue" name="keabsahanIzinUsaha" value="1" readOnly checked={statusVerifikasiNIB}
                                className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                            />
                            <label htmlFor="keabsahanIzinUsahaTrue" className="text-slate-700">Terverifikasi</label>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <input
                                type="radio" id="keabsahanIzinUsahaFalse" name="keabsahanIzinUsaha" value="0" readOnly checked={!statusVerifikasiNIB}
                                className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                            />
                            <label htmlFor="keabsahanIzinUsahaFalse" className="text-slate-700">Belum Terverifikasi</label>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

const InformasiUmumPengawasan = ({ pengawasan }) => {
    return (
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
    )
}

const InformasiTertibPengawasanLingkup2 = ({ pengawasan }) => {
    return (
        <Card className="h-fit w-full">
            <Card.Body className="p-4 text-xs">
                <div className="grid grid-cols-2 gap-x-4 pb-3 border-b border-slate-200">
                    <div className="space-y-2">
                        <div>
                            <div className="font-medium">Jenis Usaha</div>
                        </div>
                        <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibJenisUsaha)}</div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <div className="font-medium">Sifat Usaha</div>
                        </div>
                        <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibSifatUsaha)}</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 pt-3">
                    <div className="space-y-2">
                        <div>
                            <div className="font-medium">Klasifikasi Usaha</div>
                        </div>
                        <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibKlasifikasiUsaha)}</div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <div className="font-medium">Layanan Usaha</div>
                        </div>
                        <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibLayananUsaha)}</div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

const InformasiTertibPengawasanLingkup3 = ({ pengawasan }) => {
    return (
        <Card className="h-fit w-full">
            <Card.Body className="p-4 text-xs">
                <div className="grid grid-cols-2 gap-x-4">
                    <div className="space-y-2">
                        <div>
                            <div className="font-medium">Bentuk Usaha</div>
                        </div>
                        <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibBentukUsaha)}</div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <div className="font-medium">Kualifikasi Usaha</div>
                        </div>
                        <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibKualifikasiUsaha)}</div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

const InformasiTertibPengawasanLingkup4 = ({ pengawasan }) => (
    <Card className="h-fit w-full">
        <Card.Body className="p-4 text-xs">
            <div className="grid grid-cols-2 gap-x-4">
                <div className="space-y-2">
                    <div>
                        <div className="font-medium">Sertifikat Badan Usaha (SBU)</div>
                        <div className="font-light text-[11px] text-slate-500">Pemenuhan Persyaratan Usaha</div>
                    </div>
                    <div className="font-light text-slate-500">{getTertibStatusBadge(pengawasan.tertibPersyaratanSBU)}</div>
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
)

const InformasiTertibPengawasanLingkup5 = ({ pengawasan }) => (
    <Card className="h-fit w-full">
        <Card.Body className="p-4 text-xs">
            <div className="grid grid-cols-1 gap-x-4">
                <div className="space-y-2">
                    <div>
                        <div className="font-medium">Pengembangan Usaha</div>
                        <div className="font-light text-slate-500">Pelaksanaan Pengembangan Usaha Berkelanjutan</div>
                    </div>
                    <div className="font-light text-[11px] text-slate-500">{getTertibStatusBadge(pengawasan.tertibPengembanganUsaha)}</div>
                </div>
            </div>
        </Card.Body>
    </Card>
)

export {
    InformasiUsaha,
    InformasiTambahanPengawasan,
    InformasiUmumPengawasan,
    InformasiTertibPengawasanLingkup2,
    InformasiTertibPengawasanLingkup3,
    InformasiTertibPengawasanLingkup4,
    InformasiTertibPengawasanLingkup5,
}
