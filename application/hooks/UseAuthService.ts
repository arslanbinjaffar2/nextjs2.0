import { useCallback } from 'react'

import { AuthActions, LoginPayload, selectIsLoggedIn, selectIsLogging } from 'application/store/slices/Auth.Slice'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type EventServiceOperators = {
    isLoggedIn: boolean;
    logging?: boolean;
    login: (payload: LoginPayload) => void
    logout: () => void
}

/**
 * EventService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseAuthService = (): Readonly<EventServiceOperators> => {
    const dispatch = useAppDispatch()

    return {
        isLoggedIn: useAppSelector(selectIsLoggedIn),
        logging: useAppSelector(selectIsLogging),
        login: useCallback(
            (payload: LoginPayload) => {
                dispatch(AuthActions.login(payload))
            },
            [dispatch],
        ),
        logout: useCallback(
            () => {
                dispatch(
                    AuthActions.logout(),
                )
            },
            [dispatch],
        ),
    }
}

export default UseAuthService