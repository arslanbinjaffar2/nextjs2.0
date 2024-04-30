import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { MeetingRequest, MyMeetingListing } from 'application/models/meetingReservation/MeetingReservation'
import { MeetingSlot } from 'application/models/meetingReservation/MeetingReservation'

import type { RootState } from 'application/store/Index'

export interface MeetingReservationState {
    my_meeting_listing: MyMeetingListing,
    available_slots: MeetingSlot[],
    available_dates: any,
    labels: any,
}

const initialState: MeetingReservationState = {
    my_meeting_listing: {   
        my_meeting_requests: [],
        labels: [],
        dates: [],
        status_colors: [],
        statuses: [],
        isChatModuleActive: false,
    },
    labels: [],
    available_slots: [],
    available_dates: [],
}

// Slice
export const MeetingReservationSlice = createSlice({
    name: 'meetingReservation',
    initialState,
    reducers: {
        FetchMyMeetingRequests(state, action: PayloadAction<{  }>) {
            
        },
        updateMyMeetingRequests(state, action: PayloadAction<MyMeetingListing>) {
            state.my_meeting_listing = action.payload
        },
        FetchAvailableSlots(state, action: PayloadAction<{}>) {},
        updateAvailableSlots(state, action: PayloadAction<{slots:MeetingSlot[], dates:any}>) {
            state.available_slots = action.payload.slots
            state.available_dates = action.payload.dates
        },
    },
})

// Actions
export const MeetingReservationActions = {
    FetchMyMeetingRequests: MeetingReservationSlice.actions.FetchMyMeetingRequests,
    updateMyMeetingRequests: MeetingReservationSlice.actions.updateMyMeetingRequests,
    FetchAvailableSlots: MeetingReservationSlice.actions.FetchAvailableSlots,
    updateAvailableSlots: MeetingReservationSlice.actions.updateAvailableSlots,
}

export const SelectMyMeetingListing = (state: RootState) => state.meetingReservation.my_meeting_listing

export const SelectSiteLabel = (state: RootState) => state.meetingReservation.labels

export const SelectAvailableSlots = (state: RootState) => state.meetingReservation.available_slots

export const SelectAvailableDates = (state: RootState) => state.meetingReservation.available_dates

// Reducer
export default MeetingReservationSlice.reducer