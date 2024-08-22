import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getHdGroupDetailApi, getHdGroupListingApi, getHdTabListingsApi, submitHdApi, submitHdLikeApi, getHdMyQuestionsApi, getHdMyQuestionsAnswersApi, submitSendMessageAnswerApi } from 'application/store/api/Hd.Api'

import { HdActions } from 'application/store/slices/Hd.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchGroups({
}: {
    type: typeof HdActions.OnFetchGroups
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:'hd-listing'}))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getHdGroupListingApi, {}, state)
    yield put(HdActions.update({ groups: response.data.data.groups!, settings:response.data.data.settings[0]!, labels:response.data.data.labels!}))
    yield put(LoadingActions.removeProcess({process:'hd-listing'}));
}

function* OnFetchGroupDetail({
    payload
}: {
    type: typeof HdActions.OnFetchGroupDetail
    payload: { id: number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:'hd-detail'}))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getHdGroupDetailApi, payload, state)
    yield put(HdActions.updateDetail({ 
        hd_group: response.data.data.hd_group!, 
        settings:response.data.data.settings[0]!, 
        labels:response.data.data.labels!,
        clientIp:response.data.data.clientIp!,
        all_languages:response.data.data.all_languages!,
        }))
    yield put(LoadingActions.removeProcess({process:'hd-detail'}));
}

function* OnFetchTabDetails({
    payload
}: {
    type: typeof HdActions.OnFetchTabDetails
    payload: { id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getHdTabListingsApi, payload, state)
    yield put(HdActions.updateTabDetail({ 
            popular_questions: response.data.data.popular_questions!,
            recent_questions: response.data.data.recent_questions!,
            archived_questions: response.data.data.archived_questions!,
            my_questions: response.data.data.my_questions!,
        }))
    yield put(LoadingActions.set(false));
}

function* SubmitHd({
    payload
}: {
    type: typeof HdActions.SubmitHd
    payload: any
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:'hd-submitting'}))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(submitHdApi, payload, state)
    yield put(HdActions.OnFetchTabDetails({id:payload.group_id}))
    yield put(LoadingActions.removeProcess({process:'hd-submitting'}))
}

function* SubmitHdLike({
    payload
}: {
    type: typeof HdActions.SubmitHdLike
    payload: any
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:`hd-like-${payload.question_id}`}))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(submitHdLikeApi, payload, state)
    yield put(HdActions.OnFetchTabDetails({id:payload.group_id}))
    yield put(LoadingActions.removeProcess({process:`hd-like-${payload.question_id}`}))
}


function* FetchMyHDQuestions({
    payload
}: {
    type: typeof HdActions.FetchMyHDQuestions
    payload: any
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:'hd-my-questions'}))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getHdMyQuestionsApi, payload, state)
    yield put(HdActions.updateMyQuestions({ my_questions: response.data.data! }))
    yield put(LoadingActions.removeProcess({process:'hd-my-questions'}))
}


function* FetchHDMyQuestionsAnswers({
    payload
}: {
    type: typeof HdActions.FetchHDMyQuestionsAnswers
    payload: any
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:'hd-my-questions-answers'}))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getHdMyQuestionsAnswersApi, payload, state)
    yield put(HdActions.updateMyQuestionsAnswers({ my_questions_answers: response.data.data! }))
    yield put(LoadingActions.removeProcess({process:'hd-my-questions-answers'}))
}

function* SendMessage({
    payload
}: {
    type: typeof HdActions.SendMessage
    payload: any
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:`hd-send-message-${payload.question_id}`}))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(submitSendMessageAnswerApi, payload, state)
}

// Watcher Saga
export function* HdWatcherSaga(): SagaIterator {
    yield takeEvery(HdActions.OnFetchGroups.type, OnFetchGroups)
    yield takeEvery(HdActions.OnFetchGroupDetail.type, OnFetchGroupDetail)
    yield takeEvery(HdActions.OnFetchTabDetails.type, OnFetchTabDetails)
    yield takeEvery(HdActions.SubmitHd.type, SubmitHd)
    yield takeEvery(HdActions.SubmitHdLike.type, SubmitHdLike)
    yield takeEvery(HdActions.FetchMyHDQuestions.type, FetchMyHDQuestions)
    yield takeEvery(HdActions.FetchHDMyQuestionsAnswers.type, FetchHDMyQuestionsAnswers)
    yield takeEvery(HdActions.SendMessage.type, SendMessage)
}

export default HdWatcherSaga