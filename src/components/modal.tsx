// Modal as a separate component
import { ReactEventHandler, useEffect, useRef } from "react";

export const Modal = ({
    openModal, closeModal, className, children
} : {
    openModal: boolean,
    closeModal: ReactEventHandler,
    className: string,
    children: any
}) => {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        console.log("modal", openModal)
        if (openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal]);

    return (
        <dialog
            ref={ref}
            onCancel={closeModal}
            className={className}
        >
            {children}
            <button onClick={closeModal}>
                Close
            </button>
        </dialog>
    );
}