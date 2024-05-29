import { useCallback } from 'react'

import { RequestToSpeakActions, SelectActivePrograms } from 'application/store/slices/RequestToSpeak.Slice'
import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type RequestToSpeakServiceOperators = {
    programs: any,
    FetchActivePrograms: () => void,
}

export const UseRequestToSpeakService = (): Readonly<RequestToSpeakServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        programs: useAppSelector(SelectActivePrograms),
        FetchActivePrograms: useCallback(
            () => {
                dispatch(RequestToSpeakActions.FetchActivePrograms())
            },
            [dispatch],
        )
       
    }
}

export default UseRequestToSpeakService
