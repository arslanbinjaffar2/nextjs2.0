import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sponsor } from 'application/models/Sponsor'

import { SponsorSetting } from 'application/models/SponsorSetting'

import { SponsorCategory } from 'application/models/SponsorCategory'


import type { RootState } from 'application/store/Index'

export interface SponsorState {
    sponsors: Sponsor[],
    categories: SponsorCategory[],
    settings: SponsorSetting,
}

const initialState: SponsorState = {
    sponsors: [],
    categories: [],
    settings: {},
}

// Slice
export const SponsorSlice = createSlice({
    name: 'sponsors',
    initialState,
    reducers: {
        FetchSponsors(state) { },
        update(state, action: PayloadAction<Sponsor[]>) {
            state.sponsors = action.payload;
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
    updateSettings: SponsorSlice.actions.updateSettings,
}

export const SelectSponsors = (state: RootState) => state.sponsors.sponsors

export const SelectSponsorCategories = (state: RootState) => state.sponsors.categories

export const SelectSponsorSettings = (state: RootState) => state.sponsors.settings

// Reducer
export default SponsorSlice.reducer