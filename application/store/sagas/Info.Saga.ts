import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getInfoApi } from 'application/store/api/Info.api';

import { InfoActions } from 'application/store/slices/Info.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnGetInfo({
    payload,
}: {
    type: typeof InfoActions.FetchInfo
    payload: string
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getInfoApi, payload, state)
    yield put(InfoActions.update(response.data.data.records!))
    yield put(LoadingActions.set(false));
}

// Watcher Saga
export function* InfoWatcherSaga(): SagaIterator {
    yield takeEvery(InfoActions.FetchInfo.type, OnGetInfo)
}

export default InfoWatcherSaga