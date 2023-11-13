import { useCallback } from 'react'

import { SelectNetworkInterests, NetworkInterestActions, SelectUpdatingMyKeywords, SelectNetworkSkip  } from 'application/store/slices/NetworkInterest.Slice'

import {  Keyword } from 'application/models/networkInterest/NetworkInterest'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type NetworkInterestServiceOperators = {
    keywords: Keyword[],
    skip:boolean,
    FetchNetworkInterests: () => void,
    SaveMykeywords: (payload:any) => void
    UpdatingMyKeywords:boolean
    setSkip: () => void,
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
        skip: useAppSelector(SelectNetworkSkip),
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
        setSkip: useCallback(
            () => {
                dispatch(NetworkInterestActions.setSkip())
            },
            [dispatch],
        ),
    }
}

export default UseNetworkInterestService
