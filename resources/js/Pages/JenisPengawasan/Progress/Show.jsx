import React from "react";
import { usePage } from "@inertiajs/react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";
import Dropdown from "../../../Components/Dropdown";
import Card from "../../../Components/Card";
import Tabs from "../../../Components/Tabs";
import DaftarRealisasiFisik from "../../../Components/Proyek/Progress/DaftarRealisasiFisik";

import { formatDateToIndonesia } from "../../../Utils/formatDate";
import formatCurrencyToIDR from "../../../Utils/formatCurrencyToIDR";
import useToggleWithClickOutside from "../../../Hooks/useToggleWithClickOutside";

import {
    LiaEllipsisVSolid,
    LiaHomeSolid,
    LiaInfoCircleSolid,
} from "react-icons/lia";
import DaftarRealisasiKeuangan from "../../../Components/Proyek/Progress/DaftarRealisasiKeuangan";
import { getPaketPekerjaan } from "../../../Utils/apiEmonev";

const JenisPengawasanProgressShow = ({ data }) => {
    console.log(data);
    const { url } = usePage();
    const tahun = url.split('/')[4];

    const { pengawasan } = data;
    const { proyekKonstruksi, realisasiFisik, realisasiKeuangan } = pengawasan;

    const [
        moreDropdownRef,
        isMoreDropdownOpened,
        toggleMoreDropdown
    ] = useToggleWithClickOutside(false);

    const mapRef = React.useRef(null);
    const [ koordinat, setKoordinat ] = React.useState(null);

    const [ nomenklaturPerencanaan, setNomenklaturPerencanaan ] = React.useState({});
    const [ realisasiEmonev, setRealisasiEmonev ] = React.useState({});

    React.useEffect(() => {
        if (proyekKonstruksi.emonevId) {
            getPaketPekerjaan(proyekKonstruksi.emonevId).then(({ data }) => {
                console.log(data);
                const {
                    latitude, longitude,
                    urusan, bid, prog, keg, sub,
                    realisasi,
                } = data[0];

                setKoordinat([ latitude, longitude ]);
                setNomenklaturPerencanaan({
                    urusan: urusan.nama,
                    bidang: bid.nama,
                    program: prog.nama,
                    kegiatan: keg.nama,
                    subkegiatan: sub.nama,
                });
                setRealisasiEmonev(realisasi);
            });
        }
    }, []);

    const tabList = [
        { label: 'Realisasi Fisik' },
        { label: 'Realisasi Keuangan' },
    ];

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/jenis-pengawasan/progress`}>Daftar Pengawasan Progress</Breadcrumb.Item>
                <Breadcrumb.Item active>Detail Pengawasan</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center gap-x-5 mb-2">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Pengawasan Progress Proyek Konstruksi</h3>
                    <h1 className="text-slate-800 leading-tight text-justify">{proyekKonstruksi.namaPaket}</h1>
                </div>
                <div className="flex items-center gap-x-2.5">
                    <Dropdown ref={moreDropdownRef}>
                        <Dropdown.Toggle
                            onClick={toggleMoreDropdown}
                            className="w-fit min-h-10 flex justify-center items-center space-x-1 text-slate-500 border border-slate-200 rounded text-xs tracking-wide px-2 py-1"
                        >
                            <LiaEllipsisVSolid size={16} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                            isVisible={isMoreDropdownOpened}
                            className="min-w-full flex flex-col right-0 py-2 space-y-0.5 text-xs text-slate-700"
                        >
                            <a
                                href={`/admin/pendataan/proyek-konstruksi/${proyekKonstruksi.id}`}
                                target="_blank"
                                className="flex items-center gap-x-3 px-4 py-2 text-left hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap"
                            >
                                <LiaInfoCircleSolid size={16} />
                                <span>Informasi Proyek</span>
                            </a>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4 my-4">
                <div className="col-span-2 space-y-4">
                    <Card className="h-ft">
                        <Card.Body className="p-4 text-xs">
                            {
                                koordinat ? (
                                    <MapContainer center={koordinat} zoom={13} scrollWheelZoom={false} ref={mapRef}
                                        style={{height: "16rem", width: "100%", zIndex: "0"}}
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={koordinat}></Marker>
                                    </MapContainer>
                                ) : (
                                    <div className="h-64 w-full bg-slate-200 rounded animate-pulse"></div>
                                )
                            }
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body className="p-4 text-xs">
                            <div className="grid grid-cols-2 gap-x-4 ">
                                <div>
                                    <div className="font-medium">Latitude</div>
                                    <div className="font-light text-slate-500">
                                        {
                                            koordinat ? koordinat[0] :
                                            (<div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-8 bg-slate-100 rounded"></div></div>)
                                        }
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium">Longitude</div>
                                    <div className="font-light text-slate-500">
                                    {
                                            koordinat ? koordinat[1] :
                                            (<div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-8 bg-slate-100 rounded"></div></div>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-span-3 space-y-4">
                    <Card className="h-fit w-full">
                        <Card.Body className="p-4 text-xs">
                            <div className="pb-3 border-b border-slate-200">
                                <div className="font-medium">Nama Paket Pekerjaan</div>
                                <div className="font-light text-slate-500">{proyekKonstruksi.namaPaket}</div>
                            </div>
                            <div className="grid grid-cols-3 gap-x-4 py-3 border-b border-slate-200">
                                <div>
                                    <div className="font-medium">Nomor Kontrak</div>
                                    <div className="font-light text-slate-500">{proyekKonstruksi.nomorKontrak}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Tanggal Kontrak</div>
                                    <div className="font-light text-slate-500">
                                        {proyekKonstruksi.tanggalKontrak ? formatDateToIndonesia(proyekKonstruksi.tanggalKontrak) : '-'}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-x-4 py-3 border-b border-slate-200">
                                <div>
                                    <div className="font-medium">Sumber Dana</div>
                                    <div className="font-light text-slate-500">{proyekKonstruksi.sumberDana}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Nilai Kontrak</div>
                                    <div className="font-light text-slate-500">{formatCurrencyToIDR(proyekKonstruksi.nilaiKontrak)}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Nilai Pagu</div>
                                    <div className="font-light text-slate-500">{formatCurrencyToIDR(proyekKonstruksi.nilaiPagu)}</div>
                                </div>
                            </div>
                            <div className="pt-3">
                                <div className="font-medium">Waktu Pelaksanaan</div>
                                <div className="font-light text-slate-500">
                                    {formatDateToIndonesia(proyekKonstruksi.tanggalMulaiPelaksanaan)} s.d {formatDateToIndonesia(proyekKonstruksi.tanggalSelesaiPelaksanaan)}
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="h-fit w-full">
                        <Card.Body className="p-4 text-xs">
                            <div className="grid grid-cols-3 gap-x-4 pb-3 border-b border-slate-200">
                                <div>
                                    <div className="font-medium">Penyedia Jasa</div>
                                    <div className="font-light text-slate-500">{proyekKonstruksi.penyediaJasa ? proyekKonstruksi.penyediaJasa.nama : '-'}</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="font-medium">Alamat</div>
                                    <div className="font-light text-slate-500">{proyekKonstruksi.penyediaJasa ? proyekKonstruksi.penyediaJasa.alamat : '-'}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-x-4 py-3 border-b border-slate-200">
                                <div>
                                    <div className="font-medium">Pengguna Jasa</div>
                                    <div className="font-light text-slate-500">{proyekKonstruksi.penggunaJasa ? proyekKonstruksi.penggunaJasa.nama : '-'}</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="font-medium">Instansi</div>
                                    <div className="font-light text-slate-500">{proyekKonstruksi.penggunaJasa ? proyekKonstruksi.penggunaJasa.instansi : '-'}</div>
                                </div>
                            </div>
                            <div className="pt-3">
                                <div className="font-medium">Konsultan Pengawas</div>
                                <div className="font-light text-slate-500">{proyekKonstruksi.konsultanPengawas ? proyekKonstruksi.konsultanPengawas.nama : '-'}</div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="h-fit w-full">
                        <Card.Body className="p-4 text-xs">
                            <div className="grid grid-cols-2 gap-x-4 pb-3 border-b border-slate-200">
                                <div>
                                    <div className="font-medium">Urusan</div>
                                    <div className="font-light text-slate-500 uppercase">
                                    {
                                        nomenklaturPerencanaan ? nomenklaturPerencanaan.urusan :
                                        (<div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>)
                                    }
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium">Bidang Urusan</div>
                                    <div className="font-light text-slate-500 uppercase">
                                    {
                                        nomenklaturPerencanaan ? nomenklaturPerencanaan.bidang :
                                        (<div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>)
                                    }
                                    </div>
                                </div>
                            </div>
                            <div className="py-3 border-b border-slate-200">
                                <div className="font-medium">Program</div>
                                <div className="font-light text-slate-500 uppercase">
                                    {
                                        nomenklaturPerencanaan ? nomenklaturPerencanaan.program :
                                        (<div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>)
                                    }
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 pt-3">
                                <div>
                                    <div className="font-medium">Kegiatan</div>
                                    <div className="font-light text-slate-500 uppercase">
                                    {
                                        nomenklaturPerencanaan ? nomenklaturPerencanaan.kegiatan :
                                        (<div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>)
                                    }
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium">Sub Kegiatan</div>
                                    <div className="font-light text-slate-500 uppercase">
                                    {
                                        nomenklaturPerencanaan ? nomenklaturPerencanaan.subkegiatan :
                                        (<div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>)
                                    }
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <Tabs tabList={tabList}>
                <Tabs.Tab>
                    <Card>
                        <Card.Header className="p-4 space-y-4">
                            <div className="text-center">
                                <h3 className="font-medium text-sm text-slate-700">Realisasi Fisik</h3>
                                <h4 className="font-light text-xs text-slate-500">Sumber Data dari E-MONEV Kab. Hulu Sungai Selatan</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase">
                                        <tr className="border-b border-slate-200">
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Jan</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Feb</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Mar</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Apr</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Mei</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Jun</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Jul</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Agu</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Sep</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Okt</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Nov</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Des</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-700">
                                        <tr>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_fisik_januari ? `${parseFloat(realisasiEmonev.realisasi_fisik_januari).toFixed(2)} %` : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_fisik_februari ? `${parseFloat(realisasiEmonev.realisasi_fisik_februari).toFixed(2)} %` : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_fisik_maret ? `${parseFloat(realisasiEmonev.realisasi_fisik_maret).toFixed(2)} %` : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_fisik_april ? `${parseFloat(realisasiEmonev.realisasi_fisik_april).toFixed(2)} %` : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_fisik_mei ? `${parseFloat(realisasiEmonev.realisasi_fisik_mei).toFixed(2)} %` : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_fisik_juni ? `${parseFloat(realisasiEmonev.realisasi_fisik_juni).toFixed(2)} %` : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_fisik_juli ? `${parseFloat(realisasiEmonev.realisasi_fisik_juli).toFixed(2)} %` : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_fisik_agustus ? `${parseFloat(realisasiEmonev.realisasi_fisik_agustus).toFixed(2)} %` : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_fisik_september ? `${parseFloat(realisasiEmonev.realisasi_fisik_september).toFixed(2)} %` : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_fisik_oktober ? `${parseFloat(realisasiEmonev.realisasi_fisik_oktober).toFixed(2)} %` : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_fisik_november ? `${parseFloat(realisasiEmonev.realisasi_fisik_november).toFixed(2)} %` : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_fisik_desember ? `${parseFloat(realisasiEmonev.realisasi_fisik_desember).toFixed(2)} %` : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                    <DaftarRealisasiFisik
                        realisasiFisik={realisasiFisik}
                        tahun={tahun}
                        pengawasanId={pengawasan.id}
                    />
                </Tabs.Tab>
                <Tabs.Tab>
                    <Card>
                        <Card.Header className="p-4 space-y-4">
                            <div className="text-center">
                                <h3 className="font-medium text-sm text-slate-700">Realisasi Keuangan</h3>
                                <h4 className="font-light text-xs text-slate-500">Sumber Data dari E-MONEV Kab. Hulu Sungai Selatan</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase">
                                        <tr className="border-b border-slate-200">
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Jan</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Feb</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Mar</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Apr</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Mei</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Jun</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Jul</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Agu</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Sep</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Okt</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Nov</th>
                                            <th scope="col" className="p-4 font-medium border-r border-slate-200">Des</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-700">
                                        <tr>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_januari ? formatCurrencyToIDR(realisasiEmonev.realisasi_januari) : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_februari ? formatCurrencyToIDR(realisasiEmonev.realisasi_februari) : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_maret ? formatCurrencyToIDR(realisasiEmonev.realisasi_maret) : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_april ? formatCurrencyToIDR(realisasiEmonev.realisasi_april) : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_mei ? formatCurrencyToIDR(realisasiEmonev.realisasi_mei) : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_juni ? formatCurrencyToIDR(realisasiEmonev.realisasi_juni) : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_juli ? formatCurrencyToIDR(realisasiEmonev.realisasi_juli) : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_agustus ? formatCurrencyToIDR(realisasiEmonev.realisasi_agustus) : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_september ? formatCurrencyToIDR(realisasiEmonev.realisasi_september) : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_oktober ? formatCurrencyToIDR(realisasiEmonev.realisasi_oktober) : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_november ? formatCurrencyToIDR(realisasiEmonev.realisasi_november) : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                {
                                                    realisasiEmonev ?
                                                    (
                                                        realisasiEmonev.realisasi_desember ? formatCurrencyToIDR(realisasiEmonev.realisasi_desember) : '-'
                                                    ) : (
                                                        <div className="animate-pulse h-5 flex items-center"><div className="h-1.5 w-full bg-slate-100 rounded"></div></div>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                    <DaftarRealisasiKeuangan
                        realisasiKeuangan={realisasiKeuangan}
                        tahun={tahun}
                        pengawasanId={pengawasan.id}
                        nilaiKontrak={proyekKonstruksi.nilaiKontrak}
                    />
                </Tabs.Tab>
            </Tabs>
        </>
    );
}

JenisPengawasanProgressShow.layout = page => <Layout children={page} />;

export default JenisPengawasanProgressShow;

