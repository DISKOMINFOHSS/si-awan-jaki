import React from "react";
import { Link, useForm } from "@inertiajs/react";

import Card from "../Card";
import ModalError from "../ModalError";
import { LiaSpinnerSolid } from "react-icons/lia";

export default ({ rekomendasiPengawasan, pengawasan, link }) => {
    const { rekomendasi, keterangan, tanggalTemuan } = rekomendasiPengawasan;

    const { data, setData, post, processing, reset } = useForm({
        rekomendasi: rekomendasi ? rekomendasi : '',
        keterangan: keterangan ? keterangan : '',
        tanggalTemuan: tanggalTemuan ? tanggalTemuan : '',
    });

    const [isModalErrorOpened, setIsModalErrorOpened] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        post(`/admin/pengawasan/${link}/rekomendasi`, {
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                setIsModalErrorOpened(true);
                console.log(errors);
            }
        });
    }

    return (
        <>
            <div className="my-5">
                <div className="mb-2.5">
                    <h4 className="font-medium text-lg text-slate-800 leading-6" id="rekomendasi">Rekomendasi Hasil</h4>
                    <h5 className="font-light text-xs text-slate-500">{pengawasan}</h5>
                </div>
                <Card className="w-full h-fit">
                    <Card.Body className="p-5">
                        <form className="grid grid-cols-3 gap-5 text-xs" onSubmit={handleSubmit}>
                            <div className="col-span-2">
                                <label htmlFor="rekomendasi" className="block mb-2 text-xs font-medium text-slate-800">Temuan dan Rekomendasi <span className="text-red-400">*</span></label>
                                <textarea
                                    name="rekomendasi" id="rekomendasi" rows="6" placeholder="cth. Lorem ipsum dolor sit amet"
                                    value={data.rekomendasi} onChange={e => setData('rekomendasi', e.target.value)}
                                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                />
                            </div>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="keterangan" className="block mb-2 text-xs font-medium text-slate-800">Keterangan</label>
                                    <textarea
                                        name="keterangan" id="keterangan" rows="2" placeholder="cth. Lorem ipsum dolor sit amet"
                                        value={data.keterangan} onChange={e => setData('keterangan', e.target.value)}
                                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="tanggalTemuan" className="block mb-2 text-xs font-medium text-slate-800">Tanggal Temuan</label>
                                    <input
                                        type="date" name="tanggalTemuan" id="tanggalTemuan"
                                        value={data.tanggalTemuan} onChange={e => setData('tanggalTemuan', e.target.value)}
                                        className="px-3 py-2 block w-1/2 rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                                    />
                                </div>
                            </div>
                            <div className="col-span-3 flex justify-end items-center gap-x-2.5">
                                <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-2.5">Kembali</button>
                                {/* <Link href={action}></Link> */}
                                <button type="submit" disabled={processing} className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-2.5">
                                    { processing && <LiaSpinnerSolid className="animate-spin" /> }
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </div>
            <ModalError
                isVisible={isModalErrorOpened}
                onClose={() => setIsModalErrorOpened(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal menyimpan rekomendasi. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}
