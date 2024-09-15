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
    const { bangunan, daftarPemeriksaan, rekomendasi } = pengawasan;

    console.log(data);

    const daftarLingkupPengawasan = Array(4).fill([]);
    daftarPemeriksaan.map((pemeriksaan) => {
        const i = Number(pemeriksaan.id[0]) - 1;
        daftarLingkupPengawasan[i] = [...daftarLingkupPengawasan[i], pemeriksaan];
    });

    return (
        <PDFViewer width="100%" style={tw("min-h-screen")}>
            <Document title="simak-pengawasan-pemanfaatan-produk">
                <Page wrap size="A4" orientation="portait" style={tw("p-10 font-sans relative")}>
                    <View style={tw("font-medium text-center text-[11px] uppercase mb-8")}>
                        <Text>Hasil Pengawasan {pengawasan.jenisPengawasan}</Text>
                        <Text>Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</Text>
                        <Text style={tw("capitalize text-[10px] font-normal")}>Tanggal Pengawasan : {pengawasan.tanggalPengawasan}</Text>
                    </View>
                    <View style={tw("w-full text-[10px] mb-4")}>
                        <View style={tw("flex flex-row gap-2 mb-1")}>
                            <Text style={tw("w-[30%]")}>Nama Bangunan</Text>
                            <Text style={tw("w-[70%] uppercase")}>: {bangunan.nama}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-2 mb-1")}>
                            <Text style={tw("w-[30%]")}>Lokasi</Text>
                            <Text style={tw("w-[70%] capitalize")}>
                                : {bangunan.lokasi}
                                {bangunan.desaKelurahan && `, ${bangunan.desaKelurahan.toLowerCase()}`}
                                {bangunan.kecamatan && `, ${bangunan.kecamatan.toLowerCase()}`}
                            </Text>
                        </View>
                        <View style={tw("flex flex-row gap-2 mb-1")}>
                            <Text style={tw("w-[30%]")}>Nama Pemilik Bangunan</Text>
                            <Text style={tw("w-[70%]")}>: {bangunan.pemilikBangunan}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-2 mb-1")}>
                            <Text style={tw("w-[30%]")}>Nama Pengelola Bangunan</Text>
                            <Text style={tw("w-[70%]")}>: {bangunan.pengelolaBangunan}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-2 mb-1")}>
                            <Text style={tw("w-[30%]")}>Tanggal dan Tahun Pembangunan</Text>
                            <Text style={tw("w-[70%]")}>: {bangunan.tanggalMulaiBangun} s.d {bangunan.tanggalSelesaiBangun}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-2 mb-1")}>
                            <Text style={tw("w-[30%]")}>Tanggal dan Tahun Pemanfaatan</Text>
                            <Text style={tw("w-[70%]")}>: {bangunan.tanggalPemanfaatan}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-2 mb-1")}>
                            <Text style={tw("w-[30%]")}>Umur Konstruksi</Text>
                            <Text style={tw("w-[70%]")}>: {bangunan.umurKonstruksi}</Text>
                        </View>
                    </View>
                    <View style={tw("w-full mb-4")}>
                        <View style={tw("mb-4")}>
                            <Text style={tw("font-medium text-[12px]")}>Kesimpulan Pemeriksaan</Text>
                            <Text style={tw("my-0.5 font-light text-[10px]")}>Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</Text>
                        </View>
                        <View style={tw("flex flex-row items-start gap-4 mb-4")}>
                            <View style={tw("basis-1/2 flex flex-row gap-4")}>
                                <View style={tw("basis-2/3")}>
                                    <Text style={tw("font-medium text-[10px]")}>Kesesuaian Fungsi</Text>
                                    <Text style={tw("font-light text-[9px]")}>Pengawasan Fungsi Peruntukan</Text>
                                </View>
                                <View style={tw("basis-1/3 mt-1")}>
                                    {getTertibStatusBadgePDF(pengawasan.tertibKesesuaianFungsi)}
                                </View>
                            </View>
                            <View style={tw("basis-1/2 flex flex-row gap-4")}>
                                <View style={tw("basis-2/3")}>
                                    <Text style={tw("font-medium text-[10px]")}>Kesesuaian Lokasi</Text>
                                    <Text style={tw("font-light text-[9px]")}>Pengawasan Fungsi Peruntukan</Text>
                                </View>
                                <View style={tw("basis-1/3 mt-1")}>
                                    {getTertibStatusBadgePDF(pengawasan.tertibKesesuaianLokasi)}
                                </View>
                            </View>
                        </View>
                        <View style={tw("flex flex-row items-start gap-4 mb-4")}>
                            <View style={tw("basis-1/2 flex flex-row items-center gap-4")}>
                                <View style={tw("basis-2/3")}>
                                    <Text style={tw("font-medium text-[10px]")}>Rencana Umur Konstruksi</Text>
                                </View>
                                <View style={tw("basis-1/3 mt-1")}>
                                    {getTertibStatusBadgePDF(pengawasan.tertibRencanaUmurKonstruksi)}
                                </View>
                            </View>
                            <View style={tw("basis-1/2 flex flex-row items-center gap-4")}>
                                <View style={tw("basis-2/3")}>
                                    <Text style={tw("font-medium text-[10px]")}>Kapasitas dan Beban</Text>
                                </View>
                                <View style={tw("basis-1/3 mt-1")}>
                                    {getTertibStatusBadgePDF(pengawasan.tertibKapasitasBeban)}
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
                                    {getTertibStatusBadgePDF(pengawasan.tertibPemeliharaanBangunan)}
                                </View>
                            </View>
                            <View style={tw("basis-1/2 flex flex-row gap-4")}>
                                <View style={tw("basis-2/3")}>
                                    <Text style={tw("font-medium text-[10px]")}>Program Pemeliharaan</Text>
                                    <Text style={tw("font-light text-[9px]")}>Pemeliharaan Produk Konstruksi</Text>
                                </View>
                                <View style={tw("basis-1/3 mt-1")}>
                                    {getTertibStatusBadgePDF(pengawasan.tertibProgramPemeliharaan)}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View wrap={false} style={tw("w-full mb-4")}>
                        <View style={tw("mb-4")}>
                            <Text style={tw("font-medium text-[12px]")}>Hasil Temuan dan Rekomendasi</Text>
                            <Text style={tw("my-0.5 font-light text-[10px]")}>Pengawasan Tertib Pemanfaatan Produk Jasa Konstruksi</Text>
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
                <Page wrap size="A4" orientation="landscape" style={tw("p-12 font-sans relative")}>
                    <View style={tw("font-medium text-center text-[12px]")}>
                        <Text>Simak Pengawasan Tertib Pemanfaatan Produk Konstruksi secara {pengawasan.jenisPengawasan} terhadap</Text>
                        <Text>Bangunan Konstruksi yang dibiayai dengan dana dari {bangunan.sumberDana}</Text>
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
                            <Text style={tw("w-[80%]")}>: {bangunan.pemilikBangunan}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-2 mb-1")}>
                            <Text style={tw("w-[20%]")}>Nama Pengelola Bangunan</Text>
                            <Text style={tw("w-[80%]")}>: {bangunan.pengelolaBangunan}</Text>
                        </View>
                        <View style={tw("flex flex-row gap-2 mb-1")}>
                            <Text style={tw("w-[20%]")}>Waktu Pengawasan</Text>
                            <Text style={tw("w-[80%]")}>: {pengawasan.tanggalPengawasan}</Text>
                        </View>
                    </View>
                    <View>
                        <View fixed style={tw("flex flex-row w-full text-[10px] font-bold text-center")}>
                            <View style={tw("w-[5%] border-y border-l border-slate-800 p-2")}>
                                <Text style={tw("text-center")}>NO</Text>
                            </View>
                            <View style={tw("w-[95%] border-y border-x border-slate-800 text-center")}>
                                <View style={tw("flex flex-row w-full")}>
                                    <Text style={tw("w-[37.5%] border-r border-slate-800 p-2")}>LINGKUP PENGAWASAN / INDIKATOR</Text>
                                    <Text style={tw("w-[27.5%] border-r border-slate-800 p-2")}>PEMERIKSAAN</Text>
                                    <Text style={tw("w-[35%] p-2")}>HASIL PEMERIKSAAN</Text>
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
                                                    <Text style={tw("w-[20%]")}>Indikator : </Text>
                                                    <Text style={tw("w-[80%]")}>{pemeriksaan.indikator}</Text>
                                                </View>
                                            </View>
                                            <View style={tw("w-[27.5%] border-r border-slate-800")}>
                                                <View style={tw("w-full border-b p-2")}>
                                                    <Text style={tw("font-light leading-tight")}>Dokumen yang diperiksa</Text>
                                                    <Text style={tw("mt-1")}>{pemeriksaan.dokumen}</Text>
                                                </View>
                                                <View style={tw("w-full p-2")}>
                                                    <Text style={tw("font-light leading-tight")}>Cara Pemeriksaan</Text>
                                                    <Text style={tw("mt-1")}>{pemeriksaan.caraPemeriksaan}</Text>
                                                </View>
                                            </View>
                                            <View style={tw("w-[35%]")}>
                                                {
                                                    pemeriksaan.hasilPemeriksaan.map(({ label, kesimpulan, catatan }, k) => {
                                                        const hasil = (
                                                            <>
                                                                <View style={tw("flex flex-row items-center gap-2")}>
                                                                    <Text style={tw("font-light leading-tight")}>Kesimpulan :</Text>
                                                                    {getStatusBadgePDF(kesimpulan, label)}
                                                                </View>
                                                                <View style={tw("mt-1")}>
                                                                    <Text style={tw("font-light leading-tight")}>Catatan Pemeriksaan :</Text>
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
                                        <View style={tw("w-[5%] border-b border-l border-slate-800 p-2")}>
                                            <Text style={tw("text-center")}>{i + 1}.</Text>
                                        </View>
                                        <View style={tw("w-[95%] border-x border-b border-slate-800 text-justify")}>
                                            {
                                                lingkupPengawasan.length >= 2 &&
                                                <View style={tw("flex flex-row w-full border-b border-slate-800")}>
                                                    <View style={tw("w-[37.5%] border-r border-slate-800 p-2")}>
                                                        <Text>{lingkupPengawasan[0].lingkupPengawasan}</Text>
                                                    </View>
                                                    <Text style={tw("w-[27.5%] border-r border-slate-800 p-2")}></Text>
                                                    <Text style={tw("w-[35%] p-2")}></Text>
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
    )
}
