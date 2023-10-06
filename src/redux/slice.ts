// External
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

// Internal
import { readAllOrdersSummary } from "./data"
//import { OrderDTO } from '../types'

export const fetchSummaryOrders = createAsyncThunk(
    "orders/fetchSummaryOrders",
    async () => readAllOrdersSummary(1, ""),
)

export interface OrdersState {
    ordersList: any[]//OrderDTO[]
}

const initialState = {
    ordersList: [],
} as OrdersState

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        readSummaryOrders(state:OrdersState, action: PayloadAction<any>) {
            state.ordersList = action.payload
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchSummaryOrders.fulfilled, (state:OrdersState, { payload } : any) => {
          state.ordersList.push(...payload.data)
        })
    },
})