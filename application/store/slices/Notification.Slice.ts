import { createSlice, PayloadAction } from '@reduxjs/toolkit'



import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface NotificationState {
    notifications: any[],
}

const initialState: NotificationState = {
    notifications: [],
}

// Slice
export const NotificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        FetchNotifications() {},
        update(state, action: PayloadAction<{ notifications: any }>) {
            state.notifications = action.payload.notifications.alerts;
        },
        addNotification(state, action: PayloadAction<{ notification: any }>) {
            console.log(action?.payload?.notification);
            console.log('hello notifs');
            state.notifications = [...state.notifications, action.payload.notification];
        }

    },
})

// Actions
export const NotificationActions = {
    FetchNotifications:NotificationSlice.actions.FetchNotifications,
    update:NotificationSlice.actions.update,
    addNotification:NotificationSlice.actions.addNotification,
}

export const SelectNotifications = (state: RootState) => state.notifications.notifications


// Reducer
export default NotificationSlice.reducer