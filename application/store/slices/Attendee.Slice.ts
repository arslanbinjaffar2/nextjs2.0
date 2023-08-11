import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Attendee } from 'application/models/attendee/Attendee'

import { Group } from 'application/models/attendee/Group'

import type { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface AttendeeState {
    attendees: Attendee[],
    groups: Group[],
    query: string,
    page: number,
    group_id: number,
    my_attendee_id: number,
}

const initialState: AttendeeState = {
    attendees: [],
    groups: [],
    query: '',
    page: 1,
    group_id: 0,
    my_attendee_id: 0,
}

// Slice
export const AttendeeSlice = createSlice({
    name: 'attendees',
    initialState,
    reducers: {
        FetchAttendees(state, action: PayloadAction<{ group_id: number, query: string, page: number, my_attendee_id: number }>) {
            state.query = action.payload.query;
            state.page = action.payload.page;
            state.group_id = action.payload.group_id;
            state.my_attendee_id = action.payload.my_attendee_id;
        },
        FetchGroups(state, action: PayloadAction<{ query: string, page: number }>) {
            state.query = action.payload.query;
            state.page = action.payload.page;
        },
        update(state, action: PayloadAction<{ attendee: Attendee[], group_id: number, query: string, page: number }>) {
            const existed: any = current(state.attendees);
            state.attendees = action.payload.page === 1 ? action.payload.attendee : [...existed, ...action.payload.attendee];
        },
        updateGroups(state, action: PayloadAction<{ groups: Group[], query: string, page: number }>) {
            const existed: any = current(state.groups);
            state.groups = action.payload.page === 1 ? action.payload.groups : [...existed, ...action.payload.groups];
        },
        MakeFavourite(state, action: PayloadAction<{ attendee_id: number }>) { },
    },
})

// Actions
export const AttendeeActions = {
    FetchAttendees: AttendeeSlice.actions.FetchAttendees,
    FetchGroups: AttendeeSlice.actions.FetchGroups,
    update: AttendeeSlice.actions.update,
    updateGroups: AttendeeSlice.actions.updateGroups,
    MakeFavourite: AttendeeSlice.actions.MakeFavourite,
}

export const SelectAttendees = (state: RootState) => state.attendees.attendees

export const SelectGroups = (state: RootState) => state.attendees.groups

export const SelectQuery = (state: RootState) => state.attendees.query

export const SelectPage = (state: RootState) => state.attendees.page

// Reducer
export default AttendeeSlice.reducer