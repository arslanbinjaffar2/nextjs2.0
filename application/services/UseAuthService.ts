import { useCallback } from 'react'

import { AuthActions, LoginPayload, PasswordResetRequestPayload, selectIsLoggedIn, isProcessing, currentUser, error } from 'application/store/slices/Auth.Slice'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

import { GeneralResponse } from 'application/models/GeneralResponse';

export type EventServiceOperators = {
    isLoggedIn: boolean;
    processing?: boolean;
    currentUser: GeneralResponse;
    error: string;
    login: (payload: LoginPayload) => void
    passwordResetRequest: (payload: PasswordResetRequestPayload) => void
    getUser: () => void
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
        processing: useAppSelector(isProcessing),
        currentUser: useAppSelector(currentUser),
        error: useAppSelector(error),
        login: useCallback(
            (payload: LoginPayload) => {
                dispatch(AuthActions.login(payload))
            },
            [dispatch],
        ),
        passwordResetRequest: useCallback(
            (payload: PasswordResetRequestPayload) => {
                dispatch(AuthActions.passwordResetRequest(payload))
            },
            [dispatch],
        ),
        getUser: useCallback(
            () => {
                dispatch(AuthActions.getUser())
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