import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Attendee, History, FetchCheckInOutResponse, Setting, Checkin, GroupedHistory, OrderDetail } from 'application/models/checkInOut/CheckInOut'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface CheckInOutState  {
    checkInOut:{
        attendee: Attendee | null;
        setting: Setting  | null;
        hasOrderItems: boolean;
        history:History[],
        type_history: {event:GroupedHistory[],program:GroupedHistory[],group:GroupedHistory[],ticket:GroupedHistory[]};
        enableEvent: boolean;
        enableCheckinWithoutLocatiom: boolean;
        status: string;
        eventStatusMsg: string;
        checkin: Checkin | null;
        checkInOutSetting: Setting | null;
        qrCodeImgSrc:string;
    }
    orderDetail: OrderDetail|null;
}

const initialState: CheckInOutState = {
    checkInOut:{
        attendee: null,
        setting: null,
        hasOrderItems: false,
        history:[],
        type_history: {event:[],program:[],group:[],ticket:[]},
        enableEvent: false,
        enableCheckinWithoutLocatiom: false,
        status: 'check-out',
        eventStatusMsg: '',
        checkin: null,
        checkInOutSetting: null,
        qrCodeImgSrc:''
    },
    orderDetail: null
}

// Slice
export const CheckInOutSlice = createSlice({
    name: 'checkInOut',
    initialState,
    reducers: {
        FetchCheckInOut(state, action: PayloadAction<{showLoading:boolean}>) {
            if(action.payload.showLoading == null){
                action.payload.showLoading = true;
            }
        },
        update(state, action: PayloadAction<FetchCheckInOutResponse>) {
            state.checkInOut= action.payload;
        },
        SendQRCode() {},
        DoCheckInOut(state, action: PayloadAction<{ attendee_id: number, organizer_id: number, action: string }>) {},
        toggleCheckInOut(state) {
            if(state.checkInOut.status == 'check-in'){
                state.checkInOut.status = 'check-out';
            }else{
                state.checkInOut.status = 'check-in';
            }
        },
        FetchOrderDetail(state) {},
        updateOrderDetail(state, action: PayloadAction<{order_detail:OrderDetail}>) {
            if(action.payload.order_detail == null){
                state.orderDetail = null;
            }else{
                state.orderDetail = action.payload.order_detail;
            }
        }
    },
})

// Actions
export const CheckInOutActions = {
    FetchCheckInOut:CheckInOutSlice.actions.FetchCheckInOut,
    SendQRCode:CheckInOutSlice.actions.SendQRCode,
    update:CheckInOutSlice.actions.update,
    DoCheckInOut:CheckInOutSlice.actions.DoCheckInOut,
    toggleCheckInOut:CheckInOutSlice.actions.toggleCheckInOut,
    FetchOrderDetail:CheckInOutSlice.actions.FetchOrderDetail,
    updateOrderDetail:CheckInOutSlice.actions.updateOrderDetail
    
}

export const SelectCheckInOut = (state: RootState) => state.checkInOut.checkInOut

export const SelectOrderDetail = (state: RootState) => state.checkInOut.orderDetail

// Reducer
export default CheckInOutSlice.reducer