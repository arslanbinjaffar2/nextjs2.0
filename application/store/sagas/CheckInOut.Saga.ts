import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { doCheckInOutApi, getCheckInOutApi, sendQRCodeApi } from 'application/store/api/CheckInOut.Api'

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

function* OnDoCheckInOut({
    payload,
}: {
    type: typeof CheckInOutActions.DoCheckInOut,
    payload: { attendee_id: number, organizer_id: number, action: string }
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:'checking-in-out'}));
    const state = yield select(state => state);
    const response: HttpResponse = yield call(doCheckInOutApi,payload, state)
    yield put(CheckInOutActions.FetchCheckInOut())
    yield put(LoadingActions.removeProcess({process:'checking-in-out'}));
}





// Watcher Saga
export function* CheckInOutWatcherSaga(): SagaIterator {
    yield takeEvery(CheckInOutActions.FetchCheckInOut.type, OnFetchCheckInOut)
    yield takeEvery(CheckInOutActions.SendQRCode.type, OnSendQRCode)
    yield takeEvery(CheckInOutActions.DoCheckInOut.type, OnDoCheckInOut)
    
}

export default CheckInOutWatcherSaga