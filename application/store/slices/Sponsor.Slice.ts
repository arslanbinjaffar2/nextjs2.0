import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sponsor } from 'application/models/sponsor/Sponsor'

import { SponsorSetting } from 'application/models/sponsor/SponsorSetting'

import { SponsorCategory } from 'application/models/sponsor/SponsorCategory'

import { SponsorDetail } from 'application/models/sponsor/SponsorDetail'
import { SponsorContact } from 'application/models/sponsor/SponsorContact'

import type { RootState } from 'application/store/Index'

export interface SponsorState {
    sponsors: Sponsor[],
    labels: any,
    our_sponsors: Sponsor[],
    my_sponsors: Sponsor[],
    categories: SponsorCategory[],
    settings: SponsorSetting,
    category_id: number,
    query: string,
    screen: string,
    detail: SponsorDetail | null,
    contact: SponsorContact | null,
}

const initialState: SponsorState = {
    sponsors: [],
    labels: [],
    our_sponsors: [],
    my_sponsors: [],
    categories: [],
    settings: {},
    category_id: 0,
    query: '',
    screen: 'sponsors',
    detail: null,
    contact: null,
}

// Slice
export const SponsorSlice = createSlice({
    name: 'sponsors',
    initialState,
    reducers: {
        FetchSponsors(state, action: PayloadAction<{ category_id: number, query: string, screen: string}>) {
            state.screen = action.payload.screen;
        },
        FetchMySponsors(state, action: PayloadAction<{}>) {},
        FetchOurSponsors(state, action: PayloadAction<{}>) {},
        FetchSponsorDetail(state, action: PayloadAction<{ id: number }>) { },
        FetchSponsorContact(state, action: PayloadAction<{ id: number }>) { },
        MakeFavourite(state, action: PayloadAction<{ sponsor_id: number, screen: string }>) { },
        update(state, action: PayloadAction<{ sponsors: Sponsor[]}>) {
            state.sponsors = action.payload.sponsors;
        },
        updateSiteLabels(state, action: PayloadAction<[]>) {
            state.labels = action.payload;
        },
        updateOurSponsors(state, action: PayloadAction<{sponsors: Sponsor[]}>) {
            state.our_sponsors = action.payload.sponsors;
        },
        updateMySponsors(state, action: PayloadAction<Sponsor[]>) {
            state.my_sponsors = action.payload;
        },
        updateCategory(state, action: PayloadAction<number>) {
            state.category_id = action.payload;
        },
        updateQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        updateCategories(state, action: PayloadAction<{ categories: SponsorCategory[]}>) {
            state.categories = action.payload.categories;
        },
        updateSettings(state, action: PayloadAction<SponsorSetting>) {
            state.settings = action.payload;
        },
        updateSponsorDetail(state, action: PayloadAction<SponsorDetail>) {
            state.detail = action.payload;
        },
        updateSponsorContact(state, action: PayloadAction<SponsorContact>) {
            state.contact = action.payload;
        },
    },
})

// Actions
export const SponsorActions = {
    FetchSponsors: SponsorSlice.actions.FetchSponsors,
    FetchMySponsors: SponsorSlice.actions.FetchMySponsors,
    FetchOurSponsors: SponsorSlice.actions.FetchOurSponsors,
    FetchSponsorDetail: SponsorSlice.actions.FetchSponsorDetail,
    FetchSponsorContact: SponsorSlice.actions.FetchSponsorContact,
    update: SponsorSlice.actions.update,
    labels: SponsorSlice.actions.update,
    updateOurSponsors: SponsorSlice.actions.updateOurSponsors,
    updateCategories: SponsorSlice.actions.updateCategories,
    updateCategory: SponsorSlice.actions.updateCategory,
    updateQuery: SponsorSlice.actions.updateQuery,
    updateSettings: SponsorSlice.actions.updateSettings,
    MakeFavourite: SponsorSlice.actions.MakeFavourite,
    updateSponsorDetail: SponsorSlice.actions.updateSponsorDetail,
    updateMySponsors: SponsorSlice.actions.updateMySponsors,
    updateSiteLabels: SponsorSlice.actions.updateSiteLabels,
}

export const SelectSponsors = (state: RootState) => state.sponsors.sponsors
export const SelectSiteLabel = (state: RootState) => state.sponsors.labels

export const SelectOurSponsors = (state: RootState) => state.sponsors.our_sponsors

export const SelectMySponsors = (state: RootState) => state.sponsors.my_sponsors

export const SelectSponsorCategories = (state: RootState) => state.sponsors.categories

export const SelectSponsorSettings = (state: RootState) => state.sponsors.settings

export const SelectSponsorCategoryID = (state: RootState) => state.sponsors.category_id

export const SelectSponsorQuery = (state: RootState) => state.sponsors.query

export const SelectSponsorDetail = (state: RootState) => state.sponsors.detail
export const SelectSponsorContact = (state: RootState) => state.sponsors.contact
// Reducer
export default SponsorSlice.reducer