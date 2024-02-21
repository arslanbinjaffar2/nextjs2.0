import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getLoginApi, getUserApi, getPasswordResetApi, getChooseProviderApi, getLoadProviderApi, getVerificationApi, getResetApi } from 'application/store/api/Auth.Api';

import { LoginPayload, AuthActions, ChooseProviderPayload, PasswordResetPayload, LoadProviderPayload, VerificationPayload, ResetPayload } from 'application/store/slices/Auth.Slice';

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';
import { NetworkInterestActions } from '../slices/NetworkInterest.Slice';
import { SubRegistrationActions } from '../slices/SubRegistration.Slice';

// Worker Sagas handlers
function* OnLogin({
    payload,
}: {
    type: typeof AuthActions.login
    payload: LoginPayload
}): SagaIterator {
    try {
        const state = yield select(state => state);
        const response: HttpResponse = yield call(getLoginApi, payload, state);
        if (response.data.success) {
            yield put(AuthActions.success(response.data));
        } else {
            yield put(AuthActions.failed(response.data.message!));
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
        const state = yield select(state => state);
        const response: HttpResponse = yield call(getPasswordResetApi, payload, state);
        if (response.data.success) {
            yield put(AuthActions.success(response.data));
        } else {
            yield put(AuthActions.failed(response.data.message!));
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
        const state = yield select(state => state);
        const response: HttpResponse = yield call(getChooseProviderApi, payload, state);
        if (response.data.success) {
            yield put(AuthActions.success(response.data));
        } else {
            yield put(AuthActions.failed(response.data.message!));
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
        const state = yield select(state => state);
        const response: HttpResponse = yield call(getResetApi, payload, state);
        if (response.data.success) {
            yield put(AuthActions.success(response.data));
        } else {
            yield put(AuthActions.failed(response.data.message!));
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
        const state = yield select(state => state);
        const response: HttpResponse = yield call(getVerificationApi, payload, state);
        if (response.data.success) {
            yield put(AuthActions.success(response.data));
        } else {
            yield put(AuthActions.failed(response.data.message!));
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
        const state = yield select(state => state);
        const response: HttpResponse = yield call(getLoadProviderApi, payload, state);
        if (response.data.success) {
            yield put(AuthActions.success(response.data));
        } else {
            yield put(AuthActions.failed(response.data.message!));
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
        const state = yield select(state => state);
        const response: HttpResponse = yield call(getUserApi, state);
        if (response?.status === 401) {
            yield put(AuthActions.clearToken());
        } else {
            yield put(AuthActions.success(response.data));
        }
    } catch (error: any) {
        yield put(AuthActions.clearToken());
    }
}

function* OnLogout({
}: {
    type: typeof AuthActions.logout
    payload: Event
}): SagaIterator {
    yield put(AuthActions.clearToken());
    yield put(NetworkInterestActions.clearState());
    yield put(SubRegistrationActions.clearState());
    yield put(AuthActions.reloadPage());
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