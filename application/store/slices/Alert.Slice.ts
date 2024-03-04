import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Alert, AlertSetting } from 'application/models/alert/Alert'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface AlertState {
    alerts: Alert[],
    attendee_alerts: "" | number[],
    alert_setting: null | AlertSetting[],
}

const initialState: AlertState = {
    alerts: [],
    attendee_alerts: [],
    alert_setting: null
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
        markAlertRead(state, action: PayloadAction<{ alertIds: string,}>) {}
    },
})

// Actions
export const AlertActions = {
    FetchAlerts:AlertSlice.actions.FetchAlerts,
    update:AlertSlice.actions.update,
    markAlertRead:AlertSlice.actions.markAlertRead,
}

export const SelectAlerts = (state: RootState) => state.alerts.alerts

export const SelectAttendeeAlerts = (state: RootState) => state.alerts.attendee_alerts
export const SelectAlertSetting = (state: RootState) => state.alerts.alert_setting



// Reducer
export default AlertSlice.reducer