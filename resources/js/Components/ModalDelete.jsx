import React from "react";
import Modal from "./Modal";
import { LiaSpinnerSolid, LiaTrashAltSolid } from "react-icons/lia";
import { router } from "@inertiajs/react";
import ModalError from "./ModalError";

export default ({
    children,
    isVisible,
    onClose,
    url,
    id
}) => {
    const [isModalErrorOpen, setIsModalErrorOpen] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);

    function handleDeleteButtonClick(e) {
        e.preventDefault();
        console.log(`${url}/${id}`);
        router.delete(`${url}/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setProcessing(false);
                onClose();
            },
            onError: (errors) => {
                console.log(errors);
                setProcessing(false);
                onClose();
                setIsModalErrorOpen(true);
            },
        });
    }

    return (
        <>
            <Modal isVisible={isVisible} className="w-full max-w-md h-fit my-auto">
                <Modal.Header
                    onClose={onClose}
                >
                    <div className="rounded bg-red-100 text-red-500 w-fit mx-auto p-2">
                        <LiaTrashAltSolid size={24} />
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center my-2.5">
                        {children}
                    </div>
                    <div className="grid grid-cols-2 gap-x-2.5">
                        <button
                            type="button"
                            className="bg-slate-200 text-slate-700 font-medium text-xs rounded py-2 px-2.5"
                            onClick={onClose}
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            className="w-full flex justify-center items-center gap-x-1 bg-red-600 font-medium text-xs text-white rounded py-2 px-2.5"
                            disabled={processing}
                            onClick={handleDeleteButtonClick}
                        >
                            { processing && <LiaSpinnerSolid className="animate-spin" />}
                            Hapus
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
            <ModalError
                isVisible={isModalErrorOpen}
                onClose={() => setIsModalErrorOpen(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Gagal menghapus data :(
                </div>
            </ModalError>
        </>
    )
}
