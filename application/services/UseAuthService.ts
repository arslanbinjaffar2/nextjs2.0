import { useCallback } from 'react'

import { AuthActions, LoginPayload, PasswordResetPayload, ChooseProviderPayload, selectIsLoggedIn, isProcessing, response, error } from 'application/store/slices/Auth.Slice'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

import { GeneralResponse } from 'application/models/GeneralResponse';

export type EventServiceOperators = {
    isLoggedIn: boolean;
    processing?: boolean;
    response: GeneralResponse;
    error: string;
    login: (payload: LoginPayload) => void
    passwordResetRequest: (payload: PasswordResetPayload) => void
    chooseProvider: (payload: ChooseProviderPayload) => void
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
        response: useAppSelector(response),
        error: useAppSelector(error),
        login: useCallback(
            (payload: LoginPayload) => {
                dispatch(AuthActions.login(payload))
            },
            [dispatch],
        ),
        passwordResetRequest: useCallback(
            (payload: PasswordResetPayload) => {
                dispatch(AuthActions.passwordReset(payload))
            },
            [dispatch],
        ),
        chooseProvider: useCallback(
            (payload: ChooseProviderPayload) => {
                dispatch(AuthActions.chooseProvider(payload))
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