import { useCallback } from 'react'

import {
    SelectSocialWallPosts,
    SocialWallActions,
    SelectPage,
    SelectLastPage,
    SelectSortBy,
    SelectSocialWallPostDetail,
    selectlabels
} from 'application/store/slices/SocialWall.Slice'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { Post } from 'application/models/socialWall/SocialWall'

export type SocialWallServiceOperators = {
    page: number,
    last_page: number,
    sort_by: string,
    post_detail: Post,
    labels:any,
    posts: Post[],
    FetchSocialWallPosts:  (payload: { page: number, sort_by:string , attendee_id:number}) => void,
    AddSocialWallPost:  (data:any) => void;
    UpdateSocialWallPost:  (data:any) => void;
    LikeSocialWallPost:  (payload: { id: number}) => void;
    DetailSocialWallPost:  (payload: { id: number}) => void;
    SaveSocialWallComment:  (data:any) => void;
    LikeSocialWallComment:  (payload: { id: number}) => void;
    DeleteSocialWallPost:  (payload: { id: number}) => void;
    SocialWallPostsUpdated:  (payload: { post: Post}) => void;
    SocialWallPostDeleted:  (payload: { post_id: number}) => void;
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
        labels: useAppSelector(selectlabels),
        posts: useAppSelector(SelectSocialWallPosts),
        sort_by: useAppSelector(SelectSortBy),
        post_detail: useAppSelector(SelectSocialWallPostDetail),
        FetchSocialWallPosts: useCallback(
            (payload: { page: number, sort_by:string, attendee_id:number}) => {
                dispatch(SocialWallActions.FetchSocialWallPosts(payload))
            },
            [dispatch],
        ),
        AddSocialWallPost: useCallback(
            (payload: any) => {
                dispatch(SocialWallActions.AddSocialWallPost(payload))
            },
            [dispatch],
        ),
        UpdateSocialWallPost: useCallback(
            (payload: any) => {
                dispatch(SocialWallActions.UpdateSocialWallPost(payload))
            },
            [dispatch],
        ),
        LikeSocialWallPost: useCallback(
            (payload: { id: number}) => {
                dispatch(SocialWallActions.LikeSocialWallPost(payload))
            },
            [dispatch],
        ),
        SaveSocialWallComment: useCallback(
            (payload: any) => {
                dispatch(SocialWallActions.SaveSocialWallComment(payload))
            },
            [dispatch],
        ),
        LikeSocialWallComment: useCallback(
            (payload: { id: number}) => {
                dispatch(SocialWallActions.LikeSocialWallComment(payload))
            },
            [dispatch],
        ),
        SocialWallPostsUpdated: useCallback(
            (payload: { post: Post}) => {
                dispatch(SocialWallActions.SocialWallPostsUpdated(payload))
            },
            [dispatch],
        ),
        DeleteSocialWallPost: useCallback(
            (payload: { id: number}) => {
                dispatch(SocialWallActions.DeleteSocialWallPost(payload))
            },
            [dispatch],
        ),
        SocialWallPostDeleted: useCallback(
            (payload: { post_id: number}) => {
                dispatch(SocialWallActions.SocialWallPostDeleted(payload))
            },
            [dispatch],
        ),
        DetailSocialWallPost: useCallback(
            (payload: { id: number}) => {
                dispatch(SocialWallActions.DetailSocialWallPost(payload))
            },
            [dispatch],
        ),
        
    }
}

export default useSocialWallService
