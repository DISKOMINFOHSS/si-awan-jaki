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

const JenisPengawasanProgressShow = ({ data }) => {
    console.log(data);
    const { url } = usePage();
    const tahun = url.split('/')[4];

    const { pengawasan } = data;
    const { proyekKonstruksi, realisasiFisik } = pengawasan;

    const [
        moreDropdownRef,
        isMoreDropdownOpened,
        toggleMoreDropdown
    ] = useToggleWithClickOutside(false);

    const mapRef = React.useRef(null);
    const [ latitude, longitude ] = [ -2.7830879640919464, 115.26951102304774 ];

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
                            <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false} ref={mapRef}
                                style={{height: "16rem", width: "100%", zIndex: "0"}}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[latitude, longitude]}></Marker>
                            </MapContainer>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body className="p-4 text-xs">
                            <div className="grid grid-cols-2 gap-x-4 ">
                                <div>
                                    <div className="font-medium">Latitude</div>
                                    <div className="font-light text-slate-500">{latitude}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Longitude</div>
                                    <div className="font-light text-slate-500">{longitude}</div>
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
                                    <div className="font-light text-slate-500">{proyekKonstruksi.penyediaJasa.nama}</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="font-medium">Alamat</div>
                                    <div className="font-light text-slate-500">{proyekKonstruksi.penyediaJasa.alamat}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-x-4 py-3 border-b border-slate-200">
                                <div>
                                    <div className="font-medium">Pengguna Jasa</div>
                                    <div className="font-light text-slate-500">{proyekKonstruksi.penggunaJasa.nama}</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="font-medium">Instansi</div>
                                    <div className="font-light text-slate-500">{proyekKonstruksi.penggunaJasa.instansi}</div>
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
                            <div className="pb-3 border-b border-slate-200">
                                <div className="font-medium">Program</div>
                                <div className="font-light text-slate-500 uppercase">Program Penunjang Urusan Pemerintahan Daerah Kabupaten/Kota</div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 pt-3">
                                <div>
                                    <div className="font-medium">Kegiatan</div>
                                    <div className="font-light text-slate-500 uppercase">perencanaan penganggaran dan evaluasi kinerja perangkat daerah</div>
                                </div>
                                <div>
                                    <div className="font-medium">Sub Kegiatan</div>
                                    <div className="font-light text-slate-500 uppercase">penyusunan dokumen perencanaan perangkat daerah</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <Tabs tabList={tabList}>
                <Tabs.Tab>
                    <DaftarRealisasiFisik
                        realisasiFisik={realisasiFisik}
                        tahun={tahun}
                        pengawasanId={pengawasan.id}
                    />
                </Tabs.Tab>
                <Tabs.Tab>Daftar Realisasi Keuangan</Tabs.Tab>
            </Tabs>
        </>
    );
}

JenisPengawasanProgressShow.layout = page => <Layout children={page} />;

export default JenisPengawasanProgressShow;

