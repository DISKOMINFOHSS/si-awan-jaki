import React from "react";
import { useForm } from "@inertiajs/react";

import Card from "../../Card";

import {
    LiaSpinnerSolid
} from "react-icons/lia";

const KesimpulanPemeriksaan = ({ indikatorId, pemeriksaanId, id, kesimpulan }) => {
    return kesimpulan.split('/').length !== 1 ? (
        <>
            <div className="flex items-start gap-x-2">
                <input
                    type="radio" id={`true-${indikatorId}-${pemeriksaanId}-${id}`} name={`kesimpulan-${indikatorId}-${pemeriksaanId}-${id}`} value={true}
                    className="w-3.5 h-3.5 mt-0.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={`true-${indikatorId}-${pemeriksaanId}-${id}`} className="text-slate-700">{kesimpulan.split('/')[0]}</label>
            </div>
            <div className="flex items-start gap-x-2">
                <input
                    type="radio" id={`false-${indikatorId}-${pemeriksaanId}-${id}`} name={`kesimpulan-${indikatorId}-${pemeriksaanId}-${id}`} value={false}
                    className="w-3.5 h-3.5 mt-0.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={`false-${indikatorId}-${pemeriksaanId}-${id}`} className="text-slate-700">{kesimpulan.split('/')[1]} {kesimpulan.split('/')[0]}</label>
            </div>
        </>
    ) : (
        <>
            <div>{kesimpulan.split(/[()]/)[0]}</div>
            <div className="flex items-center gap-x-2 mt-1">
                <input
                    type="text" name={`kesimpulan-${indikatorId}-${pemeriksaanId}-${id}`}
                    className="px-3 py-1 block w-8 rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                />
                <span>{kesimpulan.split(/[()]/)[1]}</span>
            </div>
        </>
    );
}

const FormPemeriksaan = ({ indikatorId, id, pemeriksaan, kesimpulan }) => {
    return (
        <div className="space-y-4 text-slate-800 mb-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="text-xs">
                    <div className="font-medium text-xs mb-1">Cara Pemeriksaan</div>
                    <p className="font-light text-justify text-slate-500">
                        {pemeriksaan}
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2 text-xs">
                        <div>
                            <div className="font-medium text-slate-800">Kesimpulan Pemeriksaan</div>
                        </div>
                        {
                            kesimpulan.map((k, i) => (
                                <div key={i} className="grid grid-cols-2 gap-2.5 items-start">
                                    <KesimpulanPemeriksaan
                                        indikatorId={indikatorId}
                                        pemeriksaanId={id}
                                        id={i}
                                        kesimpulan={k}
                                    />
                                    { i+1 !== kesimpulan.length && <div className="col-span-2 border-b border-slate-100"></div> }
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <label htmlFor={`catatan-${indikatorId}-${id}`} className="block mb-2 text-xs font-medium text-slate-800">Catatan Pemeriksaan</label>
                        <textarea
                            name={`catatan-${indikatorId}-${id}`} id={`catatan-${indikatorId}-${id}`} rows="2"
                            // value={hasilPemeriksaan.catatan} onChange={handleInputChange}
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ({
    pengawasanId,
    indikator,
}) => {
    const { id, indikator: namaIndikator, caraPemeriksaan, kesimpulan } = indikator;

    const { data, setData, processing, post } = useForm({});

    return (
        <>
            <div className="grid grid-cols-4 gap-5 my-4">
                <div className="text-xs space-y-2">
                    <div>
                        <h4 className="font-medium text-slate-800">Indikator</h4>
                        <div className="flex gap-x-1 font-light text-xs text-slate-500">
                            { id[1] && <span className="flex-none w-5">{`${id[1]}.`}</span> }
                            <span className="text-justify">{namaIndikator}</span>
                        </div>
                    </div>
                    {/* <div>
                        <h4 className="font-medium text-slate-800">Dokumen yang diperiksa</h4>
                        <p className="font-light text-slate-500 text-justify">
                        </p>
                    </div> */}
                </div>
                <div className="col-span-3">
                    <Card>
                        <Card.Body className="p-4">
                            {
                                caraPemeriksaan.map((pemeriksaan, i) => (
                                    <React.Fragment key={i}>
                                        <FormPemeriksaan
                                            indikatorId={id}
                                            id={i}
                                            pemeriksaan={pemeriksaan}
                                            kesimpulan={kesimpulan[i]}
                                        />
                                        { i+1 !== caraPemeriksaan.length && <div className="my-4 border-b border-slate-200"></div> }
                                    </React.Fragment>
                                ))
                            }
                            <div className="w-full flex justify-end items-center gap-x-2">
                                <button
                                    type="button"
                                    disabled={processing}
                                    className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2.5 px-3"
                                    // onClick={handleSubmit}
                                >
                                    { processing && <LiaSpinnerSolid className="animate-spin" /> }
                                    Simpan
                                </button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}
