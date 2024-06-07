import React from "react";
import Card from "../Card";

export default ({ role, data, onChange }) => {
    const [values, setValues] = React.useState({
        nama: data.nama ? data.nama : '',
        nip: data.nip ? data.nip : '',
        jabatan: data.jabatan ? data.jabatan : '',
        sk: data.sk ? data.sk : '',
        instansi: data.instansi ? data.instansi : '',
        alamat: data.alamat ? data.alamat : '',
    });

    function handleInputChange(e) {
        setValues({
            ...values,
            [e.target.name.split('-')[0]]: e.target.value,
        });
        onChange({
            ...values,
            [e.target.name.split('-')[0]]: e.target.value,
        });

    }

    return (
        <Card className="w-full">
            <Card.Body className="p-4">
                <form className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                        <label htmlFor={`nama-${role}`} className="block mb-2 text-xs font-medium text-slate-800 capitalize">Nama {role} Bangunan <span className="text-red-400">*</span></label>
                        <input
                            type="text" name={`nama-${role}`} id={`nama-${role}`} placeholder="cth. John Doe"
                            value={values.nama} onChange={e => handleInputChange(e)}
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>
                    <div className="col-span-3">
                        <label htmlFor={`nip-${role}`} className="block mb-2 text-xs font-medium text-slate-800">NIP <span className="font-light text-[11px] text-slate-500">diisi untuk ASN</span></label>
                        <input
                            type="text" name={`nip-${role}`} id={`nip-${role}`} placeholder="cth. 19990101 202001 1 001"
                            value={values.nip} onChange={e => handleInputChange(e)}
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>
                    <div className="col-span-3">
                        <label htmlFor={`jabatan-${role}`} className="block mb-2 text-xs font-medium text-slate-800">Jabatan</label>
                        <input
                            type="text" name={`jabatan-${role}`} id={`jabatan-${role}`} placeholder="cth. Pengelola Sarana dan Prasarana Kantor"
                            value={values.jabatan} onChange={e => handleInputChange(e)}
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>
                    <div className="col-span-6 space-y-2.5">
                        <label htmlFor={`sk-${role}`} className="space-y-0.5 text-xs">
                            <div className="font-medium text-slate-800">Dasar Pengangkatan SK Lembaga</div>
                            <div className="font-light text-[11px] text-slate-500">Isi dengan Nomor dan Judul SK</div>
                        </label>
                        <textarea
                            name={`sk-${role}`} id={`sk-${role}`} rows="2" placeholder="cth. Keputusan Kepala Dinas Nomor 23 Tahun 2023 tentang"
                            value={values.sk} onChange={e => handleInputChange(e)}
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>
                    <div className="col-span-4">
                        <label htmlFor={`instansi-${role}`} className="block mb-2 text-xs font-medium text-slate-800">Instansi</label>
                        <input
                            type="text" name={`instansi-${role}`} id={`instansi-${role}`} placeholder="cth. Dinas Pekerjaan Umum dan Tata Ruang"
                            value={values.instansi} onChange={e => handleInputChange(e)}
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>
                    <div className="col-span-6">
                        <label htmlFor={`alamat-${role}`} className="block mb-2 text-xs font-medium text-slate-800">Alamat Kantor</label>
                        <textarea
                            name={`alamat-${role}`} id={`alamat-${role}`} rows="2" placeholder="cth. Jalan Aluh Idut No 66 A Kandangan"
                            value={values.alamat} onChange={e => handleInputChange(e)}
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                        />
                    </div>
                </form>
            </Card.Body>
        </Card>
    )
}
