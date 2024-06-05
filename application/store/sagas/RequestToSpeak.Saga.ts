import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getActiveProgramsApi, getTurnListApi, requestToSpeechApi } from 'application/store/api/RequestToSpeak.Api'

import { RequestToSpeakActions } from 'application/store/slices/RequestToSpeak.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchActivePrograms({
}: {
    type: typeof RequestToSpeakActions.FetchActivePrograms
}): SagaIterator {
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getActiveProgramsApi, {}, state)

}

function* OnFetchProgramTurnList({
    payload
}: {
    type: typeof RequestToSpeakActions.FetchProgramTurnList
    payload: { program_id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    yield put(LoadingActions.addProcess({ process: 'program-turn-list' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getTurnListApi, payload, state)
    yield put(RequestToSpeakActions.updateTurnList({
        current_attendee: response.data?.data?.current_attendee,
        remaining_seconds: response.data?.data?.remaining_seconds,
        timer_start_text: response.data?.data?.timer_start_text,
        agenda_detail: response.data?.data?.agenda_detail,
        refresh_time: response.data?.data?.refresh_time,
        speech_time_status: response.data?.data?.speech_time_status,
        settings: response.data?.data?.settings,
        attendees_to_come: response.data?.data?.attendees_to_come,
        agenda_settings: response.data?.data?.agenda_settings,
        current_user_status: response.data?.data?.current_user_status,
        active_speakerlist_session: response.data?.data?.active_speakerlist_session,
        field_settings: response.data?.data?.field_settings,
        current_user: response.data?.data?.current_user,
    }))
    yield put(LoadingActions.removeProcess({ process: 'program-turn-list' }))
    yield put(LoadingActions.set(false))
}

function* OnRequestToSpeech({
    payload
}: {
    type: typeof RequestToSpeakActions.RequestToSpeech
    payload: { program_id: number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'request-to-speech' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(requestToSpeechApi, payload, state)
    yield put(LoadingActions.removeProcess({ process: 'request-to-speech' }))
}

// Watcher Saga
export function* RequestToSpeakWatcherSaga(): SagaIterator {
    yield takeEvery(RequestToSpeakActions.FetchActivePrograms.type, OnFetchActivePrograms)
    yield takeEvery(RequestToSpeakActions.FetchProgramTurnList.type, OnFetchProgramTurnList)
    yield takeEvery(RequestToSpeakActions.RequestToSpeech.type, OnRequestToSpeech)
}

export default RequestToSpeakWatcherSaga