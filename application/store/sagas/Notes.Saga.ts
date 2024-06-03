import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getMyNoteApi, saveNote, updateNote, getMyNotesApi, getMyNotesByTypeApi, emailMyNotesApi } from 'application/store/api/Notes.Api'

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
    yield put(LoadingActions.addProcess({ process: 'save-note' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(saveNote, payload, state)
    yield put(NoteActions.GetMyNote({note_type:payload.note_type, note_type_id:payload.note_type_id}));
    yield put(NoteActions.SetSaving(false));
    yield put(LoadingActions.removeProcess({ process: 'save-note' }))
}

function* OnUpdateNote({
    payload
}: {
    type: typeof NoteActions.UpdateNote
    payload: any
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'save-note' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(updateNote, payload, state)
    yield put(NoteActions.SetSaving(false));
    const labels=state?.event?.event.labels;
    yield put (ToastActions.AddToast({toast:{message:labels.GENERAL_NOTE_SAVE_MESSAGE ,status:"success"}}))
    yield put(LoadingActions.removeProcess({ process: 'save-note' }))
}

function* OnGetMyNote({
    payload
}: {
    type: typeof NoteActions.GetMyNote
    payload: any
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'on-get-my-notes' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMyNoteApi, payload, state)
    yield put(NoteActions.update(response.data.data));
    const labels=state?.event?.event.labels;
    const note_type=payload?.note_type

    yield put(LoadingActions.removeProcess({ process: 'on-get-my-notes' }))
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
    yield put(LoadingActions.addProcess({ process: 'get-my-notes-by-type' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMyNotesByTypeApi, payload, state)
    yield put(NoteActions.updateMyTypeNotes(response.data.data));
    yield put(LoadingActions.removeProcess({  process: 'get-my-notes-by-type'  }))
}

function* emailMyNotes({
}: {
    type: typeof NoteActions.FetchMyNotes
}): SagaIterator {
    const state = yield select(state => state);
    const response: HttpResponse = yield call(emailMyNotesApi, {}, state)
}

// Watcher Saga
export function* NoteWatcherSaga(): SagaIterator {
    yield takeEvery(NoteActions.SaveNote.type, OnSaveNote)
    yield takeEvery(NoteActions.GetMyNote.type, OnGetMyNote)
    yield takeEvery(NoteActions.UpdateNote.type, OnUpdateNote)
    yield takeEvery(NoteActions.FetchMyNotes.type, FetchMyNotes)
    yield takeEvery(NoteActions.FetchMyNotesByType.type, FetchMyNotesByType)
    yield takeEvery(NoteActions.emailMyNotes.type, emailMyNotes)
}

export default NoteWatcherSaga