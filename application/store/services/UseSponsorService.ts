import { useCallback } from 'react'

import { SponsorActions, SelectSponsors, SelectSponsorCategories } from 'application/store/slices/Sponsor.Slice'

import { Sponsor } from 'application/models/Sponsor'

import { SponsorCategory } from 'application/models/SponsorCategory'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type SponsorServiceOperators = {
    sponsors: Sponsor[]
    categories: SponsorCategory[]
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
        FetchSponsors: useCallback(
            () => {
                dispatch(SponsorActions.FetchSponsors())
            },
            [dispatch],
        )
    }
}

export default UseSponsorService