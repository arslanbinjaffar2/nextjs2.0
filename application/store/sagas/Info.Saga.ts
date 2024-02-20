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
    interface Info {
        name: string;
        value: string;
    }
    const parentName: string = response?.data?.data?.parent?.info?.find((info: Info) => info.name === 'name')?.value ?? '';
    yield put(InfoActions.updateParentFolder({id:response?.data?.data?.parent?.parent_id!,name:parentName}))
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
    yield put(InfoActions.updateParentFolder({id:response.data.data.record?.menu_id!,name:''}))
    yield put(LoadingActions.set(false));
}

// Watcher Saga
export function* InfoWatcherSaga(): SagaIterator {
    yield takeLatest(InfoActions.FetchInfo.type, OnGetInfo)
    yield takeLatest(InfoActions.FetchPage.type, OnGetPage)
}

export default InfoWatcherSaga