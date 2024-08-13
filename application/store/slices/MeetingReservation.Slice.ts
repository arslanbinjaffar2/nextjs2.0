import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AvailabilityCalendarSlot, MeetingRequest, MeetingSpace, MyMeetingListing } from 'application/models/meetingReservation/MeetingReservation'
import { MeetingSlot } from 'application/models/meetingReservation/MeetingReservation'

import type { RootState } from 'application/store/Index'
import AsyncStorageClass from 'application/utils/AsyncStorageClass'
import { Platform } from 'react-native'
import { NotificationActions } from 'application/store/slices/Notification.Slice'

export interface MeetingReservationState {
    my_meeting_listing: MyMeetingListing,
    available_slots: MeetingSlot[],
    available_meeting_spaces: MeetingSpace[],
    available_dates: any,
    labels: any,
    socket_requests: any,
    my_availability_calendar: AvailabilityCalendarSlot[],
    after_login_my_meeting_requests: MeetingRequest[],
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
    after_login_my_meeting_requests: [],
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
        DeleteAvailabilityCalendarSlot(state, action: PayloadAction<{ id:number }>) {
            state.my_availability_calendar = state.my_availability_calendar.filter((item:AvailabilityCalendarSlot) => item.id !== action.payload.id)
        },
        FetchAfterLoginMyMeetingRequests(state, action: PayloadAction<{  }>) {},
        updateAfterLoginMyMeetingRequests(state, action: PayloadAction<{ my_meeting_requests:MeetingRequest[] }>) {
            if(action?.payload?.my_meeting_requests && action?.payload?.my_meeting_requests?.length > 0){
                NotificationActions.addNotification({
                    notification:{
                      type:'pending-appointment-alert',
                      title: 'Pending Appointment requests',
                      text: 'You have pending appointment requests. Please check your appointment requests.',
                      btnLeftText:'ok',
                      btnRightText:'Go To Appointments',
                      url:'/reservation?tab=requested'
                    }
                  })
            }
            // add skip 
            // if(Platform.OS === 'web'){
            //     localStorage.setItem('skip_pending_appointment_alerts','true');
            // }else{
            // AsyncStorageClass.setItem('skip_pending_appointment_alerts',true)
            // }
           
        },
        clearState(state,action:PayloadAction<{event_url:string}>) {
            if(Platform.OS === 'web'){
                localStorage.removeItem(`skip_pending_appointment_alerts_${action.payload.event_url}`);
            }else{
                AsyncStorageClass.removeItem(`skip_pending_appointment_alerts_${action.payload.event_url}`);
            }
        }
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
    FetchAfterLoginMyMeetingRequests: MeetingReservationSlice.actions.FetchAfterLoginMyMeetingRequests,
    updateAfterLoginMyMeetingRequests: MeetingReservationSlice.actions.updateAfterLoginMyMeetingRequests,
    clearState: MeetingReservationSlice.actions.clearState,
}

export const SelectMyMeetingListing = (state: RootState) => state.meetingReservation.my_meeting_listing

export const SelectSiteLabel = (state: RootState) => state.meetingReservation.labels

export const SelectAvailableSlots = (state: RootState) => state.meetingReservation.available_slots

export const SelectAvailableDates = (state: RootState) => state.meetingReservation.available_dates

export const SelectSocketRequests = (state: RootState) => state.meetingReservation.socket_requests

export const SelectAvailableMeetingSpaces = (state: RootState) => state.meetingReservation.available_meeting_spaces

export const SelectMyAvailabilityCalendar = (state: RootState) => state.meetingReservation.my_availability_calendar

export const SelectAfterLoginMyMeetingRequests = (state: RootState) => state.meetingReservation.after_login_my_meeting_requests

// Reducer
export default MeetingReservationSlice.reducer