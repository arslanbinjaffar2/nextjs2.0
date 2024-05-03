import { useCallback } from 'react'

import {
    MeetingReservationActions,
    SelectAvailableDates,
    SelectAvailableSlots,
    SelectMyMeetingListing,
    SelectSiteLabel
} from 'application/store/slices/MeetingReservation.Slice'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

import { MeetingRequest, MeetingSlot, MyMeetingListing } from 'application/models/meetingReservation/MeetingReservation'

export type MeetingReservationServiceOperators = {
    my_meeting_listing: MyMeetingListing,
    labels: any,
    available_slots: MeetingSlot[],
    available_dates: any,
    FetchMyMeetingRequests: (payload: {  }) => void
    FetchAvailableSlots: () => void
    AcceptMeetingRequest: (payload: { meeting_request_id:number }) => void
    RejectMeetingRequest: (payload: { meeting_request_id:number }) => void
    CancelMeetingRequest: (payload: { meeting_request_id:number }) => void
    SendReminder: (payload: { meeting_request_id:number }) => void
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
        available_dates: useAppSelector(SelectAvailableDates),
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
    }
}

export default UseMeetingReservationService