// External
import { ReactEventHandler, useEffect, useRef } from "react";
import { Button } from "@mui/material";

// Internal
import { Block, Heading, Text } from "./";

export const Modal = ({
    openModal, closeModal, title, className, children
} : {
    openModal: boolean,
    closeModal: ReactEventHandler,
    title: string,
    className: string,
    children: React.ReactNode
}) => {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
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
            className={"dialog-box " + className}
        >
            <Block className="dialog-inner">
                <Block className="dialog-top">
                    <Heading title={title} variant="h2" className="dialog-title" />
                    <Button className="button dialog-close-button" onClick={closeModal} disabled={false}>
                        <Text variant="span" className="button button-text">X</Text>
                    </Button>
                </Block>
                {children}
            </Block>
        </dialog>
    );
}