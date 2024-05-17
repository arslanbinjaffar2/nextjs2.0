import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getMyNoteApi, saveNote, updateNote, getMyNotesApi, getMyNotesByTypeApi } from 'application/store/api/Notes.Api'

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
    yield put(LoadingActions.addProcess({ process: 'update-note' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(updateNote, payload, state)
    yield put(NoteActions.SetSaving(false));
    yield put(LoadingActions.removeProcess({ process: 'update-note' }))
}

function* OnGetMyNote({
    payload
}: {
    type: typeof NoteActions.GetMyNote
    payload: any
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'get-my-notes' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMyNoteApi, payload, state)
    yield put(NoteActions.update(response.data.data));
    yield put(LoadingActions.removeProcess({ process: 'get-my-notes' }))
}

function* FetchMyNotes({
}: {
    type: typeof NoteActions.FetchMyNotes
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'get-my-notes' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMyNotesApi, {}, state)
    yield put(NoteActions.updateMyNotes(response.data.data));
    yield put(LoadingActions.removeProcess({ process: 'get-my-notes' }))
}

function* FetchMyNotesByType({
    payload
}: {
    type: typeof NoteActions.FetchMyNotesByType
    payload: any
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'get-my-notes' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMyNotesByTypeApi, payload, state)
    yield put(NoteActions.updateMyTypeNotes(response.data.data));
    yield put(LoadingActions.removeProcess({ process: 'get-my-notes' }))
}

// Watcher Saga
export function* NoteWatcherSaga(): SagaIterator {
    yield takeEvery(NoteActions.SaveNote.type, OnSaveNote)
    yield takeEvery(NoteActions.GetMyNote.type, OnGetMyNote)
    yield takeEvery(NoteActions.UpdateNote.type, OnUpdateNote)
    yield takeEvery(NoteActions.FetchMyNotes.type, FetchMyNotes)
    yield takeEvery(NoteActions.FetchMyNotesByType.type, FetchMyNotesByType)
}

export default NoteWatcherSaga