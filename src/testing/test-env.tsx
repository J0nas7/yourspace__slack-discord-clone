// External
import { configureStore, PreloadedState } from "@reduxjs/toolkit"

// Internal
import { LayoutController, GuestLayout, PrivateLayout } from "../core-ui"
import { ReduxProviderWrapper } from "./test.reduxWrapper"

export const GuestLayoutMock = ({ children }: any) => {
    return (
        <ReduxProviderWrapper>
                <LayoutController>
                    {children}
                </LayoutController>
        </ReduxProviderWrapper>
    )
}

export const PrivateLayoutMock = ({ children }: any) => {
    return (
        <ReduxProviderWrapper>
            <LayoutController>
                {children}
            </LayoutController>
        </ReduxProviderWrapper>
    )
}

export const guestWrapper = ({ children }: any) => {
    return <GuestLayoutMock>{children}</GuestLayoutMock>;
}

export const privateWrapper = ({ children }: any) => {
    return <PrivateLayoutMock>{children}</PrivateLayoutMock>;
}