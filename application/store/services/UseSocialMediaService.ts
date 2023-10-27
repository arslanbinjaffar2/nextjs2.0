import { useCallback } from 'react'

import { SelectSocialMedias, SocialMediaActions,  } from 'application/store/slices/SocialMedia.Slice'

import {  SocialMedia } from 'application/models/socialMedia/SocialMedia'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type SocialMediaServiceOperators = {
    socialMedia: SocialMedia[],
    FetchSocialMedias: () => void,
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseSocialMediaService = (): Readonly<SocialMediaServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        socialMedia: useAppSelector(SelectSocialMedias),
        FetchSocialMedias: useCallback(
            () => {
                dispatch(SocialMediaActions.FetchSocialMedias())
            },
            [dispatch],
        ),
    }
}

export default UseSocialMediaService
