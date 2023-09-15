import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getPollApi, getPollDetailApi } from 'application/store/api/Poll.Api'

import { PollActions } from 'application/store/slices/Poll.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchPolls({
}: {
    type: typeof PollActions.FetchPolls
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getPollApi, {}, state)
    yield put(PollActions.update({ polls: response.data.data.polls.pending_polls!, completed_polls:response.data.data.polls.completed_polls, poll_settings:response.data.data.pollSettings}))
    yield put(LoadingActions.set(false));
}

function* OnFetchPollDetail({
    payload,
}: {
    type: typeof PollActions.FetchPollDetail
    payload: { id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getPollDetailApi, payload, state)
    yield put(PollActions.updateDetail({ detail: response.data.data.poll_details! }))
    yield put(LoadingActions.set(false));
}



// Watcher Saga
export function* PollWatcherSaga(): SagaIterator {
    yield takeEvery(PollActions.FetchPolls.type, OnFetchPolls)
    yield takeEvery(PollActions.FetchPollDetail.type, OnFetchPollDetail)
}

export default PollWatcherSaga