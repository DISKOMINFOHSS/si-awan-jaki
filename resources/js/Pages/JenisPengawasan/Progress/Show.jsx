import React from "react";
import 'leaflet/dist/leaflet.css';

import Layout from "../../../Components/Layout";
import Breadcrumb from "../../../Components/Breadcrumb";
import Card from "../../../Components/Card";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { formatDateToIndonesia } from "../../../Utils/formatDate";
import formatCurrencyToIDR from "../../../Utils/formatCurrencyToIDR";

import { LiaHomeSolid } from "react-icons/lia";

const JenisPengawasanProgressShow = ({ data }) => {
    console.log(data);
    const { pengawasan } = data;
    const { proyekKonstruksi } = pengawasan;

    const mapRef = React.useRef(null);
    const [ latitude, longitude ] = [ -2.7830879640919464, 115.26951102304774 ];

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/dashboard"><LiaHomeSolid size={14} /></Breadcrumb.Item>
                <Breadcrumb.Item href={`/admin/jenis-pengawasan/progress`}>Daftar Pengawasan Progress</Breadcrumb.Item>
                <Breadcrumb.Item active>Detail Pengawasan</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h3 className="font-light text-xs text-slate-500">Pengawasan Progress Proyek Konstruksi</h3>
                    <h1 className="text-slate-800 leading-tight">{proyekKonstruksi.namaPaket}</h1>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-2 space-y-4">
                    <Card className="h-ft">
                        <Card.Body className="p-4 text-xs">
                            <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false} ref={mapRef}
                                style={{height: "16rem", width: "100%"}}
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
                                    <div className="font-light text-slate-500 uppercase">{proyekKonstruksi.nomorKontrak}</div>
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
                </div>
            </div>
        </>
    );
}

JenisPengawasanProgressShow.layout = page => <Layout children={page} />;

export default JenisPengawasanProgressShow;

