import { useCallback } from 'react'

import { InfoActions, SelectInfo, SelectPage } from 'application/store/slices/Info.Slice'

import { Info } from 'application/models/Info'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type InfoServiceOperators = {
    info: Info[]
    page: Info
    FetchInfo: (type: string) => void
    FetchPage: (payload: { id: number, type: string }) => void
}

/**
 * InfoService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseInfoService = (): Readonly<InfoServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        info: useAppSelector(SelectInfo),
        page: useAppSelector(SelectPage),
        FetchInfo: useCallback(
            (type: string) => {
                dispatch(InfoActions.FetchInfo(type))
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