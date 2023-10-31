import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Keyword } from 'application/models/networkInterest/NetworkInterest'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface NetworkInterestState {
    keywords: Keyword[],
    updatingMykeywords:boolean,
}

const initialState: NetworkInterestState = {
    keywords: [],
    updatingMykeywords:false,
}

// Slice
export const NetworkInterestSlice = createSlice({
    name: 'networkInterests',
    initialState,
    reducers: {
        FetchNetworkInterests() {},
        update(state, action: PayloadAction<{ keywords: Keyword[],  }>) {
            state.keywords = action.payload.keywords;
        },
        SaveMykeywords(state, action: PayloadAction<any>) {
            state.updatingMykeywords = true;
        },
        saveMyKeywordSuccess(state) {
            state.updatingMykeywords = false;
        }
    },
})

// Actions
export const NetworkInterestActions = {
    FetchNetworkInterests:NetworkInterestSlice.actions.FetchNetworkInterests,
    update:NetworkInterestSlice.actions.update,
    SaveMykeywords:NetworkInterestSlice.actions.SaveMykeywords,
    saveMyKeywordSuccess:NetworkInterestSlice.actions.saveMyKeywordSuccess,
}

export const SelectNetworkInterests = (state: RootState) => state.networkInterest.keywords
export const SelectUpdatingMyKeywords = (state: RootState) => state.networkInterest.updatingMykeywords



// Reducer
export default NetworkInterestSlice.reducer