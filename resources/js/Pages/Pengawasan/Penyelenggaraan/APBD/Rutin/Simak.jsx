import React from "react";
import { Font, Document, PDFViewer, Page, View, Text, Svg } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

import { inter } from "../../../../../Utils/fonts";
import { getStatusBadgePDF } from "../../../../../Utils/getStatusBadge";

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
    const { proyekKonstruksi, daftarLingkupPengawasan } = pengawasan;

    return (
        <PDFViewer width="100%" style={tw("min-h-screen")}>
            <Document title="simak-pengawasan-tertib-penyelenggaraan-apbd-rutin">
                <Page wrap size="A4" orientation="landscape" style={tw("p-12 font-sans relative")}>
                    <View style={tw("font-medium text-center text-[12px]")}>
                        <Text>Simak - Pengawasan Tertib Penyelenggaraan Konstruksi secara Rutin</Text>
                        <Text>Penyelenggaraan Konstruksi dengan Sumber Dana dari APBD</Text>
                    </View>
                    <View style={tw("mt-6 mb-4 text-[11px]")}>
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
                    <View>
                        <View fixed style={tw("flex flex-row w-full text-[10px] font-bold text-center")}>
                            <View style={tw("w-[5%] border-y border-l border-slate-800 p-2")}>
                                <Text style={tw("text-center")}>NO</Text>
                            </View>
                            <View style={tw("w-[95%] border-y border-x border-slate-800 text-center")}>
                                <View style={tw("flex flex-row w-full")}>
                                    <Text style={tw("w-[30%] border-r border-slate-800 p-2")}>LINGKUP PENGAWASAN / INDIKATOR</Text>
                                    <Text style={tw("w-[22.5%] border-r border-slate-800 p-2")}>DOKUMEN YANG DIPERIKSA</Text>
                                    <View style={tw("w-[47.5%] flex flex-row")}>
                                        <Text style={tw("w-[40%] border-r border-slate-800 p-2")}>CARA PEMERIKSAAN</Text>
                                        <Text style={tw("w-[60%] p-2")}>HASIL PEMERIKSAAN</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {
                            daftarLingkupPengawasan.map((lingkup, i) => (
                                <View wrap={false} key={i} style={tw("flex flex-row w-full text-[10px]")}>
                                    <View style={tw("w-[5%] border-b border-l border-slate-800 p-2")}>
                                        <Text style={tw("text-center")}>{i + 1}.</Text>
                                    </View>
                                    <View style={tw("w-[95%] border-b border-x border-slate-800 text-justify")}>
                                        <View style={tw("flex flex-row w-full")}>
                                            <View style={tw("w-[30%] border-r border-slate-800")}>
                                                <Text style={tw("p-2")}>{lingkup.lingkupPengawasan}</Text>
                                                <View style={tw("flex flex-row border-t border-slate-800 w-full mt-1")}>
                                                    <Text style={tw("w-[27.5%] border-r border-slate-800 p-2")}>Indikator :</Text>
                                                    <View style={tw("w-[72.5%] flex flex-col")}>
                                                    {
                                                        lingkup.indikator.map(({ id, indikator }, j) => (
                                                            <View key={id}>
                                                                <View style={tw("flex flex-row w-full p-2")}>
                                                                    { id[1] && <Text style={tw("w-[10%]")}>{id[1]}.</Text> }
                                                                    <Text style={tw("grow w-full")}>{indikator}</Text>
                                                                </View>
                                                                { j+1 !== lingkup.indikator.length && <View key={id} style={tw("w-full border-b border-slate-800")}></View> }
                                                            </View>
                                                        ))
                                                    }
                                                    </View>
                                                </View>
                                            </View>
                                            <Text style={tw("w-[22.5%] border-r border-slate-800 p-2")}>{lingkup.dokumen}</Text>
                                            <View style={tw("w-[47.5%]")}>
                                                {
                                                    lingkup.daftarPemeriksaan.map(({ label, caraPemeriksaan, catatan, kesimpulan }, j) => (
                                                        <React.Fragment key={j}>
                                                            <View  style={tw("flex flex-row")}>
                                                                <Text style={tw("w-[40%] border-r border-slate-800 p-2")}>{caraPemeriksaan}</Text>
                                                                <View style={tw("w-[60%] p-2")}>
                                                                    <View style={tw("flex flex-row items-center gap-2")}>
                                                                        <Text style={tw("font-light leading-tight")}>Kesimpulan</Text>
                                                                        {getStatusBadgePDF(kesimpulan, label)}
                                                                    </View>
                                                                    <View style={tw("mt-1")}>
                                                                        <Text style={tw("font-light leading-tight")}>Catatan Pemeriksaan</Text>
                                                                        <Text style={tw("mt-1")}>{catatan ? catatan : '-'}</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            { j+1 !== lingkup.daftarPemeriksaan.length && <View style={tw("w-full border-b border-slate-800")}></View> }
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </View>
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
