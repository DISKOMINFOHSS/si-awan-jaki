import React from "react";
import { Font, Document, PDFViewer, Page, View, Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind"

import { inter } from "../../../Utils/fonts";
import RekapitulasiTertibPenyelenggaraan from "../../../Components/PDF/RekapitulasiTertibPenyelenggaraan";
import { usePage } from "@inertiajs/react";
import RekapitulasiTertibPemanfaatanProduk from "../../../Components/PDF/RekapitulasiTertibPemanfaatanProduk";

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
    const { daftarTertibPenyelenggaraan, daftarTertibPemanfaatanProduk } = data;

    return (
        <PDFViewer width="100%" style={tw("min-h-screen")}>
            <Document title="rekapitulasi-pengawasan-rutin-tahunan">
                <Page wrap size="A4" orientation="landscape" style={tw("p-12 font-sans relative")}>
                    <View>
                        <Text style={tw("font-medium text-[11px]")}>Tertib Penyelenggaraan Jasa Konstruksi</Text>
                        <Text style={tw("text-[10px] mt-2 text-justify leading-normal")}>
                            Berikut merupakan Rekapitulasi Hasil Pengawasan Rutin Tertib Penyelenggaraan Jasa Konstruksi pada Tahun {tahun}.
                            {/* Telah dilaksanakan Pengawasan Penyelenggaraan Jasa Konstruksi Tertib Penyelenggaraan Jasa Konstruksi sebanyak {getDefaultData(tertibPenyelenggaraan.totalTertib, 0) + getDefaultData(tertibPenyelenggaraan.totalBelumTertib, 0)} kegiatan penyelenggaraan konstruksi.
                            Terdapat {getDefaultData(tertibPenyelenggaraan.totalTertib)} kegiatan penyelenggaraan konstruksi yang sudah tertib dan {getDefaultData(tertibPenyelenggaraan.totalBelumTertib, 0)} kegiatan penyelenggaraan konstruksi yang belum tertib. */}
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
                        <Text style={tw("font-medium text-[11px]")}t>Tertib Pemanfaatan Produk Jasa Konstruksi</Text>
                        <Text style={tw("text-[10px] mt-2 text-justify leading-normal")}>
                            Berikut merupakan Rekapitulasi Hasil Pengawasan Rutin Tertib Pemanfaatan Produk Jasa Konstruksi pada Tahun {tahun}.
                            {/* Telah dilaksanakan Pengawasan Penyelenggaraan Jasa Konstruksi Tertib Pemanfaatan Produk sebanyak {getDefaultData(tertibPemanfaatanProduk.totalTertib, 0) + getDefaultData(tertibPemanfaatanProduk.totalBelumTertib, 0)} bangunan konstruksi.
                            Terdapat {getDefaultData(tertibPemanfaatanProduk.totalTertib)} bangunan konstruksi yang sudah tertib dan {getDefaultData(tertibPemanfaatanProduk.totalBelumTertib, 0)} bangunan konstruksi yang belum tertib. */}
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
