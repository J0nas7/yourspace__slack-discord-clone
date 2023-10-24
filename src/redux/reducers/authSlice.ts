// External
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Internal
import { RootState } from '../store'

/*export const TestFetch: any = createAsyncThunk(
    'TestFetch',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/users'
            );
            const d = await response.json();
            return d;
        } catch (e: any) {
            return rejectWithValue(e.response.data.error);
        }
    }
)*/

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
        setLoggedIn: (state: AuthState, action: PayloadAction<any>) => {
            state.isLoggedIn = action.payload.data
        },
        setLoggedOut: (state: AuthState, action: PayloadAction<any>) => {
            state.isLoggedIn = !action.payload.data
        },
        setAccessToken: (state: AuthState, action: PayloadAction<any>) => {
            state.accessToken = action.payload.data
        },
        setRefreshToken: (state: AuthState, action: PayloadAction<any>) => {
            state.refreshToken = action.payload.data
        },
        setLoginErrorType: (state: AuthState, action: PayloadAction<any>) => {
            state.loginErrorType = action.payload.data
        },
        setLoginResponse: (state: AuthState, action: PayloadAction<any>) => {
            state.loginResponse = action.payload.data
        },
        setCreateErrorType: (state: AuthState, action: PayloadAction<any>) => {
            state.createErrorType = action.payload.data
        },
        setAxiosGet: (state: AuthState, action: PayloadAction<any>) => {
            state.axiosGet = action.payload.data
        },
    },
    /*extraReducers: {
        [HYDRATE]: (state, action:any) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    },
    (builder) => {
        builder
            /*.addCase(HYDRATE, (state: any, action: any) => {
                if (typeof window !== 'undefined') {
                    const storedLoggedInData = localStorage.getItem('loggedInData');
                    if (storedLoggedInData != null && storedLoggedInData) {
                        const parsedJson = JSON.parse(storedLoggedInData);
                        state.isLoggedIn = parsedJson.isLoggedIn ?? false;
                    } else {
                        state.isLoggedIn = false
                    }
                }
            })*
            .addCase(HYDRATE, (state:any, action:any) => {
                return {
                  ...state,
                  ...action.payload.auth,
                };
              })
        //.addDefaultCase(combinedReducers)
        /*[HYDRATE]: (state: any, action) => {
            const stateDiff = diff(state, action.payload);
            const isdiff1 = stateDiff?.server?.[0]?.auth?.data?.[0];
            // return {
            //   ...state,
            //   data: isdiff1 ? action.payload.server.auth.data : state.data,
            // };
            state.data = isdiff1 ? action.payload.server.auth.data : state.data;
        },
        [TestFetch.fulfilled]: (state: any, action) => {
            state.data = action.payload;
        },*
    }*/
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