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
    const { usaha, daftarPemeriksaan } = pengawasan;

    const daftarPengembanganUsaha = Array(5).fill([]);
    daftarPemeriksaan.map((pemeriksaan) => {
        const i = Number(pemeriksaan.id[0]) - 1;
        daftarPengembanganUsaha[i] = [...daftarPengembanganUsaha[i], pemeriksaan];
    });

    return (
        <Page wrap size="A4" orientation="landscape" style={tw("p-12 font-sans relative")}>
            <View style={tw("font-medium text-center text-[12px]")}>
                <Text>Simak - Pengawasan Tertib Usaha terhadap Pelaksanaan Pengembangan</Text>
                <Text>Usaha Berkelanjutan Secara {pengawasan.jenisPengawasan}</Text>
            </View>
            <View style={tw("mt-6 mb-4 text-[11px]")}>
                <View style={tw("flex flex-row gap-1 mb-1")}>
                    <Text style={tw("w-[20%]")}>Nama Badan Usaha</Text>
                    <Text style={tw("w-[1%]")}>:</Text>
                    <Text style={tw("w-[79%]")}>{usaha.nama}</Text>
                </View>
                <View style={tw("flex flex-row gap-1 mb-1")}>
                    <Text style={tw("w-[20%]")}>Nomor Induk Berusaha</Text>
                    <Text style={tw("w-[1%]")}>:</Text>
                    <Text style={tw("w-[79%]")}>{usaha.nib}</Text>
                </View>
                <View style={tw("flex flex-row gap-1 mb-1")}>
                    <Text style={tw("w-[20%]")}>Tanggal Pengawasan</Text>
                    <Text style={tw("w-[1%]")}>:</Text>
                    <Text style={tw("w-[79%]")}>{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</Text>
                </View>
            </View>
            <View>
                <View fixed style={tw("flex flex-row w-full text-[10px] font-bold text-center")}>
                    <View style={tw("w-[5%] border-y border-l border-slate-800 p-2")}>
                        <Text style={tw("text-center")}>NO</Text>
                    </View>
                    <View style={tw("w-[95%] border-y border-x border-slate-800 text-center")}>
                        <View style={tw("flex flex-row w-full")}>
                            <Text style={tw("w-[30%] border-r border-slate-800 p-2")}>PENGEMBANGAN USAHA BERKELANJUTAN / INDIKATOR / SUB INDIKATOR</Text>
                            <Text style={tw("w-[40%] border-r border-slate-800 p-2")}>PEMERIKSAAN</Text>
                            <Text style={tw("w-[30%] p-2")}>HASIL PEMERIKSAAN</Text>
                        </View>
                    </View>
                </View>
                {
                    daftarPengembanganUsaha.slice(0,4).map((pengembanganUsaha, i) => {
                        const pemeriksaan = pengembanganUsaha.map((p, j) => {
                            const item = (
                                <>
                                    <View style={tw("w-[30%] border-r border-slate-800")}>
                                        {
                                            pengembanganUsaha.length < 2 &&
                                            <Text style={tw("border-b border-slate-800 p-2")}>{p.namaPemeriksaan}</Text>
                                        }
                                        <View style={tw("flex flex-row w-full mt-1 p-2")}>
                                            <Text style={tw("w-[25%]")}>Indikator : </Text>
                                            <Text style={tw("w-[75%]")}>{p.indikator}</Text>
                                        </View>
                                    </View>
                                    <View style={tw("w-[40%] border-r border-slate-800")}>
                                        <View style={tw("w-full border-b p-2")}>
                                            <Text style={tw("font-light leading-tight")}>Dokumen yang diperiksa</Text>
                                            <Text style={tw("mt-1")}>{p.dokumen}</Text>
                                        </View>
                                        <View style={tw("w-full p-2")}>
                                            <Text style={tw("font-light leading-tight")}>Cara Pemeriksaan</Text>
                                            <Text style={tw("mt-1")}>{p.caraPemeriksaan}</Text>
                                        </View>
                                    </View>
                                    <View style={tw("w-[30%] p-2")}>
                                        <View style={tw("flex flex-row items-center gap-2")}>
                                            <Text style={tw("font-light leading-tight")}>Hasil :</Text>
                                            <Text>{p.hasilPemeriksaan.hasil}</Text>
                                        </View>
                                        <View style={tw("mt-1")}>
                                            <Text style={tw("font-light leading-tight")}>Catatan Pemeriksaan :</Text>
                                            <Text style={tw("mt-1")}>{p.hasilPemeriksaan.catatan ? p.hasilPemeriksaan.catatan : '-'}</Text>
                                        </View>
                                    </View>
                                </>
                            );

                            return (
                                <React.Fragment key={j}>
                                    {/* {
                                        (p.id === '5a1' || p.id === '5b1') &&
                                        <View style={tw("flex flex-row w-full border-b border-slate-800")}>
                                            <View style={tw("w-[30%] border-r border-slate-800")}>
                                                <View style={tw("flex flex-row w-full mt-1 p-2")}>
                                                    <Text style={tw("w-[25%]")}>Indikator : </Text>
                                                    <Text style={tw("w-[75%]")}>{p.indikator}</Text>
                                                </View>
                                            </View>
                                            <Text style={tw("w-[40%] border-r border-slate-800 p-2")}></Text>
                                            <Text style={tw("w-[30%] p-2")}></Text>
                                        </View>
                                    } */}
                                    <View style={tw("flex flex-row w-full")}>{item}</View>
                                    { pengembanganUsaha.length !== j + 1 && <View style={tw("w-full border-b border-slate-800")}></View>}
                                </React.Fragment>
                            );
                        });

                        return (
                            <View wrap={false} key={i} style={tw("flex flex-row w-full text-[10px]")}>
                                <View style={tw("w-[5%] border-b border-l border-slate-800 p-2")}>
                                    <Text style={tw("text-center")}>{i + 1}.</Text>
                                </View>
                                <View style={tw("w-[95%] border-x border-b border-slate-800 text-justify")}>
                                    {
                                        (pengembanganUsaha.length >= 2) &&
                                        <View style={tw("flex flex-row w-full border-b border-slate-800")}>
                                            <View style={tw("w-[30%] border-r border-slate-800 p-2")}>
                                                <Text>{pengembanganUsaha[0].namaPemeriksaan}</Text>
                                            </View>
                                            <Text style={tw("w-[40%] border-r border-slate-800 p-2")}></Text>
                                            <Text style={tw("w-[30%] p-2")}></Text>
                                        </View>
                                    }
                                    {pemeriksaan}
                                </View>
                            </View>
                        )
                    })
                }
                <View wrap={false} style={tw("flex flex-row w-full text-[10px]")}>
                    <View style={tw("w-[5%] border-l border-slate-800 p-2")}>
                        <Text style={tw("text-center")}>5</Text>
                    </View>
                    <View style={tw("w-[95%] border-x border-b border-slate-800 text-justify flex flex-row")}>
                        <View style={tw("w-[30%] border-r border-slate-800 p-2")}>
                            <Text>{daftarPengembanganUsaha[4][0].namaPemeriksaan}</Text>
                        </View>
                        <Text style={tw("w-[40%] border-r border-slate-800 p-2")}></Text>
                        <Text style={tw("w-[30%] p-2")}></Text>
                    </View>
                </View>
                {
                    daftarPengembanganUsaha[4].map((p, i) => {
                        return (
                            <React.Fragment key={i}>
                                {
                                    (p.id === '5a1' || p.id === '5b1') &&
                                    <View wrap={false} style={tw("flex flex-row w-full text-[10px]")}>
                                        <View style={tw("w-[5%] border-l border-slate-800 p-2")}></View>
                                        <View style={tw("w-[95%] border-x border-b border-slate-800 text-justify flex flex-row")}>
                                            <View style={tw("w-[30%] border-r border-slate-800")}>
                                                <View style={tw("flex flex-row w-full mt-1 p-2")}>
                                                    <Text style={tw("w-[25%]")}>Indikator : </Text>
                                                    <Text style={tw("w-[75%]")}>{p.indikator}</Text>
                                                </View>
                                            </View>
                                            <Text style={tw("w-[40%] border-r border-slate-800 p-2")}></Text>
                                            <Text style={tw("w-[30%] p-2")}></Text>
                                        </View>
                                    </View>
                                }
                                <View wrap={false} style={tw("flex flex-row w-full text-[10px]")}>
                                    {/* {
                                        i + 1 === daftarPengembanganUsaha[4].length ? (
                                            <View style={tw("w-[5%] border-b border-l border-slate-800 p-2")}></View>
                                        ) : (
                                            <View style={tw("w-[5%] border-l border-slate-800 p-2")}></View>
                                        )
                                    } */}
                                    <View style={tw("w-[5%] border-b border-l border-slate-800 p-2")}></View>
                                    <View style={tw("w-[95%] border-x border-b border-slate-800 text-justify flex flex-row")}>
                                        <View style={tw("w-[30%] border-r border-slate-800")}>
                                            <View style={tw("flex flex-row w-full mt-1 p-2")}>
                                                <Text style={tw("w-[35%]")}>Sub Indikator : </Text>
                                                <Text style={tw("w-[65%]")}>{p.subindikator}</Text>
                                            </View>
                                        </View>
                                        <View style={tw("w-[40%] border-r border-slate-800")}>
                                            <View style={tw("w-full border-b p-2")}>
                                                <Text style={tw("font-light leading-tight")}>Dokumen yang diperiksa</Text>
                                                <Text style={tw("mt-1")}>{p.dokumen}</Text>
                                            </View>
                                            <View style={tw("w-full p-2")}>
                                                <Text style={tw("font-light leading-tight")}>Cara Pemeriksaan</Text>
                                                <Text style={tw("mt-1")}>{p.caraPemeriksaan}</Text>
                                            </View>
                                        </View>
                                        <View style={tw("w-[30%] p-2")}>
                                            <View style={tw("flex flex-row items-center gap-2")}>
                                                <Text style={tw("font-light leading-tight")}>Hasil :</Text>
                                                <Text>{p.hasilPemeriksaan.hasil}</Text>
                                            </View>
                                            <View style={tw("mt-1")}>
                                                <Text style={tw("font-light leading-tight")}>Catatan Pemeriksaan :</Text>
                                                <Text style={tw("mt-1")}>{p.hasilPemeriksaan.catatan ? p.hasilPemeriksaan.catatan : '-'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </React.Fragment>
                        );
                    })
                }
            </View>
            <Text
                render={({ pageNumber }) => (`- ${pageNumber} -`)} fixed
                style={tw("absolute bottom-8 right-0 left-0 text-[9px] text-center")}
            />
        </Page>
    );
}
