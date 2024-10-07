import React from "react";
import { Font, Document, PDFViewer, Page, View, Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

import { inter } from "../../../../../Utils/fonts";
import { formatDateToIndonesia } from "../../../../../Utils/formatDate";
import { getTertibStatusBadgePDF } from "../../../../../Utils/getStatusBadge";
import SimakLingkup3 from "../../../../../Components/PDF/TertibUsaha/SimakLingkup3";

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
    const { usaha, rekomendasi } = pengawasan;

    return (
        <PDFViewer width="100%" style={tw("min-h-screen")}>
            <Document title="simak-pengawasan-pemanfaatan-produk">
                <Page wrap size="A4" orientation="portait" style={tw("p-10 font-sans relative")}>
                    <View style={tw("font-medium text-center text-[11px] uppercase mb-8")}>
                        <Text>Hasil Pengawasan {pengawasan.jenisPengawasan}</Text>
                        <Text>Pengawasan Tertib Usaha Jasa Konstruksi</Text>
                        <Text style={tw("capitalize text-[10px] font-normal")}>Tanggal Pengawasan : {formatDateToIndonesia(pengawasan.tanggalPengawasan)}</Text>
                    </View>
                    <View style={tw("w-full text-[10px] mb-4")}>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>Nama Badan Usaha</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>{usaha.nama}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>NIB</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>{usaha.nib}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>Penanggung Jawab Badan Usaha (PJBU)</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>{usaha.pjbu}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-1 mb-1")}>
                            <Text style={tw("w-[26%]")}>Alamat</Text>
                            <Text style={tw("w-[1%]")}>:</Text>
                            <Text style={tw("w-[73%]")}>{usaha.alamat}</Text>
                        </View>
                    </View>
                    <View style={tw("w-full mb-4")}>
                        <View style={tw("mb-2")}>
                            <View style={tw("flex flex-row gap-x-2 items-center")}>
                                <Text style={tw("font-medium text-[11px]")}>Kesimpulan Pemeriksaan</Text>
                                <View>
                                    {getTertibStatusBadgePDF(pengawasan.tertibPengawasan)}
                                </View>
                            </View>
                            <Text style={tw("my-0.5 font-light text-[10px]")}>Pengawasan Tertib Usaha Jasa Konstruksi</Text>
                        </View>
                        <View>
                            <View style={tw("flex flex-row w-full text-[10px]")}>
                                <View style={tw("w-[45%] h-32 border border-slate-800 p-2")}>
                                    <Text style={tw("mb-1 font-medium")}>Lingkup Pengawasan</Text>
                                    <Text style={tw("text-justify leading-normal")}>Pengawasan terhadap Kesesuaian bentuk dan Kualifikasi usaha dengan kegiatan usaha Jasa Konstruksi dan segmentasi pasar Jasa Konstruksi</Text>
                                </View>
                                <View style={tw("w-[55%] h-32 border-y border-r border-slate-800")}>
                                    <View style={tw("w-full h-[50%] border-b border-slate-800 flex flex-row")}>
                                        <Text style={tw("w-[50%] border-r border-slate-800 p-2")}>Bentuk Usaha</Text>
                                        <View style={tw("w-[50%] p-2")}>{getTertibStatusBadgePDF(pengawasan.tertibBentukUsaha)}</View>
                                    </View>
                                    <View style={tw("w-full h-[50%] flex flex-row")}>
                                        <Text style={tw("w-[50%] border-r border-slate-800 p-2")}>Kualifikasi Usaha</Text>
                                        <View style={tw("w-[50%] p-2")}>{getTertibStatusBadgePDF(pengawasan.tertibKualifikasiUsaha)}</View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View wrap={false} style={tw("w-full mb-4")}>
                        <View style={tw("mb-4")}>
                            <Text style={tw("font-medium text-[12px]")}>Hasil Temuan dan Rekomendasi</Text>
                            <Text style={tw("my-0.5 font-light text-[10px]")}>Pengawasan Tertib Usaha Jasa Konstruksi</Text>
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
                <SimakLingkup3 pengawasan={pengawasan} />
            </Document>
        </PDFViewer>
    );
}
