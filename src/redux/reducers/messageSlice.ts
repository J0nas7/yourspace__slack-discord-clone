// External
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Internal
import { RootState } from '../store'
import { MessageDTO, DirectMessageDTO } from '@/types'

export interface MessageState {
    messageStream: MessageDTO[] | undefined,
    conversationStream: DirectMessageDTO[] | undefined,
}

const initialState = {
    messageStream: [],
    conversationStream: [],
} as MessageState

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessageStream: (state: MessageState, action:PayloadAction<any>) => {
            state.messageStream = action.payload.data
        },
        setConversationStream: (state: MessageState, action:PayloadAction<any>) => {
            state.conversationStream = action.payload.data
        },
    },
})

const { actions } = messageSlice
export const { setMessageStream, setConversationStream } = actions

export default messageSlice.reducer

export const selectMessageStream = (state: RootState) => state.message.messageStream
export const selectConversationStream = (state: RootState) => state.message.conversationStream