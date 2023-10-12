// External
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Internal
import { RootState } from '../store'

type channelListObject = {[key: string]: []}

export interface SpaceState {
    spaceName: string,
    channelsList: channelListObject
}

const initialState = {
    spaceName: '',
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
        setSpaceName: (state: SpaceState, action:PayloadAction<any>) => {
            state.spaceName = action.payload.data
        },
        setChannelsList: (state:SpaceState, action:PayloadAction<any>) => {
            const channelFormat: string = action.payload.format
            state.channelsList[channelFormat] = action.payload.data
        },
    },
})

const { actions } = spaceSlice
export const { setSpaceName, setChannelsList } = actions

export default spaceSlice.reducer

export const selectSpaceName = (state: RootState) => state.space.spaceName
export const selectChannelsList = (state: RootState) => state.space.channelsList