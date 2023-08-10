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
}

const initialState: AttendeeState = {
    data: [],
    attendees: [],
    query: '',
}

// Slice
export const AttendeeSlice = createSlice({
    name: 'attendees',
    initialState,
    reducers: {
        FetchAttendees(state, action: PayloadAction) { },
        update(state, action: PayloadAction<Attendee[]>) {
            state.data = action.payload;
            state.attendees = action.payload;
        },
        FilterAttendees(state, action: PayloadAction<{ attendee_id: number, query: string }>) {
            const readAttendee = (data: Attendee[], attendee_id: number): Attendee[] => {
                for (let obj of data) {
                    if (obj.id === attendee_id) {
                        return obj.children_files;
                    }
                    if (obj.children) {
                        let result = readAttendee(obj.children_files, attendee_id);
                        if (result) {
                            return result;
                        }
                    }
                }
                return [];
            }

            const records = action.payload.attendee_id === 0 ? KeywordFilter(current(state.data), 'name', action.payload.query) : readAttendee(current(state.data), action.payload.attendee_id);

            state.query = action.payload.query;

            state.attendees = records;
        },
    },
})

// Actions
export const AttendeeActions = {
    FetchAttendees: AttendeeSlice.actions.FetchAttendees,
    FilterAttendees: AttendeeSlice.actions.FilterAttendees,
    update: AttendeeSlice.actions.update,
}

export const SelectAttendees = (state: RootState) => state.attendees.attendees

export const SelectData = (state: RootState) => state.attendees.data

export const SelectQuery = (state: RootState) => state.attendees.query

// Reducer
export default AttendeeSlice.reducer