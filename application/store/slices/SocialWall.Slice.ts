import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';
import { Post } from 'application/models/socialWall/SocialWall';

export interface SocialWallState {
    page: number;
    post_detail: Post;
    last_page: number;
    posts: Post[];
    filters: any[];
    sort_by: string;
}

const initialState: SocialWallState = {
    post_detail: {} as Post,
    posts: [],
    filters: [],
    page: 1,
    last_page: 1,
    sort_by: 'id',
}

// Slice
export const socialWallSlice = createSlice({
    name: 'socialWall',
    initialState,
    reducers: {
        FetchSocialWallPosts(state, action: PayloadAction<{ page: number, sort_by:string, attendee_id:number}>) {
            state.page = action.payload.page;
            if (action.payload.page === 1) {
                state.posts = [];
            }
        },
        update(state, action: PayloadAction<{ page: number, last_page:number, posts: Post[], filters:any}>) {
            const existed: any = current(state.posts);
            state.last_page=action.payload.last_page;
            state.posts = action.payload.page === 1 ? action.payload.posts : [...existed, ...action.payload.posts];
        },
        AddSocialWallPost(state, action: PayloadAction<any>){
            
        },
        UpdateSocialWallPost(state, action: PayloadAction<any>){},
        SocialWallPostsUpdated(state, action: PayloadAction<{ post: Post}>) {
            const existed: Post[] = JSON.parse(JSON.stringify(state.posts));
            // Find the index of the post with the same id
            const index = existed.findIndex((post: Post) => post.id === action.payload.post.id);

            if (index > -1) {
                // Replace the existing post
                state.posts = [
                    ...existed.slice(0, index),
                    JSON.parse(JSON.stringify(action.payload.post)),
                    ...existed.slice(index + 1)
                ];
            } else {
                // Add the new post at the beginning
                state.posts = [JSON.parse(JSON.stringify(action.payload.post)), ...existed];
            }
        },
        LikeSocialWallPost(state, action: PayloadAction<{id:number}>){},
        DeleteSocialWallPost(state, action: PayloadAction<{id:number}>){},
        SocialWallPostDeleted(state, action: PayloadAction<{ post_id: number}>) {
            const existed: Post[] = state.posts;
            state.posts = existed.filter((post: Post) => post.id != action.payload.post_id);
        },
        SaveSocialWallComment(state, action: PayloadAction<any>){},
        LikeSocialWallComment(state, action: PayloadAction<{id:number}>){},
        DetailSocialWallPost(state, action: PayloadAction<{id:number}>){},
        socialWallPostDetailFetched(state, action: PayloadAction<{ post: Post}>) {
           state.post_detail = action.payload.post;
        },
    },
})

// Actions
export const SocialWallActions = {
    FetchSocialWallPosts:socialWallSlice.actions.FetchSocialWallPosts,
    update:socialWallSlice.actions.update,
    AddSocialWallPost:socialWallSlice.actions.AddSocialWallPost,
    SocialWallPostsUpdated:socialWallSlice.actions.SocialWallPostsUpdated,
    LikeSocialWallPost:socialWallSlice.actions.LikeSocialWallPost,
    SaveSocialWallComment:socialWallSlice.actions.SaveSocialWallComment,
    LikeSocialWallComment:socialWallSlice.actions.LikeSocialWallComment,
    SocialWallPostDeleted:socialWallSlice.actions.SocialWallPostDeleted,
    DeleteSocialWallPost:socialWallSlice.actions.DeleteSocialWallPost,
    DetailSocialWallPost:socialWallSlice.actions.DetailSocialWallPost,
    socialWallPostDetailFetched:socialWallSlice.actions.socialWallPostDetailFetched,
    UpdateSocialWallPost:socialWallSlice.actions.UpdateSocialWallPost,
    
}

export const SelectSocialWallPosts = (state: RootState) => state.socialWall.posts
export const SelectSocialWallPostDetail = (state: RootState) => state.socialWall.post_detail

export const SelectSocialWallFilters = (state: RootState) => state.socialWall.filters

export const SelectPage = (state: RootState) => state.socialWall.page
export const SelectLastPage = (state: RootState) => state.socialWall.last_page
export const SelectSortBy = (state: RootState) => state.socialWall.sort_by

// Reducer
export default socialWallSlice.reducer