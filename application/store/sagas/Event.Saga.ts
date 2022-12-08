import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getEventApi, updateEventApi } from 'application/store/api/Event.Api';

import { EventActions } from 'application/store/slices/Event.Slice'

import { Event } from 'application/models/Event'

// Worker Sagas
export function* onGetEvent(): SagaIterator {
    const event: Event[] = yield call(getEventApi)
    yield put(EventActions.fetchAllSucceeded(event))
}

function* onUpdateEvent({
    payload,
}: {
    type: typeof EventActions.update
    payload: Event
}): SagaIterator {
    yield call(updateEventApi, payload)
    yield put(EventActions.fetchAll())
}

// Watcher Saga
export function* EventWatcherSaga(): SagaIterator {
    yield takeEvery(EventActions.fetchAll.type, onGetEvent)
    yield takeEvery(EventActions.update.type, onUpdateEvent)
}

export default EventWatcherSaga