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
        }

    },
})

// Actions
export const NotificationActions = {
    FetchNotifications:NotificationSlice.actions.FetchNotifications,
    update:NotificationSlice.actions.update,
}

export const SelectNotifications = (state: RootState) => state.notifications.notifications


// Reducer
export default NotificationSlice.reducer