import React from "react";
import { Font, Document, PDFViewer, Page, View, Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

import { inter } from "../../../../../Utils/fonts";
import { getStatusBadgePDF, getTertibStatusBadgePDF} from "../../../../../Utils/getStatusBadge";

import formatCurrencyToIDR from "../../../../../Utils/formatCurrencyToIDR";
import { formatDateToIndonesia } from "../../../../../Utils/formatDate";

Font.registerHyphenationCallback(word => [word]);
Font.register({ family: 'Inter', fonts: inter });

const tw = createTw({
    theme: {
        fontFamily: {
            'sans': ['Inter'],
        },
    },
});

export default ({ data }) => {
    console.log(data);
    const { pengawasan } = data;
    const { proyekKonstruksi, rekomendasi } = pengawasan;

    return (
        <PDFViewer width="100%" style={tw("min-h-screen")}>
            <Document title="simak-pengawasan-tertib-penyelenggaraan-apbd-rutin">
                <Page wrap size="A4" orientation="portait" style={tw("p-10 font-sans relative")}>
                    <View style={tw("font-medium text-center text-[11px] uppercase mb-8")}>
                        <Text>Hasil Pengawasan {pengawasan.jenisPengawasan}</Text>
                        <Text>Pengawasan Tertib Penyelenggaraan Jasa Konstruksi</Text>
                        <Text style={tw("capitalize text-[10px] font-normal")}>Tanggal Pengawasan : {formatDateToIndonesia(pengawasan.tanggalPengawasan)}</Text>
                    </View>
                    <View style={tw("w-full text-[10px] mb-4")}>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>Nama Paket Pekerjaan</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>{proyekKonstruksi.namaPaket}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>Nomor Kontrak</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>{proyekKonstruksi.nomorKontrak}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>Nilai Proyek</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>{formatCurrencyToIDR(proyekKonstruksi.nilaiKontrak)}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>Waktu Pelaksanaan</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>
                                {formatDateToIndonesia(proyekKonstruksi.tanggalMulaiPelaksanaan)} s.d {formatDateToIndonesia(proyekKonstruksi.tanggalSelesaiPelaksanaan)}
                            </Text>
                        </View>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>Penyedia Jasa</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>{proyekKonstruksi.penyediaJasa}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>Instansi Pengguna Jasa</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>{proyekKonstruksi.penggunaJasaInstansi}</Text>
                        </View>
                    </View>
                    <View style={tw("w-full mb-4")}>
                        <View style={tw("mb-2")}>
                            {/* <View style={tw("flex flex-row gap-x-2 items-center")}>
                                <Text style={tw("font-medium text-[11px]")}>Kesimpulan Pemeriksaan</Text>
                                <View>
                                    {getTertibStatusBadgePDF(pengawasan.tertibPengawasan)}
                                </View>
                            </View> */}
                            <Text style={tw("font-medium text-[11px]")}>Kesimpulan Pemeriksaan</Text>
                            <Text style={tw("my-0.5 font-light text-[10px]")}>Pengawasan Tertib Penyelenggaraan Jasa Konstruksi</Text>
                        </View>
                        <View style={tw("flex flex-row gap-x-1 items-center mb-4")}>
                            <Text style={tw("w-[2%] font-medium text-[10px]")}>1.</Text>
                            <View style={tw("w-[98%] flex flex-row gap-x-2 items-center")}>
                                <Text style={tw("font-medium text-[10px]")}>Pengawasan terhadap Proses Pemilihan Penyedia Jasa</Text>
                                <View>
                                    {getTertibStatusBadgePDF(pengawasan.tertibProsesPemilihanPenyediaJasa)}
                                </View>
                            </View>
                        </View>
                        <View style={tw("flex flex-row gap-x-1 items-start mb-4")}>
                            <Text style={tw("w-[2%] font-medium text-[10px]")}>2.</Text>
                            <View style={tw("w-[98%]")}>
                                <Text style={tw("font-medium text-[10px] mb-2")}>Pengawasan terhadap Kontrak Kerja Konstruksi</Text>
                                <View style={tw("flex flex-row gap-x-5")}>
                                    <View style={tw("basis-1/3")}>
                                        <Text style={tw("text-[10px]")}>Penerapan Standar Kontrak</Text>
                                        <View style={tw("mt-1")}>
                                            {getTertibStatusBadgePDF(pengawasan.tertibPenerapanStandarKontrak)}
                                        </View>
                                    </View>
                                    <View style={tw("basis-1/3")}>
                                        <Text style={tw("text-[10px]")}>Penggunaan TKK Bersertifikat</Text>
                                        <View style={tw("mt-1")}>
                                            {getTertibStatusBadgePDF(pengawasan.tertibPenggunaanTKK)}
                                        </View>
                                    </View>
                                    <View style={tw("basis-1/3")}>
                                        <Text style={tw("text-[10px] text-justify")}>Pemberian Pekerjaan Utama dan/atau Penunjang kepada Subpenyedia Jasa</Text>
                                        <View style={tw("mt-1")}>
                                            {getTertibStatusBadgePDF(pengawasan.tertibPemberianPekerjaan)}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={tw("flex flex-row gap-x-1 items-start mb-4")}>
                            <Text style={tw("w-[2%] font-medium text-[10px]")}>3.</Text>
                            <View style={tw("w-[98%]")}>
                                <Text style={tw("font-medium text-[10px] mb-2")}>Pengawasan terhadap Penerapan Standar K4</Text>
                                <View style={tw("flex flex-row gap-x-5")}>
                                    <View style={tw("basis-1/3")}>
                                        <Text style={tw("text-[10px]")}>Ketersediaan Dokumen Standar K4</Text>
                                        <View style={tw("mt-1")}>
                                            {getTertibStatusBadgePDF(pengawasan.tertibKetersediaanDokumenStandarK4)}
                                        </View>
                                    </View>
                                    <View style={tw("basis-1/3")}>
                                        <Text style={tw("text-[10px]")}>Penerapan SMKK</Text>
                                        <View style={tw("mt-1")}>
                                            {getTertibStatusBadgePDF(pengawasan.tertibPenerapanSMKK)}
                                        </View>
                                    </View>
                                    <View style={tw("basis-1/3")}>
                                        <Text style={tw("text-[10px]")}>Kegiatan Antisipasi Kecelakaan Kerja</Text>
                                        <View style={tw("mt-1")}>
                                            {getTertibStatusBadgePDF(pengawasan.tertibAntisipasiKecelakaan)}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={tw("flex flex-row gap-x-1 items-center mb-4")}>
                            <Text style={tw("w-[2%] font-medium text-[10px]")}>4.</Text>
                            <View style={tw("w-[98%] flex flex-row gap-x-2 items-center")}>
                                <Text style={tw("font-medium text-[10px]")}>Pengawasan terhadap penerapan manajemen mutu Konstruksi</Text>
                                <View>
                                    {getTertibStatusBadgePDF(pengawasan.tertibPenerapanManajemenMutu)}
                                </View>
                            </View>
                        </View>
                        <View style={tw("flex flex-row gap-x-1 items-start mb-4")}>
                            <Text style={tw("w-[2%] font-medium text-[10px]")}>5.</Text>
                            <View style={tw("w-[98%]")}>
                                <Text style={tw("font-medium text-[10px] mb-2")}>Pengelolaan dan Penggunaan Material, Peralatan dan Teknologi Konstruksi</Text>
                                <View style={tw("flex flex-row gap-x-5")}>
                                    <View style={tw("basis-1/3")}>
                                        <Text style={tw("text-[10px] text-justify")}>Pemenuhan penyediaan material, peralatan, dan teknologi konstruksi dalam pelaksanaan proyek konstruksi</Text>
                                        <View style={tw("mt-1")}>
                                            {getTertibStatusBadgePDF(pengawasan.tertibPemenuhanPenyediaanMPTK)}
                                        </View>
                                    </View>
                                    <View style={tw("basis-1/3")}>
                                        <Text style={tw("text-[10px]")}>Penerapan Material Standar (SNI dan Standar Lain)</Text>
                                        <View style={tw("mt-1")}>
                                            {getTertibStatusBadgePDF(pengawasan.tertibPenggunaanMPTK)}
                                        </View>
                                    </View>
                                    <View style={tw("basis-1/3")}>
                                        <Text style={tw("text-[10px]")}>Penggunaan PDN untuk Teknologi dan MPK</Text>
                                        <View style={tw("mt-1")}>
                                            {getTertibStatusBadgePDF(pengawasan.tertibPenggunaanPDN)}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={tw("flex flex-row gap-x-1 items-start mb-4")}>
                            <Text style={tw("w-[2%] font-medium text-[10px]")}>6.</Text>
                            <View style={tw("w-[98%]")}>
                                <Text style={tw("font-medium text-[10px] mb-2")}>Pengelolaan dan Pemanfaatan Sumber Material Konstruksi</Text>
                                <Text style={tw("text-[10px]")}>Pemenuhan terhadap standar teknis lingkungan</Text>
                                <View style={tw("mt-1")}>
                                    {getTertibStatusBadgePDF(pengawasan.tertibPemenuhanStandarLingkungan)}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View wrap={false} style={tw("w-full mb-4")}>
                        <View style={tw("mb-4")}>
                            <Text style={tw("font-medium text-[11px]")}>Hasil Temuan dan Rekomendasi</Text>
                            <Text style={tw("my-0.5 font-light text-[10px]")}>Pengawasan Tertib Penyelenggaraan Jasa Konstruksi</Text>
                        </View>
                        <View style={tw("text-[10px] mb-4")}>
                            <Text style={tw("font-medium mb-1")}>Temuan dan Rekomendasi</Text>
                            <Text style={tw("text-justify")}>{rekomendasi.rekomendasi}</Text>
                        </View>
                        {
                            rekomendasi.keterangan && (
                                <View style={tw("text-[10px]")}>
                                    <Text style={tw("font-medium mb-1")}>Keterangan</Text>
                                    <Text style={tw("text-justify")}>{rekomendasi.keterangan}</Text>
                                </View>
                            )
                        }
                    </View>
                    <Text
                        render={({ pageNumber }) => (`- ${pageNumber} -`)} fixed
                        style={tw("absolute bottom-8 right-0 left-0 text-[9px] text-center")}
                    />
                </Page>
                <Page wrap size="A4" orientation="landscape" style={tw("p-12 font-sans relative")}>
                    <View style={tw("font-medium text-center text-[12px] h-[7%]")}>
                        <Text>Simak - Pengawasan Tertib Penyelenggaraan Konstruksi secara {pengawasan.jenisPengawasan}</Text>
                        <Text>Penyelenggaraan Konstruksi dengan Sumber Dana dari APBD</Text>
                    </View>
                    <View style={tw("my-4 text-[11px] h-[28%]")}>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>Nama Proyek Konstruksi</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>{proyekKonstruksi.namaPaket}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>Nilai Proyek</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>{formatCurrencyToIDR(proyekKonstruksi.nilaiKontrak)}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>Nomor Kontrak</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>{proyekKonstruksi.nomorKontrak}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>Waktu Pelaksanaan</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>
                                {formatDateToIndonesia(proyekKonstruksi.tanggalMulaiPelaksanaan)} s.d {formatDateToIndonesia(proyekKonstruksi.tanggalSelesaiPelaksanaan)}
                            </Text>
                        </View>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>Penyedia Jasa</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>{proyekKonstruksi.penyediaJasa}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>Nama Satuan Kerja Perangkat Daerah</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>{proyekKonstruksi.penggunaJasaInstansi}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>Waktu Pengawasan</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}
