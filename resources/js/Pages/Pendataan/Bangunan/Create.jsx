import React from "react";
import { router } from "@inertiajs/react";

import Layout from "../../../Components/Layout";
import FormTabs from "../../../Components/FormTabs";
import ModalError from "../../../Components/ModalError";

import FormPemilikPengelola from "../../../Components/Bangunan/FormPemilikPengelola";
import FormInformasi from "../../../Components/Bangunan/FormInformasi";
import Informasi from "../../../Components/Bangunan/Informasi";
import PemilikPengelola from "../../../Components/Bangunan/PemilikPengelola";

const PendataanBangunanCreate = () => {
    const [informasi, setInformasi] = React.useState({});
    const handleInformasiChange = values => setInformasi({ ...informasi, ...values });

    const [pemilik, setPemilik] = React.useState({});
    const handlePemilikChange = values => setPemilik({ ...pemilik, ...values });

    const [pengelola, setPengelola] = React.useState({});
    const handlePengelolaChange = values => setPengelola({ ...pengelola, ...values });

    const [isModalErrorOpened, setIsModalErrorOpened] = React.useState(false);

    function handleSubmit() {
        router.post('/admin/pendataan/bangunan', {
            bangunan: informasi,
            pemilik: pemilik,
            pengelola: pengelola,
        }, {
            onError: () => setIsModalErrorOpened(true),
        });
    }

    return (
        <>
            <div className="w-full text-center mb-5">
                <h1 className="font-medium text-xl text-slate-800">Tambah Bangunan Konstruksi</h1>
                <h2 className="font-light text-xs text-slate-500">Pendataan Pemanfaatan Produk Jasa Konstruksi di Kab. Hulu Sungai Selatan</h2>
            </div>
            <FormTabs
                backLink="/admin/pendataan/bangunan"
                onSubmit={handleSubmit}
            >
                <FormTabs.Tab
                    heading="Informasi Bangunan"
                    subheading="Silakan lengkapi informasi bangunan konstruksi"
                >
                    <FormInformasi
                        data={informasi}
                        onChange={handleInformasiChange}
                    />
                </FormTabs.Tab>
                <FormTabs.Tab
                    heading="Pemilik dan Pengelola Bangunan"
                    subheading="Silakan lengkapi informasi pemilik dan pengelola bangunan"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                        <FormPemilikPengelola
                            role="pemilik"
                            data={pemilik}
                            onChange={handlePemilikChange}
                        />
                        <FormPemilikPengelola
                            role="pengelola"
                            data={pengelola}
                            onChange={handlePengelolaChange}
                        />
                    </div>
                </FormTabs.Tab>
                <FormTabs.Tab
                    heading="Rangkuman"
                    subheading="Silakan periksa kembali informasi yang sudah diisi"
                >
                    <div className="grid md:grid-cols-2 gap-4 my-4">
                        <div className="md:col-span-2">
                            <Informasi bangunan={informasi} />
                        </div>
                        <PemilikPengelola role="pemilik" data={pemilik} />
                        <PemilikPengelola role="pengelola" data={pengelola} />
                    </div>
                </FormTabs.Tab>
            </FormTabs>
            <ModalError
                isVisible={isModalErrorOpened}
                onClose={() => setIsModalErrorOpened(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal menambahkan bangunan baru. Silakan periksa kembali informasi yang diisi.
                </div>
            </ModalError>
        </>
    );
}

PendataanBangunanCreate.layout = page => <Layout children={page} />;

export default PendataanBangunanCreate;
