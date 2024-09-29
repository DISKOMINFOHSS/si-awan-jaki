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
    const { usaha, sertifikatStandar } = pengawasan;

    return (
        <Page wrap size="A4" orientation="landscape" style={tw("p-12 font-sans relative")}>
            <View style={tw("font-medium text-center text-[12px]")}>
                <Text>Simak - Pengawasan Tertib Usaha terhadap Pemenuhan Persyaratan Usaha Jasa Konstruksi Secara Rutin</Text>
                {/* <Text>Usaha Berkelanjutan Secara {pengawasan.jenisPengawasan}</Text> */}
            </View>
            <View style={tw("mt-6 mb-4 text-[11px]")}>
                <View style={tw("flex flex-row gap-1 mb-1")}>
                    <Text style={tw("w-[20%]")}>Nama Badan Usaha</Text>
                    <Text style={tw("w-[1%]")}>:</Text>
                    <Text style={tw("w-[79%]")}>{usaha.nama}</Text>
                </View>
                <View style={tw("flex flex-row gap-1 mb-1")}>
                    <Text style={tw("w-[20%]")}>Tanggal Pengawasan</Text>
                    <Text style={tw("w-[1%]")}>:</Text>
                    <Text style={tw("w-[79%]")}>{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</Text>
                </View>
            </View>
            <View>
                <View fixed style={tw("flex flex-row w-full text-[10px] font-medium text-center")}>
                    <Text style={tw("w-[5%] border-y border-l border-slate-800 p-2 text-center")}>No</Text>
                    <Text style={tw("w-[20%] border-y border-l border-slate-800 p-2 text-center")}>Nama BUJK / PJBU</Text>
                    <Text style={tw("w-[15%] border-y border-l border-slate-800 p-2 text-center")}>NIB</Text>
                    <View style={tw("w-[40%] border-y border-l border-slate-800 text-center flex flex-row")}>
                        <Text style={tw("w-[20%] border-r border-slate-800 p-2")}>Jenis Usaha</Text>
                        <Text style={tw("w-[45%] border-r border-slate-800 p-2")}>Klasifikasi / Subklasifikasi</Text>
                        <Text style={tw("w-[35%] p-2")}>Nomor Sertifikat Standar</Text>
                    </View>
                    <Text style={tw("w-[20%] border-y border-x border-slate-800 p-2 text-center")}>Hasil Pemeriksaan</Text>
                </View>
                <View wrap={false} style={tw("flex flex-row w-full text-[10px]")}>
                    <Text style={tw("w-[5%] border-b border-l border-slate-800 p-2 text-center")}>{1}</Text>
                    <View style={tw("w-[20%] border-b border-l border-slate-800 p-2 text-left")}>
                        <Text>{usaha.nama}</Text>
                        <Text style={tw("font-light text-slate-500 mt-0.5")}>PJBU : {usaha.pjbu}</Text>
                    </View>
                    <Text style={tw("w-[15%] border-b border-l border-slate-800 p-2 text-center")}>{usaha.nib}</Text>
                    <View style={tw("w-[40%] border-b border-l border-slate-800 text-center flex flex-col")}>
                    {
                        sertifikatStandar.map((sertifikat, i) => (
                            <React.Fragment key={i}>
                                <View style={tw("flex flex-row w-full")}>
                                    <Text style={tw("w-[20%] border-r border-slate-800 p-2")}>{sertifikat.jenis_usaha}</Text>
                                    <Text style={tw("w-[45%] border-r border-slate-800 p-2 text-left")}>{sertifikat.subklasifikasi}</Text>
                                    <Text style={tw("w-[35%] p-2")}>{sertifikat.nomor_sertifikat}</Text>
                                </View>
                                { i + 1 !== sertifikatStandar.length && <View style={tw("border-b border-slate-800 w-full")}></View>}
                            </React.Fragment>
                        ))
                    }
                    </View>
                    <View style={tw("w-[20%] border-b border-x border-slate-800 p-2")}>
                        <View style={tw("flex flex-row items-center gap-2")}>
                            <Text style={tw("font-light leading-tight")}>Kesimpulan :</Text>
                            <Text>{pengawasan.tertibPengawasan}</Text>
                        </View>
                        <View style={tw("mt-1")}>
                            <Text style={tw("font-light leading-tight")}>Catatan Pemeriksaan :</Text>
                            <Text style={tw("mt-1")}>{pengawasan.catatan ? pengawasan.catatan : '-'}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Text
                render={({ pageNumber }) => (`- ${pageNumber} -`)} fixed
                style={tw("absolute bottom-8 right-0 left-0 text-[9px] text-center")}
            />
        </Page>
    )
}
