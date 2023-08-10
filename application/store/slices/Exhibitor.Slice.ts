import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Exhibitor } from 'application/models/exhibitor/Exhibitor'

import { ExhibitorSetting } from 'application/models/exhibitor/ExhibitorSetting'

import { ExhibitorCategory } from 'application/models/exhibitor/ExhibitorCategory'

import { ExhibitorDetail } from 'application/models/exhibitor/ExhibitorDetail'

import type { RootState } from 'application/store/Index'

export interface ExhibitorState {
    exhibitors: Exhibitor[],
    categories: ExhibitorCategory[],
    settings: ExhibitorSetting,
    category_id: number,
    query: string,
    detail: ExhibitorDetail,
}

const initialState: ExhibitorState = {
    exhibitors: [],
    categories: [],
    settings: {},
    category_id: 0,
    query: '',
    detail: {},
}

// Slice
export const ExhibitorSlice = createSlice({
    name: 'exhibitors',
    initialState,
    reducers: {
        FetchExhibitors(state, action: PayloadAction<{ category_id: number, query: string }>) { },
        FetchExhibitorDetail(state, action: PayloadAction<{ id: number }>) { },
        MakeFavourite(state, action: PayloadAction<{ exhibitor_id: number, screen: string }>) { },
        update(state, action: PayloadAction<Exhibitor[]>) {
            state.exhibitors = action.payload;
        },
        updateCategory(state, action: PayloadAction<number>) {
            state.category_id = action.payload;
        },
        updateQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        updateCategories(state, action: PayloadAction<ExhibitorCategory[]>) {
            state.categories = action.payload;
        },
        updateSettings(state, action: PayloadAction<ExhibitorSetting>) {
            state.settings = action.payload;
        },
        updateExhibitorDetail(state, action: PayloadAction<ExhibitorDetail>) {
            state.detail = action.payload;
        },
    },
})

// Actions
export const ExhibitorActions = {
    FetchExhibitors: ExhibitorSlice.actions.FetchExhibitors,
    FetchExhibitorDetail: ExhibitorSlice.actions.FetchExhibitorDetail,
    update: ExhibitorSlice.actions.update,
    updateCategories: ExhibitorSlice.actions.updateCategories,
    updateCategory: ExhibitorSlice.actions.updateCategory,
    updateQuery: ExhibitorSlice.actions.updateQuery,
    updateSettings: ExhibitorSlice.actions.updateSettings,
    MakeFavourite: ExhibitorSlice.actions.MakeFavourite,
    updateExhibitorDetail: ExhibitorSlice.actions.updateExhibitorDetail,
}

export const SelectExhibitors = (state: RootState) => state.exhibitors.exhibitors

export const SelectExhibitorCategories = (state: RootState) => state.exhibitors.categories

export const SelectExhibitorSettings = (state: RootState) => state.exhibitors.settings

export const SelectExhibitorCategoryID = (state: RootState) => state.exhibitors.category_id

export const SelectExhibitorQuery = (state: RootState) => state.exhibitors.query

export const SelectExhibitorDetail = (state: RootState) => state.exhibitors.detail

// Reducer
export default ExhibitorSlice.reducer