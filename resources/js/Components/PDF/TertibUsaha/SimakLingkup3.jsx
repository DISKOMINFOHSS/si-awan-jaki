import React from "react";
import { Font, Page, View, Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

import { inter } from "../../../Utils/fonts";
import { formatDateToIndonesia } from "../../../Utils/formatDate";

Font.registerHyphenationCallback(word => [word]);
Font.register({ family: 'Inter', fonts: inter });

const tw = createTw({
    theme: {
        fontFamily: {
            'sans': ['Inter'],
        },
    },
});

export default ({ pengawasan }) => {
    const { usaha, daftarKesesuaianKegiatan } = pengawasan;

    return (
        <Page wrap size="A4" orientation="landscape" style={tw("p-12 font-sans relative")}>
            <View style={tw("font-medium text-center text-[12px] h-[7%]")}>
                <Text>Simak - Pengawasan Tertib Usaha terhadap Kesesuaian Bentuk dan Kualifikasi Usaha dengan Kegiatan Usaha Jasa Konstruksi</Text>
                <Text>dan Segmentasi Pasar Jasa Konstruksi Secara {pengawasan.jenisPengawasan}</Text>
            </View>
            <View style={tw("mt-6 mb-4 text-[11px]")}>
                <View style={tw("flex flex-row gap-1 mb-1")}>
                    <Text style={tw("w-[20%]")}>Nama Badan Usaha</Text>
                    <Text style={tw("w-[1%]")}>:</Text>
                    <Text style={tw("w-[79%]")}>{usaha.nama}</Text>
                </View>
                <View style={tw("flex flex-row gap-1 mb-1")}>
                    <Text style={tw("w-[20%]")}>Status Perizinan Berusaha</Text>
                    <Text style={tw("w-[1%]")}>:</Text>
                    <Text style={tw("w-[79%]")}>{pengawasan.statusIzinUsaha}</Text>
                </View>
                <View style={tw("flex flex-row gap-1 mb-1")}>
                    <Text style={tw("w-[20%]")}>No. NIB</Text>
                    <Text style={tw("w-[1%]")}>:</Text>
                    <Text style={tw("w-[79%]")}>{pengawasan.statusVerifikasiNIB ? "Terverifikasi" : "Belum Terverifikasi"} (Sesuai dengan OSS)</Text>
                </View>
                <View style={tw("flex flex-row gap-1 mb-1")}>
                    <Text style={tw("w-[20%]")}>Waktu Pengawasan</Text>
                    <Text style={tw("w-[1%]")}>:</Text>
                    <Text style={tw("w-[79%]")}>{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</Text>
                </View>
            </View>
            <View>
                <View fixed style={tw("flex flex-row w-full text-[10px] font-medium text-center")}>
                    <Text style={tw("w-[5%] border-y border-l border-slate-800 p-2 text-center")}>No</Text>
                    <Text style={tw("w-[30%] border-y border-l border-slate-800 p-2 text-center")}>Nama Paket Pekerjaan</Text>
                    <View style={tw("w-[65%] flex flex-row border-y border-x border-slate-800 text-center")}>
                        <View style={tw("w-[50%] border-r border-slate-800")}>
                            <Text style={tw("w-full p-2 border-b border-slate-800")}>Bentuk Usaha</Text>
                            <View style={tw("flex flex-row")}>
                                <Text style={tw("w-[50%] p-2 border-r border-slate-800")}>Bentuk Usaha yang dipersyaratkan</Text>
                                <Text style={tw("w-[50%] p-2")}>Kesesuaian dengan SBU</Text>
                            </View>
                        </View>
                        <View style={tw("w-[50%]")}>
                            <Text style={tw("w-full p-2 border-b border-slate-800")}>Kualifikasi Usaha</Text>
                            <View style={tw("flex flex-row")}>
                                <Text style={tw("w-[50%] p-2 border-r border-slate-800")}>Kualifikasi Usaha yang dipersyaratkan</Text>
                                <Text style={tw("w-[50%] p-2")}>Kesesuaian dengan SBU</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {
                    daftarKesesuaianKegiatan.map((paketPekerjaan, i) => (
                        <View wrap={false} key={i} style={tw("flex flex-row w-full text-[10px]")}>
                            <Text style={tw("w-[5%] border-b border-l border-slate-800 p-2 text-center")}>{i + 1}</Text>
                            <Text style={tw("w-[30%] border-b border-l border-slate-800 p-2")}>{paketPekerjaan.namaPaket}</Text>
                            <View style={tw("w-[65%] flex flex-row border-b border-x border-slate-800 text-center")}>
                                <View style={tw("w-[50%] border-r border-slate-800 flex flex-row")}>
                                    <Text style={tw("w-[50%] p-2 border-r border-slate-800")}>{paketPekerjaan.bentukUsaha}</Text>
                                    <Text style={tw("w-[50%] p-2")}>{paketPekerjaan.kesesuaianBentuk ? "Sesuai" : "Tidak Sesuai"}</Text>
                                </View>
                                <View style={tw("w-[50%] flex flex-row")}>
                                    <Text style={tw("w-[50%] p-2 border-r border-slate-800")}>{paketPekerjaan.kualifikasiUsaha}</Text>
                                    <Text style={tw("w-[50%] p-2")}>{paketPekerjaan.kesesuaianKualifikasi ? "Sesuai" : "Tidak Sesuai"}</Text>
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
    );
}
