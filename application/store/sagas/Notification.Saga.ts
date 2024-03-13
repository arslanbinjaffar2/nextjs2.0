import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getAllNotificationApi } from 'application/store/api/Notification.Api'

import { NotificationActions } from 'application/store/slices/Notification.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchNotifications({
}: {
    type: typeof NotificationActions.FetchNotifications
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    // const response: HttpResponse = yield call(getAllNotificationApi, {}, state)
    // yield put(NotificationActions.update({ notifications: response.data.data! }))
    yield put(LoadingActions.set(false));
}





// Watcher Saga
export function* NotificationWatcherSaga(): SagaIterator {
    yield takeEvery(NotificationActions.FetchNotifications.type, OnFetchNotifications)
}

export default NotificationWatcherSaga