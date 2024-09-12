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
                <RekapitulasiTertibPenyelenggaraan
                    tahun={tahun}
                    daftarPengawasan={daftarTertibPenyelenggaraan}
                />
                <RekapitulasiTertibPemanfaatanProduk
                    tahun={tahun}
                    daftarPengawasan={daftarTertibPemanfaatanProduk}
                />
            </Document>
        </PDFViewer>
    );
}
