import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getActiveProgramsApi } from 'application/store/api/RequestToSpeak.Api'

import { RequestToSpeakActions } from 'application/store/slices/RequestToSpeak.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchActivePrograms({
}: {
    type: typeof RequestToSpeakActions.FetchActivePrograms
}): SagaIterator {
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getActiveProgramsApi, {}, state)
    console.log("🚀 ~ response:", response)

}

// Watcher Saga
export function* RequestToSpeakWatcherSaga(): SagaIterator {
    yield takeEvery(RequestToSpeakActions.FetchActivePrograms.type, OnFetchActivePrograms)
}

export default RequestToSpeakWatcherSaga