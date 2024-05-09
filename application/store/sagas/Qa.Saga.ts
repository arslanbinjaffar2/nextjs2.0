import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getQaProgramDetailApi, getQaProgramListingApi, getQaTabListingsApi, submitQaApi, submitQaLikeApi, getQaMyQuestionListingApi, getQaMyQuestionAnswersListingApi } from 'application/store/api/Qa.Api'

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
    type: typeof QaActions.OnFetchProgramDetail
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
            program_settings:response.data.data.program_settings!,
            client_ip:response.data.data.client_ip!,
            all_languages:response.data.data.all_languages!,
            labels:response.data.data.labels!
        }))
    yield put(LoadingActions.removeProcess({process:'qa-detail'}));
}

function* OnFetchTabDetails({
    payload
}: {
    type: typeof QaActions.OnFetchTabDetails
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

function* SubmitQa({
    payload
}: {
    type: typeof QaActions.SubmitQa
    payload: any
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:'qa-submitting'}))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(submitQaApi, payload, state)
    yield put(QaActions.OnFetchTabDetails({id:payload.agenda_id}))
    yield put(LoadingActions.removeProcess({process:'qa-submitting'}))
}

function* SubmitQaLike({
    payload
}: {
    type: typeof QaActions.SubmitQaLike
    payload: any
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:`qa-like-${payload.question_id}`}))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(submitQaLikeApi, payload, state)
    yield put(QaActions.OnFetchTabDetails({id:payload.agenda_id}))
    yield put(LoadingActions.removeProcess({process:`qa-like-${payload.question_id}`}))
}

function* OnFetchMyQuestions({
}: {
    type: typeof QaActions.FetchMyQuestions
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:'qa-listing'}))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getQaMyQuestionListingApi, {}, state)
    yield put(QaActions.updateMyQuestions(response.data.data))
    yield put(LoadingActions.removeProcess({process:'qa-listing'}));
}

function* FetchMyQuestionsAnswers({
    payload
}: {
    type: typeof QaActions.FetchMyQuestionsAnswers
    payload: any
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:'qa-listing'}))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getQaMyQuestionAnswersListingApi, payload, state)
    yield put(QaActions.updateMyQuestionAnswers(response.data.data))
    yield put(LoadingActions.removeProcess({process:'qa-listing'}));
}



// Watcher Saga
export function* QaWatcherSaga(): SagaIterator {
    yield takeEvery(QaActions.OnFetchPrograms.type, OnFetchPrograms)
    yield takeEvery(QaActions.OnFetchProgramDetail.type, OnFetchProgramDetail)
    yield takeEvery(QaActions.OnFetchTabDetails.type, OnFetchTabDetails)
    yield takeEvery(QaActions.SubmitQa.type, SubmitQa)
    yield takeEvery(QaActions.SubmitQaLike.type, SubmitQaLike)
    yield takeEvery(QaActions.FetchMyQuestions.type, OnFetchMyQuestions)
    yield takeEvery(QaActions.FetchMyQuestionsAnswers.type, FetchMyQuestionsAnswers)
}

export default QaWatcherSaga