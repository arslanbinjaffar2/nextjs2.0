import { useCallback } from 'react'

import { SelectSocialWallPosts, SocialWallActions, SelectPage, SelectLastPage } from 'application/store/slices/SocialWall.Slice'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { Post } from 'application/models/socialWall/SocialWall'

export type SocialWallServiceOperators = {
    page: number,
    last_page: number,
    posts: Post[],
    FetchSocialWallPosts:  (payload: { page: number}) => void,
}

/**
 * SocialWallService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const useSocialWallService = (): Readonly<SocialWallServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        last_page: useAppSelector(SelectLastPage),
        page: useAppSelector(SelectPage),
        posts: useAppSelector(SelectSocialWallPosts),
        FetchSocialWallPosts: useCallback(
            (payload: { page: number}) => {
                dispatch(SocialWallActions.FetchSocialWallPosts(payload))
            },
            [dispatch],
        ),
    }
}

export default useSocialWallService
