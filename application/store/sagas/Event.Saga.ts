import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getEventApi, getEventByCodeApi } from 'application/store/api/Event.Api';

import { EventActions } from 'application/store/slices/Event.Slice'

import { ErrorActions } from 'application/store/slices/Error.slice'

import { EventResponse } from 'application/models/Event'

import AsyncStorageClass from 'application/utils/AsyncStorageClass';

// Worker Sagas handlers
function* OnGetEvent({
    payload,
}: {
    type: typeof EventActions.FetchEvent
    payload: any
}): SagaIterator {
    const response: EventResponse = yield call(getEventApi, payload)
    yield put(EventActions.update(response.event!))
}

// Worker Sagas handlers
function* OnGetEventByCode({
    payload,
}: {
    type: typeof EventActions.FetchEventByCode
    payload: any
}): SagaIterator {
    const response = yield call(getEventByCodeApi, payload);
    if (response.success) {
        yield put(EventActions.update(response.event!));
        yield put(ErrorActions.message(''));
        AsyncStorageClass.setItem('eventbuizz-active-event-id', response.event.id);
    } else {
        yield put(ErrorActions.message(response.error));
        AsyncStorageClass.removeItem('eventbuizz-active-event-id');
    }
}

// Watcher Saga
export function* EventWatcherSaga(): SagaIterator {
    yield takeEvery(EventActions.FetchEvent.type, OnGetEvent)
    yield takeEvery(EventActions.FetchEventByCode.type, OnGetEventByCode)
}

export default EventWatcherSaga