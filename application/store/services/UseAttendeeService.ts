import { useCallback } from 'react'

import { AttendeeActions, SelectAttendees, SelectQuery, SelectPage } from 'application/store/slices/Attendee.Slice'

import { Attendee } from 'application/models/attendee/Attendee'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type AttendeeServiceOperators = {
    query: string
    page: number
    attendees: Attendee[]
    FetchAttendees: (payload: { group_id: number, query: string, page: number, my_attendee_id: number }) => void
    MakeFavourite: (payload: { attendee_id: number }) => void
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseAttendeeService = (): Readonly<AttendeeServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        query: useAppSelector(SelectQuery),
        page: useAppSelector(SelectPage),
        attendees: useAppSelector(SelectAttendees),
        FetchAttendees: useCallback(
            (payload: { group_id: number, query: string, page: number, my_attendee_id: number }) => {
                dispatch(AttendeeActions.FetchAttendees(payload))
            },
            [dispatch],
        ),
        MakeFavourite: useCallback(
            (payload: { attendee_id: number }) => {
                dispatch(AttendeeActions.MakeFavourite(payload))
            },
            [dispatch],
        )
    }
}

export default UseAttendeeService