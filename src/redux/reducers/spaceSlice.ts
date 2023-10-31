// External
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Internal
import { RootState } from '../store'
import { SpaceDTO } from '@/types'

export interface SpaceState {
    theSpace: SpaceDTO
}

const emptySpace: SpaceDTO = {
    Space_ID: 0,
    Space_Name: ""
}

const initialState = {
    theSpace: emptySpace
} as SpaceState

export const spaceSlice = createSlice({
    name: 'space',
    initialState,
    reducers: {
        setTheSpace: (state: SpaceState, action:PayloadAction<any>) => {
            state.theSpace = action.payload.data
        },
    },
})

const { actions } = spaceSlice
export const { setTheSpace } = actions

export default spaceSlice.reducer

export const selectTheSpace = (state: RootState) => state.space.theSpace