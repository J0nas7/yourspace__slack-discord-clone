// External
import { configureStore, PreloadedState } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

// Internal
/*import pageReducer from './reducers/pageSlice'
import ordersReducer from './reducers/ordersSlice'*/
import authReducer from './reducers/authSlice'

const rootReducer = combineReducers({
    /*page: pageReducer,
    orders: ordersReducer,*/
    auth: authReducer
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