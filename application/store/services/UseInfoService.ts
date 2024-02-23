import { useCallback } from 'react'

import { InfoActions, SelectInfo, SelectPage, SelectParentFolder, SelectParentFolderName } from 'application/store/slices/Info.Slice'

import { Info } from 'application/models/Info'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type InfoServiceOperators = {
    parent_folder: number
    parent_folder_name: string
    info: Info[] | null
    page: Info | null
    FetchInfo: (payload: { id: number, type: string }) => void
    FetchPage: (payload: { id: number, type: string }) => void
    ClearState: () => void
}

/**
 * InfoService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseInfoService = (): Readonly<InfoServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        parent_folder: useAppSelector(SelectParentFolder),
        parent_folder_name: useAppSelector(SelectParentFolderName),
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
        ),
        ClearState: useCallback(
            () => {
                dispatch(InfoActions.ClearState())
            },
            [dispatch],
        )
    }
}

export default UseInfoService