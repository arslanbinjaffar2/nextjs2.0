import { useCallback } from 'react'

import { SelectGalleryImages, GalleryActions, SelectPage, SelectLastPage } from 'application/store/slices/Gallery.Slice'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { GalleryImage } from 'application/models/gallery/GalleryImage'

export type GalleryServiceOperators = {
    page: number,
    last_page: number,
    gallery_images: GalleryImage[],
    FetchGalleryImages:  (payload: { page: number}) => void,
}

/**
 * GalleryService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseGalleryService = (): Readonly<GalleryServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        last_page: useAppSelector(SelectLastPage),
        page: useAppSelector(SelectPage),
        gallery_images: useAppSelector(SelectGalleryImages),
        FetchGalleryImages: useCallback(
            (payload: { page: number}) => {
                dispatch(GalleryActions.FetchGalleryImages(payload))
            },
            [dispatch],
        ),
    }
}

export default UseGalleryService
