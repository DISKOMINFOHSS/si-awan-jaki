import React from "react";
import { Font, Page, View, Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind"

import { inter } from "../../Utils/fonts";
import { getTertibStatusBadgeRekapitulasiPDF } from "../../Utils/getStatusBadge";
import { formatDateToIndonesia } from "../../Utils/formatDate";

Font.registerHyphenationCallback(word => [word]);
Font.register({ family: 'Inter', fonts: inter });

const tw = createTw({
    theme: {
        fontFamily: {
            'sans': ['Inter'],
        },
    },
});

export default ({ daftarPengawasan }) => {
    return (
        <>
            {/* <Page wrap size="A4" orientation="landscape" style={tw("p-12 font-sans relative")}>
                <View style={tw("font-medium text-[11px]")}>
                    <Text style={tw("font-medium text-[11px]")}t>2. Tertib Penyelenggaraan Jasa Konstruksi</Text>
                    <Text style={tw("font-light text-[10px] mt-2")}>Berikut merupakan Rekapitulasi Hasil Pengawasan Rutin Tertib Penyelenggaraan Jasa Konstruksi Tahun {tahun}.</Text>
                </View>
                <View style={tw("mt-6 mb-4")}>
                    <View fixed style={tw("flex flex-row w-full text-[8px] font-medium text-center")}>
                        <View style={tw("w-[3%] border-y border-l border-slate-800 p-1")}>
                            <Text style={tw("text-center")}>No</Text>
                        </View>
                        <View style={tw("w-[32%] border-y border-slate-800 flex flex-row text-center")}>
                            <View style={tw("w-[70%] flex flex-col border-l border-slate-800 p-1")}>
                                <Text>Kegiatan Konstruksi (Nama Paket) / </Text>
                                <Text>Penyedia Jasa</Text>
                            </View>
                            <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>Tanggal Pengawasan</Text>
                        </View>
                        <View style={tw("w-[65%] border-y border-l border-slate-800 flex flex-row text-center")}>
                            <Text style={tw("w-[15%] p-1")}>Proses Pemilihan Penyedia Jasa</Text>
                            <View style={tw("w-[45%] h-36 border-l border-slate-800 flex flex-col justify-center")}>
                                <Text style={tw("h-[40%] border-b border-slate-800 p-1")}>Pengawasan terhadap Kontrak Kerja Konstruksi</Text>
                                <View style={tw("h-[60%] flex flex-row")}>
                                    <Text style={tw("w-[30%] border-r border-slate-800 p-1")}>Penerapan Standar Kontrak</Text>
                                    <Text style={tw("w-[35%] border-r border-slate-800 p-1")}>Penggunaan Tenaga Kerja Konstruksi Bersertifikat</Text>
                                    <Text style={tw("w-[35%] p-1")}>Pemberian Pekerjaan Utama dan/atau Penunjang kepada Subpenyedia Jasa</Text>
                                </View>
                            </View>
                            <View style={tw("w-[40%] h-36 border-x border-slate-800 flex flex-col justify-center")}>
                                <Text style={tw("h-[40%] border-b border-slate-800 p-1")}>
                                    Pengawasan terhadap Penerapan Standar Keamanan, Keselamatan, Kesehatan, dan Keberlanjutan Konstruksi
                                </Text>
                                <View style={tw("h-[60%] flex flex-row")}>
                                    <Text style={tw("w-[35%] border-r border-slate-800 p-1")}>Ketersediaan Dokumen Standar K4</Text>
                                    <Text style={tw("w-[30%] border-r border-slate-800 p-1")}>Penerapan SMKK</Text>
                                    <Text style={tw("w-[35%] p-1")}>Kegiatan Antisipasi Kecelakaan Kerja</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {
                        daftarPengawasan.map((pengawasan, i) => (
                            <View wrap={false} key={i} style={tw("flex flex-row w-full text-[8px]")}>
                                <View style={tw("w-[3%] border-b border-l border-slate-800 p-1")}>
                                    <Text style={tw("text-center")}>{i + 1}</Text>
                                </View>
                                <View style={tw("w-[32%] border-b border-slate-800 flex flex-row text-center")}>
                                    <View style={tw("w-[70%] border-l border-slate-800 px-1.5 py-1 text-left")}>
                                        <Text style={tw("text-justify")}>{pengawasan.proyekKonstruksi.namaPaket}</Text>
                                        <Text style={tw("font-light text-slate-500 mt-1 uppercase")}>{pengawasan.proyekKonstruksi.penyediaJasa}</Text>
                                    </View>
                                    <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</Text>
                                </View>
                                <View style={tw("w-[65%] border-b border-l border-slate-800 flex flex-row text-center")}>
                                    <View style={tw("w-[15%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibProsesPemilihanPenyediaJasa)}</View>
                                    <View style={tw("w-[45%] border-l border-slate-800 flex flex-row")}>
                                        <View style={tw("w-[30%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPenerapanStandarKontrak)}</View>
                                        <View style={tw("w-[35%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPenggunaanTKK)}</View>
                                        <View style={tw("w-[35%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPemberianPekerjaan)}</View>
                                    </View>
                                    <View style={tw("w-[40%] border-x border-slate-800 flex flex-row")}>
                                        <View style={tw("w-[35%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibKetersediaanDokumenStandarK4)}</View>
                                        <View style={tw("w-[30%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPenerapanSMKK)}</View>
                                        <View style={tw("w-[35%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibAntisipasiKecelakaan)}</View>
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
            <Page wrap size="A4" orientation="landscape" style={tw("p-12 font-sans relative")}>
                <View style={tw("mt-6 mb-4")}>
                    <View fixed style={tw("flex flex-row w-full text-[8px] font-medium text-center")}>
                        <View style={tw("w-[3%] border-y border-l border-slate-800 p-1")}>
                            <Text style={tw("text-center")}>No</Text>
                        </View>
                        <View style={tw("w-[32%] border-y border-slate-800 flex flex-row text-center")}>
                            <View style={tw("w-[70%] flex flex-col border-l border-slate-800 p-1")}>
                                <Text>Kegiatan Konstruksi (Nama Paket) / </Text>
                                <Text>Penyedia Jasa</Text>
                            </View>
                            <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>Tanggal Pengawasan</Text>
                        </View>
                        <View style={tw("w-[65%] border-y border-l border-slate-800 flex flex-row text-center")}>
                            <Text style={tw("w-[15%] p-1")}>Penerapan Sistem Manajemen Mutu Konstruksi</Text>
                            <View style={tw("w-[60%] h-36 border-l border-slate-800 flex flex-col justify-center")}>
                                <View style={tw("h-[40%] flex flex-col border-b border-slate-800 p-1")}>
                                    <Text>Pengelolaan dan Penggunaan </Text>
                                    <Text>Material, Peralatan dan Teknologi Konstruksi</Text>
                                </View>
                                <View style={tw("h-[60%] flex flex-row")}>
                                    <Text style={tw("w-[28%] border-r border-slate-800 p-1")}>Pemenuhan Penyediaan Peralatan dalam Pelaksanaan Proyek Konstruksi</Text>
                                    <Text style={tw("w-[28%] border-r border-slate-800 p-1")}>Penggunaan Material Standar (SNI dan Standar Lain)</Text>
                                    <Text style={tw("w-[44%] px-2 py-1")}>Penggunaan Produk Dalam Negeri untuk Teknologi dan MPK sesuai dengan Peraturan Perundang-undangan tentang Pemberdayaan Industri Nasional</Text>
                                </View>
                            </View>
                            <View style={tw("w-[25%] h-36 border-x border-slate-800 flex flex-col justify-center")}>
                                <Text style={tw("h-[40%] border-b border-slate-800 p-1")}>
                                    Pengelolaan dan Pemanfaatan Sumber Material Konstruksi
                                </Text>
                                <Text style={tw("h-[60%] p-1")}>Pemenuhan terhadap Standar Teknis Lingkungan</Text>
                            </View>
                        </View>
                    </View>
                    {
                        daftarPengawasan.map((pengawasan, i) => (
                            <View wrap={false} key={i} style={tw("flex flex-row w-full text-[8px]")}>
                                <View style={tw("w-[3%] border-b border-l border-slate-800 p-1")}>
                                    <Text style={tw("text-center")}>{i + 1}</Text>
                                </View>
                                <View style={tw("w-[32%] border-b border-slate-800 flex flex-row text-center")}>
                                    <View style={tw("w-[70%] border-l border-slate-800 px-1.5 py-1 text-left")}>
                                        <Text style={tw("text-justify")}>{pengawasan.proyekKonstruksi.namaPaket}</Text>
                                        <Text style={tw("font-light text-slate-500 mt-1 uppercase")}>{pengawasan.proyekKonstruksi.penyediaJasa}</Text>
                                    </View>
                                    <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</Text>
                                </View>
                                <View style={tw("w-[65%] border-b border-l border-slate-800 flex flex-row text-center")}>
                                    <View style={tw("w-[15%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPenerapanManajemenMutu)}</View>
                                    <View style={tw("w-[60%] border-l border-slate-800 flex flex-row")}>
                                        <View style={tw("w-[28%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPemenuhanPenyediaanMPTK)}</View>
                                        <View style={tw("w-[28%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPenggunaanMPTK)}</View>
                                        <View style={tw("w-[44%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPenggunaanPDN)}</View>
                                    </View>
                                    <View style={tw("w-[25%] border-x border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPemenuhanStandarLingkungan)}</View>
                                </View>
                            </View>
                        ))
                    }
                </View>
                <Text
                    render={({ pageNumber }) => (`- ${pageNumber} -`)} fixed
                    style={tw("absolute bottom-8 right-0 left-0 text-[9px] text-center")}
                />
            </Page> */}
            <View style={tw("mt-6 mb-4")}>
                <View fixed style={tw("flex flex-row w-full text-[8px] font-medium text-center")}>
                    <View style={tw("w-[3%] border-y border-l border-slate-800 p-1")}>
                        <Text style={tw("text-center")}>No</Text>
                    </View>
                    <View style={tw("w-[32%] border-y border-slate-800 flex flex-row text-center")}>
                        <View style={tw("w-[70%] flex flex-col border-l border-slate-800 p-1")}>
                            <Text>Kegiatan Konstruksi (Nama Paket) / </Text>
                            <Text>Penyedia Jasa</Text>
                        </View>
                        <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>Tanggal Pengawasan</Text>
                    </View>
                    <View style={tw("w-[65%] border-y border-l border-slate-800 flex flex-row text-center")}>
                        <Text style={tw("w-[15%] p-1")}>Proses Pemilihan Penyedia Jasa</Text>
                        <View style={tw("w-[45%] h-36 border-l border-slate-800 flex flex-col justify-center")}>
                            <Text style={tw("h-[40%] border-b border-slate-800 p-1")}>Pengawasan terhadap Kontrak Kerja Konstruksi</Text>
                            <View style={tw("h-[60%] flex flex-row")}>
                                <Text style={tw("w-[30%] border-r border-slate-800 p-1")}>Penerapan Standar Kontrak</Text>
                                <Text style={tw("w-[35%] border-r border-slate-800 p-1")}>Penggunaan Tenaga Kerja Konstruksi Bersertifikat</Text>
                                <Text style={tw("w-[35%] p-1")}>Pemberian Pekerjaan Utama dan/atau Penunjang kepada Subpenyedia Jasa</Text>
                            </View>
                        </View>
                        <View style={tw("w-[40%] h-36 border-x border-slate-800 flex flex-col justify-center")}>
                            <Text style={tw("h-[40%] border-b border-slate-800 p-1")}>
                                Pengawasan terhadap Penerapan Standar Keamanan, Keselamatan, Kesehatan, dan Keberlanjutan Konstruksi
                            </Text>
                            <View style={tw("h-[60%] flex flex-row")}>
                                <Text style={tw("w-[35%] border-r border-slate-800 p-1")}>Ketersediaan Dokumen Standar K4</Text>
                                <Text style={tw("w-[30%] border-r border-slate-800 p-1")}>Penerapan SMKK</Text>
                                <Text style={tw("w-[35%] p-1")}>Kegiatan Antisipasi Kecelakaan Kerja</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {
                    daftarPengawasan.map((pengawasan, i) => (
                        <View wrap={false} key={i} style={tw("flex flex-row w-full text-[8px]")}>
                            <View style={tw("w-[3%] border-b border-l border-slate-800 p-1")}>
                                <Text style={tw("text-center")}>{i + 1}</Text>
                            </View>
                            <View style={tw("w-[32%] border-b border-slate-800 flex flex-row text-center")}>
                                <View style={tw("w-[70%] border-l border-slate-800 px-1.5 py-1 text-left")}>
                                    <Text style={tw("text-justify")}>{pengawasan.proyekKonstruksi.namaPaket}</Text>
                                    <Text style={tw("font-light text-slate-500 mt-1 uppercase")}>{pengawasan.proyekKonstruksi.penyediaJasa}</Text>
                                </View>
                                <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</Text>
                            </View>
                            <View style={tw("w-[65%] border-b border-l border-slate-800 flex flex-row text-center")}>
                                <View style={tw("w-[15%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibProsesPemilihanPenyediaJasa)}</View>
                                <View style={tw("w-[45%] border-l border-slate-800 flex flex-row")}>
                                    <View style={tw("w-[30%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPenerapanStandarKontrak)}</View>
                                    <View style={tw("w-[35%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPenggunaanTKK)}</View>
                                    <View style={tw("w-[35%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPemberianPekerjaan)}</View>
                                </View>
                                <View style={tw("w-[40%] border-x border-slate-800 flex flex-row")}>
                                    <View style={tw("w-[35%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibKetersediaanDokumenStandarK4)}</View>
                                    <View style={tw("w-[30%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPenerapanSMKK)}</View>
                                    <View style={tw("w-[35%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibAntisipasiKecelakaan)}</View>
                                </View>
                            </View>
                        </View>
                    ))
                }
            </View>
            <View break style={tw("mt-6 mb-4")}>
                <View fixed style={tw("flex flex-row w-full text-[8px] font-medium text-center")}>
                    <View style={tw("w-[3%] border-y border-l border-slate-800 p-1")}>
                        <Text style={tw("text-center")}>No</Text>
                    </View>
                    <View style={tw("w-[32%] border-y border-slate-800 flex flex-row text-center")}>
                        <View style={tw("w-[70%] flex flex-col border-l border-slate-800 p-1")}>
                            <Text>Kegiatan Konstruksi (Nama Paket) / </Text>
                            <Text>Penyedia Jasa</Text>
                        </View>
                        <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>Tanggal Pengawasan</Text>
                    </View>
                    <View style={tw("w-[65%] border-y border-l border-slate-800 flex flex-row text-center")}>
                        <Text style={tw("w-[15%] p-1")}>Penerapan Sistem Manajemen Mutu Konstruksi</Text>
                        <View style={tw("w-[60%] h-36 border-l border-slate-800 flex flex-col justify-center")}>
                            <View style={tw("h-[40%] flex flex-col border-b border-slate-800 p-1")}>
                                <Text>Pengelolaan dan Penggunaan </Text>
                                <Text>Material, Peralatan dan Teknologi Konstruksi</Text>
                            </View>
                            <View style={tw("h-[60%] flex flex-row")}>
                                <Text style={tw("w-[28%] border-r border-slate-800 p-1")}>Pemenuhan Penyediaan Peralatan dalam Pelaksanaan Proyek Konstruksi</Text>
                                <Text style={tw("w-[28%] border-r border-slate-800 p-1")}>Penggunaan Material Standar (SNI dan Standar Lain)</Text>
                                <Text style={tw("w-[44%] px-2 py-1")}>Penggunaan Produk Dalam Negeri untuk Teknologi dan MPK sesuai dengan Peraturan Perundang-undangan tentang Pemberdayaan Industri Nasional</Text>
                            </View>
                        </View>
                        <View style={tw("w-[25%] h-36 border-x border-slate-800 flex flex-col justify-center")}>
                            <Text style={tw("h-[40%] border-b border-slate-800 p-1")}>
                                Pengelolaan dan Pemanfaatan Sumber Material Konstruksi
                            </Text>
                            <Text style={tw("h-[60%] p-1")}>Pemenuhan terhadap Standar Teknis Lingkungan</Text>
                        </View>
                    </View>
                </View>
                {
                    daftarPengawasan.map((pengawasan, i) => (
                        <View wrap={false} key={i} style={tw("flex flex-row w-full text-[8px]")}>
                            <View style={tw("w-[3%] border-b border-l border-slate-800 p-1")}>
                                <Text style={tw("text-center")}>{i + 1}</Text>
                            </View>
                            <View style={tw("w-[32%] border-b border-slate-800 flex flex-row text-center")}>
                                <View style={tw("w-[70%] border-l border-slate-800 px-1.5 py-1 text-left")}>
                                    <Text style={tw("text-justify")}>{pengawasan.proyekKonstruksi.namaPaket}</Text>
                                    <Text style={tw("font-light text-slate-500 mt-1 uppercase")}>{pengawasan.proyekKonstruksi.penyediaJasa}</Text>
                                </View>
                                <Text style={tw("w-[30%] border-l border-slate-800 p-1")}>{formatDateToIndonesia(pengawasan.tanggalPengawasan)}</Text>
                            </View>
                            <View style={tw("w-[65%] border-b border-l border-slate-800 flex flex-row text-center")}>
                                <View style={tw("w-[15%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPenerapanManajemenMutu)}</View>
                                <View style={tw("w-[60%] border-l border-slate-800 flex flex-row")}>
                                    <View style={tw("w-[28%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPemenuhanPenyediaanMPTK)}</View>
                                    <View style={tw("w-[28%] border-r border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPenggunaanMPTK)}</View>
                                    <View style={tw("w-[44%] p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPenggunaanPDN)}</View>
                                </View>
                                <View style={tw("w-[25%] border-x border-slate-800 p-1")}>{getTertibStatusBadgeRekapitulasiPDF(pengawasan.tertibPemenuhanStandarLingkungan)}</View>
                            </View>
                        </View>
                    ))
                }
            </View>
    </>
    )
}
