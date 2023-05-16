import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Info } from 'application/models/Info'

import type { RootState } from 'application/store/Index'

export interface InfoState {
    info: Info[],
}

const initialState: InfoState = {
    info: [],
}

export const InfoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        FetchInfo(state, action: PayloadAction<string>) { },
        update(state, action: PayloadAction<Info[]>) {
            state.info = action.payload;
        },
    },
})

// Actions
export const InfoActions = {
    FetchInfo: InfoSlice.actions.FetchInfo,
    update: InfoSlice.actions.update,
}

export const SelectInfo = (state: RootState) => state.info.info

// Reducer
export default InfoSlice.reducer