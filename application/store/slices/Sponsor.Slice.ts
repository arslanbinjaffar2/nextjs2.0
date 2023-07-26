import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sponsor } from 'application/models/sponsor/Sponsor'

import { SponsorSetting } from 'application/models/sponsor/SponsorSetting'

import { SponsorCategory } from 'application/models/sponsor/SponsorCategory'

import type { RootState } from 'application/store/Index'

export interface SponsorState {
    sponsors: Sponsor[],
    categories: SponsorCategory[],
    settings: SponsorSetting,
    category_id: number,
    query: string,
}

const initialState: SponsorState = {
    sponsors: [],
    categories: [],
    settings: {},
    category_id: 0,
    query: '',
}

// Slice
export const SponsorSlice = createSlice({
    name: 'sponsors',
    initialState,
    reducers: {
        FetchSponsors(state, action: PayloadAction<{ category_id: number, query: string }>) { },
        MakeFavourite(state, action: PayloadAction<{ sponsor_id: number }>) { },
        update(state, action: PayloadAction<Sponsor[]>) {
            state.sponsors = action.payload;
        },
        updateCategory(state, action: PayloadAction<number>) {
            state.category_id = action.payload;
        },
        updateQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        updateCategories(state, action: PayloadAction<SponsorCategory[]>) {
            state.categories = action.payload;
        },
        updateSettings(state, action: PayloadAction<SponsorSetting>) {
            state.settings = action.payload;
        },
    },
})

// Actions
export const SponsorActions = {
    FetchSponsors: SponsorSlice.actions.FetchSponsors,
    update: SponsorSlice.actions.update,
    updateCategories: SponsorSlice.actions.updateCategories,
    updateCategory: SponsorSlice.actions.updateCategory,
    updateQuery: SponsorSlice.actions.updateQuery,
    updateSettings: SponsorSlice.actions.updateSettings,
    MakeFavourite: SponsorSlice.actions.MakeFavourite,
}

export const SelectSponsors = (state: RootState) => state.sponsors.sponsors

export const SelectSponsorCategories = (state: RootState) => state.sponsors.categories

export const SelectSponsorSettings = (state: RootState) => state.sponsors.settings

export const SelectSponsorCategoryID = (state: RootState) => state.sponsors.category_id

export const SelectSponsorQuery = (state: RootState) => state.sponsors.query

// Reducer
export default SponsorSlice.reducer