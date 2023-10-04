import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getMapApi } from 'application/store/api/Map.api';

import { MapActions } from 'application/store/slices/Map.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnGetMap({
    payload,
}: {
    type: typeof MapActions.FetchMap
    payload: string
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMapApi, payload, state)
    yield put(MapActions.update(response.data.data.map!))
    yield put(LoadingActions.set(false));
}

// Watcher Saga
export function* MapWatcherSaga(): SagaIterator {
    yield takeEvery(MapActions.FetchMap.type, OnGetMap)
}

export default MapWatcherSaga