import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Banner, BannerSetting } from 'application/models/Banner'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface BannerState {
    banners: Banner[],
    banner_setting: BannerSetting | null ,
}

const initialState: BannerState = {
    banners: [],
    banner_setting: null
}

// Slice
export const BannerSlice = createSlice({
    name: 'banners',
    initialState,
    reducers: {
        FetchBanners() {},
        update(state, action: PayloadAction<{ banners: Banner[], banner_setting:BannerSetting }>) {
            state.banners = action.payload.banners;
            state.banner_setting = action.payload.banner_setting;
        }

    },
})

// Actions
export const BannerActions = {
    FetchBanners:BannerSlice.actions.FetchBanners,
    update:BannerSlice.actions.update,
}

export const SelectBanners = (state: RootState) => state.banners.banners

export const SelectBannerSetting = (state: RootState) => state.banners.banner_setting



// Reducer
export default BannerSlice.reducer