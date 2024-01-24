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
}

const initialState: SocialWallState = {
    posts: [],
    filters: [],
    page: 1,
    last_page: 1,
}

// Slice
export const socialWallSlice = createSlice({
    name: 'socialWall',
    initialState,
    reducers: {
        FetchSocialWallPosts(state, action: PayloadAction<{ page: number}>) {
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
        socialWallPostAdded(state, action: PayloadAction<{ post: Post}>) {
            const existed: any = current(state.posts);
            state.posts = [...[action.payload.post], ...existed];
        }

    },
})

// Actions
export const SocialWallActions = {
    FetchSocialWallPosts:socialWallSlice.actions.FetchSocialWallPosts,
    update:socialWallSlice.actions.update,
    AddSocialWallPost:socialWallSlice.actions.AddSocialWallPost,
    socialWallPostAdded:socialWallSlice.actions.socialWallPostAdded,
}

export const SelectSocialWallPosts = (state: RootState) => state.socialWall.posts

export const SelectSocialWallFilters = (state: RootState) => state.socialWall.filters

export const SelectPage = (state: RootState) => state.socialWall.page
export const SelectLastPage = (state: RootState) => state.socialWall.last_page


// Reducer
export default socialWallSlice.reducer