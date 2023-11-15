import { useCallback } from 'react'

import { SelectNetworkInterests, NetworkInterestActions, SelectUpdatingMyKeywords, SelectNetworkSkip, SelectSearchingAttendees, SelectSearchMatchAttendees  } from 'application/store/slices/NetworkInterest.Slice'

import {  Keyword } from 'application/models/networkInterest/NetworkInterest'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { Attendee } from 'application/models/attendee/Attendee'

export type NetworkInterestServiceOperators = {
    keywords: Keyword[],
    skip:boolean,
    UpdatingMyKeywords:boolean,
    searchMatchAttendees:Attendee[]|null,
    searchingAttendees:boolean,
    FetchNetworkInterests: () => void,
    SaveMykeywords: (payload:any) => void,
    FetchSearchMatchAttendees: (payload:any) => void,
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
        searchMatchAttendees: useAppSelector(SelectSearchMatchAttendees),
        searchingAttendees: useAppSelector(SelectSearchingAttendees),
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
        FetchSearchMatchAttendees: useCallback(
            (payload:any) => {
                dispatch(NetworkInterestActions.FetchSearchMatchAttendees(payload))
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
