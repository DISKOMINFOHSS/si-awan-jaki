import React from "react";
import { Link, router } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";
import ModalError from "../../../Components/ModalError";

import FormPemilikPengelola from "../../../Components/Bangunan/FormPemilikPengelola";
import FormInformasi from "../../../Components/Bangunan/FormInformasi";

import { LiaCheckCircleSolid, LiaHomeSolid, LiaSpinnerSolid } from "react-icons/lia";
import Modal from "../../../Components/Modal";

const PendataanBangunanEdit = ({ data }) => {
    console.log(data);
    const { bangunan } = data;
    const { pemilikBangunan, pengelolaBangunan, ...informasiBangunan } = bangunan;

    const [informasi, setInformasi] = React.useState(informasiBangunan);
    const handleInformasiChange = values => setInformasi({ ...informasi, ...values });

    const [pemilik, setPemilik] = React.useState(pemilikBangunan);
    const handlePemilikChange = values => setPemilik({ ...pemilik, ...values });

    const [pengelola, setPengelola] = React.useState(pengelolaBangunan);
    const handlePengelolaChange = values => setPengelola({ ...pengelola, ...values });

    const [isModalErrorOpened, setIsModalErrorOpened] = React.useState(false);
    const [isModalSuccessOpened, setIsModalSuccessOpened] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);


    function handleInformasiSubmit() {
        setProcessing(true);

        router.put(`/admin/pendataan/bangunan/${bangunan.id}`, {
            bangunan: informasi,
        }, {
            onError: () => {
                setIsModalErrorOpened(true);
            },
            onSuccess: () => {
                setIsModalSuccessOpened(true);
            },
        });

        setProcessing(false);
    }

    function handlePemilikPengelolaSubmit(role) {
        setProcessing(true);

        router.put(`/admin/pendataan/bangunan/${bangunan.id}/${role}`, {
            [role]: role === 'pemilik' ? pemilik : pengelola,
        }, {
            preserveScroll: true,
            onError: () => {
                setIsModalErrorOpened(true);
            },
            onSuccess: () => {
                setIsModalSuccessOpened(true);
            },
        });

        setProcessing(false);
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href="">...</Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/pendataan/bangunan/${bangunan.id}`}>{bangunan.nama}</Breadcrumb.Item>
                <Breadcrumb.Item active>Edit Bangunan</Breadcrumb.Item>
            </Breadcrumb>
            <div className="w-full text-center my-5">
                <h1 className="font-medium text-xl text-slate-800">Edit Bangunan Konstruksi</h1>
                <h2 className="font-light text-xs text-slate-500">Pendataan Pemanfaatan Produk Jasa Konstruksi di Kab. Hulu Sungai Selatan</h2>
            </div>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-x-2">
                        <div>
                            <h3 className="font-medium text-slate-800">Informasi Bangunan</h3>
                            <h4 className="font-light text-xs text-slate-500">Silakan lengkapi informasi bangunan konstruksi</h4>
                        </div>
                    </div>
                </div>
                <FormInformasi
                    data={informasi}
                    onChange={handleInformasiChange}
                />
                <div className="flex justify-end items-center gap-x-2.5 my-5">
                    <Link
                        href={`/admin/pendataan/bangunan/${bangunan.id}`}
                        className="flex justify-center items-center gap-x-1 bg-slate-200 text-slate-700 font-medium text-xs rounded py-2.5 px-5 hover:bg-slate-300"
                    >
                        Kembali
                    </Link>
                    <button
                        onClick={() => handleInformasiSubmit()}
                        className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2.5 px-5 hover:bg-blue-800"
                        disabled={processing}
                    >
                        { processing && <LiaSpinnerSolid className="animate-spin" />}
                        Simpan
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-x-2">
                            <div>
                                <h3 className="font-medium text-slate-800">Pemilik Bangunan</h3>
                                <h4 className="font-light text-xs text-slate-500">Silakan lengkapi informasi pemilik bangunan</h4>
                            </div>
                        </div>
                    </div>
                    <FormPemilikPengelola
                        role="pemilik"
                        data={pemilik}
                        onChange={handlePemilikChange}
                    />
                    <div className="flex justify-end items-center gap-x-2.5 my-5">
                        <Link
                            href={`/admin/pendataan/bangunan/${bangunan.id}`}
                            className="flex justify-center items-center gap-x-1 bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-4 hover:bg-slate-300"
                        >
                            Kembali
                        </Link>
                        <button
                            onClick={() => handlePemilikPengelolaSubmit('pemilik')}
                            className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-4 hover:bg-blue-800"
                            disabled={processing}
                        >
                            { processing && <LiaSpinnerSolid className="animate-spin" />}
                            Simpan
                        </button>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-x-2">
                            <div>
                                <h3 className="font-medium text-slate-800">Pengelola Bangunan</h3>
                                <h4 className="font-light text-xs text-slate-500">Silakan lengkapi informasi pengelola bangunan</h4>
                            </div>
                        </div>
                    </div>
                    <FormPemilikPengelola
                        role="pengelola"
                        data={pengelola}
                        onChange={handlePengelolaChange}
                    />
                    <div className="flex justify-end items-center gap-x-2.5 my-5">
                        <Link
                            href={`/admin/pendataan/bangunan/${bangunan.id}`}
                            className="flex justify-center items-center gap-x-1 bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-4 hover:bg-slate-300"
                        >
                            Kembali
                        </Link>
                        <button
                            onClick={() => handlePemilikPengelolaSubmit('pengelola')}
                            className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2 px-4 hover:bg-blue-800"
                            disabled={processing}
                        >
                            { processing && <LiaSpinnerSolid className="animate-spin" />}
                            Simpan
                        </button>
                    </div>
                </div>
            </div>


            <ModalError
                isVisible={isModalErrorOpened}
                onClose={() => setIsModalErrorOpened(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal mengedit informasi bangunan. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
            <Modal
                isVisible={isModalSuccessOpened}
                className="w-full max-w-xs h-fit my-auto"
            >
                <Modal.Header
                    onClose={() => setIsModalSuccessOpened(false)}
                >
                    <div className="rounded bg-green-100 text-green-500 w-fit mx-auto p-2">
                    <LiaCheckCircleSolid size={24} />
                </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center my-2.5">
                        <div className="font-medium text-slate-700 mb-1">Berhasil!</div>
                        <div className="font-light text-xs text-slate-500 mb-2">
                            Informasi berhasil diubah.
                        </div>
                    </div>
                    <div className="w-full">
                        <Link
                            href={`/admin/pendataan/bangunan/${bangunan.id}`}
                            type="button"
                            className="w-full block text-center bg-slate-100 text-slate-700 font-medium text-xs rounded py-2 px-2.5"
                        >
                            Tutup
                        </Link>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

PendataanBangunanEdit.layout = page => <Layout children={page} />;

export default PendataanBangunanEdit;
