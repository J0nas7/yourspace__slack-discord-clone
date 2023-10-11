// External
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Internal
import { RootState } from '../store'

export interface SpaceState {
    spaceName: string,
    textChannelsList: string[]
}

const initialState = {
    spaceName: '',
    textChannelsList: []
} as SpaceState

export const spaceSlice = createSlice({
    name: 'space',
    initialState,
    reducers: {
        setSpaceName: (state: SpaceState, action:PayloadAction<any>) => {
            state.spaceName = action.payload.data
        },
        setTextChannelsList: (state:SpaceState, action:PayloadAction<any>) => {
            state.textChannelsList = action.payload.data
        },
    },
})

const { actions } = spaceSlice
export const { setSpaceName, setTextChannelsList } = actions

export default spaceSlice.reducer

export const selectSpaceName = (state: RootState) => state.space.spaceName
export const selectTextChannelsList = (state: RootState) => state.space.textChannelsList