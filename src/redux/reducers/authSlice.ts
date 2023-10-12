// External
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Internal
import { RootState } from '../store'

export interface AuthState {
    isLoggedIn: boolean
    adminLoggedIn: string,
    accessToken: string,
    refreshToken: string,
    loginErrorType: string,
    createErrorType: string,
    loginResponse: Object,
    axiosGet: string,
}

const initialState = {
    isLoggedIn: false,
    adminLoggedIn: '',
    accessToken: '',
    refreshToken: '',
    loginErrorType: '',
    createErrorType: '',
    loginResponse: {},
    axiosGet: '',
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
        setAccessToken: (state:AuthState, action:PayloadAction<any>) => {
            state.accessToken = action.payload.data
        },
        setRefreshToken: (state:AuthState, action:PayloadAction<any>) => {
            state.refreshToken = action.payload.data
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
        setAxiosGet: (state:AuthState, action:PayloadAction<any>) => {
            state.axiosGet = action.payload.data
        },
    },
})

const { actions } = authSlice
export const { setLoggedIn, setLoggedOut, setAccessToken, setRefreshToken, setLoginErrorType, setCreateErrorType, setLoginResponse, setAxiosGet } = actions

export default authSlice.reducer

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken
export const selectLoginErrorType = (state: RootState) => state.auth.loginErrorType
export const selectLoginResponse = (state: RootState) => state.auth.loginResponse
export const selectCreateErrorType = (state: RootState) => state.auth.createErrorType
export const selectAxiosGet = (state: RootState) => state.auth.axiosGet