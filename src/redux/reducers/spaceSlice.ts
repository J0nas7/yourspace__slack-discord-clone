// External
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Internal
import { RootState } from '../store'
import { SpaceDTO } from '@/types'

type channelListObject = {[key: string]: []}

export interface SpaceState {
    theSpace: SpaceDTO,
    channelsList: channelListObject
}

const emptySpace: SpaceDTO = {
    Space_ID: 0,
    Space_Name: ""
}

const initialState = {
    theSpace: emptySpace,
    channelsList: {
        'text': [],
        'audio': [],
        'video': [],
    }
} as SpaceState

export const spaceSlice = createSlice({
    name: 'space',
    initialState,
    reducers: {
        setTheSpace: (state: SpaceState, action:PayloadAction<any>) => {
            state.theSpace = action.payload.data
        },
        setChannelsList: (state:SpaceState, action:PayloadAction<any>) => {
            const channelFormat: string = action.payload.format
            state.channelsList[channelFormat] = action.payload.data
        },
    },
})

const { actions } = spaceSlice
export const { setTheSpace, setChannelsList } = actions

export default spaceSlice.reducer

export const selectTheSpace = (state: RootState) => state.space.theSpace
export const selectChannelsList = (state: RootState) => state.space.channelsList