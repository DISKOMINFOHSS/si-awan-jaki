import React from "react";
import classNames from "classnames";

import { LiaTimesSolid } from "react-icons/lia";

function Modal({ isVisible, className, children }) {
    const modalClass = classNames("bg-white p-5 rounded-md", className);

    if (!isVisible) return null;

    return (
        <div className="absolute">
            <div className="fixed inset-0 z-10 bg-slate-500 bg-opacity-50 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex justify-center min-h-screen">
                    <div className={modalClass}>{children}</div>
                </div>
            </div>
        </div>
    );
}

function Header({ children, onClose }) {
    if (!onClose) {
        return <>{children}</>;
    }

    return (
        <div className="relative mt-2">
            <div className="absolute -top-4 -right-2">
                <button className="p-2 rounded text-slate-600 focus:ring focus:ring-slate-100" onClick={onClose}>
                    <LiaTimesSolid/>
                </button>
            </div>
            {children}
        </div>
    );
}

function Body({ children }) {
    return (<>{children}</>);
}

Modal.Header = Header;
Modal.Body = Body;

export default Modal;
