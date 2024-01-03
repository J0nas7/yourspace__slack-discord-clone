// External
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Internal
import { RootState } from '../store'
import { ChannelDTO, ProfileDTO } from '@/types'
import { Channels } from '@mui/material/styles/createPalette'

type channelListObject = { [key: string]: [] }

export interface ChannelState {
    theChannel: ChannelDTO,
    channelsList: channelListObject,
    membersList: ProfileDTO[] | undefined
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
    },
    membersList: undefined
} as ChannelState

export const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        setTheChannel: (state: ChannelState, action: PayloadAction<any>) => {
            state.theChannel = action.payload.data
        },
        setChannelsList: (state: ChannelState, action: PayloadAction<any>) => {
            const channelFormat: string = action.payload.format
            if (channelFormat) state.channelsList[channelFormat] = action.payload.data
        },
        setMembersList: (state: ChannelState, action: PayloadAction<any>) => {
            state.membersList = action.payload.data
        },
        updateMembersListPosition: (state: ChannelState, action: PayloadAction<any>) => {
            const thisProfile: ProfileDTO = action.payload.data
            const index = state.membersList!.map(item => item.Profile_ID).indexOf(thisProfile.Profile_ID)
            
            state.membersList = [
                ...state.membersList!.slice(0, index),
                thisProfile,
                ...state.membersList!.slice(index + 1)
            ]
        },
        deleteMemberFromList: (state: ChannelState, action: PayloadAction<any>) => {
            const thisProfile: ProfileDTO = action.payload.data
            state.membersList = state.membersList!.filter(member => member.Profile_ID !== thisProfile.Profile_ID)
        },
    },
})

const { actions } = channelSlice
export const { setTheChannel, setChannelsList, setMembersList, updateMembersListPosition, deleteMemberFromList } = actions

export default channelSlice.reducer

export const selectTheChannel = (state: RootState) => state.channel.theChannel
export const selectChannelsList = (state: RootState) => state.channel.channelsList
export const selectMembersList = (state: RootState) => state.channel.membersList