import { isLoading, scroll, processing } from 'application/store/slices/Loading.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { useAppSelector, useAppDispatch } from 'application/store/Hooks'

import { useCallback } from 'react'

export type LoadingServiceOperators = {
    loading: boolean,
    processing: Array<string>,
    scroll: number,
    setScrollCounter: (counter: number) => void,
    setLoading: (counter: boolean) => void
}

/**
 * LoadingService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseLoadingService = (): Readonly<LoadingServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        loading: useAppSelector(isLoading),
        scroll: useAppSelector(scroll),
        processing: useAppSelector(processing),
        setScrollCounter: useCallback(
            (counter: number) => {
                dispatch(LoadingActions.setScrollCounter(counter))
            },
            [dispatch],
        ),
        setLoading: useCallback(
            (counter: boolean) => {
                dispatch(LoadingActions.set(counter))
            },
            [dispatch],
        ),
    }
}

export default UseLoadingService