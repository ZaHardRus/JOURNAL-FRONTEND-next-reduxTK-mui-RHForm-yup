import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "../store";


export interface UserState {
    leftSide: boolean
}

const initialState: UserState = {
    leftSide: false,
}

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,

    reducers: {
        setLeftMenu: (state) => {
            state.leftSide = !state.leftSide
        },
    },
})

export const {setLeftMenu} = layoutSlice.actions
export const selectLeftMenu = (state: RootState) => state.layout.leftSide
export const layoutReducer = layoutSlice.reducer
