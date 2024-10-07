import React from "react";
import { Font, Document, PDFViewer, Page, View, Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

import SimakLingkup2 from "../../../../../Components/PDF/TertibUsaha/SimakLingkup2";

import { inter } from "../../../../../Utils/fonts";
import { formatDateToIndonesia } from "../../../../../Utils/formatDate";
import { getTertibStatusBadgePDF } from "../../../../../Utils/getStatusBadge";

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
            <Document title="simak-pengawasan-bujk-lingkup-2">
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
                                <View style={tw("w-[45%] border border-slate-800 p-2")}>
                                    <Text style={tw("mb-1 font-medium")}>Lingkup Pengawasan</Text>
                                    <Text style={tw("text-justify leading-normal")}>Pengawasan terhadap Kesesuaian jenis, sifat, Klasifikasi, dan layanan usaha dengan kegiatan usaha Jasa Konstruksi</Text>
                                </View>
                                <View style={tw("w-[55%] border-y border-r border-slate-800")}>
                                    <View style={tw("w-full border-b border-slate-800 flex flex-row")}>
                                        <Text style={tw("w-[50%] border-r border-slate-800 p-2")}>Jenis Usaha</Text>
                                        <View style={tw("w-[50%] flex justify-center p-2")}>{getTertibStatusBadgePDF(pengawasan.tertibJenisUsaha)}</View>
                                    </View>
                                    <View style={tw("w-full border-b border-slate-800 flex flex-row")}>
                                        <Text style={tw("w-[50%] border-r border-slate-800 p-2")}>Sifat Usaha</Text>
                                        <View style={tw("w-[50%] flex justify-center p-2")}>{getTertibStatusBadgePDF(pengawasan.tertibSifatUsaha)}</View>
                                    </View>
                                    <View style={tw("w-full border-b border-slate-800 flex flex-row")}>
                                        <Text style={tw("w-[50%] border-r border-slate-800 p-2")}>Klasifikasi Usaha</Text>
                                        <View style={tw("w-[50%] flex justify-center p-2")}>{getTertibStatusBadgePDF(pengawasan.tertibKlasifikasiUsaha)}</View>
                                    </View>
                                    <View style={tw("w-full flex flex-row")}>
                                        <Text style={tw("w-[50%] border-r border-slate-800 p-2")}>Layanan Usaha</Text>
                                        <View style={tw("w-[50%] flex justify-center p-2")}>{getTertibStatusBadgePDF(pengawasan.tertibLayananUsaha)}</View>
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
                <SimakLingkup2 pengawasan={pengawasan} />
            </Document>
        </PDFViewer>
    );
}
