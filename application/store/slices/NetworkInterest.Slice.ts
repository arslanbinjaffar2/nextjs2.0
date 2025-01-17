import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Keyword } from 'application/models/networkInterest/NetworkInterest'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';
import { Platform } from 'react-native';
import AsyncStorageClass from 'application/utils/AsyncStorageClass';
import { Attendee } from 'application/models/attendee/Attendee';

export interface NetworkInterestState {
    keywords: Keyword[],
    updatingMykeywords:boolean,
    skip:boolean,
    searchMatchAttendees:Attendee[]|null
    searchingAttendees:boolean
    updatedMyKeywords:boolean
}

const initialState: NetworkInterestState = {
    keywords: [],
    updatingMykeywords:false,
    skip:false,
    searchMatchAttendees:null,
    searchingAttendees:false,
    updatedMyKeywords:false,
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
        saveMyKeywordSuccess(state, action: PayloadAction<{event_url:string}>) {
            state.updatingMykeywords = false;
            state.skip = true;
            if (Platform.OS === 'web') {
                localStorage.setItem(`keyword_skip_${action.payload.event_url}`, 'true');
            } else {
                AsyncStorageClass.setItem(`keyword_skip_${action.payload.event_url}`, 'true');
            }
        },
        setSkip(state, action: PayloadAction<{event_url:string}>){
            state.skip = true;
            if (Platform.OS === 'web') {
                localStorage.setItem(`keyword_skip_${action.payload.event_url}`, 'true');
            } else {
                AsyncStorageClass.setItem(`keyword_skip_${action.payload.event_url}`, 'true');
            }
        },
        FetchSearchMatchAttendees(state, action: PayloadAction<any>) {
            state.searchingAttendees = true;
            state.searchMatchAttendees = null;
        },
        updateSearchMatchAttendees(state, action: PayloadAction<{ attendees:Attendee[] }>) {
            state.searchMatchAttendees = action.payload.attendees.length > 0 ? action.payload.attendees : null;
            state.searchingAttendees = false;

        },
        clearState(state, action: PayloadAction<{event_url:string}>){
            state.keywords= [];
            state.updatingMykeywords=false;
            state.skip=false;
            state.searchMatchAttendees=null;
            state.searchingAttendees=false;

            if (Platform.OS === 'web') {
                localStorage.removeItem(`keyword_skip_${action.payload.event_url}`);
            } else {
                AsyncStorageClass.removeItem(`keyword_skip_${action.payload.event_url}`);
            }
        },
        FetchMyKeywords(){},
        updateUpdatedMyKeywords(state, action: PayloadAction<boolean>){
            state.updatedMyKeywords = action.payload;
        }
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
    updateSearchMatchAttendees:NetworkInterestSlice.actions.updateSearchMatchAttendees,
    clearState:NetworkInterestSlice.actions.clearState,
    FetchMyKeywords:NetworkInterestSlice.actions.FetchMyKeywords,
    updateUpdatedMyKeywords:NetworkInterestSlice.actions.updateUpdatedMyKeywords,
}

export const SelectNetworkInterests = (state: RootState) => state.networkInterest.keywords
export const SelectUpdatingMyKeywords = (state: RootState) => state.networkInterest.updatingMykeywords
export const SelectNetworkSkip = (state: RootState) => state.networkInterest.skip
export const SelectSearchMatchAttendees = (state: RootState) => state.networkInterest.searchMatchAttendees
export const SelectSearchingAttendees = (state: RootState) => state.networkInterest.searchingAttendees
export const SelectUpdatedMyKeywords = (state: RootState) => state.networkInterest.updatedMyKeywords



// Reducer
export default NetworkInterestSlice.reducer