import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getCheckInOutApi, sendQRCodeApi } from 'application/store/api/CheckInOut.Api'

import { CheckInOutActions } from 'application/store/slices/CheckInOut.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchCheckInOut({
}: {
    type: typeof CheckInOutActions.FetchCheckInOut
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getCheckInOutApi, {}, state)
    yield put(CheckInOutActions.update({ ...response.data.data, }))
    yield put(LoadingActions.set(false));
}

function* OnSendQRCode({
}: {
    type: typeof CheckInOutActions.FetchCheckInOut
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:'checkin-send-qr-code'}));
    const state = yield select(state => state);
    const response: HttpResponse = yield call(sendQRCodeApi, {}, state)
    yield put(LoadingActions.removeProcess({process:'checkin-send-qr-code'}));
}





// Watcher Saga
export function* CheckInOutWatcherSaga(): SagaIterator {
    yield takeEvery(CheckInOutActions.FetchCheckInOut.type, OnFetchCheckInOut)
    yield takeEvery(CheckInOutActions.SendQRCode.type, OnSendQRCode)
}

export default CheckInOutWatcherSaga