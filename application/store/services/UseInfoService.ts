import { useCallback } from 'react'

import { InfoActions, SelectInfo, SelectPage, SelectParentFolder } from 'application/store/slices/Info.Slice'

import { Info } from 'application/models/Info'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type InfoServiceOperators = {
    parent_folder: number
    info: Info[]
    page: Info
    FetchInfo: (payload: { id: number, type: string }) => void
    FetchPage: (payload: { id: number, type: string }) => void
}

/**
 * InfoService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseInfoService = (): Readonly<InfoServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        parent_folder: useAppSelector(SelectParentFolder),
        info: useAppSelector(SelectInfo),
        page: useAppSelector(SelectPage),
        FetchInfo: useCallback(
            (payload: { id: number, type: string }) => {
                dispatch(InfoActions.FetchInfo(payload))
            },
            [dispatch],
        ),
        FetchPage: useCallback(
            (payload: { id: number, type: string }) => {
                dispatch(InfoActions.FetchPage(payload))
            },
            [dispatch],
        )
    }
}

export default UseInfoService