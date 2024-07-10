import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AvailabilityCalendarSlot, MeetingRequest, MeetingSpace, MyMeetingListing } from 'application/models/meetingReservation/MeetingReservation'
import { MeetingSlot } from 'application/models/meetingReservation/MeetingReservation'

import type { RootState } from 'application/store/Index'

export interface MeetingReservationState {
    my_meeting_listing: MyMeetingListing,
    available_slots: MeetingSlot[],
    available_meeting_spaces: MeetingSpace[],
    available_dates: any,
    labels: any,
    socket_requests: any,
    my_availability_calendar: AvailabilityCalendarSlot[],
}

const initialState: MeetingReservationState = {
    my_meeting_listing: {   
        my_meeting_requests: [],
        labels: [],
        dates: [],
        statuses: [],
        isChatModuleActive: false,
    },
    labels: [],
    available_slots: [],
    available_meeting_spaces: [],
    available_dates: [],
    socket_requests: [],
    my_availability_calendar: [],
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
        FetchAvailableSlots(state, action: PayloadAction<{attendee_id?:number}>) {
            if(!action.payload.attendee_id){
                action.payload.attendee_id=0;
            }
        },
        updateAvailableSlots(state, action: PayloadAction<{slots:MeetingSlot[], dates:any}>) {
            state.available_slots = action.payload.slots
            state.available_dates = action.payload.dates
        },
        AcceptMeetingRequest(state, action: PayloadAction<{ meeting_request_id:number }>) {},
        RejectMeetingRequest(state, action: PayloadAction<{ meeting_request_id:number }>) {},
        CancelMeetingRequest(state, action: PayloadAction<{ meeting_request_id:number }>) {},
        SendReminder(state, action: PayloadAction<{ meeting_request_id:number }>) {},
        updateLabels(state, action: PayloadAction<{labels:any}>) {
            state.labels = action.payload.labels
        },
        AddSocketRequest(state, action: PayloadAction<{ request:any }>) {
            state.socket_requests = [...state.socket_requests, action.payload.request];
        },
        RemoveFirstSocketRequest(state) {
            if(state.socket_requests.length > 0){
                state.socket_requests = state.socket_requests.slice(1);
            }
        },
        updateAvailableMeetingSpaces(state, action: PayloadAction<{ meeting_spaces:MeetingSpace[] }>) {
            state.available_meeting_spaces = action.payload.meeting_spaces
        },
        FetchMyAvailabilityCalendar(state) {
            
        },
        updateMyAvailabilityCalendar(state, action: PayloadAction<{ availability_calendar:AvailabilityCalendarSlot[] }>) {
            state.my_availability_calendar = action.payload.availability_calendar
        },
        AddAvailabilityCalendarSlot(state, action: PayloadAction<{ date:string, start_time:string, end_time:string }>) {
           
        },
        DeleteAvailabilityCalendarSlot(state, action: PayloadAction<{ availability_calendar_id:number }>) {
            // state.my_availability_calendar = state.my_availability_calendar.filter((item:AvailabilityCalendarSlot) => item.id !== action.payload.availability_calendar_id)
        },
    },
})

// Actions
export const MeetingReservationActions = {
    FetchMyMeetingRequests: MeetingReservationSlice.actions.FetchMyMeetingRequests,
    updateMyMeetingRequests: MeetingReservationSlice.actions.updateMyMeetingRequests,
    FetchAvailableSlots: MeetingReservationSlice.actions.FetchAvailableSlots,
    updateAvailableSlots: MeetingReservationSlice.actions.updateAvailableSlots,
    AcceptMeetingRequest: MeetingReservationSlice.actions.AcceptMeetingRequest,
    RejectMeetingRequest: MeetingReservationSlice.actions.RejectMeetingRequest,
    CancelMeetingRequest: MeetingReservationSlice.actions.CancelMeetingRequest,
    SendReminder: MeetingReservationSlice.actions.SendReminder,
    updateLabels: MeetingReservationSlice.actions.updateLabels,
    AddSocketRequest: MeetingReservationSlice.actions.AddSocketRequest,
    RemoveFirstSocketRequest: MeetingReservationSlice.actions.RemoveFirstSocketRequest,
    updateAvailableMeetingSpaces: MeetingReservationSlice.actions.updateAvailableMeetingSpaces,
    FetchMyAvailabilityCalendar: MeetingReservationSlice.actions.FetchMyAvailabilityCalendar,
    updateMyAvailabilityCalendar: MeetingReservationSlice.actions.updateMyAvailabilityCalendar,
    AddAvailabilityCalendarSlot: MeetingReservationSlice.actions.AddAvailabilityCalendarSlot,
    DeleteAvailabilityCalendarSlot: MeetingReservationSlice.actions.DeleteAvailabilityCalendarSlot,
}

export const SelectMyMeetingListing = (state: RootState) => state.meetingReservation.my_meeting_listing

export const SelectSiteLabel = (state: RootState) => state.meetingReservation.labels

export const SelectAvailableSlots = (state: RootState) => state.meetingReservation.available_slots

export const SelectAvailableDates = (state: RootState) => state.meetingReservation.available_dates

export const SelectSocketRequests = (state: RootState) => state.meetingReservation.socket_requests

export const SelectAvailableMeetingSpaces = (state: RootState) => state.meetingReservation.available_meeting_spaces

export const SelectMyAvailabilityCalendar = (state: RootState) => state.meetingReservation.my_availability_calendar

// Reducer
export default MeetingReservationSlice.reducer