import React from "react";

import Layout from "../../../../Components/Layout";
import Breadcrumb from "../../../../Components/Breadcrumb";
import Card from "../../../../Components/Card";
import FormRekomendasi from "../../../../Components/Pengawasan/FormRekomendasi";
import { InformasiProyekKonstruksi, InformasiTertibPengawasan, InformasiUmumPengawasan } from "../../../../Components/Proyek/InformasiPengawasan";

import { getTertibStatusBadge } from "../../../../Utils/getStatusBadge";
import getDefaultData from "../../../../Utils/getDefaultData";

import {
    LiaHomeSolid,
    LiaPrintSolid,
} from "react-icons/lia";

const PengawasanPenyelenggaraanAPBDRekomendasi = ({ data }) => {
    console.log(data);
    const { pengawasan } = data;
    const { proyekKonstruksi } = pengawasan;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item>...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pengawasan/penyelenggaraan/APBD/${pengawasan.jenisPengawasan.toLowerCase()}/${pengawasan.id}`}>Detail Pengawasan</Breadcrumb.Item>
                <Breadcrumb.Item active>Rekomendasi</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center gap-x-5 mt-2 mb-4">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Pengawasan Tertib Penyelenggaraan Jasa Konstruksi</h3>
                    <h1 className="text-lg text-slate-800 leading-tight">{proyekKonstruksi.namaPaket}</h1>
                </div>
                <div className="flex items-center gap-x-2">
                    <a
                        href={pengawasan.rekomendasi ? `/admin/pengawasan/penyelenggaraan/APBD/${pengawasan.jenisPengawasan.toLowerCase()}/${pengawasan.id}/simak` : '#'}
                        target="_blank"
                        className="w-fit flex justify-center items-center gap-x-1 text-blue-600 border border-blue-600 rounded text-xs tracking-wide p-2.5 shadow-sm hover:bg-blue-600 hover:text-white whitespace-nowrap"
                    >
                        <LiaPrintSolid size={18} />
                        <span>Cetak PDF</span>
                    </a>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
                <InformasiProyekKonstruksi proyekKonstruksi={proyekKonstruksi} />
                <div className="space-y-4">
                    <InformasiUmumPengawasan pengawasan={pengawasan} />
                    <Card className="h-fit">
                        <Card.Body className="p-4 text-xs grid grid-cols-2 gap-4 items-center">
                            <div>
                                <div className="text-slate-800">Hasil Pengawasan</div>
                                <div className="font-light text-[11px] text-slate-500">Kesimpulan Verifikasi Pengawasan</div>
                            </div>
                            <div className="font-light">{getTertibStatusBadge(pengawasan.tertibPengawasan)}</div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-span-2">
                    <InformasiTertibPengawasan pengawasan={pengawasan} />
                </div>
            </div>
            <FormRekomendasi
                tertibPengawasan="Pengawasan Tertib Penyelenggaraan Jasa Konstruksi"
                rekomendasi={getDefaultData(pengawasan.rekomendasi, {})}
                url={`penyelenggaraan/APBD/${pengawasan.id}`}
            />
        </>
    );
}

PengawasanPenyelenggaraanAPBDRekomendasi.layout = page => <Layout children={page} />;

export default PengawasanPenyelenggaraanAPBDRekomendasi;
