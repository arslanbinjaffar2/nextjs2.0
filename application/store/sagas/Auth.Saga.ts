import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getLoginApi, getUserApi, getPasswordResetApi, getChooseProviderApi, getLoadProviderApi, getVerificationApi, getResetApi } from 'application/store/api/Auth.Api';

import { LoginPayload, AuthActions, ChooseProviderPayload, PasswordResetPayload, LoadProviderPayload, VerificationPayload, ResetPayload } from 'application/store/slices/Auth.Slice';

import { GeneralResponse } from 'application/models/GeneralResponse'

import { Platform } from 'react-native';

// Worker Sagas handlers
function* OnLogin({
    payload,
}: {
    type: typeof AuthActions.login
    payload: LoginPayload
}): SagaIterator {
    try {
        const response: GeneralResponse = yield call(getLoginApi, payload);
        if (response.success && Platform.OS === 'web') {
            localStorage.setItem('access_token', response.data.access_token);
            yield put(AuthActions.success(response));
        } else {
            yield put(AuthActions.failed(response.message!));
        }
    } catch (error: any) {
        yield put(AuthActions.failed(error.message));
    }
}

function* OnPasswordReset({
    payload,
}: {
    type: typeof AuthActions.login
    payload: PasswordResetPayload
}): SagaIterator {
    try {
        const response: GeneralResponse = yield call(getPasswordResetApi, payload);
        if (response.success) {
            yield put(AuthActions.success(response));
        } else {
            yield put(AuthActions.failed(response.message!));
        }
    } catch (error: any) {
        yield put(AuthActions.failed(error.message));
    }
}

function* OnChooseProvider({
    payload,
}: {
    type: typeof AuthActions.login
    payload: ChooseProviderPayload
}): SagaIterator {
    try {
        const response: GeneralResponse = yield call(getChooseProviderApi, payload);
        if (response.success) {
            yield put(AuthActions.success(response));
        } else {
            yield put(AuthActions.failed(response.message!));
        }
    } catch (error: any) {
        yield put(AuthActions.failed(error.message));
    }
}

function* OnReset({
    payload,
}: {
    type: typeof AuthActions.login
    payload: ResetPayload
}): SagaIterator {
    try {
        const response: GeneralResponse = yield call(getResetApi, payload);
        if (response.success) {
            yield put(AuthActions.success(response));
        } else {
            yield put(AuthActions.failed(response.message!));
        }
    } catch (error: any) {
        yield put(AuthActions.failed(error.message));
    }
}

function* OnVerification({
    payload,
}: {
    type: typeof AuthActions.login
    payload: VerificationPayload
}): SagaIterator {
    try {
        const response: GeneralResponse = yield call(getVerificationApi, payload);
        if (response.success) {
            yield put(AuthActions.success(response));
        } else {
            yield put(AuthActions.failed(response.message!));
        }
    } catch (error: any) {
        yield put(AuthActions.failed(error.message));
    }
}

function* OnLoadProvider({
    payload,
}: {
    type: typeof AuthActions.login
    payload: LoadProviderPayload
}): SagaIterator {
    try {
        const response: GeneralResponse = yield call(getLoadProviderApi, payload);
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
    if(Platform.OS === 'web') {
        localStorage.removeItem('access_token');
    }
}

// Watcher Saga
export function* AuthWatcherSaga(): SagaIterator {
    yield takeEvery(AuthActions.login.type, OnLogin)
    yield takeEvery(AuthActions.passwordReset.type, OnPasswordReset)
    yield takeEvery(AuthActions.chooseProvider.type, OnChooseProvider)
    yield takeEvery(AuthActions.reset.type, OnReset)
    yield takeEvery(AuthActions.verification.type, OnVerification)
    yield takeEvery(AuthActions.loadProvider.type, OnLoadProvider)
    yield takeEvery(AuthActions.getUser.type, OnGetUser)
    yield takeEvery(AuthActions.logout.type, OnLogout)
}

export default AuthWatcherSaga