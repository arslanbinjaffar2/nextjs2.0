import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Alert } from 'application/models/alert/Alert'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface AlertState {
    alerts: Alert[],
    detail: Alert | null,
    attendee_alerts: "" | number[],
}

const initialState: AlertState = {
    alerts: [],
    detail: null,
    attendee_alerts: []
}

// Slice
export const AlertSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        FetchAlerts() {},
        update(state, action: PayloadAction<{ alerts: Alert[], attendee_alerts:"" | number[] }>) {
            state.alerts = action.payload.alerts;
            state.attendee_alerts = action.payload.attendee_alerts;
        },
        markAlertRead(state, action: PayloadAction<{ alertIds: string,}>) {},
        FetchAlertDetails(state, action: PayloadAction<{ alertId: number}>) {
            
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
}

export const SelectAlerts = (state: RootState) => state.alerts.alerts

export const SelectAttendeeAlerts = (state: RootState) => state.alerts.attendee_alerts

export const SelectAlertDetail = (state: RootState) => state.alerts.detail



// Reducer
export default AlertSlice.reducer