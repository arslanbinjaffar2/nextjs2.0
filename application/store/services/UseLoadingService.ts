import { isLoading, scroll } from 'application/store/slices/Loading.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { useAppSelector, useAppDispatch } from 'application/store/Hooks'

import { useCallback } from 'react'

export type LoadingServiceOperators = {
    loading: boolean,
    scroll: number,
    setScrollCounter: (counter: number) => void
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
        setScrollCounter: useCallback(
            (counter: number) => {
                dispatch(LoadingActions.setScrollCounter(counter))
            },
            [dispatch],
        ),
    }
}

export default UseLoadingService