import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getNetworkInterestApi, saveNetworkInterestApi } from 'application/store/api/NetworkInterest.Api'

import { NetworkInterestActions } from 'application/store/slices/NetworkInterest.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchNetworkInterests({
}: {
    type: typeof NetworkInterestActions.FetchNetworkInterests
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getNetworkInterestApi, {}, state)
    yield put(NetworkInterestActions.update({ keywords: response.data.data! }))
    yield put(LoadingActions.set(false));
}

function* OnSaveMykeywords({
    payload
}: {
    type: typeof NetworkInterestActions.SaveMykeywords
    payload:any
}): SagaIterator {
    const state = yield select(state => state);
    const response: HttpResponse = yield call(saveNetworkInterestApi, payload, state)
    yield put(NetworkInterestActions.saveMyKeywordSuccess());
}





// Watcher Saga
export function* NetworkInterestWatcherSaga(): SagaIterator {
    yield takeEvery(NetworkInterestActions.FetchNetworkInterests.type, OnFetchNetworkInterests)
    yield takeEvery(NetworkInterestActions.SaveMykeywords.type, OnSaveMykeywords)
}

export default NetworkInterestWatcherSaga