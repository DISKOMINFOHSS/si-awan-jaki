import React from "react";
import Card from "../../Card";
import InputPemeriksaan from "../../InputPemeriksaan";

export default ({
    pengawasanId,
    daftarPemeriksaan,
    lingkupId
}) => {
    return (
        <>
            <Card>
                <Card.Body className="p-4">
                    {
                        daftarPemeriksaan.map((pemeriksaan, i) => (
                            <React.Fragment key={`${lingkupId}-${i}`}>
                                <div className="space-y-4 text-slate-800 mb-4">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-xs">
                                            <div className="font-medium text-xs mb-1">Cara Pemeriksaan</div>
                                            <p className="font-light text-slate-500">
                                                {pemeriksaan.caraPemeriksaan}
                                            </p>
                                        </div>
                                        <InputPemeriksaan
                                            id={`${lingkupId}-${i}`}
                                            label={pemeriksaan.label}
                                            kesimpulan=''
                                            catatan=''
                                            onInputChange={() => {}}
                                        />
                                    </div>
                                </div>
                                { i % 2 == 0 && <div className="my-4 border-b border-slate-200"></div>}
                            </React.Fragment>
                        ))
                    }
                    <div className="w-full flex justify-end items-center gap-x-2">
                        <button
                            type="button"
                            className="flex justify-center items-center gap-x-1 bg-white font-medium text-xs text-slate-700 rounded py-2.5 px-3 hover:bg-slate-100 border border-slate-200"
                            // onClick={() => reset()}
                        >
                            Hapus
                        </button>
                        <button
                            type="button"
                            className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2.5 px-3"
                            // onClick={() => handleClick()}
                        >
                            Simpan
                        </button>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}
