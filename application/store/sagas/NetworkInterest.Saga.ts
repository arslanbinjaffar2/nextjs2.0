import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getNetworkInterestApi, getSearchMatchAttendeesApi, saveNetworkInterestApi } from 'application/store/api/NetworkInterest.Api'

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
    if(response?.data?.data.length <= 0){
        yield put(NetworkInterestActions.setSkip());
    }
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

function* OnFetchSearchMatchAttendees({
}: {
    type: typeof NetworkInterestActions.FetchSearchMatchAttendees
}): SagaIterator {
    // yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getSearchMatchAttendeesApi, {}, state)
    yield put(NetworkInterestActions.update({ keywords: response.data.data! }))
    // yield put(LoadingActions.set(false));
}





// Watcher Saga
export function* NetworkInterestWatcherSaga(): SagaIterator {
    yield takeEvery(NetworkInterestActions.FetchNetworkInterests.type, OnFetchNetworkInterests)
    yield takeEvery(NetworkInterestActions.SaveMykeywords.type, OnSaveMykeywords)
    yield takeEvery(NetworkInterestActions.FetchSearchMatchAttendees.type, OnFetchSearchMatchAttendees)
}

export default NetworkInterestWatcherSaga