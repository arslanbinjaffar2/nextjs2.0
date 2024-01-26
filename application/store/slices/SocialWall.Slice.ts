import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';
import { NewPost, Post } from 'application/models/socialWall/SocialWall';

export interface SocialWallState {
    page: number;
    last_page: number;
    posts: Post[];
    filters: any[];
    sort_by: string;
}

const initialState: SocialWallState = {
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
        FetchSocialWallPosts(state, action: PayloadAction<{ page: number, sort_by:string}>) {
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
        SocialWallPostsUpdated(state, action: PayloadAction<{ post: Post}>) {
            const existed: any = current(state.posts);
            // Find the index of the post with the same id
                const index = existed.findIndex((post: Post) => post.id === action.payload.post.id);

                if (index > -1) {
                    // Replace the existing post
                    state.posts = [
                        ...existed.slice(0, index),
                        action.payload.post,
                        ...existed.slice(index + 1)
                    ];
                } else {
                    // Add the new post at the beginning
                    state.posts = [action.payload.post, ...existed];
                }
        },
        LikeSocialWallPost(state, action: PayloadAction<{id:number}>){},
        SaveSocialWallComment(state, action: PayloadAction<any>){},
        LikeSocialWallComment(state, action: PayloadAction<{id:number}>){},

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
}

export const SelectSocialWallPosts = (state: RootState) => state.socialWall.posts

export const SelectSocialWallFilters = (state: RootState) => state.socialWall.filters

export const SelectPage = (state: RootState) => state.socialWall.page
export const SelectLastPage = (state: RootState) => state.socialWall.last_page
export const SelectSortBy = (state: RootState) => state.socialWall.sort_by

// Reducer
export default socialWallSlice.reducer