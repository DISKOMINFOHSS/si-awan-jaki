import React from "react";
import FormPemeriksaanRutin from "./APBD/FormPemeriksaanRutin";

export default ({
    pengawasanId,
    daftarLingkupPengawasan,
    sumberDana = 'APBD'
}) => {
    const daftar = daftarLingkupPengawasan.map((lingkupPengawasan) => {
        const daftarIndikator = lingkupPengawasan.indikator.map(({ id, indikator }) => (
            <div key={id} className="flex gap-x-1 font-light text-xs text-slate-500">
                { id[1] && <span className="flex-none w-5">{`${id[1]}.`}</span> }
                <span className="text-justify">{indikator}</span>
            </div>
        ));

        return (
            <div
                key={lingkupPengawasan.id}
                className="border-b border-slate-200 py-5"
            >
                <div className="font-medium text-slate-800 space-y-2">
                    {`${lingkupPengawasan.id}. ${lingkupPengawasan.lingkupPengawasan}`}
                </div>
                <div className="grid grid-cols-3 gap-5 my-4">
                    <div className="text-xs space-y-2">
                        <div>
                            <h4 className="font-medium text-slate-800">Indikator</h4>
                            {daftarIndikator}
                        </div>
                        <div>
                            <h4 className="font-medium text-slate-800">Dokumen yang diperiksa</h4>
                            <p className="font-light text-slate-500 text-justify">
                                {lingkupPengawasan.dokumen}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <FormPemeriksaanRutin
                            lingkupId={lingkupPengawasan.id}
                            daftarPemeriksaan={lingkupPengawasan.daftarPemeriksaan}
                        />
                    </div>
                </div>
            </div>
        );
    });

    return <>{daftar}</>;
}
