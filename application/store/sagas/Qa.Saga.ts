import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getQaProgramListingApi } from 'application/store/api/Qa.Api'

import { QaActions } from 'application/store/slices/Qa.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchPrograms({
}: {
    type: typeof QaActions.OnFetchPrograms
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getQaProgramListingApi, {}, state)
    yield put(QaActions.update({ programs: response.data.data.program_list!, qa_settings:response.data.data.qa_settings!,  program_settings:response.data.data.program_settings!}))
    yield put(LoadingActions.set(false));
}





// Watcher Saga
export function* QaWatcherSaga(): SagaIterator {
    yield takeEvery(QaActions.OnFetchPrograms.type, OnFetchPrograms)
}

export default QaWatcherSaga