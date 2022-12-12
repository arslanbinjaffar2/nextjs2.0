import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getEventApi, updateEventApi } from 'application/store/api/Event.Api';

import { EventActions } from 'application/store/slices/Event.Slice'

import { Event, EventResponse } from 'application/models/Event'

// Worker Sagas handlers
function* OnGetEvent({
    payload,
}: {
    type: typeof EventActions.FetchEvent
    payload: any
}): SagaIterator {
    const response: EventResponse = yield call(getEventApi, payload)
    yield put(EventActions.FetchEventSucceeded(response.event!))
}

function* OnUpdateEvent({
    payload,
}: {
    type: typeof EventActions.UpdateEvent
    payload: Event
}): SagaIterator {
    yield call(updateEventApi, payload)
    yield put(EventActions.FetchEvent(payload.url!))
}

// Watcher Saga
export function* EventWatcherSaga(): SagaIterator {
    yield takeEvery(EventActions.FetchEvent.type, OnGetEvent)
    yield takeEvery(EventActions.UpdateEvent.type, OnUpdateEvent)
}

export default EventWatcherSaga