// External
import { ReactEventHandler, useEffect, useRef } from "react";
import { Button } from "@mui/material";

// Internal
import { Block, Heading, Text } from "./";

export const Modal = ({
    openModal, closeModal, title, className, children
}: {
    openModal: boolean,
    closeModal: ReactEventHandler,
    title: string,
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
            className={"dialog-box " + className}
        >
            <Block className="dialog-inner">
                <Block className="dialog-top">
                    <Heading title="Edit the message" variant="h2" className="dialog-title" />
                    <Button className="button dialog-close-button" onClick={closeModal} disabled={false}>
                        <Text variant="span" className="button button-text">X</Text>
                    </Button>
                </Block>
                {children}
            </Block>
        </dialog>
    );
}