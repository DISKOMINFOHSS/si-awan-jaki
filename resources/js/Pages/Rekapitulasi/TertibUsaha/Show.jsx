import React from "react";
import { usePage } from "@inertiajs/react";
import { Font, Document, PDFViewer, Page, View, Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

import { inter } from "../../../Utils/fonts";

Font.registerHyphenationCallback(word => [word]);
Font.register({ family: 'Inter', fonts: inter });

const tw = createTw({
    theme: {
        fontFamily: {
            'sans': ['Inter'],
        },
    },
});

export default () => {
    const { url } = usePage();
    const tahun = url.split('/')[3];

    return (
        <PDFViewer width="100%" style={tw("min-h-screen")}>
            <Document title="rekapitulasi-pengawasan-tahunan-tertib-penyelenggaraan">
                <Page wrap size="A4" orientation="landscape" style={tw("p-12 font-sans relative")}>
                    <View style={tw("font-medium text-center text-[11px]")}>
                        <Text style={tw("font-medium text-[11px]")}t>Rekapitulasi Pengawasan Tertib Usaha Jasa Konstruksi Tahunan</Text>
                        <Text style={tw("font-light text-[10px]")}>Tahun Pengawasan {url.split('/')[3]}</Text>
                    </View>
                    <View style={tw("mt-6 mb-4")}>
                        <View fixed style={tw("flex flex-row w-full text-[8px] font-medium text-center")}>
                            <View style={tw("w-[3%] border-y border-l border-slate-800 p-1")}>
                                <Text style={tw("text-center")}>No</Text>
                            </View>
                            <View style={tw("w-[27%] border-y border-slate-800 flex flex-row text-center")}>
                                <View style={tw("w-[60%] flex flex-col border-l border-slate-800 p-1")}>
                                    <Text>Nama Badan Usaha / </Text>
                                    <Text>NIB</Text>
                                </View>
                                <Text style={tw("w-[40%] border-l border-slate-800 p-1")}>PJBU</Text>
                            </View>
                            <View style={tw("w-[70%] border-y border-l border-slate-800 flex flex-row text-center")}>
                                <View style={tw("w-[40%] h-24 flex flex-col justify-center")}>
                                    <Text style={tw("h-[70%] border-b border-slate-800 p-1")}>Kesesuaian Kegiatan Konstruksi</Text>
                                    <View style={tw("h-[30%] flex flex-row")}>
                                        <Text style={tw("w-[25%] border-r border-slate-800 p-1")}>Jenis</Text>
                                        <Text style={tw("w-[25%] border-r border-slate-800 p-1")}>Sifat</Text>
                                        <Text style={tw("w-[25%] border-r border-slate-800 p-1")}>Klasifikasi</Text>
                                        <Text style={tw("w-[25%] p-1")}>Layanan</Text>
                                    </View>
                                </View>
                                <View style={tw("w-[20%] h-24 border-l border-slate-800 flex flex-col justify-center")}>
                                    <Text style={tw("h-[70%] border-b border-slate-800 p-1")}>Kesesuaian Kegiatan Usaha Jasa Konstruksi dan Segmentasi Pasar Jasa Konstruksi</Text>
                                    <View style={tw("h-[30%] flex flex-row")}>
                                        <Text style={tw("w-[50%] border-r border-slate-800 p-1")}>Bentuk</Text>
                                        <Text style={tw("w-[50%] p-1")}>Kualifikasi</Text>
                                    </View>
                                </View>
                                <View style={tw("w-[20%] h-24 border-l border-slate-800 flex flex-col justify-center")}>
                                    <Text style={tw("h-[70%] border-b border-slate-800 p-1")}>Pemenuhan Persyaratan Usaha</Text>
                                    <View style={tw("h-[30%] flex flex-row")}>
                                        <Text style={tw("w-[50%] border-r border-slate-800 p-1")}>SBU</Text>
                                        <Text style={tw("w-[50%] p-1")}>NIB</Text>
                                    </View>
                                </View>
                                <Text style={tw("w-[20%] border-x border-slate-800 p-1")}>Pelaksanaan Pengembangan Usaha Berkelanjutan</Text>
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}
