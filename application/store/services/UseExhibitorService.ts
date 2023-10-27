import { useCallback } from 'react'

import { ExhibitorActions, SelectExhibitors, SelectExhibitorCategories, SelectExhibitorSettings, SelectExhibitorCategoryID, SelectExhibitorQuery, SelectExhibitorDetail, SelectOurExhibitors } from 'application/store/slices/Exhibitor.Slice'

import { Exhibitor } from 'application/models/exhibitor/Exhibitor'

import { ExhibitorCategory } from 'application/models/exhibitor/ExhibitorCategory'

import { ExhibitorSetting } from 'application/models/exhibitor/ExhibitorSetting'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

import { ExhibitorDetail } from 'application/models/exhibitor/ExhibitorDetail'

export type ExhibitorServiceOperators = {
    exhibitors: Exhibitor[]
    our_exhibitors: Exhibitor[]
    categories: ExhibitorCategory[]
    settings: ExhibitorSetting
    detail: ExhibitorDetail
    category_id: number
    query: string
    FetchExhibitors: (payload: { category_id: number, query: string, screen: string }) => void
    FetchExhibitorDetail: (payload: { id: number }) => void
    MakeFavourite: (payload: { exhibitor_id: number, screen: string }) => void
}

/**
 * ExhibitorService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseExhibitorService = (): Readonly<ExhibitorServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        exhibitors: useAppSelector(SelectExhibitors),
        our_exhibitors: useAppSelector(SelectOurExhibitors),
        categories: useAppSelector(SelectExhibitorCategories),
        settings: useAppSelector(SelectExhibitorSettings),
        category_id: useAppSelector(SelectExhibitorCategoryID),
        query: useAppSelector(SelectExhibitorQuery),
        detail: useAppSelector(SelectExhibitorDetail),
        FetchExhibitors: useCallback(
            (payload: { category_id: number, query: string, screen: string }) => {
                dispatch(ExhibitorActions.FetchExhibitors(payload))
            },
            [dispatch],
        ),
        FetchExhibitorDetail: useCallback(
            (payload: { id: number }) => {
                dispatch(ExhibitorActions.FetchExhibitorDetail(payload))
            },
            [dispatch],
        ),
        MakeFavourite: useCallback(
            (payload: { exhibitor_id: number, screen: string }) => {
                dispatch(ExhibitorActions.MakeFavourite(payload))
            },
            [dispatch],
        )
    }
}

export default UseExhibitorService