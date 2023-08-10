import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Attendee } from 'application/models/attendee/Attendee'

import type { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';
import KeywordFilter from 'application/utils/KeywordFilter';

export interface AttendeeState {
    data: Attendee[],
    attendees: Attendee[],
    query: string,
    page: number,
}

const initialState: AttendeeState = {
    data: [],
    attendees: [],
    query: '',
    page: 1,
}

// Slice
export const AttendeeSlice = createSlice({
    name: 'attendees',
    initialState,
    reducers: {
        FetchAttendees(state, action: PayloadAction<{ group_id: number, query: string, page: number }>) {
            state.query = action.payload.query;
            state.page = action.payload.page;
        },
        update(state, action: PayloadAction<Attendee[]>) {
            state.data = action.payload;
            state.attendees = action.payload;
        }
    },
})

// Actions
export const AttendeeActions = {
    FetchAttendees: AttendeeSlice.actions.FetchAttendees,
    update: AttendeeSlice.actions.update,
}

export const SelectAttendees = (state: RootState) => state.attendees.attendees

export const SelectData = (state: RootState) => state.attendees.data

export const SelectQuery = (state: RootState) => state.attendees.query

export const SelectPage = (state: RootState) => state.attendees.page

// Reducer
export default AttendeeSlice.reducer