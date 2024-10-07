import React from "react";

const daftarDokumen = {
    1: (
        <div className="font-light text-xs text-slate-500 text-justify space-y-2">
            <p>Dokumen Pemilihan yang sudah dikeluarkan oleh Kepala Unit Kerja Pengadaan Barang/Jasa.</p>
            <p>
                Dokumen pemilihan penyedia jasa:
                <ol className="list-decimal ml-4">
                    <li>Dokumen kualifikasi</li>
                    <li>Harga Perkiraan Sendiri</li>
                    <li>
                        Dokumen tender/seleksi:
                        <ol className="list-[lower-alpha] ml-4">
                            <li>Umum</li>
                            <li>Pengumuman</li>
                            <li>Instruksi Kepada Peserta (IKP)</li>
                            <li>Lembar Data Pemilihan (LDP)</li>
                            <li>dokumen penawaran administrasi teknis dan harga</li>
                        </ol>
                    </li>
                </ol>
            </p>
            <p>
                Dalam hal dilakukan dengan cara terintegrasi design and build, dokumennya:
                <ol className="list-decimal ml-4">
                    <li>Dokumen kualifikasi</li>
                    <li>Pagu Anggaran</li>
                    <li>
                        Dokumen tender
                        <ol className="list-[lower-alpha] ml-4">
                            <li>Instruksi Kepada Peserta (IKP)</li>
                            <li>Lembar Data Pemilihan (LDP)</li>
                            <li>Rancangan Kontrak (surat perjanjian, Syarat- syarat umum kontrak/SSUK, syarat-syarat khusus kontrak/SSKK)</li>
                            <li>Daftar Kuantitas dan Harga/DKH</li>
                        </ol>
                    </li>
                    <li>Persetujuan dari pimpinan Lembaga/ kementerian/Gubernur/ Bupati atau Walikota</li>
                    <li>Ketentuan Kuasa Pengguna Anggaran/Pejabat Pembuat Komitmen</li>
                    <li>Dokumen lainnya</li>
                </ol>
            </p>
        </div>
    ),
    2: {
        a: (
            <div className="font-light text-xs text-slate-500 text-justify space-y-2">
                <p>Dokumen Kontrak Kerja Konstruksi dan perubahannya yang sudah disahkan oleh Kuasa Pengguna Anggaran/Pejabat Pembuat Komitmen</p>
            </div>
        ),
        b: (
            <div className="font-light text-xs text-slate-500 text-justify space-y-2">
                <p>Dokumen kontrak khususnya yang menyangkut Penggunaan Tenaga Kerja</p>
                <p>Dokumen Daftar Tenaga Kerja di Proyek yang selalu dimuktahirkan (periodik 3 bulanan)</p>
                <p>Daftar remunerasi Tenaga Kerja pada kualifikasi jenjang jabatan ahli</p>
            </div>
        ),
        c: (
            <div className="font-light text-xs text-slate-500 text-justify space-y-2">
                <p>Dokumen daftar SubPenyedia dan surat keputusan/ DO penunjukan Sub penyedia jasa</p>
            </div>
        ),
        d: (
            <div className="font-light text-xs text-slate-500 text-justify space-y-2">
                <p>Dokumen Kontrak Kerja Konstruksi</p>
            </div>
        ),
        e: (
            <div className="font-light text-xs text-slate-500 text-justify space-y-2">
                <p>Dokumen Kontrak Kerja Konstruksi</p>
            </div>
        ),
        f: (
            <div className="font-light text-xs text-slate-500 text-justify space-y-2">
                <p>Dokumen Kontrak Kerja Konstruksi</p>
            </div>
        ),
        g: (
            <div className="font-light text-xs text-slate-500 text-justify space-y-2">
                <p>Dokumen Kontrak Kerja Konstruksi</p>
            </div>
        ),
    },
    3: {
        a: (
            <div className="font-light text-xs text-slate-500 text-justify space-y-2">
                <ol className="list-decimal ml-4 space-y-2">
                    <li>
                        Ketersediaan Dokumen Standar K4, yang mencakup:
                        <ol className="list-[lower-alpha] ml-4">
                            <li>Standar mutu bahan</li>
                            <li>Standar mutu peralatan</li>
                            <li>Standar keselamatan kesehatan kerja</li>
                            <li>Standar prosedur pelaksanaan Jasa Konstruksi</li>
                            <li>Standar mutu hasil pelaksanaan Jasa Konstruksi</li>
                            <li>Standar operasi dan pemeliharaan</li>
                            <li>Pedoman perlindungan sosial tenaga kerja sesuai ketentuan perundang-undangan</li>
                            <li>Standar lingkungan hidup sesuai ketentuan perundang-undangan</li>
                        </ol>
                    </li>
                    <li>
                        Pengesahan dan persetujuan dokumen standar K4, yang mencakup:
                        <ol className="list-[lower-alpha] ml-4">
                            <li>Hasil pengkajian, perencanaan, dan/atau perancangan;</li>
                            <li>Rencana teknis proses pembangunan, pemeliharaan, pembongkaran, dan/atau pembangunan kembali;</li>
                            <li>Pelaksanaan suatu proses pembangunan, pemeliharaan, pembongkaran, dan/atau pembangunan kembali;</li>
                            <li>Penggunaan material, peralatan dan/atau teknologi; dan/atau</li>
                            <li>Hasil layanan Jasa Konstruksi.</li>
                        </ol>
                    </li>
                </ol>
            </div>
        ),
        b: (
            <div className="font-light text-xs text-slate-500 text-justify space-y-2">
                <ol className="list-[lower-alpha] ml-4">
                    <li>rancangan konseptual SMKK;</li>
                    <li>RKK;</li>
                    <li>RMPK;</li>
                    <li>Program Mutu;</li>
                    <li>RKPPL; dan</li>
                    <li>RMLLP.</li>
                </ol>
            </div>
        ),
        c: (
            <div className="font-light text-xs text-slate-500 text-justify space-y-2">
                <ol className="list-[lower-alpha] ml-4">
                    <li>Dokumen rencana program sosialisasi SMKK di Proyek konstruksi</li>
                    <li>Laporan penerapan RKK</li>
                    <li>Bukti Pembayaran BPJS Ketenagakerjaan</li>
                    <li>Bukti Pembayaran BPJS Kesehatan atau bukti asuransi kesehatan</li>
                </ol>
            </div>
        ),
    },
    4: (
        <div className="font-light text-xs text-slate-500 text-justify space-y-2">
            <ol className="list-[lower-alpha] ml-4">
                <li>Dokumen RMPK</li>
                <li>Dokumen Program Mutu Konsultan</li>
                <li>Dokumen Laporan Pelaksanaan</li>
            </ol>
        </div>
    ),
    5: {
        a: (
            <div className="font-light text-xs text-slate-500 text-justify space-y-2">
                <p>Dokumen kebutuhan dan pasokan material, peralatan dan teknologi konstruksi atau dokumen lain yang menunjukkan rencana penggunaannya</p>
                <p>Dokumen laporan pelaksanaan material peralatan konstruksi</p>
            </div>
        ),
        b: (
            <div className="font-light text-xs text-slate-500 text-justify space-y-2">
                <p>Daftar penggunaan material dasar utama dan material olahan utama</p>
                <p>Daftar penggunaan peralatan konstruksi utama</p>
                <p>Daftar penggunaan teknologi konstruksi</p>
            </div>
        ),
        c: (
            <div className="font-light text-xs text-slate-500 text-justify space-y-2">
                <p>
                    Dokumen perhitungan TKDN (Tingkat Kandungan Dalam Negeri) yang memenuhi batasan minimum capaian TKDN sesuai persyaratan tender yang dilengkapi dengan:
                    <ol className="list-decimal ml-4">
                        <li>Sertifikat TKDN dari material konstruksi</li>
                        <li>sertifikat BMP dari produsen material konstruksi (apabila ada) yang masih berlaku, terutama material konstruksi yang memenuhi kategori wajib, yaitu penjumlahan nilai TKDN dan BMP minimal 40% dengan nilai TKDN minimal 25%.</li>
                        <li>Dokumen persetujuan penggunaan produk impor yang ditandatangani Pejabat berwenang (apabila ada penggunaan produk impor).</li>
                    </ol>
                </p>
            </div>
        )
    },
    6: (
        <div className="font-light text-xs text-slate-500 text-justify space-y-2">
            <p>surat persetujuan pencantuman logo Ekolabel Indonesia atau sertifikat yang diterbitkan oleh instansi terkait yang berwenang</p>
            <p>Surat Izin Penambangan</p>
        </div>
    )
}

export { daftarDokumen };
