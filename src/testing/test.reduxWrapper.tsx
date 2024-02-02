// External
import { configureStore, PreloadedState } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

// Internal
import appStore, { appReducer, RootState } from "../redux/store"
import authReducer from '../redux/reducers/authSlice'
import spaceReducer from '../redux/reducers/spaceSlice'
import channelReducer from '../redux/reducers/channelSlice'
import messageReducer from '../redux/reducers/messageSlice'

const wpInfo = {
    blogname: "Gogo",
    blogdescription: "Description"
}

const preload : PreloadedState<RootState> = {
    auth: undefined,
    space: undefined,
    channel: undefined,
    message: undefined
}

export const createTestStore = (preloadedState?: PreloadedState<RootState>) => {
    const store = configureStore({
        reducer: appReducer,
        preloadedState,
    })
    return store
}
const store = createTestStore(preload)

export const ReduxProviderWrapper = ({ children } : any) => {
    return (
        <Provider store={store}>
            { children }
        </Provider>
    )
}