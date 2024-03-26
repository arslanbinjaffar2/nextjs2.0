import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Alert, AlertSetting } from 'application/models/alert/Alert'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface AlertState {
    alerts: Alert[],
    detail: Alert | null,
    unread: number,
    attendee_alerts: "" | number[],
    alert_setting: null | AlertSetting[],
}

const initialState: AlertState = {
    alerts: [],
    detail: null,
    unread: 0,
    alert_setting: null,
    attendee_alerts: []
}

// Slice
export const AlertSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        FetchAlerts() {},
        update(state, action: PayloadAction<{ alerts: Alert[], attendee_alerts:"" | number[], alert_settings: null | AlertSetting[] }>) {
            state.alerts = action.payload.alerts;
            state.attendee_alerts = action.payload.attendee_alerts;
            state.alert_setting = action.payload.alert_settings;
        },
        markAlertRead(state, action: PayloadAction<{ alertIds: string,}>) {},
        setUnreadCount(state, action: PayloadAction<number>) {
            state.unread = action.payload;
        },
        FetchAlertDetails(state, action: PayloadAction<{ alertId: number}>) {},
        MarkAlertAsRead(state, action: PayloadAction<{ alertId: number}>) {
            state.unread = Math.max(0, state.unread - 1);
        },
        UpdateDetail(state, action: PayloadAction<{ detail: Alert }>) {
            state.detail = action.payload.detail;
        },
    },
})

// Actions
export const AlertActions = {
    FetchAlerts:AlertSlice.actions.FetchAlerts,
    update:AlertSlice.actions.update,
    UpdateDetail:AlertSlice.actions.UpdateDetail,
    markAlertRead:AlertSlice.actions.markAlertRead,
    FetchAlertDetails:AlertSlice.actions.FetchAlertDetails,
    MarkAlertAsRead:AlertSlice.actions.MarkAlertAsRead,
    setUnreadCount:AlertSlice.actions.setUnreadCount,
    
}

export const SelectAlerts = (state: RootState) => state.alerts.alerts

export const SelectAttendeeAlerts = (state: RootState) => state.alerts.attendee_alerts
export const SelectAlertSetting = (state: RootState) => state.alerts.alert_setting

export const SelectAlertDetail = (state: RootState) => state.alerts.detail
export const SelectUnreadCount = (state: RootState) => state.alerts.unread



// Reducer
export default AlertSlice.reducer