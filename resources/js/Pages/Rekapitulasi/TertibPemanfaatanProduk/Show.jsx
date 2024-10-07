import React from "react";
import { Font, Document, PDFViewer, Page, View, Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

import { inter } from "../../../Utils/fonts";
import { formatDateToIndonesia } from "../../../Utils/formatDate";
import { getTertibStatusBadgeRekapitulasiPDF } from "../../../Utils/getStatusBadge";
import { usePage } from "@inertiajs/react";

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
    const { daftarBangunan } = data;
    const { url } = usePage();

    return (
        <PDFViewer width="100%" style={tw("min-h-screen")}>
            <Document title="rekapitulasi-pengawasan-tahunan-tertib-pemanfaatan-produk">
                <Page wrap size="A4" orientation="landscape" style={tw("p-12 font-sans relative")}>
                    <View style={tw("font-medium text-center text-[11px]")}>
                        <Text style={tw("font-medium text-[11px]")}t>Rekapitulasi Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi Tahunan</Text>
                        <Text style={tw("font-light text-[10px]")}>Tahun Pengawasan {url.split('/')[3]}</Text>
                    </View>
                    <View style={tw("mt-6 mb-4")}>
                        <View fixed style={tw("flex flex-row w-full text-[8px] font-medium text-center")}>
                            <View style={tw("w-[3%] border-y border-l border-slate-800 p-1")}>
                                <Text style={tw("text-center")}>No</Text>
                            </View>
                            <View style={tw("w-[50%] border-y border-slate-800 flex flex-row text-center")}>
                                <Text style={tw("w-[25%] border-l border-slate-800 p-1")}>Nama Bangunan Konstruksi / Nomor Kontrak</Text>
                                <Text style={tw("w-[20%] border-l border-slate-800 p-1")}>Lokasi</Text>
                                <Text style={tw("w-[20%] border-l border-slate-800 p-1")}>Tanggal dan Tahun Pembangunan</Text>
                                <Text style={tw("w-[20%] border-l border-slate-800 p-1")}>Tanggal dan Tahun Pemanfaatan</Text>
                                <Text style={tw("w-[15%] border-l border-slate-800 p-1")}>Umur Konstruksi</Text>
                            </View>
                            <View style={tw("w-[47%] border-y border-l border-slate-800 flex flex-row text-center")}>
                                <View style={tw("w-[30%] flex flex-col justify-center")}>
                                    <Text style={tw("border-b border-slate-800 p-2")}>Fungsi Peruntukkan</Text>
                                    <View style={tw("flex flex-row")}>
                                        <Text style={tw("w-[50%] border-r border-slate-800 p-1")}>Kesesuaian Fungsi</Text>
                                        <Text style={tw("w-[50%] p-1")}>Kesesuaian Lokasi</Text>
                                    </View>
                                </View>
                                <Text style={tw("w-[20%] border-l border-slate-800 p-1")}>Rencana Umur Konstruksi</Text>
                                <Text style={tw("w-[17.5%] border-l border-slate-800 p-1")}>Kapasitas dan Beban</Text>
                                <View style={tw("w-[32.5%] border-x border-slate-800 flex flex-col justify-center")}>
                                    <Text style={tw("border-b border-slate-800 p-1")}>Pemeliharaan Produk Konstruksi</Text>
                                    <View style={tw("flex flex-row")}>
                                        <Text style={tw("w-[50%] border-r border-slate-800 p-1")}>Pemeliharaan Bangunan</Text>
                                        <Text style={tw("w-[50%] p-1")}>Program Pemeliharaan</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {
                            daftarBangunan.map((bangunan, i) => (
                                <View wrap={false} key={i} style={tw("flex flex-row w-full text-[8px]")}>
                                    <View style={tw("w-[3%] border-b border-l border-slate-800 p-1")}>
                                        <Text style={tw("text-center")}>{i + 1}</Text>
                                    </View>
                                    <View style={tw("w-[50%] border-b border-slate-800 flex flex-row text-center")}>
                                        <View style={tw("w-[25%] border-l border-slate-800 p-1 text-left")}>
                                            <Text>{bangunan.nama}</Text>
                                            <Text style={tw("font-light text-slate-500 mt-0.5")}>Nomor Kontrak : {bangunan.nomorKontrak}</Text>
                                        </View>
                                        <View style={tw("w-[20%] border-l border-slate-800 p-1 text-left")}>
                                            <Text style={tw("capitalize")}>{`${bangunan.desaKelurahan.toLowerCase()}, ${bangunan.kecamatan.toLowerCase()}`}</Text>
                                        </View>
                                        <Text style={tw("w-[20%] border-l border-slate-800 p-1")}>{`${formatDateToIndonesia(bangunan.tanggalMulaiBangun)} s.d ${formatDateToIndonesia(bangunan.tanggalSelesaiBangun)}`}</Text>
                                        <Text style={tw("w-[20%] border-l border-slate-800 p-1")}>{formatDateToIndonesia(bangunan.tanggalPemanfaatan)}</Text>
                                        <Text style={tw("w-[15%] border-l border-slate-800 p-1")}>{bangunan.umurKonstruksi}</Text>
                                    </View>
                                    <View style={tw("w-[47%] border-b border-l border-slate-800 flex flex-row text-center")}>
                                        <View style={tw("w-[30%] flex flex-row")}>
                                            <View style={tw("w-[50%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(bangunan.tertibKesesuaianFungsi)}</View>
                                            <View style={tw("w-[50%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(bangunan.tertibKesesuaianLokasi)}</View>
                                        </View>
                                        <View style={tw("w-[20%] border-l border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(bangunan.tertibRencanaUmurKonstruksi)}</View>
                                        <View style={tw("w-[17.5%] border-l border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(bangunan.tertibKapasitasBeban)}</View>
                                        <View style={tw("w-[32.5%] border-x border-slate-800 flex flex-row")}>
                                            <View style={tw("w-[50%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(bangunan.tertibPemeliharaanBangunan)}</View>
                                            <View style={tw("w-[50%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(bangunan.tertibProgramPemeliharaan)}</View>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                    <Text
                        render={({ pageNumber }) => (`- ${pageNumber} -`)} fixed
                        style={tw("absolute bottom-8 right-0 left-0 text-[9px] text-center")}
                    />
                </Page>
            </Document>
        </PDFViewer>
    )
}
