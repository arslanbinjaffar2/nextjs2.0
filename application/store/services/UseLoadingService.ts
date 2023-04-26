import { isLoading } from 'application/store/slices/Loading.Slice'

import { useAppSelector } from 'application/store/Hooks'

export type LoadingServiceOperators = {
    loading: boolean
}

/**
 * LoadingService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseLoadingService = (): Readonly<LoadingServiceOperators> => {
    return {
        loading: useAppSelector(isLoading),
    }
}

export default UseLoadingService