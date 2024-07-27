import React from "react";

export default ({ isVisible, daftarBangunan, onSelect }) => {
    if (!isVisible) return null;

    const [keyword, setKeyword] = React.useState('');
    const handleKeywordChange = (event) => setKeyword(event.target.value);

    const filteredDaftarBangunan = keyword ? daftarBangunan.filter(({ nama }) => {
        return nama.toLowerCase().includes(keyword.toLowerCase());
    }) : daftarBangunan;

    return (
        <div className= "absolute flex z-20 bg-white mt-1.5 py-2 rounded shadow-xl min-w-full max-h-52 overflow-y-auto flex-col space-y-0.5 text-xs text-slate-700">
            <div className="px-4 py-2 border-b border-slate-100">
                <input
                    type="text" value={keyword} onChange={handleKeywordChange} placeholder="Cari Bangunan"
                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                />
            </div>
            {
                filteredDaftarBangunan.map(({
                    id,
                    nama,
                    desaKelurahan,
                    kecamatan,
                    pemilikBangunan,
                    pengelolaBangunan
                }) => (
                    <div
                        key={id}
                        className="grid grid-cols-2 gap-x-2.5 px-4 py-2 border-b border-slate-100 group hover:bg-slate-100 hover:text-blue-600"
                        onClick={() => onSelect({ id, nama, pemilikBangunan, pengelolaBangunan })}
                    >
                        <div>
                            <div>{nama}</div>
                            <div className="text-[11px] font-light text-slate-500 capitalize group-hover:text-blue-600">
                                {desaKelurahan && `${desaKelurahan.toLowerCase()}, ` } {kecamatan.toLowerCase()}
                            </div>
                        </div>
                        <div className="text-[11px]">
                            <div>
                                <div className="font-light text-slate-500">Pemilik Bangunan</div>
                                <div className="text-slate-700 line-clamp-1">{pemilikBangunan}</div>
                            </div>
                            <div>
                                <div className="font-light text-slate-500">Pengelola Bangunan</div>
                                <div className="text-slate-700 line-clamp-1">{pengelolaBangunan}</div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
