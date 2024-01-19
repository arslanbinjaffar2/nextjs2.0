import { useCallback } from 'react'

import { SelectGalleryImages, GalleryActions,  } from 'application/store/slices/Gallery.Slice'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { GalleryImage } from 'application/models/gallery/GalleryImage'

export type GalleryServiceOperators = {
    gallery_images: GalleryImage[],
    FetchGalleryImages: () => void,
}

/**
 * GalleryService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseGalleryService = (): Readonly<GalleryServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        gallery_images: useAppSelector(SelectGalleryImages),
        FetchGalleryImages: useCallback(
            () => {
                dispatch(GalleryActions.FetchGalleryImages())
            },
            [dispatch],
        ),
    }
}

export default UseGalleryService
