import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SocialMedia } from 'application/models/socialMedia/SocialMedia'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface SocialMediaState {
    socialMedia: SocialMedia[],
}

const initialState: SocialMediaState = {
    socialMedia: [],
}

// Slice
export const SocialMediaSlice = createSlice({
    name: 'socialMedia',
    initialState,
    reducers: {
        FetchSocialMedias() {},
        update(state, action: PayloadAction<{ socialMedia: SocialMedia[]}>) {
            state.socialMedia = action.payload.socialMedia;
        }

    },
})

// Actions
export const SocialMediaActions = {
    FetchSocialMedias:SocialMediaSlice.actions.FetchSocialMedias,
    update:SocialMediaSlice.actions.update,
}

export const SelectSocialMedias = (state: RootState) => state.socialMedia.socialMedia




// Reducer
export default SocialMediaSlice.reducer