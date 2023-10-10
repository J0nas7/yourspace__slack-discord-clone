// External
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Internal
import { RootState } from '../store'

export interface AuthState {
    isLoggedIn: boolean
    adminLoggedIn: string,
    loginErrorType: string,
    createErrorType: string,
    loginResponse: Object
}

const initialState = {
    isLoggedIn: false,
    adminLoggedIn: '',
    loginErrorType: '',
    createErrorType: '',
    loginResponse: {}
} as AuthState

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedIn: (state:AuthState, action:PayloadAction<any>) => {
            state.isLoggedIn = action.payload.data
        },
        setLoggedOut: (state:AuthState, action:PayloadAction<any>) => {
            state.isLoggedIn = !action.payload.data
        },
        setLoginErrorType: (state:AuthState, action:PayloadAction<any>) => {
            state.loginErrorType = action.payload.data
        },
        setLoginResponse: (state:AuthState, action:PayloadAction<any>) => {
            state.loginResponse = action.payload.data
        },
        setCreateErrorType: (state:AuthState, action:PayloadAction<any>) => {
            state.createErrorType = action.payload.data
        },
    },
})

const { actions } = authSlice
export const { setLoggedIn, setLoggedOut, setLoginErrorType, setCreateErrorType, setLoginResponse } = actions

export default authSlice.reducer

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectLoginErrorType = (state: RootState) => state.auth.loginErrorType
export const selectLoginResponse = (state: RootState) => state.auth.loginResponse
export const selectCreateErrorType = (state: RootState) => state.auth.createErrorType