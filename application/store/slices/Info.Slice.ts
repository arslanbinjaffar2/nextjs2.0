import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Info } from 'application/models/Info'

import type { RootState } from 'application/store/Index'

export interface InfoState {
    page: Info,
    info: Info[],
}

const initialState: InfoState = {
    page: {},
    info: [],
}

export const InfoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        FetchInfo(state, action: PayloadAction<string>) { },
        FetchPage(state, action: PayloadAction<{ id: number, type: string }>) { },
        update(state, action: PayloadAction<Info[]>) {
            state.info = action.payload;
        },
        updatePage(state, action: PayloadAction<Info>) {
            state.page = action.payload;
        },
    },
})

// Actions
export const InfoActions = {
    FetchInfo: InfoSlice.actions.FetchInfo,
    FetchPage: InfoSlice.actions.FetchPage,
    update: InfoSlice.actions.update,
    updatePage: InfoSlice.actions.updatePage,
}

export const SelectInfo = (state: RootState) => state.info.info

export const SelectPage = (state: RootState) => state.info.page

// Reducer
export default InfoSlice.reducer