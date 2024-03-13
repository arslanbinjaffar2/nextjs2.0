import { useCallback } from 'react'

import { ExhibitorActions, SelectExhibitors, SelectExhibitorCategories, SelectExhibitorSettings, SelectExhibitorCategoryID, SelectExhibitorQuery, SelectExhibitorDetail, SelectOurExhibitors, SelectMyExhibitors ,SelectSiteLabel} from 'application/store/slices/Exhibitor.Slice'

import { Exhibitor } from 'application/models/exhibitor/Exhibitor'

import { ExhibitorCategory } from 'application/models/exhibitor/ExhibitorCategory'

import { ExhibitorSetting } from 'application/models/exhibitor/ExhibitorSetting'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

import { ExhibitorDetail } from 'application/models/exhibitor/ExhibitorDetail'

export type ExhibitorServiceOperators = {
    exhibitors: Exhibitor[]
    our_exhibitors: Exhibitor[]
    my_exhibitors: Exhibitor[]
    labels: any
    categories: ExhibitorCategory[]
    settings: ExhibitorSetting
    detail: ExhibitorDetail|null
    category_id: number
    query: string
    FetchExhibitors: (payload: { category_id: number, query: string, screen: string }) => void
    FetchMyExhibitors: () => void
    FetchOurExhibitors: () => void
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
        labels: useAppSelector(SelectSiteLabel),
        our_exhibitors: useAppSelector(SelectOurExhibitors),
        my_exhibitors: useAppSelector(SelectMyExhibitors),
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
        FetchMyExhibitors: useCallback(
            () => {
                dispatch(ExhibitorActions.FetchMyExhibitors({}))
            },
            [dispatch],
        ),
        FetchOurExhibitors: useCallback(
            () => {
                dispatch(ExhibitorActions.FetchOurExhibitors({}))
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