import { useCallback } from 'react'

import {
    MeetingReservationActions,
    SelectAvailableDates,
    SelectAvailableMeetingSpaces,
    SelectAvailableSlots,
    SelectMyMeetingListing,
    SelectSiteLabel,
    SelectSocketRequests
} from 'application/store/slices/MeetingReservation.Slice'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

import { MeetingRequest, MeetingSlot, MeetingSpace, MyMeetingListing } from 'application/models/meetingReservation/MeetingReservation'

export type MeetingReservationServiceOperators = {
    my_meeting_listing: MyMeetingListing,
    labels: any,
    available_slots: MeetingSlot[],
    available_meeting_spaces: MeetingSpace[],
    available_dates: any,
    socket_requests: any,
    FetchMyMeetingRequests: (payload: {  }) => void
    FetchAvailableSlots: () => void
    AcceptMeetingRequest: (payload: { meeting_request_id:number }) => void
    RejectMeetingRequest: (payload: { meeting_request_id:number }) => void
    CancelMeetingRequest: (payload: { meeting_request_id:number }) => void
    SendReminder: (payload: { meeting_request_id:number }) => void
    AddSocketRequest: (payload: { request:any }) => void
    RemoveFirstSocketRequest: () => void
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
        FetchMyMeetingRequests: useCallback(
            (payload: {  }) => {
                dispatch(MeetingReservationActions.FetchMyMeetingRequests(payload))
            },
            [dispatch],
        ),
        FetchAvailableSlots: useCallback(
            () => {
                dispatch(MeetingReservationActions.FetchAvailableSlots({}))
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
    }
}

export default UseMeetingReservationService