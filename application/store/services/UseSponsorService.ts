import { useCallback } from 'react'

import { SponsorActions, SelectSponsors, SelectSponsorCategories, SelectSponsorSettings, SelectSponsorCategoryID, SelectSponsorQuery, SelectSponsorDetail } from 'application/store/slices/Sponsor.Slice'

import { Sponsor } from 'application/models/sponsor/Sponsor'

import { SponsorCategory } from 'application/models/sponsor/SponsorCategory'

import { SponsorSetting } from 'application/models/sponsor/SponsorSetting'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

import { SponsorDetail } from 'application/models/sponsor/SponsorDetail'

export type SponsorServiceOperators = {
    sponsors: Sponsor[]
    categories: SponsorCategory[]
    settings: SponsorSetting
    detail: SponsorDetail
    category_id: number
    query: string
    FetchSponsors: (payload: { category_id: number, query: string }) => void
    FetchSponsorDetail: (payload: { id: number }) => void
    MakeFavourite: (payload: { sponsor_id: number, screen: string }) => void
}

/**
 * SponsorService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseSponsorService = (): Readonly<SponsorServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        sponsors: useAppSelector(SelectSponsors),
        categories: useAppSelector(SelectSponsorCategories),
        settings: useAppSelector(SelectSponsorSettings),
        category_id: useAppSelector(SelectSponsorCategoryID),
        query: useAppSelector(SelectSponsorQuery),
        detail: useAppSelector(SelectSponsorDetail),
        FetchSponsors: useCallback(
            (payload: { category_id: number, query: string }) => {
                dispatch(SponsorActions.FetchSponsors(payload))
            },
            [dispatch],
        ),
        FetchSponsorDetail: useCallback(
            (payload: { id: number }) => {
                dispatch(SponsorActions.FetchSponsorDetail(payload))
            },
            [dispatch],
        ),
        MakeFavourite: useCallback(
            (payload: { sponsor_id: number, screen: string }) => {
                dispatch(SponsorActions.MakeFavourite(payload))
            },
            [dispatch],
        )
    }
}

export default UseSponsorService