import { useCallback } from 'react'

import {
    MeetingReservationActions,
    SelectAfterLoginMyMeetingRequests,
    SelectAvailableDates,
    SelectAvailableMeetingSpaces,
    SelectAvailableSlots,
    SelectMyAvailabilityCalendar,
    SelectMyMeetingListing,
    SelectSiteLabel,
    SelectSocketRequests
} from 'application/store/slices/MeetingReservation.Slice'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

import { AvailabilityCalendarSlot, MeetingRequest, MeetingSlot, MeetingSpace, MyMeetingListing } from 'application/models/meetingReservation/MeetingReservation'
import { ToastActions } from '../slices/Toast.Slice'

export type MeetingReservationServiceOperators = {
    my_meeting_listing: MyMeetingListing,
    labels: any,
    available_slots: MeetingSlot[],
    available_meeting_spaces: MeetingSpace[],
    available_dates: any,
    socket_requests: any,
    my_availability_calendar: AvailabilityCalendarSlot[],
    after_login_my_meeting_requests: MeetingRequest[],
    FetchMyMeetingRequests: (payload: {  }) => void
    FetchAvailableSlots: (payload:{attendee_id?:number}) => void
    AcceptMeetingRequest: (payload: { meeting_request_id:number }) => void
    RejectMeetingRequest: (payload: { meeting_request_id:number }) => void
    CancelMeetingRequest: (payload: { meeting_request_id:number }) => void
    SendReminder: (payload: { meeting_request_id:number }) => void
    AddSocketRequest: (payload: { request:any }) => void
    RemoveFirstSocketRequest: () => void
    FetchMyAvailabilityCalendar: () => void
    AddAvailabilityCalendarSlot: (payload: { date:string, start_time:string, end_time:string }) => void
    DeleteAvailabilityCalendarSlot: (payload: { id:number }) => void
    FetchAfterLoginMyMeetingRequests: (payload: {  }) => void
}

/**
 * MeetingReservationService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseMeetingReservationService = (): Readonly<MeetingReservationServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        my_meeting_listing: useAppSelector(SelectMyMeetingListing),
        labels: useAppSelector(SelectSiteLabel),
        available_slots: useAppSelector(SelectAvailableSlots),
        available_meeting_spaces: useAppSelector(SelectAvailableMeetingSpaces),
        available_dates: useAppSelector(SelectAvailableDates),
        socket_requests: useAppSelector(SelectSocketRequests),
        my_availability_calendar: useAppSelector(SelectMyAvailabilityCalendar),
        after_login_my_meeting_requests: useAppSelector(SelectAfterLoginMyMeetingRequests),
        FetchMyMeetingRequests: useCallback(
            (payload: {  }) => {
                dispatch(MeetingReservationActions.FetchMyMeetingRequests(payload))
            },
            [dispatch],
        ),
        FetchAvailableSlots: useCallback(
            (payload:{attendee_id?:number}) => {
                dispatch(MeetingReservationActions.FetchAvailableSlots(payload))
            },
            [dispatch],
        ),
        AcceptMeetingRequest: useCallback(
            (payload: { meeting_request_id:number }) => {
                dispatch(MeetingReservationActions.AcceptMeetingRequest(payload))
            },
            [dispatch],
        ),
        RejectMeetingRequest: useCallback(
            (payload: { meeting_request_id:number }) => {
                dispatch(MeetingReservationActions.RejectMeetingRequest(payload))
            },
            [dispatch],
        ),
        CancelMeetingRequest: useCallback(
            (payload: { meeting_request_id:number }) => {
                dispatch(MeetingReservationActions.CancelMeetingRequest(payload))
            },
            [dispatch],
        ),
        SendReminder: useCallback(
            (payload: { meeting_request_id:number }) => {
                dispatch(MeetingReservationActions.SendReminder(payload))
            },
            [dispatch],
        ),
        AddSocketRequest: useCallback(
            (payload: { request:any }) => {
                console.log('add socket request');
                dispatch(MeetingReservationActions.AddSocketRequest(payload))
            },
            [dispatch],
        ),
        RemoveFirstSocketRequest: useCallback(
            () => {
                dispatch(MeetingReservationActions.RemoveFirstSocketRequest())
            },
            [dispatch],
        ),
        FetchMyAvailabilityCalendar: useCallback(
            () => {
                dispatch(MeetingReservationActions.FetchMyAvailabilityCalendar())
            },
            [dispatch],
        ),
        AddAvailabilityCalendarSlot: useCallback(
            (payload: { date:string, start_time:string, end_time:string }) => {
                dispatch(MeetingReservationActions.AddAvailabilityCalendarSlot(payload))
            },
            [dispatch],
        ),
        DeleteAvailabilityCalendarSlot: useCallback(
            (payload: { id:number }) => {
                dispatch(MeetingReservationActions.DeleteAvailabilityCalendarSlot(payload))
            },
            [dispatch],
        ),
        FetchAfterLoginMyMeetingRequests: useCallback(
            (payload: {  }) => {
                dispatch(MeetingReservationActions.FetchAfterLoginMyMeetingRequests(payload))
            },
            [dispatch],
        ),
    }
}

export default UseMeetingReservationService