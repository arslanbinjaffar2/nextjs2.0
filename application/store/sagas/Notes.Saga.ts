import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getMyNoteApi, saveNote, updateNote, getMyNotesApi } from 'application/store/api/Notes.Api'

import { NoteActions } from 'application/store/slices/Notes.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

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
}

function* FetchMyNotes({
}: {
    type: typeof NoteActions.FetchMyNotes
}): SagaIterator {
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMyNotesApi, {}, state)
    yield put(NoteActions.updateMyNotes(response.data.data));
}

// Watcher Saga
export function* NoteWatcherSaga(): SagaIterator {
    yield takeEvery(NoteActions.SaveNote.type, OnSaveNote)
    yield takeEvery(NoteActions.GetMyNote.type, OnGetMyNote)
    yield takeEvery(NoteActions.UpdateNote.type, OnUpdateNote)
    yield takeEvery(NoteActions.FetchMyNotes.type, FetchMyNotes)
}

export default NoteWatcherSaga