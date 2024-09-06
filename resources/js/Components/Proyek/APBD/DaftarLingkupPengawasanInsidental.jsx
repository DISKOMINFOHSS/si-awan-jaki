import React from "react";

import Tabs from "../../Tabs";
import Card from "../../Card";

export default ({
    pengawasanId,
    daftarLingkupPengawasan
}) => {
    const tabList = daftarLingkupPengawasan.map(({ id, lingkup_pengawasan: lingkupPengawasan }) => ({ label: `${id}. ${lingkupPengawasan}`}));

    return (
        <>
            <Tabs tabList={tabList}>
                {
                    daftarLingkupPengawasan.map((lingkupPengawasan) => (
                        <Tabs.Tab key={lingkupPengawasan.id}>
                            <div>
                                <h4 className="font-light text-xs text-slate-500">Lingkup Pengawasan</h4>
                                <h3 className="font-medium text-slate-800">{`${lingkupPengawasan.id}. ${lingkupPengawasan.lingkup_pengawasan}`}</h3>
                            </div>
                            {
                                lingkupPengawasan.indikator_apbd.map(({ id, indikator, cara_pemeriksaan, kesimpulan }) => (
                                    <div key={id} className="grid grid-cols-4 gap-5 my-4">
                                        <div className="text-xs space-y-2">
                                            <div>
                                                <h4 className="font-medium text-slate-800">Indikator</h4>
                                                <div className="flex gap-x-1 font-light text-xs text-slate-500">
                                                    { id[1] && <span className="flex-none w-5">{`${id[1]}.`}</span> }
                                                    <span className="text-justify">{indikator}</span>
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
                                                        cara_pemeriksaan.map((pemeriksaan, i) => (
                                                            <React.Fragment key={i}>
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
                                                                                    kesimpulan[i].map((k, j) => (
                                                                                        <div key={j} className="grid grid-cols-2 gap-2.5 items-start">
                                                                                            {
                                                                                                k.split('/').length !== 1 ? (
                                                                                                    <>
                                                                                                        <div className="flex items-start gap-x-2">
                                                                                                            <input
                                                                                                                type="radio" id={`true-${id}-${i}-${j}`} name={`kesimpulan-${id}-${i}-${j}`} value={true}
                                                                                                                className="w-3.5 h-3.5 mt-0.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                                                                            />
                                                                                                            <label htmlFor={`true-${id}-${i}-${j}`} className="text-slate-700">{k.split('/')[0]}</label>
                                                                                                        </div>
                                                                                                        <div className="flex items-start gap-x-2">
                                                                                                            <input
                                                                                                                type="radio" id={`false-${id}-${i}-${j}`} name={`kesimpulan-${id}-${i}-${j}`} value={false}
                                                                                                                className="w-3.5 h-3.5 mt-0.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                                                                                                            />
                                                                                                            <label htmlFor={`false-${id}-${i}-${j}`} className="text-slate-700">{k.split('/')[1]} {k.split('/')[0]}</label>
                                                                                                        </div>
                                                                                                    </>
                                                                                                ) : (
                                                                                                    <>
                                                                                                        <div>{k.split(/[()]/)[0]}</div>
                                                                                                        <div className="flex items-center gap-x-2 mt-1">
                                                                                                            <input
                                                                                                                type="text"
                                                                                                                className="px-3 py-1 block w-8 rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                                                                                            />
                                                                                                            <span>{k.split(/[()]/)[1]}</span>
                                                                                                        </div>
                                                                                                    </>
                                                                                                )
                                                                                            }
                                                                                            { j+1 !== kesimpulan[i].length && <div className="col-span-2 border-b border-slate-100"></div> }
                                                                                        </div>
                                                                                    ))
                                                                                }
                                                                            </div>
                                                                            <div>
                                                                                <label htmlFor={`catatan-${id}-${i}`} className="block mb-2 text-xs font-medium text-slate-800">Catatan Pemeriksaan</label>
                                                                                <textarea
                                                                                    name={`catatan-${id}-${i}`} id={`catatan-${id}-${i}`} rows="2"
                                                                                    // value={hasilPemeriksaan.catatan} onChange={handleInputChange}
                                                                                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                { i+1 !== cara_pemeriksaan.length && <div className="my-4 border-b border-slate-200"></div> }
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                    <div className="w-full flex justify-end items-center gap-x-2">
                                                        <button
                                                            type="button"
                                                            // disabled={processing}
                                                            className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2.5 px-3"
                                                            // onClick={handleSubmit}
                                                        >
                                                            {/* { processing && <LiaSpinnerSolid className="animate-spin" /> } */}
                                                            Simpan
                                                        </button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>
                                ))
                            }
                        </Tabs.Tab>
                    ))
                }
            </Tabs>
        </>
    )
}
