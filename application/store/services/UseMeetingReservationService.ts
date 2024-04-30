import { useCallback } from 'react'

import {
    MeetingReservationActions,
    SelectAvailableDates,
    SelectAvailableSlots,
    SelectMyMeetingRequests,
    SelectSiteLabel
} from 'application/store/slices/MeetingReservation.Slice'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

import { MeetingRequest, MeetingSlot } from 'application/models/meetingReservation/MeetingReservation'

export type MeetingReservationServiceOperators = {
    my_meeting_requests: MeetingRequest[],
    labels: any,
    available_slots: MeetingSlot[],
    available_dates: any,
    FetchMyMeetingRequests: (payload: {  }) => void
    FetchAvailableSlots: () => void
}

/**
 * MeetingReservationService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseMeetingReservationService = (): Readonly<MeetingReservationServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        my_meeting_requests: useAppSelector(SelectMyMeetingRequests),
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
    }
}

export default UseMeetingReservationService