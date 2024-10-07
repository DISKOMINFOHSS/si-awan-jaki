import React from "react";
import formatCurrencyToIDR from "./formatCurrencyToIDR";

function getRealisasiFisikProgressBar(target, realisasi) {
    if (realisasi === null) return;

    if (realisasi === "100.00") {
        return (
            <div className="space-y-2">
                <span className="text-green-400">{realisasi}%</span>
                <div className="w-full bg-slate-200 rounded-full h-2.5 flex items-center">
                    <div className={`bg-green-500 h-2.5 rounded-full w-full`}></div>
                </div>
            </div>
        );
    }

    return realisasi >= target ? (
        <div className="space-y-2">
            <span className="text-blue-500">{realisasi}%</span>
            <div className="w-full bg-slate-200 rounded-full h-2.5 flex items-center">
                <div className={`bg-blue-500 h-2.5 rounded-full w-[${Math.ceil(realisasi / 10)*10}%]`}></div>
            </div>
        </div>
    ) : (
        <div className="space-y-2">
            <span className="text-red-500">{realisasi}%</span>
            <div className="w-full bg-slate-200 rounded-full h-2.5 flex items-center">
                <div className={`bg-red-500 h-2.5 rounded-full w-[${Math.ceil(realisasi / 10)*10}%]`}></div>
            </div>
        </div>
    );
}

function getRealisasiKeuanganProgressBar(id, realisasi, total) {
    const realisasiKeuangan = realisasi[id].realisasi;
    if (realisasiKeuangan === null) return;

    const jumlahRealisasi = realisasi.slice(id, realisasi.length).reduce((acc, { realisasi }) => acc + Number(realisasi), 0);
    console.log(jumlahRealisasi);

    if (jumlahRealisasi === Number(total)) {
        return (
            <div className="space-y-2">
                <span className="text-green-400">{formatCurrencyToIDR(realisasiKeuangan)}</span>
                <div className="w-full bg-slate-200 rounded-full h-2.5 flex items-center">
                    <div className={`bg-green-500 h-2.5 rounded-full w-full`}></div>
                </div>
            </div>
        );
    }

    return realisasiKeuangan >= realisasi[id].jumlahPembayaran ? (
        <div className="space-y-2">
            <span className="text-blue-500">{formatCurrencyToIDR(realisasiKeuangan)}</span>
            <div className="w-full bg-slate-200 rounded-full h-2.5 flex items-center">
                <div className={`bg-blue-500 h-2.5 rounded-full w-[${Math.ceil((jumlahRealisasi / total * 100) / 10)*10}%]`}></div>
            </div>
        </div>
    ) : (
        <div className="space-y-2">
            <span className="text-red-500">{formatCurrencyToIDR(realisasiKeuangan)}</span>
            <div className="w-full bg-slate-200 rounded-full h-2.5 flex items-center">
                <div className={`bg-red-500 h-2.5 rounded-full w-[${Math.ceil((jumlahRealisasi / total * 100) / 10)*10}%]`}></div>
            </div>
        </div>
    )
}

export {
    getRealisasiFisikProgressBar,
    getRealisasiKeuanganProgressBar,
}
