import { useCallback } from 'react'

import { SelectBanners, SelectBannerSetting, BannerActions,  } from 'application/store/slices/Banner.Slice'

import {  Banner, BannerSetting } from 'application/models/Banner'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type BannerServiceOperators = {
    banners: Banner[],
    banner_setting: BannerSetting | null,
    FetchBanners: () => void,
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseBannerService = (): Readonly<BannerServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        banners: useAppSelector(SelectBanners),
        banner_setting: useAppSelector(SelectBannerSetting),
        FetchBanners: useCallback(
            () => {
                dispatch(BannerActions.FetchBanners())
            },
            [dispatch],
        ),
    }
}

export default UseBannerService
