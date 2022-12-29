import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getLoginApi, getUserApi, getPasswordResetRequestApi } from 'application/store/api/Auth.Api';

import { LoginPayload, AuthActions } from 'application/store/slices/Auth.Slice';

import { GeneralResponse } from 'application/models/GeneralResponse'

// Worker Sagas handlers
function* OnLogin({
    payload,
}: {
    type: typeof AuthActions.login
    payload: LoginPayload
}): SagaIterator {
    try {
        const response: GeneralResponse = yield call(getLoginApi, payload);
        if (response.success) {
            localStorage.setItem('access_token', response.data.access_token);
            yield put(AuthActions.success(response));
        } else {
            yield put(AuthActions.failed(response.message!));
        }
    } catch (error: any) {
        yield put(AuthActions.failed(error.message));
    }
}

function* OnPasswordResetRequest({
    payload,
}: {
    type: typeof AuthActions.login
    payload: LoginPayload
}): SagaIterator {
    try {
        const response: GeneralResponse = yield call(getPasswordResetRequestApi, payload);
        if (response.success) {
            yield put(AuthActions.success(response));
        } else {
            yield put(AuthActions.failed(response.message!));
        }
    } catch (error: any) {
        yield put(AuthActions.failed(error.message));
    }
}

function* OnGetUser({ }: {
    type: typeof AuthActions.getUser
    payload: LoginPayload
}): SagaIterator {
    try {
        const response: GeneralResponse = yield call(getUserApi);
        if (response.success) {
            yield put(AuthActions.success(response));
        } else {
            yield put(AuthActions.logout());
        }
    } catch (error: any) {
        yield put(AuthActions.logout());
    }
}

function* OnLogout({
}: {
    type: typeof AuthActions.logout
    payload: Event
}): SagaIterator {
    localStorage.removeItem('access_token');
}

// Watcher Saga
export function* AuthWatcherSaga(): SagaIterator {
    yield takeEvery(AuthActions.login.type, OnLogin)
    yield takeEvery(AuthActions.passwordResetRequest.type, OnPasswordResetRequest)
    yield takeEvery(AuthActions.getUser.type, OnGetUser)
    yield takeEvery(AuthActions.logout.type, OnLogout)
}

export default AuthWatcherSaga