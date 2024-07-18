import React from "react";
import { Font, Document, PDFViewer, Page, View, Text, Svg } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

import { inter } from "../../../Utils/fonts";
import { getStatusBadgePDF, getTertibStatusBadgePDF } from "../../../Utils/getStatusBadge";

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
    const { pengawasan } = data;
    const {
        bangunan,
        tertibKesesuaianFungsi,
        tertibKesesuaianLokasi,
        tertibRencanaUmurKonstruksi,
        tertibKapasitasBeban,
        tertibPemeliharaanBangunan,
        tertibProgramPemeliharaan,
        rekomendasiPengawasan,
        daftarPemeriksaan
    } = pengawasan;

    const { rekomendasi, keterangan, tanggalTemuan } = rekomendasiPengawasan[0];

    const daftarLingkupPengawasan = Array(4).fill([]);
    daftarPemeriksaan.map((pemeriksaan) => {
        const i = Number(pemeriksaan.id[0]) - 1;
        daftarLingkupPengawasan[i] = [...daftarLingkupPengawasan[i], pemeriksaan];
    });

    console.log(data);

    return (
        <PDFViewer width="100%" style={tw("min-h-screen")}>
            <Document title="laporan-pengawasan">
                <Page wrap size="A4" orientation="portait" style={tw("p-10 font-sans relative")}>
                    <View style={tw("mb-8")}>
                        <Text style={tw("font-medium text-[20px]")}>Laporan Pengawasan Rutin</Text>
                        <Text style={tw("my-0.5 text-[11px]")}>Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</Text>
                        <Text style={tw("font-light text-[10px]")}>Tanggal Pengawasan: {pengawasan.tanggalPengawasan}</Text>
                    </View>
                    <View style={tw("w-full mb-4 text-[10px]")}>
                        <Text style={tw("font-medium")}>Nama Bangunan</Text>
                        <Text style={tw("font-light uppercase")}>{bangunan.nama}</Text>
                    </View>
                    <View style={tw("flex flex-row items-start gap-4 mb-4 text-[10px]")}>
                        <View style={tw("basis-2/5 text-[10px]")}>
                            <Text style={tw("font-medium")}>Nama Pemilik</Text>
                            <Text style={tw("font-light uppercase")}>{bangunan.pemilikBangunan}</Text>
                        </View>
                        <View style={tw("basis-2/5")}>
                            <Text style={tw("font-medium")}>Nama Pengelola</Text>
                            <Text style={tw("font-light uppercase")}>{bangunan.pengelolaBangunan}</Text>
                        </View>
                        <View style={tw("basis-1/5")}></View>
                    </View>
                    <View style={tw("flex flex-row items-start gap-4 mb-4 text-[10px]")}>
                        <View style={tw("basis-2/5")}>
                            <Text style={tw("font-medium")}>Tanggal dan Tahun Pembangunan</Text>
                            <Text style={tw("font-light")}>{bangunan.tanggalMulaiBangun} s.d {bangunan.tanggalSelesaiBangun}</Text>
                        </View>
                        <View style={tw("basis-2/5")}>
                            <Text style={tw("font-medium")}>Tanggal dan Tahun Pemanfaatan</Text>
                            <Text style={tw("font-light")}>{bangunan.tanggalPemanfaatan}</Text>
                        </View>
                        <View style={tw("basis-1/5")}>
                            <Text style={tw("font-medium")}>Umur Konstruksi</Text>
                            <Text style={tw("font-light")}>{bangunan.umurKonstruksi}</Text>
                        </View>
                    </View>
                    <View style={tw("w-full mb-4 text-[10px]")}>
                        <Text style={tw("font-medium")}>Lokasi Bangunan</Text>
                        <Text style={tw("font-light capitalize")}>
                            {bangunan.lokasi}
                            {bangunan.desaKelurahan && `, ${bangunan.desaKelurahan.toLowerCase()}`}
                            {bangunan.kecamatan && `, ${bangunan.kecamatan.toLowerCase()}`}
                        </Text>
                    </View>
                    <View style={tw("my-5")}>
                        <Text style={tw("font-medium text-[14px]")}>Kesimpulan Pemeriksaan</Text>
                        <Text style={tw("my-0.5 text-[10px]")}>Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</Text>
                    </View>
                    <View style={tw("flex flex-row items-start gap-4 mb-4")}>
                        <View style={tw("basis-1/2 flex flex-row gap-4")}>
                            <View style={tw("basis-2/3")}>
                                <Text style={tw("font-medium text-[10px]")}>Kesesuaian Fungsi</Text>
                                <Text style={tw("font-light text-[9px]")}>Pengawasan Fungsi Peruntukan</Text>
                            </View>
                            <View style={tw("basis-1/3 mt-1")}>
                                {getTertibStatusBadgePDF(tertibKesesuaianFungsi)}
                            </View>
                        </View>
                        <View style={tw("basis-1/2 flex flex-row gap-4")}>
                            <View style={tw("basis-2/3")}>
                                <Text style={tw("font-medium text-[10px]")}>Kesesuaian Lokasi</Text>
                                <Text style={tw("font-light text-[9px]")}>Pengawasan Fungsi Peruntukan</Text>
                            </View>
                            <View style={tw("basis-1/3 mt-1")}>
                                {getTertibStatusBadgePDF(tertibKesesuaianLokasi)}
                            </View>
                        </View>
                    </View>
                    <View style={tw("flex flex-row items-start gap-4 mb-4")}>
                        <View style={tw("basis-1/2 flex flex-row items-center gap-4")}>
                            <View style={tw("basis-2/3")}>
                                <Text style={tw("font-medium text-[10px]")}>Rencana Umur Konstruksi</Text>
                            </View>
                            <View style={tw("basis-1/3 mt-1")}>
                                {getTertibStatusBadgePDF(tertibRencanaUmurKonstruksi)}
                            </View>
                        </View>
                        <View style={tw("basis-1/2 flex flex-row items-center gap-4")}>
                            <View style={tw("basis-2/3")}>
                                <Text style={tw("font-medium text-[10px]")}>Kapasitas dan Beban</Text>
                            </View>
                            <View style={tw("basis-1/3 mt-1")}>
                                {getTertibStatusBadgePDF(tertibKapasitasBeban)}
                            </View>
                        </View>
                    </View>
                    <View style={tw("flex flex-row items-start gap-4 mb-4")}>
                        <View style={tw("basis-1/2 flex flex-row gap-4")}>
                            <View style={tw("basis-2/3")}>
                                <Text style={tw("font-medium text-[10px]")}>Pemeliharaan Bangunan</Text>
                                <Text style={tw("font-light text-[9px]")}>Pemeliharaan Produk Konstruksi</Text>
                            </View>
                            <View style={tw("basis-1/3 mt-1")}>
                                {getTertibStatusBadgePDF(tertibPemeliharaanBangunan)}
                            </View>
                        </View>
                        <View style={tw("basis-1/2 flex flex-row gap-4")}>
                            <View style={tw("basis-2/3")}>
                                <Text style={tw("font-medium text-[10px]")}>Program Pemeliharaan</Text>
                                <Text style={tw("font-light text-[9px]")}>Pemeliharaan Produk Konstruksi</Text>
                            </View>
                            <View style={tw("basis-1/3 mt-1")}>
                                {getTertibStatusBadgePDF(tertibProgramPemeliharaan)}
                            </View>
                        </View>
                    </View>
                    <View style={tw("mt-5 mb-2.5")}>
                        <Text style={tw("font-medium text-[14px]")}>Hasil Temuan dan Rekomendasi</Text>
                        <Text style={tw("my-0.5 font-light text-[10px]")}>Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</Text>
                    </View>
                    <Text style={tw("border border-slate-200 rounded-lg p-4 min-h-24 font-light text-[10px] text-justify mb-4")}>{rekomendasi}</Text>
                    <View style={tw("flex flex-row gap-4")}>
                        <View style={tw("basis-4/5 text-[10px]")}>
                            <Text style={tw("font-medium mb-1")}>Keterangan</Text>
                            <Text style={tw("border border-slate-200 rounded-lg p-4 min-h-20 font-light text-justify")}>{keterangan ? keterangan : '-'}</Text>
                        </View>
                        <View style={tw("basis-1/5 text-[10px]")}>
                            <Text style={tw("font-medium mb-1")}>Tanggal Temuan</Text>
                            <Text style={tw("border border-slate-200 rounded-md p-4 font-light")}>{tanggalTemuan ? tanggalTemuan : '-'}</Text>
                        </View>
                    </View>
                    <Text
                        render={({ pageNumber }) => (`- ${pageNumber} -`)} fixed
                        style={tw("absolute bottom-8 right-0 left-0 text-[9px] text-center")}
                    />
                </Page>
                <Page wrap size="A4" orientation="landscape" style={tw("p-12 font-sans relative")}>
                    <View style={tw("font-medium text-center text-[12px]")}>
                        <Text>Simak Pengawasan Tertib Pemanfaatan Produk Konstruksi secara Rutin terhadap Bangunan Konstruksi</Text>
                        <Text>yang dibiayai dengan dana dari {bangunan.sumberDana}</Text>
                    </View>
                    <View style={tw("mt-6 mb-4 text-[11px]")}>
                        <View style={tw("flex flex-row gap-2 mb-1")}>
                            <Text style={tw("w-[20%]")}>Nama Bangunan</Text>
                            <Text style={tw("w-[80%] uppercase")}>: {bangunan.nama}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-2 mb-1")}>
                            <Text style={tw("w-[20%]")}>Lokasi</Text>
                            <Text style={tw("w-[80%] capitalize")}>
                                : {bangunan.lokasi}
                                {bangunan.desaKelurahan && `, ${bangunan.desaKelurahan.toLowerCase()}`}
                                {bangunan.kecamatan && `, ${bangunan.kecamatan.toLowerCase()}`}
                            </Text>
                        </View>
                        <View style={tw("flex flex-row gap-2 mb-1")}>
                            <Text style={tw("w-[20%]")}>Nama Pemilik Bangunan</Text>
                            <Text style={tw("w-[80%] uppercase")}>: {bangunan.pemilikBangunan}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-2 mb-1")}>
                            <Text style={tw("w-[20%]")}>Nama Pengelola Bangunan</Text>
                            <Text style={tw("w-[80%] uppercase")}>: {bangunan.pengelolaBangunan}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-2 mb-1")}>
                            <Text style={tw("w-[20%]")}>Waktu Pengawasan</Text>
                            <Text style={tw("w-[80%]")}>: {pengawasan.tanggalPengawasan}</Text>
                        </View>
                    </View>
                    <View>
                        <View fixed style={tw("flex flex-row w-full text-[10px] font-bold text-center")}>
                            <View style={tw("w-[5%] border-t border-l border-slate-800 p-2")}>
                                <Text style={tw("text-center")}>NO</Text>
                            </View>
                            <View style={tw("w-[95%] border-t border-x border-slate-800 text-center")}>
                                <View style={tw("flex flex-row w-full")}>
                                    <Text style={tw("w-[37.5%] border-r border-slate-800 p-2")}>LINGKUP PENGAWASAN / INDIKATOR</Text>
                                    <Text style={tw("w-[25%] border-r border-slate-800 p-2")}>PEMERIKSAAN</Text>
                                    <Text style={tw("w-[37.5%] p-2")}>HASIL PEMERIKSAAN</Text>
                                </View>
                            </View>
                        </View>
                        {
                            daftarLingkupPengawasan.map((lingkupPengawasan, i) => {
                                const daftarPemeriksaan = lingkupPengawasan.map((pemeriksaan, j) => {
                                    const item = (
                                        <>
                                            <View style={tw("w-[37.5%] border-r border-slate-800 p-2")}>
                                                {
                                                    pemeriksaan.detail ? <Text>{pemeriksaan.detail}</Text> :
                                                    pemeriksaan.id[0] !== "4" && <Text>{pemeriksaan.lingkupPengawasan}</Text>
                                                }
                                                <View style={tw("flex flex-row w-full mt-1")}>
                                                    <Text style={tw("w-[20%]")}>Indikator: </Text>
                                                    <Text style={tw("w-[80%]")}>{pemeriksaan.indikator}</Text>
                                                </View>
                                            </View>
                                            <View style={tw("w-[25%] border-r border-slate-800")}>
                                                <View style={tw("w-full border-b p-2")}>
                                                    <Text style={tw("font-light leading-tight")}>Dokumen yang diperiksa</Text>
                                                    <Text style={tw("mt-1")}>{pemeriksaan.dokumen}</Text>
                                                </View>
                                                <View style={tw("w-full p-2")}>
                                                    <Text style={tw("font-light leading-tight")}>Cara Pemeriksaan</Text>
                                                    <Text style={tw("mt-1")}>{pemeriksaan.caraPemeriksaan}</Text>
                                                </View>
                                            </View>
                                            <View style={tw("w-[37.5%]")}>
                                                {
                                                    pemeriksaan.hasilPemeriksaan.map(({ label, kesimpulan, catatan }, k) => {
                                                        const hasil = (
                                                            <>
                                                                <View style={tw("flex flex-row items-center gap-2")}>
                                                                    <Text style={tw("font-light leading-tight")}>Kesimpulan</Text>
                                                                    {getStatusBadgePDF(kesimpulan, label)}
                                                                </View>
                                                                <View style={tw("mt-1")}>
                                                                    <Text style={tw("font-light leading-tight")}>Catatan Pemeriksaan</Text>
                                                                    <Text style={tw("mt-1")}>{catatan ? catatan : '-'}</Text>
                                                                </View>
                                                            </>
                                                        );

                                                        if (k === pemeriksaan.hasilPemeriksaan.length - 1) {
                                                            return <View key={k} style={tw("p-2")}>{hasil}</View>
                                                        }

                                                        return (
                                                            <View key={k} style={tw("border-b border-slate-800 p-2")}>{hasil}</View>
                                                        );
                                                    })
                                                }
                                            </View>
                                        </>
                                    )

                                    if (j === lingkupPengawasan.length - 1) {
                                        return (
                                            <View key={j} style={tw(`flex flex-row w-full`)}>{item}</View>
                                        );
                                    }

                                    return (
                                        <View key={j} style={tw(`flex flex-row w-full border-b border-slate-800`)}>{item}</View>
                                    );
                                });

                                return (
                                    <View wrap={false} key={i} style={tw("flex flex-row w-full text-[10px]")}>
                                        <View style={tw("w-[5%] border-y border-l border-slate-800 p-2")}>
                                            <Text style={tw("text-center")}>{i + 1}.</Text>
                                        </View>
                                        <View style={tw("w-[95%] border border-slate-800 text-justify")}>
                                            {
                                                lingkupPengawasan.length >= 2 &&
                                                <View style={tw("flex flex-row w-full border-b border-slate-800")}>
                                                    <View style={tw("w-[37.5%] border-r border-slate-800 p-2")}>
                                                        <Text>{lingkupPengawasan[0].lingkupPengawasan}</Text>
                                                    </View>
                                                    <Text style={tw("w-[25%] border-r border-slate-800 p-2")}></Text>
                                                    <Text style={tw("w-[37.5%] p-2")}></Text>
                                                </View>
                                            }
                                            {daftarPemeriksaan}
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <Text
                        render={({ pageNumber }) => (`- ${pageNumber} -`)} fixed
                        style={tw("absolute bottom-8 right-0 left-0 text-[9px] text-center")}
                    />
                </Page>
            </Document>
        </PDFViewer>
    );
}
