import { useCallback } from 'react'

import { AttendeeActions, SelectAttendees, SelectData, SelectQuery, SelectPage } from 'application/store/slices/Attendee.Slice'

import { Attendee } from 'application/models/attendee/Attendee'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type AttendeeServiceOperators = {
    query: string
    page: number
    data: Attendee[]
    attendees: Attendee[]
    FetchAttendees: (payload: { group_id: number, query: string, page: number }) => void
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
        data: useAppSelector(SelectData),
        FetchAttendees: useCallback(
            (payload: { group_id: number, query: string, page: number }) => {
                dispatch(AttendeeActions.FetchAttendees(payload))
            },
            [dispatch],
        )
    }
}

export default UseAttendeeService