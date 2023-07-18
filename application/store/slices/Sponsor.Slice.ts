import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sponsor } from 'application/models/Sponsor'

import { SponsorCategory } from 'application/models/SponsorCategory'


import type { RootState } from 'application/store/Index'

export interface SponsorState {
    sponsors: Sponsor[],
    categories: SponsorCategory[],
}

const initialState: SponsorState = {
    sponsors: [],
    categories: [],
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
    },
})

// Actions
export const SponsorActions = {
    FetchSponsors: SponsorSlice.actions.FetchSponsors,
    update: SponsorSlice.actions.update,
    updateCategories: SponsorSlice.actions.updateCategories,
}

export const SelectSponsors = (state: RootState) => state.sponsors.sponsors

export const SelectSponsorCategories = (state: RootState) => state.sponsors.categories

// Reducer
export default SponsorSlice.reducer