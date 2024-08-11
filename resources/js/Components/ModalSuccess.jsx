import React from "react";
import Modal from "./Modal";
import { LiaCheckCircle } from "react-icons/lia";

export default ({ children, isVisible, onClose }) => {
    return (
        <Modal isVisible={isVisible} className="w-full h-fit my-auto max-w-xs">
            <Modal.Header onClose={onClose}>
                <div className="rounded bg-green-100 text-green-500 w-fit mx-auto p-2">
                    <LiaCheckCircle size={24} />
                </div>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}
