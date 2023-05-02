import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getEventApi, getEventByCodeApi, getModulesApi } from 'application/store/api/Event.Api';

import { EventActions } from 'application/store/slices/Event.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { ErrorActions } from 'application/store/slices/Error.slice'

import { EventResponse } from 'application/models/Event'

import { ModuleResponse } from 'application/models/Module'

import AsyncStorageClass from 'application/utils/AsyncStorageClass';

import { select } from 'redux-saga/effects';

function* OnGetEvent({
    payload,
}: {
    type: typeof EventActions.FetchEvent
    payload: string
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const env = yield select(state => state);
    const response: EventResponse = yield call(getEventApi, payload, env)
    yield put(EventActions.update(response.event!))
    yield put(LoadingActions.set(false))
}

function* OnGetEventByCode({
    payload,
}: {
    type: typeof EventActions.FetchEventByCode
    payload: string
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const env = yield select(state => state);
    const response = yield call(getEventByCodeApi, payload, env);
    if (response.success) {
        yield put(EventActions.update(response.event!));
        yield put(ErrorActions.message(''));
        AsyncStorageClass.setItem('eventbuizz-active-event-id', response.event.id);
    } else {
        yield put(ErrorActions.message(response.error));
        AsyncStorageClass.removeItem('eventbuizz-active-event-id');
    }
    yield put(LoadingActions.set(false))
}

function* OnGetModules({
    payload,
}: {
    type: typeof EventActions.FetchEvent
    payload: string
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const env = yield select(state => state);
    const response: ModuleResponse = yield call(getModulesApi, env)
    yield put(EventActions.updateModules(response.data.modules))
    yield put(LoadingActions.set(false))
}

// Watcher Saga
export function* EventWatcherSaga(): SagaIterator {
    yield takeEvery(EventActions.FetchEvent.type, OnGetEvent)
    yield takeEvery(EventActions.FetchEventByCode.type, OnGetEventByCode)
    yield takeEvery(EventActions.loadModules.type, OnGetModules)
}

export default EventWatcherSaga