import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getMySurveyResultApi, getMySurveyResultDetailApi, getSurveyApi, getSurveyDetailApi, submitSurveyApi } from 'application/store/api/Survey.Api'

import { SurveyActions } from 'application/store/slices/Survey.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

import { SurveySubmitData } from 'application/models/survey/Survey'

function* OnFetchSurveys({
}: {
    type: typeof SurveyActions.FetchSurveys
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getSurveyApi, {}, state)
    yield put(SurveyActions.update({ surveys: response.data.data.surveys.pending_surveys!, completed_surveys:response.data.data.surveys.completed_surveys, survey_settings:response.data.data.surveySettings, survey_labels:response.data.data.survey_labels}))
    yield put(LoadingActions.set(false));
}

function* OnFetchSurveyDetail({
    payload,
}: {
    type: typeof SurveyActions.FetchSurveyDetail
    payload: { id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getSurveyDetailApi, payload, state)
    yield put(SurveyActions.updateDetail({ detail: response.data.data.survey!, survey_labels: response.data.data.survey_labels  }))
    yield put(LoadingActions.set(false));
}


function* OnSurveySubmit({
    payload,
}: {
    type: typeof SurveyActions.SubmitSurvey
    payload: SurveySubmitData
}): SagaIterator {
    const state = yield select(state => state);
    const response: HttpResponse = yield call(submitSurveyApi, payload, state)
    console.log(response);
    if (response?.status === 200) {
        yield put(SurveyActions.SurveySubmitSuccess())
    }
}

function* OnFetchMySurveyResults({
}: {
    type: typeof SurveyActions.FetchMySurveyResults
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMySurveyResultApi, {}, state)
    yield put(SurveyActions.updateMySurveyResults({ mySurveyResult: response.data.data.surveys, survey_labels: response.data.data.survey_labels, survey_settings: response.data.data.surveySettings }))
    yield put(LoadingActions.set(false))

}

function* OnFetchMySurveyResultDetail({
    payload,
}: {
    type: typeof SurveyActions.FetchMySurveyResultDetail
    payload: { id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMySurveyResultDetailApi, payload, state)
    yield put(SurveyActions.updateMySurveyResultDetail({ detail: response.data.data.survey_detail.survery!, survey_labels: response.data.data.survey_labels, survey_settings: response.data.data.surveySettings }))
    yield put(LoadingActions.set(false));
}


// Watcher Saga
export function* SurveyWatcherSaga(): SagaIterator {
    yield takeEvery(SurveyActions.FetchSurveys.type, OnFetchSurveys)
    yield takeEvery(SurveyActions.FetchSurveyDetail.type, OnFetchSurveyDetail)
    yield takeEvery(SurveyActions.SubmitSurvey.type, OnSurveySubmit)
    yield takeEvery(SurveyActions.FetchMySurveyResults.type, OnFetchMySurveyResults)
    yield takeEvery(SurveyActions.FetchMySurveyResultDetail.type, OnFetchMySurveyResultDetail)
}

export default SurveyWatcherSaga