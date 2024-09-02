import React from "react";

export default ({
    id, isTrue, onInputChange, label
}) => {
    const [value, setValue] = React.useState(isTrue);

    React.useEffect(() => {
        setValue(isTrue);
    }, [isTrue]);

    function handleInputChange(e) {
        setValue(e.target.value === "true");
        onInputChange({ [e.target.name]: e.target.value === "true" });
    }

    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-x-2">
                <input
                    type="radio" id={`true-${id}`} name={id} value={true}
                    onChange={handleInputChange} checked={value === true}
                    className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={`true-${id}`} className="text-slate-700 capitalize">{label}</label>
            </div>
            <div className="flex items-center gap-x-2">
                <input
                    type="radio" id={`false-${id}`} name={id} value={false}
                    onChange={handleInputChange} checked={value === false}
                    className="w-3.5 h-3.5 text-blue-600 border-slate-200 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={`false-${id}`} className="text-slate-700 capitalize">Belum {label}</label>
            </div>
        </div>
    );
}
