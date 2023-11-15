import { useCallback } from 'react'

import { AttendeeActions, SelectAttendees, SelectQuery, SelectPage, SelectGroups, SelectGroup, SelectGroupName, SelectAttendeeDetail, SelectAttendeeCategory, SelectCategories, SelectCategoryName, SelectMyAttendees, SelectSelectTotal } from 'application/store/slices/Attendee.Slice'

import { Attendee } from 'application/models/attendee/Attendee'

import { Detail } from 'application/models/attendee/Detail'

import { Group } from 'application/models/attendee/Group'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { Category } from 'application/models/event/Category'

export type AttendeeServiceOperators = {
    query: string
    page: number
    group_id: number
    category_id: number
    group_name: string
    category_name: string
    attendees: Attendee[]
    my_attendees: Attendee[]
    detail: Detail
    groups: Group[]
    categories: Category[]
    total: Number
    FetchAttendees: (payload: { group_id: number, query: string, page: number, my_attendee_id: number, speaker: number, category_id: number, screen: string, program_id: number }) => void
    FetchGroups: (payload: { query: string, page: number, group_id: number, attendee_id: number, program_id: number }) => void
    MakeFavourite: (payload: { attendee_id: number, screen: string }) => void
    FetchAttendeeDetail: (payload: { id: number, speaker: number }) => void
    UpdateCategory: (payload: { category_id: number, category_name: string }) => void
    FetchCategories: (payload: { parent_id: number, query: string, page: number, cat_type: string }) => void
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
        category_id: useAppSelector(SelectAttendeeCategory),
        group_name: useAppSelector(SelectGroupName),
        category_name: useAppSelector(SelectCategoryName),
        attendees: useAppSelector(SelectAttendees),
        my_attendees: useAppSelector(SelectMyAttendees),
        groups: useAppSelector(SelectGroups),
        detail: useAppSelector(SelectAttendeeDetail),
        categories: useAppSelector(SelectCategories),
        total: useAppSelector(SelectSelectTotal),
        FetchAttendees: useCallback(
            (payload: { group_id: number, query: string, page: number, my_attendee_id: number, speaker: number, category_id: number, screen: string, program_id: number }) => {
                dispatch(AttendeeActions.FetchAttendees(payload))
            },
            [dispatch],
        ),
        FetchGroups: useCallback(
            (payload: { query: string, page: number, group_id: number, attendee_id: number, program_id: number }) => {
                dispatch(AttendeeActions.FetchGroups(payload))
            },
            [dispatch],
        ),
        MakeFavourite: useCallback(
            (payload: { attendee_id: number, screen: string }) => {
                dispatch(AttendeeActions.MakeFavourite(payload))
            },
            [dispatch],
        ),
        FetchAttendeeDetail: useCallback(
            (payload: { id: number, speaker: number }) => {
                dispatch(AttendeeActions.FetchAttendeeDetail(payload))
            },
            [dispatch],
        ),
        UpdateCategory: useCallback(
            (payload: { category_id: number, category_name: string }) => {
                dispatch(AttendeeActions.UpdateCategory(payload))
            },
            [dispatch],
        ),
        FetchCategories: useCallback(
            (payload: { parent_id: number, query: string, page: number, cat_type: string }) => {
                dispatch(AttendeeActions.FetchCategories(payload))
            },
            [dispatch],
        ),
    }
}

export default UseAttendeeService