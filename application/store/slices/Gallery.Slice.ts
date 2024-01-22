import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';
import { GalleryImage } from 'application/models/gallery/GalleryImage';

export interface GalleryState {
    page: number;
    last_page: number;
    gallery_images: GalleryImage[];
    filters: any[];
}

const initialState: GalleryState = {
    gallery_images: [],
    filters: [],
    page: 1,
    last_page: 1,
}

// Slice
export const gallerySlice = createSlice({
    name: 'galleryImages',
    initialState,
    reducers: {
        FetchGalleryImages(state, action: PayloadAction<{ page: number}>) {
            state.page = action.payload.page;
            if (action.payload.page === 1) {
                state.gallery_images = [];
            }
        },
        update(state, action: PayloadAction<{ page: number, last_page:number, gallery_images: GalleryImage[], filters:any}>) {
            const existed: any = current(state.gallery_images);
            state.last_page=action.payload.last_page;
            state.gallery_images = action.payload.page === 1 ? action.payload.gallery_images : [...existed, ...action.payload.gallery_images];
        }

    },
})

// Actions
export const GalleryActions = {
    FetchGalleryImages:gallerySlice.actions.FetchGalleryImages,
    update:gallerySlice.actions.update,
}

export const SelectGalleryImages = (state: RootState) => state.galleryImages.gallery_images

export const SelectGalleryImageFilters = (state: RootState) => state.galleryImages.filters

export const SelectPage = (state: RootState) => state.galleryImages.page
export const SelectLastPage = (state: RootState) => state.galleryImages.last_page


// Reducer
export default gallerySlice.reducer