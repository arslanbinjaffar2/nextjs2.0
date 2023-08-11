import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getAttendeeApi, makeFavouriteApi } from 'application/store/api/Attendee.Api';

import { AttendeeActions } from 'application/store/slices/Attendee.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnGetAttendees({
    payload,
}: {
    type: typeof AttendeeActions.FetchAttendees
    payload: { group_id: number, query: string, page: number, my_attendee_id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getAttendeeApi, payload, state)
    yield put(AttendeeActions.update({ attendee: response.data.data!, group_id: payload.group_id, query: payload.query, page: payload.page }))
    yield put(LoadingActions.set(false));
}

function* OnMakeFavourite({
    payload,
}: {
    type: typeof AttendeeActions.MakeFavourite
    payload: { attendee_id: number }
}): SagaIterator {
    const state = yield select(state => state);
    yield call(makeFavouriteApi, payload, state);
    yield put(AttendeeActions.FetchAttendees({ query: state?.attendees?.query, page: 1, group_id: state?.attendees?.group_id, my_attendee_id: state?.attendees?.my_attendee_id }))
}

// Watcher Saga
export function* AttendeeWatcherSaga(): SagaIterator {
    yield takeEvery(AttendeeActions.FetchAttendees.type, OnGetAttendees)
    yield takeEvery(AttendeeActions.MakeFavourite.type, OnMakeFavourite)
}

export default AttendeeWatcherSaga