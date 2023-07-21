import { useCallback } from 'react'

import { SponsorActions, SelectSponsors, SelectSponsorCategories, SelectSponsorSettings } from 'application/store/slices/Sponsor.Slice'

import { Sponsor } from 'application/models/Sponsor'

import { SponsorCategory } from 'application/models/SponsorCategory'

import { SponsorSetting } from 'application/models/SponsorSetting'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type SponsorServiceOperators = {
    sponsors: Sponsor[]
    categories: SponsorCategory[]
    settings: SponsorSetting
    FetchSponsors: () => void
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
        FetchSponsors: useCallback(
            () => {
                dispatch(SponsorActions.FetchSponsors())
            },
            [dispatch],
        )
    }
}

export default UseSponsorService