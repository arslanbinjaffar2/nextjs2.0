import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { getInfoApi, getPageApi } from 'application/store/api/Info.api';

import { InfoActions } from 'application/store/slices/Info.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnGetInfo({
    payload,
}: {
    type: typeof InfoActions.FetchInfo
    payload: { id: number, type: string }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getInfoApi, payload, state)
    yield put(InfoActions.update(response?.data?.data?.records!))
    yield put(InfoActions.updateParentFolder(response?.data?.data?.parent?.parent_id!))
    yield put(LoadingActions.set(false));
}

function* OnGetPage({
    payload,
}: {
    type: typeof InfoActions.FetchPage
    payload: { id: number, type: string }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getPageApi, payload, state)
    yield put(InfoActions.updatePage(response.data.data.record!))
    yield put(InfoActions.updateParentFolder(response.data.data.record?.menu_id!))
    yield put(LoadingActions.set(false));
}

// Watcher Saga
export function* InfoWatcherSaga(): SagaIterator {
    yield takeLatest(InfoActions.FetchInfo.type, OnGetInfo)
    yield takeLatest(InfoActions.FetchPage.type, OnGetPage)
}

export default InfoWatcherSaga