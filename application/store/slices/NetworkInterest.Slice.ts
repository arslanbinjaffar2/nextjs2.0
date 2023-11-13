import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Keyword } from 'application/models/networkInterest/NetworkInterest'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';
import { Platform } from 'react-native';
import AsyncStorageClass from 'application/utils/AsyncStorageClass';

export interface NetworkInterestState {
    keywords: Keyword[],
    updatingMykeywords:boolean,
    skip:boolean,
}

const initialState: NetworkInterestState = {
    keywords: [],
    updatingMykeywords:false,
    skip:false,
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
            state.skip = true;
            if (Platform.OS === 'web') {
                localStorage.setItem('keyword_skip', 'true');
            } else {
                AsyncStorageClass.setItem('keyword_skip', 'true');
            }
        },
        setSkip(state){
            state.skip = true;
            if (Platform.OS === 'web') {
                localStorage.setItem('keyword_skip', 'true');
            } else {
                AsyncStorageClass.setItem('keyword_skip', 'true');
            }
        },
        FetchSearchMatchAttendees(state, action: PayloadAction<any>) {},
    },
})

// Actions
export const NetworkInterestActions = {
    FetchNetworkInterests:NetworkInterestSlice.actions.FetchNetworkInterests,
    update:NetworkInterestSlice.actions.update,
    SaveMykeywords:NetworkInterestSlice.actions.SaveMykeywords,
    saveMyKeywordSuccess:NetworkInterestSlice.actions.saveMyKeywordSuccess,
    setSkip:NetworkInterestSlice.actions.setSkip,
    FetchSearchMatchAttendees:NetworkInterestSlice.actions.FetchSearchMatchAttendees,
}

export const SelectNetworkInterests = (state: RootState) => state.networkInterest.keywords
export const SelectUpdatingMyKeywords = (state: RootState) => state.networkInterest.updatingMykeywords
export const SelectNetworkSkip = (state: RootState) => state.networkInterest.skip



// Reducer
export default NetworkInterestSlice.reducer