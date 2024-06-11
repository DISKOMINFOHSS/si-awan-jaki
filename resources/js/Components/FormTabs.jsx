import React from "react";
import { Link } from "@inertiajs/react";

import {
    LiaAngleLeftSolid,
    LiaAngleRightSolid,
    LiaSpinnerSolid,
} from "react-icons/lia";

function Tab({ children }) {
    return (
        <>{children}</>
    );
}

function FormTabs({ backLink, onSubmit, isProcessing, children }) {
    const [activeTab, setActiveTab] = React.useState(0);
    const handleClick = index => setActiveTab(index);

    const tabs = children.map((tab, index) => {
        if (activeTab !== index) return null;

        return (
            <React.Fragment key={index}>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-x-2">
                        <div>
                            <h3 className="font-medium text-slate-800">{tab.props.heading}</h3>
                            <h4 className="font-light text-xs text-slate-500">{tab.props.subheading}</h4>
                        </div>
                    </div>
                    <div className="flex gap-x-1.5">
                        {
                            children.map((c, i) => {
                                if (activeTab > i) {
                                    return <span key={i} className="w-5 h-1.5 rounded-full bg-green-400"></span>
                                } else if (activeTab === i) {
                                    return <span key={i} className="w-5 h-1.5 rounded-full bg-blue-500"></span>
                                } else {
                                    return <span key={i} className="w-5 h-1.5 rounded-full bg-slate-200"></span>
                                }
                            })
                        }
                    </div>
                </div>
                {tab.props.children}
                <div className="flex justify-end items-center gap-x-2.5 my-5">
                    {
                        index === 0 ?
                        <Link
                            href={backLink}
                            className="flex justify-center items-center gap-x-1 bg-slate-200 text-slate-700 font-medium text-xs rounded py-2.5 px-5 hover:bg-slate-300"
                        >
                            Kembali
                        </Link>
                        :
                        <button
                            onClick={() => handleClick(index - 1)}
                            className="flex justify-center items-center gap-x-1 bg-slate-200 text-slate-700 font-medium text-xs rounded py-2.5 px-5"
                        >
                            <LiaAngleLeftSolid size={14} />
                            Kembali
                        </button>
                    }
                    {
                        index === children.length - 1 ?
                        <button
                            onClick={() => onSubmit()}
                            className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2.5 px-5 hover:bg-blue-800"
                            disabled={isProcessing}
                        >
                            { isProcessing && <LiaSpinnerSolid className="animate-spin" />}
                            Simpan
                        </button>
                        :
                        <button
                            onClick={() => handleClick(index + 1)}
                            className="flex justify-center items-center gap-x-1 bg-blue-600 font-medium text-xs text-white rounded py-2.5 px-5 hover:bg-blue-800"
                        >
                            Lanjut
                            <LiaAngleRightSolid size={14} className="stroke-2" />
                        </button>
                    }
                </div>
            </React.Fragment>
        );
    });

    return (
        <>{tabs}</>
    );
}

FormTabs.Tab = Tab;

export default FormTabs;
