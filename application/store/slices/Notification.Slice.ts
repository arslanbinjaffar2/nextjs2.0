import { createSlice, PayloadAction } from '@reduxjs/toolkit'



import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';
import ConvertToPopupObject from 'application/utils/ConvertToPopupObject';

export interface NotificationState {
    notifications: any[],
    popups:any[],
    popupCount:number,
    currentPopup:any,
}

const initialState: NotificationState = {
    notifications: [],
    popups: [],
    popupCount:0,
    currentPopup:null,
}

// Slice
export const NotificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        FetchNotifications() {},
        update(state, action: PayloadAction<{ notifications: any }>) {
            state.notifications = action.payload.notifications.alerts;
            state.popups = action.payload.notifications.alerts.map((a:any)=>ConvertToPopupObject(a,'alert'));
            state.popupCount = action.payload.notifications.alerts.length;
        },
        addNotification(state, action: PayloadAction<{ notification: any }>) {
            state.notifications = [...state.notifications, action.payload.notification];
            const popups = [...state.popups, ConvertToPopupObject(action?.payload?.notification, action?.payload?.notification.type)];
            state.popups = popups;
            state.popupCount = popups.length;
        },
        setCurrentPopup(state){
            const popups = state.popups;
            state.currentPopup = popups.shift();
            state.popups = popups;
        },
        clearCurrentPopup(state){
            const popups = state.popups;
            if(popups.length > 0){
                state.currentPopup = popups.shift();
                state.popups = popups;
            }else{
                state.currentPopup= null;
            }
        }

    },
})

// Actions
export const NotificationActions = {
    FetchNotifications:NotificationSlice.actions.FetchNotifications,
    update:NotificationSlice.actions.update,
    addNotification:NotificationSlice.actions.addNotification,
    setCurrentPopup:NotificationSlice.actions.setCurrentPopup,
    clearCurrentPopup:NotificationSlice.actions.clearCurrentPopup,
}

export const SelectNotifications = (state: RootState) => state.notifications.notifications
export const SelectPopups = (state: RootState) => state.notifications.popups
export const SelectCurrentPopup = (state: RootState) => state.notifications.currentPopup
export const SelectPopupCount = (state: RootState) => state.notifications.popupCount


// Reducer
export default NotificationSlice.reducer