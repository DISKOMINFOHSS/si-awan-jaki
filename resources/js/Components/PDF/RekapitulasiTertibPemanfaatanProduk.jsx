import React from "react";
import { Font, Page, View, Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind"

import { inter } from "../../Utils/fonts";
import { getTertibStatusBadgeRekapitulasiPDF } from "../../Utils/getStatusBadge";
import { formatDateToIndonesia } from "../../Utils/formatDate";

Font.registerHyphenationCallback(word => [word]);
Font.register({ family: 'Inter', fonts: inter });

const tw = createTw({
    theme: {
        fontFamily: {
            'sans': ['Inter'],
        },
    },
});

export default ({ tahun, daftarPengawasan }) => {
    return (
        <Page wrap size="A4" orientation="landscape" style={tw("p-12 font-sans relative")}>
            <View style={tw("font-medium text-[11px]")}>
                <Text style={tw("font-medium text-[11px]")}t>3. Tertib Pemanfaatan Produk Jasa Konstruksi</Text>
                <Text style={tw("font-light text-[10px] mt-2")}>Berikut merupakan Rekapitulasi Hasil Pengawasan Rutin Tertib Pemanfaatan Produk Jasa Konstruksi Tahun {tahun}.</Text>
            </View>
            <View style={tw("mt-6 mb-4")}>
                <View fixed style={tw("flex flex-row w-full text-[8px] font-medium text-center")}>
                    <View style={tw("w-[3%] border-y border-l border-slate-800 p-1")}>
                        <Text style={tw("text-center")}>No</Text>
                    </View>
                    <View style={tw("w-[40%] border-y border-slate-800 flex flex-row text-center")}>
                        <Text style={tw("w-[45%] border-l border-slate-800 p-1")}>Nama Bangunan Konstruksi / Nomor Kontrak</Text>
                        <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>Lokasi</Text>
                        <Text style={tw("w-[25%] border-l border-slate-800 p-1")}>Tanggal Pengawasan</Text>
                    </View>
                    <View style={tw("w-[57%] border-y border-l border-slate-800 flex flex-row text-center")}>
                        <View style={tw("w-[30%] h-20 flex flex-col justify-center")}>
                            <Text style={tw("h-1/2 border-b border-slate-800 p-2")}>Fungsi Peruntukkan</Text>
                            <View style={tw("flex flex-row h-1/2")}>
                                <Text style={tw("w-[50%] border-r border-slate-800 p-1")}>Kesesuaian Fungsi</Text>
                                <Text style={tw("w-[50%] p-1")}>Kesesuaian Lokasi</Text>
                            </View>
                        </View>
                        <Text style={tw("w-[20%] border-l border-slate-800 p-1")}>Rencana Umur Konstruksi</Text>
                        <Text style={tw("w-[17.5%] border-l border-slate-800 p-1")}>Kapasitas dan Beban</Text>
                        <View style={tw("w-[32.5%] h-20 border-x border-slate-800 flex flex-col justify-center")}>
                            <Text style={tw("h-1/2 border-b border-slate-800 p-1")}>Pemeliharaan Produk Konstruksi</Text>
                            <View style={tw("flex flex-row h-1/2")}>
                                <Text style={tw("w-[50%] border-r border-slate-800 p-1")}>Pemeliharaan Bangunan</Text>
                                <Text style={tw("w-[50%] p-1")}>Program Pemeliharaan</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {
                    daftarPengawasan.map((pengawasan, i) => (
                        <View wrap={false} key={i} style={tw("flex flex-row w-full text-[8px]")}>
                            <View style={tw("w-[3%] border-b border-l border-slate-800 p-1")}>
                                <Text style={tw("text-center")}>{i + 1}</Text>
                            </View>
                            <View style={tw("w-[40%] border-b border-slate-800 flex flex-row text-center")}>
                                <View style={tw("w-[45%] border-l border-slate-800 p-1 text-left")}>
                                    <Text>{pengawasan.bangunan.nama}</Text>
                                    <Text style={tw("font-light text-slate-500 mt-0.5")}>Nomor Kontrak : {pengawasan.bangunan.nomorKontrak}</Text>
                                </View>
                                <View style={tw("w-[30%] border-l border-slate-800 p-1 text-left")}>
                                    <Text style={tw("capitalize")}>{`${pengawasan.bangunan.desaKelurahan.toLowerCase()}, ${pengawasan.bangunan.kecamatan.toLowerCase()}`}</Text>
                                </View>
                                <Text style={tw("w-[25%] border-l border-slate-800 p-1")}>{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</Text>
                            </View>
                            <View style={tw("w-[57%] border-b border-l border-slate-800 flex flex-row text-center")}>
                                <View style={tw("w-[30%] flex flex-row")}>
                                    <View style={tw("w-[50%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibKesesuaianFungsi)}</View>
                                    <View style={tw("w-[50%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibKesesuaianLokasi)}</View>
                                </View>
                                <View style={tw("w-[20%] border-l border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibRencanaUmurKonstruksi)}</View>
                                <View style={tw("w-[17.5%] border-l border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibKapasitasBeban)}</View>
                                <View style={tw("w-[32.5%] border-x border-slate-800 flex flex-row")}>
                                    <View style={tw("w-[50%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPemeliharaanBangunan)}</View>
                                    <View style={tw("w-[50%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibProgramPemeliharaan)}</View>
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
    )
}
