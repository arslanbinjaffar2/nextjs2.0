import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getAttendeeApi } from 'application/store/api/Attendee.Api';

import { AttendeeActions } from 'application/store/slices/Attendee.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnGetAttendees({
    payload,
}: {
    type: typeof AttendeeActions.FetchAttendees
    payload: { group_id: number, query: string, page: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getAttendeeApi, payload, state)
    yield put(AttendeeActions.update(response.data.data!))
    yield put(LoadingActions.set(false));
}

// Watcher Saga
export function* AttendeeWatcherSaga(): SagaIterator {
    yield takeEvery(AttendeeActions.FetchAttendees.type, OnGetAttendees)
}

export default AttendeeWatcherSaga