import { useCallback } from 'react'

import { AttendeeActions, SelectAttendees, SelectQuery, SelectPage, SelectGroups, SelectGroup, SelectGroupName } from 'application/store/slices/Attendee.Slice'

import { Attendee } from 'application/models/attendee/Attendee'

import { Group } from 'application/models/attendee/Group'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type AttendeeServiceOperators = {
    query: string
    page: number
    group_id: number
    group_name: string
    attendees: Attendee[]
    groups: Group[]
    FetchAttendees: (payload: { group_id: number, query: string, page: number, my_attendee_id: number }) => void
    FetchGroups: (payload: { query: string, page: number, group_id: number }) => void
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
        group_id: useAppSelector(SelectGroup),
        group_name: useAppSelector(SelectGroupName),
        attendees: useAppSelector(SelectAttendees),
        groups: useAppSelector(SelectGroups),
        FetchAttendees: useCallback(
            (payload: { group_id: number, query: string, page: number, my_attendee_id: number }) => {
                dispatch(AttendeeActions.FetchAttendees(payload))
            },
            [dispatch],
        ),
        FetchGroups: useCallback(
            (payload: { query: string, page: number, group_id: number }) => {
                dispatch(AttendeeActions.FetchGroups(payload))
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