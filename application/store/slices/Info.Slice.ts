import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Info } from 'application/models/Info'

import type { RootState } from 'application/store/Index'

export interface InfoState {
    parent_folder: number,
    page: Info,
    info: Info[],
}

const initialState: InfoState = {
    parent_folder: 0,
    page: {},
    info: [],
}

export const InfoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        FetchInfo(state, action: PayloadAction<{ id: number, type: string }>) { },
        FetchPage(state, action: PayloadAction<{ id: number, type: string }>) { },
        update(state, action: PayloadAction<Info[]>) {
            state.info = action.payload;
        },
        updatePage(state, action: PayloadAction<Info>) {
            state.page = action.payload;
        },
        updateParentFolder(state, action: PayloadAction<number>) {
            state.parent_folder = action.payload;
        },
    },
})

// Actions
export const InfoActions = {
    FetchInfo: InfoSlice.actions.FetchInfo,
    FetchPage: InfoSlice.actions.FetchPage,
    update: InfoSlice.actions.update,
    updatePage: InfoSlice.actions.updatePage,
    updateParentFolder: InfoSlice.actions.updateParentFolder,
}

export const SelectInfo = (state: RootState) => state.info.info

export const SelectPage = (state: RootState) => state.info.page

export const SelectParentFolder = (state: RootState) => state.info.parent_folder

// Reducer
export default InfoSlice.reducer