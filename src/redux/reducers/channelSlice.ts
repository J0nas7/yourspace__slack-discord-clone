// External
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Internal
import { RootState } from '../store'
import { ChannelDTO } from '@/types'
import { Channels } from '@mui/material/styles/createPalette'

type channelListObject = {[key: string]: []}

export interface ChannelState {
    theChannel: ChannelDTO,
    channelsList: channelListObject,
}

const emptyChannel: ChannelDTO = {
    Channel_ID: 0,
    Channel_Name: "",
    Channel_Type: 'TEXT'
}

const initialState = {
    theChannel: emptyChannel,
    channelsList: {
        'text': [],
        'audio': [],
        'video': [],
    }
} as ChannelState

export const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        setTheChannel: (state: ChannelState, action:PayloadAction<any>) => {
            state.theChannel = action.payload.data
        },
        setChannelsList: (state: ChannelState, action:PayloadAction<any>) => {
            const channelFormat: string = action.payload.format
            if (channelFormat) state.channelsList[channelFormat] = action.payload.data
        }
    },
})

const { actions } = channelSlice
export const { setTheChannel, setChannelsList } = actions

export default channelSlice.reducer

export const selectTheChannel = (state: RootState) => state.channel.theChannel
export const selectChannelsList = (state: RootState) => state.channel.channelsList