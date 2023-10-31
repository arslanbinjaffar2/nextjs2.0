import { useCallback } from 'react'

import { SelectNetworkInterests, NetworkInterestActions, SelectUpdatingMyKeywords  } from 'application/store/slices/NetworkInterest.Slice'

import {  Keyword } from 'application/models/networkInterest/NetworkInterest'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type NetworkInterestServiceOperators = {
    keywords: Keyword[],
    FetchNetworkInterests: () => void,
    SaveMykeywords: (payload:any) => void
    UpdatingMyKeywords:boolean
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseNetworkInterestService = (): Readonly<NetworkInterestServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        keywords: useAppSelector(SelectNetworkInterests),
        UpdatingMyKeywords: useAppSelector(SelectUpdatingMyKeywords),
        FetchNetworkInterests: useCallback(
            () => {
                dispatch(NetworkInterestActions.FetchNetworkInterests())
            },
            [dispatch],
        ),
        SaveMykeywords: useCallback(
            (payload:any) => {
                dispatch(NetworkInterestActions.SaveMykeywords(payload))
            },
            [dispatch],
        ),
    }
}

export default UseNetworkInterestService
