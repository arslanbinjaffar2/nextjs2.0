import { useCallback } from 'react'

import { AuthActions, LoginPayload, PasswordResetPayload, ChooseProviderPayload, ResetPayload, VerificationPayload, LoadProviderPayload, selectIsLoggedIn, isProcessing, response, error, disclaimerStatus } from 'application/store/slices/Auth.Slice'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

import { GeneralResponse } from 'application/models/GeneralResponse';

export type EventServiceOperators = {
    isLoggedIn: boolean;
    processing?: boolean;
    disclaimerStatus: boolean;
    response: GeneralResponse;
    error: string;
    login: (payload: LoginPayload) => void
    passwordReset: (payload: PasswordResetPayload) => void
    chooseProvider: (payload: ChooseProviderPayload) => void
    reset: (payload: ResetPayload) => void
    verification: (payload: VerificationPayload) => void
    loadProvider: (payload: LoadProviderPayload) => void
    getUser: () => void
    logout: () => void
    loadToken: (logged: boolean) => void
    disclaimerStatusUpdated: (status: boolean) => void
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
        disclaimerStatus: useAppSelector(disclaimerStatus),
        response: useAppSelector(response),
        error: useAppSelector(error),
        login: useCallback(
            (payload: LoginPayload) => {
                dispatch(AuthActions.login(payload))
            },
            [dispatch],
        ),
        passwordReset: useCallback(
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
        reset: useCallback(
            (payload: ResetPayload) => {
                dispatch(AuthActions.reset(payload))
            },
            [dispatch],
        ),
        verification: useCallback(
            (payload: VerificationPayload) => {
                dispatch(AuthActions.verification(payload))
            },
            [dispatch],
        ),
        loadProvider: useCallback(
            (payload: LoadProviderPayload) => {
                dispatch(AuthActions.loadProvider(payload))
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
        loadToken: useCallback(
            (logged: boolean) => {
                dispatch(
                    AuthActions.loadToken(logged),
                )
            },
            [dispatch],
        ),
        disclaimerStatusUpdated: useCallback(
            (status: boolean) => {
                dispatch(
                    AuthActions.disclaimerStatusUpdated(status),
                )
            },
            [dispatch],
        ),
    }
}

export default UseAuthService