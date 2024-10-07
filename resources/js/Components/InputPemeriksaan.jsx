import React from "react";

export default ({ id, label, kesimpulan, catatan, onInputChange }) => {
    const [value, setValue] = React.useState({
        label: label,
        kesimpulan: kesimpulan === true || kesimpulan === false ? kesimpulan : '',
        catatan: catatan ? catatan : '',
    });

    function handleInputChange(e) {
        let val = e.target.value;

        if (val === "true" || val === "false") {
            val = val === "true";
        }

        setValue({
            ...value,
            [e.target.name.split('-')[0]]: val,
        });
        onInputChange({
            ...value,
            [e.target.name.split('-')[0]]: val,
        });
    }

    return (
        <>
            <div className="space-y-2 text-xs">
                <div>
                    <div className="font-medium text-slate-800">Kesimpulan Pemeriksaan</div>
                </div>
                <div className="space-y-2.5">
                    <div className="flex items-center gap-x-2">
                        <input
                            type="radio" id={`true-${id}`} name={`kesimpulan-${id}`} value={true}
                            onChange={handleInputChange} checked={value.kesimpulan === true}
                            className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor={`true-${id}`} className="text-slate-700">{label}</label>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <input
                            type="radio" id={`false-${id}`} name={`kesimpulan-${id}`} value={false}
                            onChange={handleInputChange} checked={value.kesimpulan === false}
                            className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor={`false-${id}`} className="text-slate-700">Tidak {label}</label>
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor={`catatan-${id}`} className="block mb-2 text-xs font-medium text-slate-800">Catatan Pemeriksaan</label>
                <textarea
                    name={`catatan-${id}`} id={`catatan-${id}`} rows="2"
                    value={value.catatan} onChange={handleInputChange}
                    className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                />
            </div>
        </>
    );
}
