import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { MeetingReservationActions } from 'application/store/slices/MeetingReservation.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';
import { getAvailableMeetingSlotsApi, getMyMeetingRequestsApi } from 'application/store/api/MeetingReservation.api';

function* OnGetMyMeetingRequests({
    payload,
}: {
    type: typeof MeetingReservationActions.FetchMyMeetingRequests
    payload: {  }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'my-meeting-requests' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMyMeetingRequestsApi, { ...payload, limit: 20 }, state)
    yield put(MeetingReservationActions.updateMyMeetingRequests(response.data.data))
    yield put(LoadingActions.removeProcess({ process: 'my-meeting-requests' }))
}

function* OnGetAvailableSlots({
    payload,
}: {
    type: typeof MeetingReservationActions.FetchAvailableSlots
    payload: {  }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'get-available-slots' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getAvailableMeetingSlotsApi, { ...payload, limit: 20 }, state)
    yield put(MeetingReservationActions.updateAvailableSlots({slots:response.data.data.meeting_slots, dates:response.data.data.dates}))
    yield put(LoadingActions.removeProcess({ process: 'get-available-slots' }))
}

// Watcher Saga
export function* MeetingReservationWatcherSaga(): SagaIterator {
    yield takeEvery(MeetingReservationActions.FetchMyMeetingRequests.type, OnGetMyMeetingRequests)
    yield takeEvery(MeetingReservationActions.FetchAvailableSlots.type, OnGetAvailableSlots)
}

export default MeetingReservationWatcherSaga