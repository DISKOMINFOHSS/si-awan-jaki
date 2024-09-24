import React from "react";
import { router } from "@inertiajs/react";

import Modal from "../../Modal";
import ModalError from "../../ModalError";
import getDefaultData from "../../../Utils/getDefaultData";

import { LiaPlusCircleSolid, LiaSpinnerSolid, LiaTrashAltSolid } from "react-icons/lia";

const InputTarget = ({
    itr,
    targetRealisasi,
    onAdd,
    onInputChange,
    onDelete,
}) => {
    const [ values, setValues ] = React.useState({
        id: targetRealisasi.id,
        tanggal: getDefaultData(targetRealisasi.tanggal),
        jumlahPembayaran: getDefaultData(targetRealisasi.jumlahPembayaran),
    });

    function handleInputChange(e) {
        setValues({
            ...values,
            [e.target.name.split('-')[0]]: e.target.value,
        });
        onInputChange({
            ...values,
            [e.target.name.split('-')[0]]: e.target.value,
        });
    }

    return (
        <tr className="border-b border-slate-100 hover:bg-slate-50">
            <td className="px-2 py-3 text-center">{itr + 1}</td>
            <td className="px-1.5 py-3 w-3/5">
                <div className="flex justify-center">
                    <input
                        type="date" name={`tanggal-${values.id}`} id={`tanggal-${values.id}`}
                        value={values.tanggal} onChange={handleInputChange}
                        className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                    />
                </div>
            </td>
            <td className="px-1.5 py-3 w-full">
                <div className="relative w-full">
                    <div className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-xs text-slate-500 font-light">Rp</div>
                    <input
                        type="text" name={`jumlahPembayaran-${values.id}`} id={`jumlahPembayaran-${values.id}`} placeholder="10000000"
                        value={values.jumlahPembayaran} onChange={handleInputChange}
                        className="border border-slate-200 rounded-md py-2 pl-8 block w-full text-slate-700 placeholder:text-slate-400 focus:ring-blue-400 focus:border-blue-400 text-xs"
                    />
                </div>
            </td>
            <td className="px-1.5 py-3 float-right max-w-fit">
                <div className="flex items-center justify-end gap-x-1.5 max-w-fit py-0.5">
                    <button
                        type="button"
                        className="px-2 py-1.5 block rounded border border-blue-500 text-blue-600 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        onClick={() => onAdd()}
                    >
                        <LiaPlusCircleSolid size={16} />
                    </button>
                    <button
                        type="button"
                        className="px-2 py-1.5 block rounded border border-red-500 text-red-600 focus:ring-red-400 focus:border-red-400 text-xs"
                        onClick={() => onDelete(values.id)}
                    >
                        <LiaTrashAltSolid size={16} />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default ({
    isVisible,
    onClose,
    tahun,
    pengawasanId,
}) => {
    const [ processing, setProcessing ] = React.useState(false);
    const [ data, setData ] = React.useState([
        {
            id: +new Date(),
            tanggal: '',
            jumlahPembayaran: '',
        },
    ]);

    const [ isModalErrorOpen, setIsModalErrorOpen ] = React.useState(false);
    const [ errorMessage, setErrorMessage ] = React.useState('');

    function handleAddInputTarget() {
        setData([ ...data, { id: +new Date(), tanggal: '', jumlahPembayaran: '' } ]);
    }

    function handleInputTargetChange(value) {
        setData(data.map((d) => d.id === value.id ? value : d));
    }

    function handleDeleteInputTarget(id) {
        if (data.length !== 1) setData(data.filter((d) => d.id !== id));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        router.post(
            `/admin/jenis-pengawasan/progress/${tahun}/${pengawasanId}/realisasi-keuangan`,
            { targetRealisasi: data },
            {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                    setProcessing(false);
                },
                onError: (error) => {
                    onClose();
                    setProcessing(false);
                    console.log(error);
                    setErrorMessage(error.message);
                    setIsModalErrorOpen(true);
                },
            }
        );
    }

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-lg h-fit my-10 z-500">
                <Modal.Header onClose={onClose}>
                    <div className="mb-3">
                        <h1 className="font-medium text-slate-800">Tambah Target Realisasi Keuangan</h1>
                        <h2 className="text-xs text-slate-500 font-light">Pengisian daftar target realisasi keuangan hanya dapat diisi satu kali.</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} method="post" className="mb-2">
                        <table className="w-full text-xs">
                            <thead className="border-b border-slate-100 text-slate-700">
                                <tr>
                                    <th scope="col" className="px-2 py-1.5 font-medium">#</th>
                                    <th scope="col" className="p-1.5 font-medium tracking-wide">Tanggal</th>
                                    <th scope="col" className="p-1.5 font-medium tracking-wide">Jumlah Pembayaran</th>
                                    <th scope="col" className="p-1.5 font-medium">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                {
                                    data.map((d, i) => (
                                        <InputTarget
                                            key={i} itr={i}
                                            targetRealisasi={d}
                                            onAdd={handleAddInputTarget}
                                            onInputChange={handleInputTargetChange}
                                            onDelete={handleDeleteInputTarget}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="flex items-center justify-end gap-x-2.5 mt-4">
                            <button type="button" className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-3" onClick={onClose}>Batal</button>
                            <button
                                type="submit"
                                className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2.5 px-3 hover:bg-blue-800"
                                disabled={processing}
                            >
                                { processing && <LiaSpinnerSolid className="animate-spin" />}
                                Simpan
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <ModalError
                isVisible={isModalErrorOpen}
                onClose={() => setIsModalErrorOpen(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal menambahkan target realisasi keaungan. {errorMessage} Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    )
}

