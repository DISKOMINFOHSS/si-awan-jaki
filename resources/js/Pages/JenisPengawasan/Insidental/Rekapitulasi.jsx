import React from "react";
import { usePage } from "@inertiajs/react";
import { Font, Document, PDFViewer, Page, View, Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind"

import { inter } from "../../../Utils/fonts";
import getDefaultData from "../../../Utils/getDefaultData";

import RekapitulasiTertibPenyelenggaraan from "../../../Components/PDF/RekapitulasiTertibPenyelenggaraan";
import RekapitulasiTertibPemanfaatanProduk from "../../../Components/PDF/RekapitulasiTertibPemanfaatanProduk";
import { formatDateToIndonesia } from "../../../Utils/formatDate";
import { getTertibStatusBadgeRekapitulasiPDF } from "../../../Utils/getStatusBadge";

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
    const { url } = usePage();
    const tahun = url.split('/')[4];

    console.log(data);
    const {
        daftarTertibUsaha,
        daftarTertibPenyelenggaraan,
        daftarTertibPemanfaatanProduk,
        totalTertibPengawasan,
    } = data;

    const { tertibUsaha, tertibPenyelenggaraan, tertibPemanfaatanProduk } = totalTertibPengawasan;
    const {
        daftarPengawasanBUJKLingkup2,
        daftarPengawasanBUJKLingkup3,
        daftarPengawasanBUJKLingkup4,
        daftarPengawasanBUJKLingkup5,
    } = daftarTertibUsaha;

    const {
        tertibBUJKLingkup2,
        tertibBUJKLingkup3,
        tertibBUJKLingkup4,
        tertibBUJKLingkup5,
    } = tertibUsaha;

    return (
        <PDFViewer width="100%" style={tw("min-h-screen")}>
            <Document title="rekapitulasi-pengawasan-insidental-tahunan">
                <Page wrap size="A4" orientation="landscape" style={tw("p-12 font-sans relative")}>
                    <View>
                        <Text style={tw("font-medium text-[12px] uppercase")}>Rekapitulasi Hasil Pengawasan Insidental</Text>
                        <Text style={tw("font-medium text-[11px] mt-2")}>Tertib Usaha Jasa Konstruksi</Text>
                        <Text style={tw("text-[10px] mt-2 text-justify leading-normal")}>
                            Berikut merupakan Rekapitulasi Hasil Pengawasan Insidental Tertib Usaha Jasa Konstruksi pada Tahun {tahun}.
                        </Text>
                    </View>
                    <View style={tw("mt-4 mb-2")}>
                        <Text style={tw("font-medium text-[10px]")}>Lingkup Pengawasan: Kesesuaian Jenis, Sifat, Klasifikasi, dan Layanan Usaha dengan Kegiatan Usaha Jasa Konstruksi</Text>
                        <Text style={tw("text-[10px] mt-2 text-justify leading-normal")}>
                            Telah dilaksanakan Tertib Usaha Jasa Konstruksi pada Lingkup Pengawasan Kesesuaian Jenis, Sifat, Klasifikasi, dan Layanan Usaha dengan Kegiatan Usaha Jasa Konstruksi sebanyak {getDefaultData(tertibBUJKLingkup2.totalTertib, 0) + getDefaultData(tertibBUJKLingkup2.totalBelumTertib, 0)} badan usaha.
                            Terdapat {getDefaultData(tertibBUJKLingkup2.totalTertib)} badan yang sudah tertib dan {getDefaultData(tertibBUJKLingkup2.totalBelumTertib, 0)} badan usaha yang belum tertib pada lingkup pengawasan ini.
                        </Text>
                        <View style={tw("mt-2 mb-4")}>
                            <View style={tw("flex flex-row w-full text-[8px] font-medium text-center")}>
                                <View style={tw("w-[3%] border-y border-l border-slate-800 p-1")}>
                                    <Text style={tw("text-center")}>No</Text>
                                </View>
                                <View style={tw("w-[50%] border-y border-slate-800 flex flex-row text-center")}>
                                    <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>Nama Badan Usaha</Text>
                                    <Text style={tw("w-[25%] border-l border-slate-800 p-1")}>NIB</Text>
                                    <Text style={tw("w-[25%] border-l border-slate-800 p-1")}>PJBU</Text>
                                    <Text style={tw("w-[20%] border-l border-slate-800 p-1")}>Tanggal Pengawasan</Text>
                                </View>
                                <View style={tw("w-[47%] border-y border-x border-slate-800 flex flex-row text-center")}>
                                    <View style={tw("w-full h-12 flex flex-col justify-center")}>
                                        <Text style={tw("h-[50%] border-b border-slate-800 p-1")}>Kesesuaian Kegiatan Konstruksi</Text>
                                        <View style={tw("h-[50%] flex flex-row")}>
                                            <Text style={tw("w-[25%] border-r border-slate-800 p-1")}>Jenis</Text>
                                            <Text style={tw("w-[25%] border-r border-slate-800 p-1")}>Sifat</Text>
                                            <Text style={tw("w-[25%] border-r border-slate-800 p-1")}>Klasifikasi</Text>
                                            <Text style={tw("w-[25%] p-1")}>Layanan</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {
                                daftarPengawasanBUJKLingkup2.length !== 0 ? daftarPengawasanBUJKLingkup2.map((pengawasan, i) => (
                                    <View wrap={false} key={i} style={tw("flex flex-row w-full text-[8px] min-h-10")}>
                                        <View style={tw("w-[3%] border-b border-l border-slate-800 p-1")}>
                                            <Text style={tw("text-center")}>{i + 1}</Text>
                                        </View>
                                        <View style={tw("w-[50%] border-b border-slate-800 flex flex-row")}>
                                            <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>{pengawasan.usaha.nama}</Text>
                                            <Text style={tw("w-[25%] border-l border-slate-800 p-1 text-center")}>{pengawasan.usaha.nib}</Text>
                                            <Text style={tw("w-[25%] border-l border-slate-800 p-1 text-center")}>{pengawasan.usaha.pjbu}</Text>
                                            <Text style={tw("w-[20%] border-l border-slate-800 p-1 text-center")}>{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</Text>
                                        </View>
                                        <View style={tw("w-[47%] border-b border-x border-slate-800 flex flex-row")}>
                                            <View style={tw("w-[25%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibJenisUsaha)}</View>
                                            <View style={tw("w-[25%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibSifatUsaha)}</View>
                                            <View style={tw("w-[25%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibKlasifikasiUsaha)}</View>
                                            <View style={tw("w-[25%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibLayananUsaha)}</View>
                                        </View>
                                    </View>
                                )) : (
                                    <View wrap={false} style={tw("flex flex-row w-full text-[8px] min-h-8")}>
                                        <Text style={tw("w-full border-x border-b border-slate-800 p-1 text-center")}>Tidak ada pengawasan</Text>
                                    </View>
                                )
                            }
                        </View>
                    </View>
                    <View wrap={false} style={tw("my-2")}>
                        <Text style={tw("font-medium text-[10px]")}>Lingkup Pengawasan: Kesesuaian Bentuk dan Kualifikasi dengan Kegiatan Usaha Jasa Konstruksi dan Segmentasi Pasar</Text>
                        <Text style={tw("text-[10px] mt-2 text-justify leading-normal")}>
                            Telah dilaksanakan Tertib Usaha Jasa Konstruksi pada Lingkup Pengawasan Kesesuaian Bentuk dan Kualifikasi dengan Kegiatan Usaha Jasa Konstruksi dan Segmentasi Pasar sebanyak {getDefaultData(tertibBUJKLingkup3.totalTertib, 0) + getDefaultData(tertibBUJKLingkup3.totalBelumTertib, 0)} badan usaha.
                            Terdapat {getDefaultData(tertibBUJKLingkup3.totalTertib, 0)} badan yang sudah tertib dan {getDefaultData(tertibBUJKLingkup3.totalBelumTertib, 0)} badan usaha yang belum tertib pada lingkup pengawasan ini.
                        </Text>
                        <View style={tw("mt-2 mb-4")}>
                            <View style={tw("flex flex-row w-full text-[8px] font-medium text-center")}>
                                <View style={tw("w-[3%] border-y border-l border-slate-800 p-1")}>
                                    <Text style={tw("text-center")}>No</Text>
                                </View>
                                <View style={tw("w-[50%] border-y border-slate-800 flex flex-row text-center")}>
                                    <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>Nama Badan Usaha</Text>
                                    <Text style={tw("w-[25%] border-l border-slate-800 p-1")}>NIB</Text>
                                    <Text style={tw("w-[25%] border-l border-slate-800 p-1")}>PJBU</Text>
                                    <Text style={tw("w-[20%] border-l border-slate-800 p-1")}>Tanggal Pengawasan</Text>
                                </View>
                                <View style={tw("w-[47%] border-y border-x border-slate-800 flex flex-row text-center")}>
                                    <View style={tw("w-full h-12 flex flex-col justify-center")}>
                                        <Text style={tw("h-[50%] border-b border-slate-800 p-1")}>Kesesuaian Kegiatan Usaha Jasa Konstruksi dan Segmentasi Pasar Jasa Konstruksi</Text>
                                        <View style={tw("h-[50%] flex flex-row")}>
                                            <Text style={tw("w-[50%] border-r border-slate-800 p-1")}>Bentuk</Text>
                                            <Text style={tw("w-[50%] p-1")}>Kualifikasi</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {
                                daftarPengawasanBUJKLingkup3.length !== 0 ? daftarPengawasanBUJKLingkup3.map((pengawasan, i) => (
                                    <View wrap={false} key={i} style={tw("flex flex-row w-full text-[8px] min-h-10")}>
                                        <View style={tw("w-[3%] border-b border-l border-slate-800 p-1")}>
                                            <Text style={tw("text-center")}>{i + 1}</Text>
                                        </View>
                                        <View style={tw("w-[50%] border-b border-slate-800 flex flex-row")}>
                                            <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>{pengawasan.usaha.nama}</Text>
                                            <Text style={tw("w-[25%] border-l border-slate-800 p-1 text-center")}>{pengawasan.usaha.nib}</Text>
                                            <Text style={tw("w-[25%] border-l border-slate-800 p-1 text-center")}>{pengawasan.usaha.pjbu}</Text>
                                            <Text style={tw("w-[20%] border-l border-slate-800 p-1 text-center")}>{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</Text>
                                        </View>
                                        <View style={tw("w-[47%] border-b border-x border-slate-800 flex flex-row")}>
                                            <View style={tw("w-[50%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibBentukUsaha)}</View>
                                            <View style={tw("w-[50%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibKualifikasiUsaha)}</View>
                                        </View>
                                    </View>
                                )) : (
                                    <View wrap={false} style={tw("flex flex-row w-full text-[8px] min-h-8")}>
                                        <Text style={tw("w-full border-x border-b border-slate-800 p-1 text-center")}>Tidak ada pengawasan</Text>
                                    </View>
                                )
                            }
                        </View>
                    </View>
                    <View wrap={false} style={tw("my-2")}>
                        <Text style={tw("font-medium text-[10px]")}>Lingkup Pengawasan: Pemenuhan Persyaratan Usaha Jasa Konstruksi</Text>
                        <Text style={tw("text-[10px] mt-2 text-justify leading-normal")}>
                            Telah dilaksanakan Tertib Usaha Jasa Konstruksi pada Lingkup Pengawasan Pemenuhan Persyaratan Usaha Jasa Konstruksi sebanyak {getDefaultData(tertibBUJKLingkup4.totalTertib, 0) + getDefaultData(tertibBUJKLingkup4.totalBelumTertib, 0)} badan usaha.
                            Terdapat {getDefaultData(tertibBUJKLingkup4.totalTertib)} badan yang sudah tertib dan {getDefaultData(tertibBUJKLingkup4.totalBelumTertib, 0)} badan usaha yang belum tertib pada lingkup pengawasan ini.
                        </Text>
                        <View style={tw("mt-2 mb-4")}>
                            <View style={tw("flex flex-row w-full text-[8px] font-medium text-center")}>
                                <View style={tw("w-[3%] border-y border-l border-slate-800 p-1")}>
                                    <Text style={tw("text-center")}>No</Text>
                                </View>
                                <View style={tw("w-[50%] border-y border-slate-800 flex flex-row text-center")}>
                                    <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>Nama Badan Usaha</Text>
                                    <Text style={tw("w-[25%] border-l border-slate-800 p-1")}>NIB</Text>
                                    <Text style={tw("w-[25%] border-l border-slate-800 p-1")}>PJBU</Text>
                                    <Text style={tw("w-[20%] border-l border-slate-800 p-1")}>Tanggal Pengawasan</Text>
                                </View>
                                <View style={tw("w-[47%] border-y border-x border-slate-800 flex flex-row text-center")}>
                                    <View style={tw("w-full h-12 flex flex-col justify-center")}>
                                        <Text style={tw("h-[50%] border-b border-slate-800 p-1")}>Pemenuhan Persyaratan Usaha</Text>
                                        <View style={tw("h-[50%] flex flex-row")}>
                                            <Text style={tw("w-[50%] border-r border-slate-800 p-1")}>SBU</Text>
                                            <Text style={tw("w-[50%] p-1")}>NIB</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {
                                daftarPengawasanBUJKLingkup4.length !== 0 ? daftarPengawasanBUJKLingkup4.map((pengawasan, i) => (
                                    <View wrap={false} key={i} style={tw("flex flex-row w-full text-[8px] min-h-10")}>
                                        <View style={tw("w-[3%] border-b border-l border-slate-800 p-1")}>
                                            <Text style={tw("text-center")}>{i + 1}</Text>
                                        </View>
                                        <View style={tw("w-[50%] border-b border-slate-800 flex flex-row")}>
                                            <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>{pengawasan.usaha.nama}</Text>
                                            <Text style={tw("w-[25%] border-l border-slate-800 p-1 text-center")}>{pengawasan.usaha.nib}</Text>
                                            <Text style={tw("w-[25%] border-l border-slate-800 p-1 text-center")}>{pengawasan.usaha.pjbu}</Text>
                                            <Text style={tw("w-[20%] border-l border-slate-800 p-1 text-center")}>{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</Text>
                                        </View>
                                        <View style={tw("w-[47%] border-b border-x border-slate-800 flex flex-row")}>
                                            <View style={tw("w-[50%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPersyaratanSBU)}</View>
                                            <View style={tw("w-[50%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPersyaratanNIB)}</View>
                                        </View>
                                    </View>
                                )) : (
                                    <View wrap={false} style={tw("flex flex-row w-full text-[8px] min-h-8")}>
                                        <Text style={tw("w-full border-x border-b border-slate-800 p-1 text-center")}>Tidak ada pengawasan</Text>
                                    </View>
                                )
                            }
                        </View>
                    </View>
                    <View wrap={false} style={tw("mt-2 mb-4")}>
                        <Text style={tw("font-medium text-[10px]")}>Lingkup Pengawasan: Pelaksanaan Pengembangan Usaha Berkelanjutan</Text>
                        <Text style={tw("text-[10px] mt-2 text-justify leading-normal")}>
                            Telah dilaksanakan Tertib Usaha Jasa Konstruksi pada Lingkup Pengawasan Pelaksanaan Pengembangan Usaha Berkelanjutan sebanyak {getDefaultData(tertibBUJKLingkup5.totalTertib, 0) + getDefaultData(tertibBUJKLingkup5.totalBelumTertib, 0)} badan usaha.
                            Terdapat {getDefaultData(tertibBUJKLingkup5.totalTertib)} badan yang sudah tertib dan {getDefaultData(tertibBUJKLingkup5.totalBelumTertib, 0)} badan usaha yang belum tertib pada lingkup pengawasan ini.
                        </Text>
                        <View style={tw("mt-2 mb-4")}>
                            <View style={tw("flex flex-row w-full text-[8px] font-medium text-center")}>
                                <View style={tw("w-[3%] border-y border-l border-slate-800 p-1")}>
                                    <Text style={tw("text-center")}>No</Text>
                                </View>
                                <View style={tw("w-[50%] border-y border-slate-800 flex flex-row text-center")}>
                                    <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>Nama Badan Usaha</Text>
                                    <Text style={tw("w-[25%] border-l border-slate-800 p-1")}>NIB</Text>
                                    <Text style={tw("w-[25%] border-l border-slate-800 p-1")}>PJBU</Text>
                                    <Text style={tw("w-[20%] border-l border-slate-800 p-1")}>Tanggal Pengawasan</Text>
                                </View>
                                <Text style={tw("w-[47%] border border-slate-800 p-1")}>Pelaksanaan Pengembangan Usaha Berkelanjutan</Text>
                            </View>
                            {
                                daftarPengawasanBUJKLingkup5.length !== 0 ? daftarPengawasanBUJKLingkup5.map((pengawasan, i) => (
                                    <View wrap={false} key={i} style={tw("flex flex-row w-full text-[8px] min-h-10")}>
                                        <View style={tw("w-[3%] border-b border-l border-slate-800 p-1")}>
                                            <Text style={tw("text-center")}>{i + 1}</Text>
                                        </View>
                                        <View style={tw("w-[50%] border-b border-slate-800 flex flex-row")}>
                                            <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>{pengawasan.usaha.nama}</Text>
                                            <Text style={tw("w-[25%] border-l border-slate-800 p-1 text-center")}>{pengawasan.usaha.nib}</Text>
                                            <Text style={tw("w-[25%] border-l border-slate-800 p-1 text-center")}>{pengawasan.usaha.pjbu}</Text>
                                            <Text style={tw("w-[20%] border-l border-slate-800 p-1 text-center")}>{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</Text>
                                        </View>
                                        <View style={tw("w-[47%] border-b border-x border-slate-800 flex flex-row")}>
                                            <View style={tw("w-[100%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPengembanganUsaha)}</View>
                                        </View>
                                    </View>
                                )) : (
                                    <View wrap={false} style={tw("flex flex-row w-full text-[8px] min-h-8")}>
                                        <Text style={tw("w-full border-x border-b border-slate-800 p-1 text-center")}>Tidak ada pengawasan</Text>
                                    </View>
                                )
                            }
                        </View>
                    </View>
                    <Text
                        render={({ pageNumber }) => (`- ${pageNumber} -`)} fixed
                        style={tw("absolute bottom-8 right-0 left-0 text-[9px] text-center")}
                    />
                </Page>
                <Page wrap size="A4" orientation="landscape" style={tw("p-12 font-sans relative")}>
                    <View>
                        <Text style={tw("font-medium text-[11px]")}>Tertib Penyelenggaraan Jasa Konstruksi</Text>
                        <Text style={tw("text-[10px] mt-2 text-justify leading-normal")}>
                            Berikut merupakan Rekapitulasi Hasil Pengawasan Insidental Tertib Penyelenggaraan Jasa Konstruksi pada Tahun {tahun}.
                            Telah dilaksanakan Pengawasan Penyelenggaraan Jasa Konstruksi Tertib Penyelenggaraan Jasa Konstruksi sebanyak {getDefaultData(tertibPenyelenggaraan.totalTertib, 0) + getDefaultData(tertibPenyelenggaraan.totalBelumTertib, 0)} kegiatan penyelenggaraan konstruksi.
                            Terdapat {getDefaultData(tertibPenyelenggaraan.totalTertib)} kegiatan penyelenggaraan konstruksi yang sudah tertib dan {getDefaultData(tertibPenyelenggaraan.totalBelumTertib, 0)} kegiatan penyelenggaraan konstruksi yang belum tertib.
                        </Text>
                    </View>
                    <RekapitulasiTertibPenyelenggaraan
                        daftarPengawasan={daftarTertibPenyelenggaraan}
                    />
                    <Text
                        render={({ pageNumber }) => (`- ${pageNumber} -`)} fixed
                        style={tw("absolute bottom-8 right-0 left-0 text-[9px] text-center")}
                    />
                </Page>
                <Page wrap size="A4" orientation="landscape" style={tw("p-12 font-sans relative")}>
                    <View>
                        <Text style={tw("font-medium text-[11px]")}>Tertib Pemanfaatan Produk Jasa Konstruksi</Text>
                        <Text style={tw("text-[10px] mt-2 text-justify leading-normal")}>
                            Berikut merupakan Rekapitulasi Hasil Pengawasan Insidental Tertib Pemanfaatan Produk Jasa Konstruksi pada Tahun {tahun}.
                            Telah dilaksanakan Pengawasan Penyelenggaraan Jasa Konstruksi Tertib Pemanfaatan Produk sebanyak {getDefaultData(tertibPemanfaatanProduk.totalTertib, 0) + getDefaultData(tertibPemanfaatanProduk.totalBelumTertib, 0)} bangunan konstruksi.
                            Terdapat {getDefaultData(tertibPemanfaatanProduk.totalTertib)} bangunan konstruksi yang sudah tertib dan {getDefaultData(tertibPemanfaatanProduk.totalBelumTertib, 0)} bangunan konstruksi yang belum tertib.
                        </Text>
                    </View>
                    <RekapitulasiTertibPemanfaatanProduk
                        daftarPengawasan={daftarTertibPemanfaatanProduk}
                    />
                    <Text
                        render={({ pageNumber }) => (`- ${pageNumber} -`)} fixed
                        style={tw("absolute bottom-8 right-0 left-0 text-[9px] text-center")}
                    />
                </Page>
            </Document>
        </PDFViewer>
    );
}
