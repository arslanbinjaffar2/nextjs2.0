import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';
import { GalleryImage } from '../../models/gallery/GalleryImage';

export interface GalleryState {
    gallery_images: GalleryImage[];
    filters: any[];
}

const initialState: GalleryState = {
    gallery_images: [],
    filters: [],
}

// Slice
export const gallerySlice = createSlice({
    name: 'galleryImages',
    initialState,
    reducers: {
        FetchGalleryImages() {},
        update(state, action: PayloadAction<{ gallery_images: GalleryImage[], filters:any}>) {
            state.gallery_images = action.payload.gallery_images;
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



// Reducer
export default gallerySlice.reducer