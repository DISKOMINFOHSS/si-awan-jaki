import React from "react";

import Layout from "../../../Components/Layout";
import FormTabs from "../../../Components/FormTabs";

import FormPemilikPengelola from "../../../Components/Bangunan/FormPemilikPengelola";
import FormInformasi from "../../../Components/Bangunan/FormInformasi";
import Informasi from "../../../Components/Bangunan/Informasi";
import PemilikPengelola from "../../../Components/Bangunan/PemilikPengelola";


// function Tab({ children }) {
//     return (
//         <>{children}</>
//     );
// }

// function FormTabs({ backLink, onSubmit, children }) {
//     const [activeTab, setActiveTab] = React.useState(0);
//     const handleClick = index => setActiveTab(index);

//     const tabs = children.map((tab, index) => {
//         if (activeTab !== index) return null;

//         return (
//             <React.Fragment key={index}>
//                 <div className="flex justify-between items-center mb-4">
//                     <div className="flex items-center gap-x-2">
//                         <div>
//                             <h3 className="font-medium text-slate-800">{tab.props.heading}</h3>
//                             <h4 className="font-light text-xs text-slate-500">{tab.props.subheading}</h4>
//                         </div>
//                     </div>
//                     <div className="flex gap-x-1.5">
//                         {
//                             children.map((c, i) => {
//                                 if (activeTab > i) {
//                                     return <span key={i} className="w-5 h-1.5 rounded-full bg-green-400"></span>
//                                 } else if (activeTab === i) {
//                                     return <span key={i} className="w-5 h-1.5 rounded-full bg-blue-500"></span>
//                                 } else {
//                                     return <span key={i} className="w-5 h-1.5 rounded-full bg-slate-200"></span>
//                                 }
//                             })
//                         }
//                     </div>
//                 </div>
//                 {tab.props.children}
//                 <div className="flex justify-end items-center gap-x-2.5 my-5">
//                     {
//                         index === 0 ?
//                         <Link
//                             href={backLink}
//                             className="flex justify-center items-center gap-x-1 bg-slate-200 text-slate-700 font-medium text-xs rounded py-2.5 px-5 hover:bg-slate-300"
//                         >
//                             Kembali
//                         </Link>
//                         :
//                         <button
//                             onClick={() => handleClick(index - 1)}
//                             className="flex justify-center items-center gap-x-1 bg-slate-200 text-slate-700 font-medium text-xs rounded py-2.5 px-5"
//                         >
//                             <LiaAngleLeftSolid size={14} />
//                             Kembali
//                         </button>
//                     }
//                     {
//                         index === children.length - 1 ?
//                         <button
//                             onClick={() => onSubmit()}
//                             className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2.5 px-5 hover:bg-blue-800"
//                         >
//                             Simpan
//                         </button>
//                         :
//                         <button
//                             onClick={() => handleClick(index + 1)}
//                             className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2.5 px-5 hover:bg-blue-800"
//                         >
//                             Lanjut
//                             <LiaAngleRightSolid size={14} className="stroke-2" />
//                         </button>
//                     }
//                 </div>
//             </React.Fragment>
//         );
//     });

//     return (
//         <>{tabs}</>
//     );
// }

// FormTabs.Tab = Tab;

const PendataanBangunanCreate = () => {
    const [informasi, setInformasi] = React.useState({});
    const handleInformasiChange = values => setInformasi({ ...informasi, ...values });

    const [pemilik, setPemilik] = React.useState({});
    const handlePemilikChange = values => setPemilik({ ...pemilik, ...values });

    const [pengelola, setPengelola] = React.useState({});
    const handlePengelolaChange = values => setPengelola({ ...pengelola, ...values });

    function handleSubmit() {
        console.log(informasi, pemilik, pengelola);
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
                    <div className="grid grid-cols-2 gap-x-4 my-4">
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
                    subheading="Silakan cek kembali informasi yang sudah diisi"
                >
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <div className="col-span-2">
                            <Informasi bangunan={informasi} />
                        </div>
                        <PemilikPengelola role="pemilik" data={pemilik} />
                        <PemilikPengelola role="pengelola" data={pengelola} />
                    </div>
                </FormTabs.Tab>
            </FormTabs>
        </>
    );
}

PendataanBangunanCreate.layout = page => <Layout children={page} />;

export default PendataanBangunanCreate;
