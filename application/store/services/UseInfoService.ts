import { useCallback } from 'react'

import { InfoActions, SelectInfo } from 'application/store/slices/Info.Slice'

import { Info } from 'application/models/Info'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type InfoServiceOperators = {
    info: Info
    FetchInfo: (type: string) => void
}

/**
 * InfoService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseInfoService = (): Readonly<InfoServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        info: useAppSelector(SelectInfo),
        FetchInfo: useCallback(
            (type: string) => {
                dispatch(InfoActions.FetchInfo(type))
            },
            [dispatch],
        )
    }
}

export default UseInfoService