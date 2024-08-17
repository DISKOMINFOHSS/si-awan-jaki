import React from "react";

export default ({ isVisible, onSelect, daftarProyekKonstruksi }) => {
    if (!isVisible) return null;

    const [keyword, setKeyword] = React.useState('');
    const handleKeywordChange = (event) => setKeyword(event.target.value);

    const filteredDaftarProyekKonstruksi = keyword ? daftarProyekKonstruksi.filter(({ namaPaket, penyediaJasa }) => {
        return namaPaket.toLowerCase().includes(keyword.toLowerCase()) || penyediaJasa.toLowerCase().includes(keyword.toLowerCase());
    }) : daftarProyekKonstruksi;

    return (
        <div className= "absolute flex z-20 bg-white mt-1.5 py-2 rounded shadow-xl min-w-full max-h-40 overflow-y-auto flex-col space-y-0.5 text-xs text-slate-700">
            <div className="px-4 py-2 border-b border-slate-100">
                <input
                    type="text" value={keyword} onChange={handleKeywordChange} placeholder="Cari Proyek Konstruksi"
                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                />
            </div>
            {
                filteredDaftarProyekKonstruksi.map((proyekKonstruksi) => (
                    <div
                        key={proyekKonstruksi.id}
                        className="px-5 py-2 border-b border-slate-100 space-y-1 group hover:bg-slate-100 hover:text-blue-600"
                        onClick={() => onSelect(proyekKonstruksi)}
                    >
                        <div>
                            <span>{proyekKonstruksi.namaPaket} </span>
                            <span className="font-light text-slate-500 group-hover:text-blue-600"> - TA. {proyekKonstruksi.tahunAnggaran}</span>
                        </div>
                        <div className="font-light text-slate-500 group-hover:text-blue-600">Penyedia Jasa : {proyekKonstruksi.penyediaJasa}</div>
                    </div>
                ))
            }
        </div>
    );
}
