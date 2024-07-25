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
    yield put(LoadingActions.addProcess({ process: 'keywords' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getNetworkInterestApi, {}, state)
    yield put(NetworkInterestActions.update({ keywords: response.data.data! }))
    if(response?.data?.data.length <= 0){
        yield put(NetworkInterestActions.setSkip({event_url:state?.event?.event_url}));
    }
    yield put(LoadingActions.set(false));
    yield put(LoadingActions.removeProcess({ process: 'keywords' }))

}

function* OnSaveMykeywords({
    payload
}: {
    type: typeof NetworkInterestActions.SaveMykeywords
    payload:any
}): SagaIterator {
    const state = yield select(state => state);
    const response: HttpResponse = yield call(saveNetworkInterestApi, payload, state)
    yield put(NetworkInterestActions.saveMyKeywordSuccess({event_url:state?.event?.event_url}));
}

function* OnFetchSearchMatchAttendees({
    payload
}: {
    type: typeof NetworkInterestActions.FetchSearchMatchAttendees
    payload:any
}): SagaIterator {
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getSearchMatchAttendeesApi, payload, state)
    yield put(NetworkInterestActions.updateSearchMatchAttendees({ attendees: response.data.data! }))
}





// Watcher Saga
export function* NetworkInterestWatcherSaga(): SagaIterator {
    yield takeEvery(NetworkInterestActions.FetchNetworkInterests.type, OnFetchNetworkInterests)
    yield takeEvery(NetworkInterestActions.SaveMykeywords.type, OnSaveMykeywords)
    yield takeEvery(NetworkInterestActions.FetchSearchMatchAttendees.type, OnFetchSearchMatchAttendees)
}

export default NetworkInterestWatcherSaga