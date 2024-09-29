import React from "react";

export default ({ isVisible, daftarUsaha, onSelect, jenisUsaha = "Badan Usaha Jasa Konstruksi" }) => {
    if (!isVisible) return null;

    const [keyword, setKeyword] = React.useState('');
    const handleKeywordChange = (event) => setKeyword(event.target.value);

    const filteredDaftarUsaha = keyword ? daftarUsaha.filter(({ nama }) => {
        return nama.toLowerCase().includes(keyword.toLowerCase());
    }) : daftarUsaha;

    return (
        <div className= "absolute flex z-20 bg-white mt-1.5 py-2 rounded shadow-xl min-w-full max-h-52 overflow-y-auto flex-col space-y-0.5 text-xs text-slate-700">
            <div className="px-4 py-2 border-b border-slate-100">
                <input
                    type="text" id="keyword" name="keyword" value={keyword} onChange={handleKeywordChange} placeholder="Cari Usaha"
                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                />
            </div>
            {
                filteredDaftarUsaha.map((usaha) => (
                    <div
                        key={usaha.id}
                        className="px-4 py-2 border-b border-slate-100 space-y-0.5 group hover:bg-slate-100 hover:text-blue-600"
                        onClick={() => onSelect(usaha)}
                    >
                        <div>{usaha.nama}</div>
                        <div className="grid grid-cols-3 items-center gap-x-4 text-[11px] font-light text-slate-600 group-hover:text-blue-600">
                            <div>
                                <span className="">NIB : </span>
                                <span className="group-hover:text-blue-600 text-slate-500">{usaha.nib}</span>
                            </div>
                            {
                                jenisUsaha !== "Usaha Orang Perseorangan" &&
                                <div>
                                    <span className="">PJBU : </span>
                                    <span className="group-hover:text-blue-600 text-slate-500">{usaha.pjbu}</span>
                                </div>
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
