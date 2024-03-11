import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Attendee, History, FetchCheckInOutResponse, Setting, Checkin } from 'application/models/checkInOut/CheckInOut'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface CheckInOutState  {
    checkInOut:{
        attendee: Attendee | null;
        setting: Setting  | null;
        history:History[],
        type_history: {event:History[],program:History[],group:History[],ticket:History[]};
        enableEvent: boolean;
        enableCheckinWithoutLocatiom: boolean;
        status: string;
        eventStatusMsg: string;
        checkin: Checkin | null;
        checkInOutSetting: Setting | null;
        qrCodeImgSrc:string;
    }
}

const initialState: CheckInOutState = {
    checkInOut:{
        attendee: null,
        setting: null,
        history:[],
        type_history: {event:[],program:[],group:[],ticket:[]},
        enableEvent: false,
        enableCheckinWithoutLocatiom: false,
        status: 'check-out',
        eventStatusMsg: '',
        checkin: null,
        checkInOutSetting: null,
        qrCodeImgSrc:'',
    }
}

// Slice
export const CheckInOutSlice = createSlice({
    name: 'checkInOut',
    initialState,
    reducers: {
        FetchCheckInOut() {},
        update(state, action: PayloadAction<FetchCheckInOutResponse>) {
            state.checkInOut= action.payload;
        },
        SendQRCode() {},
        DoCheckInOut(state, action: PayloadAction<{ attendee_id: number, organizer_id: number, action: string }>) {},
    },
})

// Actions
export const CheckInOutActions = {
    FetchCheckInOut:CheckInOutSlice.actions.FetchCheckInOut,
    SendQRCode:CheckInOutSlice.actions.SendQRCode,
    update:CheckInOutSlice.actions.update,
    DoCheckInOut:CheckInOutSlice.actions.DoCheckInOut,
    
}

export const SelectCheckInOut = (state: RootState) => state.checkInOut.checkInOut


// Reducer
export default CheckInOutSlice.reducer