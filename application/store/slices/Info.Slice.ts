import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Info } from 'application/models/Info'

import type { RootState } from 'application/store/Index'

export interface InfoState {
    parent_folder: number,
    parent_folder_name: string,
    page: Info | null,
    info: Info[] | null,
}

const initialState: InfoState = {
    parent_folder: 0,
    parent_folder_name:'',
    page: null,
    info: null,
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
        updateParentFolder(state, action: PayloadAction<{id:number, name:string}>) {
            state.parent_folder = action.payload.id;
            state.parent_folder_name = action.payload.name;
        },
        ClearState(state){
            state.parent_folder= 0;
            state.page = null;
            state.info = null;
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
    ClearState: InfoSlice.actions.ClearState,
}

export const SelectInfo = (state: RootState) => state.info.info

export const SelectPage = (state: RootState) => state.info.page

export const SelectParentFolder = (state: RootState) => state.info.parent_folder
export const SelectParentFolderName = (state: RootState) => state.info.parent_folder_name

// Reducer
export default InfoSlice.reducer