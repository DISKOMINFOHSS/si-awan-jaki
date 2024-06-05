import React from "react";
import Modal from "./Modal";

import { LiaExclamationCircleSolid } from "react-icons/lia";

export default ({ children, isVisible, onClose }) => {
    return (
        <Modal isVisible={isVisible} className="w-full h-fit my-auto max-w-xs">
            <Modal.Header
                onClose={onClose}
            >
                <div className="rounded bg-red-100 text-red-500 w-fit mx-auto p-2">
                    <LiaExclamationCircleSolid size={24} />
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center my-2.5">
                    {children}
                </div>
                <div className="w-full">
                    <button
                        type="button"
                        className="w-full bg-slate-100 text-slate-700 font-medium text-xs rounded py-2 px-2.5"
                        onClick={onClose}
                    >
                        Mengerti
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};
