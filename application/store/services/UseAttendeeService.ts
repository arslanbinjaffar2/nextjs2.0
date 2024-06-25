import { useCallback } from 'react'

import { AttendeeActions, SelectAttendees, SelectQuery, SelectPage, SelectGroups, SelectGroup, SelectGroupName, SelectAttendeeDetail, SelectAttendeeCategory, SelectCategories, SelectCategoryName, SelectMyAttendees, SelectSelectTotal, SelectHotels, SelectCategoryParendId, SelectMyRegistration, SelectLastPage, SelectCategoryBreadcrumbs } from 'application/store/slices/Attendee.Slice'

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
    hotels:any
    last_page: number
    registration:any
    parent_id:number
    FetchAttendees: (payload: { group_id: number, query: string, page: number, my_attendee_id: number, speaker: number, category_id: number, screen: string, program_id: number }) => void
    FetchGroups: (payload: { query: string, page: number, group_id: number, attendee_id: number, program_id: number }) => void
    ResetGroups: () => void
    MakeFavourite: (payload: { attendee_id: number, screen: string }) => void
    FetchAttendeeDetail: (payload: { id: number, speaker: number }) => void
    UpdateCategory: (payload: { category_id: number, category_name: string, parent_id:number }) => void
    FetchCategories: (payload: { parent_id: number, query: string, page: number, cat_type: string }) => void
    FetchHotels: () => void,
    FetchMyRegistration: () => void,
    setBreadcrumbs: (breadcrumbs: Category[]) => void,
    updateBreadcrumb: (category: Category) => void,
    categoryBreadcrumbs: Category[],
    addGDPRlog: (payload: {gdpr: number}) => void
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
        parent_id: useAppSelector(SelectCategoryParendId),
        attendees: useAppSelector(SelectAttendees),
        my_attendees: useAppSelector(SelectMyAttendees),
        groups: useAppSelector(SelectGroups),
        detail: useAppSelector(SelectAttendeeDetail),
        categories: useAppSelector(SelectCategories),
        total: useAppSelector(SelectSelectTotal),
        hotels: useAppSelector(SelectHotels),
        last_page: useAppSelector(SelectLastPage),
        registration: useAppSelector(SelectMyRegistration),
        categoryBreadcrumbs: useAppSelector(SelectCategoryBreadcrumbs),
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
        ResetGroups: useCallback(
            () => {
                dispatch(AttendeeActions.ResetGroups())
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
            (payload: { category_id: number, category_name: string, parent_id:number }) => {
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
        FetchHotels: useCallback(
            () => {
                dispatch(AttendeeActions.FetchHotels())
            },
            [dispatch],
        ),
        FetchMyRegistration: useCallback(
            () => {
                dispatch(AttendeeActions.FetchMyRegistration())
            },
            [dispatch],
        ),
        setBreadcrumbs: useCallback(
            (breadcrumbs: Category[]) => {
                dispatch(AttendeeActions.setBreadcrumbs(breadcrumbs))
            },
            [dispatch],
        ),
        updateBreadcrumb: useCallback(
            (category: Category) => {
                dispatch(AttendeeActions.updateBreadcrumb(category))
            },
            [dispatch],
        ),
        addGDPRlog: useCallback(
            (payload: {gdpr: number}) => {
                dispatch(AttendeeActions.addGDPRlog(payload))
            },
            [dispatch],
        ),
    }
}

export default UseAttendeeService