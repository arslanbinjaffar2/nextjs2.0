import { useCallback } from 'react'

import { SponsorActions, SelectSponsors, SelectSponsorCategories, SelectSponsorSettings, SelectSponsorCategoryID, SelectSponsorQuery } from 'application/store/slices/Sponsor.Slice'

import { Sponsor } from 'application/models/Sponsor'

import { SponsorCategory } from 'application/models/SponsorCategory'

import { SponsorSetting } from 'application/models/SponsorSetting'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type SponsorServiceOperators = {
    sponsors: Sponsor[]
    categories: SponsorCategory[]
    settings: SponsorSetting
    category_id: number
    query: string
    FetchSponsors: (payload: { category_id: number, query: string }) => void
    MakeFavourite: (payload: { sponsor_id: number }) => void
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
        FetchSponsors: useCallback(
            (payload: { category_id: number, query: string }) => {
                dispatch(SponsorActions.FetchSponsors(payload))
            },
            [dispatch],
        ),
        MakeFavourite: useCallback(
            (payload: { sponsor_id: number }) => {
                dispatch(SponsorActions.MakeFavourite(payload))
            },
            [dispatch],
        )
    }
}

export default UseSponsorService