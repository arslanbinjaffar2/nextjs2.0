import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getEventApi, getEventByCodeApi, getModulesApi,getHomeEventDetailApi, getSettingModulesApi,fetchEventApi } from 'application/store/api/Event.Api';

import { EventActions } from 'application/store/slices/Event.Slice'

import { AuthActions } from 'application/store/slices/Auth.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { ErrorActions } from 'application/store/slices/Error.slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';
import { NetworkInterestActions } from '../slices/NetworkInterest.Slice';

function* OnGetEvent({
    payload,
}: {
    type: typeof EventActions.FetchEvent
    payload: string
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const env = yield select(state => state);
    const response: HttpResponse = yield call(getEventApi, payload, env)
    yield put(EventActions.update(response.data.data.event!))
    if(response.data.data.event.keyword_settings.show_after_login == 0){
        yield put(NetworkInterestActions.setSkip());
    }
    yield put(LoadingActions.set(false));
}

function* OnGetEventByCode({
    payload,
}: {
    type: typeof EventActions.FetchEventByCode
    payload: string
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const env = yield select(state => state);
    const response: HttpResponse = yield call(getEventByCodeApi, payload, env);
    if (response.data.success) {
        yield put(EventActions.update(response.data.data.event!));
        yield put(ErrorActions.message(''));
    } else {
        yield put(ErrorActions.message(response.data.error!));
        yield put(EventActions.update({}));
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
    const response: HttpResponse = yield call(getModulesApi, env)
    if (response?.status === 401) {
        yield put(AuthActions.clearToken());
    } else {
        yield put(EventActions.updateModules(response.data.data.modules))
        yield put(EventActions.customHtml(response.data.data.custom_html))
        yield put(LoadingActions.set(false))
    }
}

function* OnGetSettingModules({
    payload,
}: {
    type: typeof EventActions.FetchEvent
    payload: string
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const env = yield select(state => state);
    const response: HttpResponse = yield call(getSettingModulesApi, env)
    if (response?.status === 401) {
        yield put(AuthActions.clearToken());
    } else {
        yield put(EventActions.updateSettingsModules(response.data.data.modules))
        yield put(LoadingActions.set(false))
    }
}

function* OnFetchEvents({
    payload,
}: {
    type: typeof EventActions.FetchEvents
    payload: {query: string, screen: string, selected_filter: string }
}): SagaIterator {
    yield put(LoadingActions.addProcess({process: 'fetching-events'}))
    const state = yield select(state => state);
    console.log(state.event)
    const response: HttpResponse = yield call(fetchEventApi, payload, state)
     if( payload.screen === 'homeMyevents') {
        yield put(EventActions.UpdateEvents(response?.data?.data?.events))
    } else{
        yield put(EventActions.UpdateUpcomingEvents(response?.data?.data?.events))
    }
    yield put(LoadingActions.removeProcess({process: 'fetching-events'}))

}
function* getHomeEventDetail({
    payload,
}: {
    type: typeof EventActions.FetchEvent
    payload: { id: number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'event-detail' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getHomeEventDetailApi, payload, state)
    console.log('response: ',response.data.data)
    yield put(EventActions.updateEventDetail({detail:response?.data?.data?.detail}))
    yield put(LoadingActions.removeProcess({ process: 'event-detail' }))
}
// Watcher Saga
export function* EventWatcherSaga(): SagaIterator {
    yield takeEvery(EventActions.FetchEvent.type, OnGetEvent)
    yield takeEvery(EventActions.FetchEventByCode.type, OnGetEventByCode)
    yield takeEvery(EventActions.loadModules.type, OnGetModules)
    yield takeEvery(EventActions.loadSettingsModules.type, OnGetSettingModules)
    yield takeEvery(EventActions.FetchEvents.type, OnFetchEvents)
    yield takeEvery(EventActions.FetchEventDetail.type, getHomeEventDetail)
}

export default EventWatcherSaga