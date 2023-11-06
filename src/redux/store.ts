// External
import { configureStore, PreloadedState } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

// Internal
import authReducer from './reducers/authSlice'
import spaceReducer from './reducers/spaceSlice'
import channelReducer from './reducers/channelSlice'
import messageReducer from './reducers/messageSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    space: spaceReducer,
    channel: channelReducer,
    message: messageReducer
})

export const appReducer = (state:any, action:any) => {
    if (action.type === 'RESET_APP') {
      console.log("R E S E T")
      state = undefined
    }
    return rootReducer(state, action)
}

const appStore = (preloadedState?: PreloadedState<RootState>) =>
    configureStore({
        reducer: appReducer,
        preloadedState,
    })

export default appStore

export type RootState = ReturnType<typeof appReducer>
export type AppStore = ReturnType<typeof appStore>
export type AppDispatch = AppStore["dispatch"]