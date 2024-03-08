import { useCallback } from 'react'

import {
    SponsorActions,
    SelectSponsors,
    SelectSponsorCategories,
    SelectSponsorSettings,
    SelectSponsorCategoryID,
    SelectSponsorQuery,
    SelectSponsorDetail,
    SelectOurSponsors,
    SelectMySponsors,
    SelectSiteLabel,
    SelectSponsorContact
} from 'application/store/slices/Sponsor.Slice'

import { Sponsor } from 'application/models/sponsor/Sponsor'

import { SponsorCategory } from 'application/models/sponsor/SponsorCategory'

import { SponsorSetting } from 'application/models/sponsor/SponsorSetting'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

import { SponsorDetail } from 'application/models/sponsor/SponsorDetail'
import { SponsorContact } from 'application/models/sponsor/SponsorDetail'

export type SponsorServiceOperators = {
    sponsors: Sponsor[]
    our_sponsors: Sponsor[]
    labels: any
    my_sponsors: Sponsor[]
    categories: SponsorCategory[]
    settings: SponsorSetting
    detail: SponsorDetail | null
    contact: SponsorContact | null
    category_id: number
    query: string
    FetchSponsors: (payload: { category_id: number, query: string, screen: string }) => void
    FetchMySponsors: (payload: { }) => void
    FetchSponsorContact: (payload: {id:number }) => void
    FetchOurSponsors: () => void
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
        labels: useAppSelector(SelectSiteLabel),
        our_sponsors: useAppSelector(SelectOurSponsors),
        my_sponsors: useAppSelector(SelectMySponsors),
        categories: useAppSelector(SelectSponsorCategories),
        settings: useAppSelector(SelectSponsorSettings),
        category_id: useAppSelector(SelectSponsorCategoryID),
        query: useAppSelector(SelectSponsorQuery),
        detail: useAppSelector(SelectSponsorDetail),
        contact: useAppSelector(SelectSponsorContact),
        FetchSponsors: useCallback(
            (payload: { category_id: number, query: string, screen: string }) => {
                dispatch(SponsorActions.FetchSponsors(payload))
            },
            [dispatch],
        ),
        FetchMySponsors: useCallback(
            (payload: { }) => {
                dispatch(SponsorActions.FetchMySponsors(payload))
            },
            [dispatch],
        ),
        FetchOurSponsors: useCallback(
            () => {
                dispatch(SponsorActions.FetchOurSponsors({}))
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
        ),
        FetchSponsorContact: useCallback(
          (payload: { id: number }) => {
              dispatch(SponsorActions.FetchSponsorContact(payload))
          },
          [dispatch],
        ),
    }
}

export default UseSponsorService