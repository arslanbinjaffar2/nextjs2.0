import { delay, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, take } from 'redux-saga/effects';
import { LoginPayload, AuthActions } from 'application/store/slices/Auth.Slice';
import { getLoginApi } from 'application/store/api/Auth.Api';
import { GeneralResponse } from 'application/models/GeneralResponse'

function* login(payload: LoginPayload) {
    try {
        yield delay(1000); 

        const response: GeneralResponse = yield call(getLoginApi, payload)

        yield put(
            AuthActions.loginSuccess(response)
        );

    } catch (error) {
        yield put(AuthActions.loginFailed(error.message)); // Dispatch action
    }
}

function* logout() {

    yield delay(500);

    localStorage.removeItem('access_token');

    // Redirect to Login page
    yield put(push('/login'));
}

function* watchLoginFlow() {

    while (true) {

        const isLoggedIn = Boolean(localStorage.getItem('access_token'));

        if (!isLoggedIn) {
            const action: PayloadAction<LoginPayload> = yield take(
                AuthActions.login.type
            );
            yield fork(login, action.payload); // Non-blocking
        }

        yield take(AuthActions.logout.type);

        yield call(logout); // Blocking - wait for the logout function to finish before continuing to watch watchLoginFlow
    }

}

export function* authSaga() {
    yield fork(watchLoginFlow);
}