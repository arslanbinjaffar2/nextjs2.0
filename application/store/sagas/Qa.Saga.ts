import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getQaProgramDetailApi, getQaProgramListingApi, getQaTabListingsApi } from 'application/store/api/Qa.Api'

import { QaActions } from 'application/store/slices/Qa.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchPrograms({
}: {
    type: typeof QaActions.OnFetchPrograms
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:'qa-listing'}))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getQaProgramListingApi, {}, state)
    yield put(QaActions.update({ programs: response.data.data.agenda_list!, qa_settings:response.data.data.qa_settings!,  program_settings:response.data.data.program_settings!}))
    yield put(LoadingActions.removeProcess({process:'qa-listing'}));
}

function* OnFetchProgramDetail({
    payload
}: {
    type: typeof QaActions.OnFetchPrograms
    payload: { id: number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:'qa-detail'}))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getQaProgramDetailApi, payload, state)
    yield put(QaActions.updateDetail({ 
            program_detail: response.data.data.agenda_detail!,
            speakers: response.data.data.speakers!,
            paragraph: response.data.data.paragraph!,
            qa_settings:response.data.data.qa_settings!,
            program_settings:response.data.data.program_settings!
        }))
    yield put(LoadingActions.removeProcess({process:'qa-detail'}));
}

function* OnFetchTabDetails({
    payload
}: {
    type: typeof QaActions.OnFetchPrograms
    payload: { id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getQaTabListingsApi, payload, state)
    yield put(QaActions.updateTabDetail({ 
            popular_questions: response.data.data.popular_questions!,
            recent_questions: response.data.data.recent_questions!,
            archived_questions: response.data.data.archived_questions!,
            my_questions:response.data.data.my_questions!
        }))
    yield put(LoadingActions.set(false));
}





// Watcher Saga
export function* QaWatcherSaga(): SagaIterator {
    yield takeEvery(QaActions.OnFetchPrograms.type, OnFetchPrograms)
    yield takeEvery(QaActions.OnFetchProgramDetail.type, OnFetchProgramDetail)
    yield takeEvery(QaActions.OnFetchTabDetails.type, OnFetchTabDetails)
}

export default QaWatcherSaga