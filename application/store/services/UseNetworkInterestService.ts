import { useCallback } from 'react'

import { SelectNetworkInterests, NetworkInterestActions, SelectUpdatingMyKeywords, SelectNetworkSkip, SelectSearchingAttendees, SelectSearchMatchAttendees, SelectUpdatedMyKeywords } from 'application/store/slices/NetworkInterest.Slice'

import {  Keyword } from 'application/models/networkInterest/NetworkInterest'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { Attendee } from 'application/models/attendee/Attendee'

export type NetworkInterestServiceOperators = {
    keywords: Keyword[],
    skip:boolean,
    netWorkskip:boolean,
    UpdatingMyKeywords:boolean,
    searchMatchAttendees:Attendee[]|null,
    searchingAttendees:boolean,
    updatedMyKeywords:boolean,
    FetchNetworkInterests: () => void,
    SaveMykeywords: (payload:any) => void,
    FetchSearchMatchAttendees: (payload:any) => void,
    setSkip: (payload:{event_url:string}) => void,
    setNetworkSkip: (payload:{event_url:string}) => void,
    FetchMyKeywords: () => void,
    updateUpdatedMyKeywords: (payload:boolean) => void
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
        netWorkskip: useAppSelector(SelectNetworkSkip),
        updatedMyKeywords: useAppSelector(SelectUpdatedMyKeywords),
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
            (payload:{event_url:string}) => {
                dispatch(NetworkInterestActions.setSkip(payload))
            },
            [dispatch],
        ),
        setNetworkSkip: useCallback(
            (payload:{event_url:string}) => {
                dispatch(NetworkInterestActions.setSkip(payload))
            },
            [dispatch],
        ),
        FetchMyKeywords: useCallback(
            () => {
                dispatch(NetworkInterestActions.FetchMyKeywords())
            },
            [dispatch],
        ),
        updateUpdatedMyKeywords: useCallback(
            (payload:boolean) => {
                dispatch(NetworkInterestActions.updateUpdatedMyKeywords(payload))
            },
            [dispatch],
        ),
    }
}

export default UseNetworkInterestService
