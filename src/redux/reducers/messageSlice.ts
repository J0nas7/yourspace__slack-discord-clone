// External
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Internal
import { RootState } from '../store'
import { MessageDTO } from '@/types'

export interface MessateState {
    messageStream: MessageDTO[] | undefined
}

const initialState = {
    messageStream: []
} as MessateState

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessageStream: (state: MessateState, action:PayloadAction<any>) => {
            state.messageStream = action.payload.data
        }
    },
})

const { actions } = messageSlice
export const { setMessageStream } = actions

export default messageSlice.reducer

export const selectMessageStream = (state: RootState) => state.message.messageStream