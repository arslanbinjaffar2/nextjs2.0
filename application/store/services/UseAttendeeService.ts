import { useCallback } from 'react'

import { AttendeeActions, SelectAttendees, SelectData, SelectQuery } from 'application/store/slices/Attendee.Slice'

import { Attendee } from 'application/models/attendee/Attendee'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type AttendeeServiceOperators = {
    query: string
    data: Attendee[]
    attendees: Attendee[]
    FetchAttendees: () => void
    FilterAttendees: (payload: { attendee_id: number, query: string }) => void
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseAttendeeService = (): Readonly<AttendeeServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        query: useAppSelector(SelectQuery),
        attendees: useAppSelector(SelectAttendees),
        data: useAppSelector(SelectData),
        FetchAttendees: useCallback(
            () => {
                dispatch(AttendeeActions.FetchAttendees())
            },
            [dispatch],
        ),
        FilterAttendees: useCallback(
            (payload: { attendee_id: number, query: string }) => {
                dispatch(AttendeeActions.FilterAttendees(payload))
            },
            [dispatch],
        )
    }
}

export default UseAttendeeService