import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getAlertApi } from 'application/store/api/Alert.Api'

import { AlertActions } from 'application/store/slices/Alert.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchAlerts({
}: {
    type: typeof AlertActions.FetchAlerts
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getAlertApi, {}, state)
    yield put(AlertActions.update({ alerts: response.data.data.alerts!, attendee_alerts:response.data.data.attendee_alerts! }))
    yield put(LoadingActions.set(false));
}





// Watcher Saga
export function* AlertWatcherSaga(): SagaIterator {
    yield takeEvery(AlertActions.FetchAlerts.type, OnFetchAlerts)
}

export default AlertWatcherSaga