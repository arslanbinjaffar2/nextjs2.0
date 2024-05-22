import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getMyNoteApi, saveNote, updateNote } from 'application/store/api/Notes.Api'

import { NoteActions } from 'application/store/slices/Notes.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';
import { ToastActions } from '../slices/Toast.Slice'

function* OnSaveNote({
    payload
}: {
    type: typeof NoteActions.SaveNote
    payload: any
}): SagaIterator {
    
    const state = yield select(state => state);
    const response: HttpResponse = yield call(saveNote, payload, state)
    yield put(NoteActions.GetMyNote({note_type:payload.note_type, note_type_id:payload.note_type_id}));
    yield put(NoteActions.SetSaving(false));
    const labels=state?.event?.event.labels;
    yield put (ToastActions.AddToast({toast:{message:labels.GENERAL_NOTE_SAVE_MESSAGE ,status:"success"}}))
}

function* OnUpdateNote({
    payload
}: {
    type: typeof NoteActions.UpdateNote
    payload: any
}): SagaIterator {
    
    const state = yield select(state => state);
    const response: HttpResponse = yield call(updateNote, payload, state)
    yield put(NoteActions.SetSaving(false));
    const labels=state?.event?.event.labels;
    yield put (ToastActions.AddToast({toast:{message:labels.GENERAL_NOTE_SAVE_MESSAGE ,status:"success"}}))
}

function* OnGetMyNote({
    payload
}: {
    type: typeof NoteActions.GetMyNote
    payload: any
}): SagaIterator {
    
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMyNoteApi, payload, state)
    yield put(NoteActions.update(response.data.data));
    const labels=state?.event?.event.labels;
    const note_type=payload?.note_type

}

// Watcher Saga
export function* NoteWatcherSaga(): SagaIterator {
    yield takeEvery(NoteActions.SaveNote.type, OnSaveNote)
    yield takeEvery(NoteActions.GetMyNote.type, OnGetMyNote)
    yield takeEvery(NoteActions.UpdateNote.type, OnUpdateNote)
}

export default NoteWatcherSaga