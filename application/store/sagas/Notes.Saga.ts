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
    const note_type=payload?.note_type
    switch(note_type){
        case "sponsors":
            yield put (ToastActions.AddToast({toast:{message:labels.GENERAL_SPONSORS_NOTES  ,status:"success"}}))
          break;
          case "programs":
            yield put (ToastActions.AddToast({toast:{message:labels.GENERAL_PROGRAM_NOTES ,status:"success"}}))
            break;
            case "documents":
                yield put (ToastActions.AddToast({toast:{message:labels.GENERAL_DOCUMENTS_NOTES   ,status:"success"}}))
            break;
            case "exhibitors":
                yield put (ToastActions.AddToast({toast:{message:labels.GENERAL_EXHIBITORS_NOTES ,status:"success"}}))
              break;
        default:
      }
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
    const note_type=payload?.type

    switch(note_type){
        case "sponsors":
            yield put (ToastActions.AddToast({toast:{message:`${labels.GENERAL_SPONSORS_NOTES } updated successfully`,status:"success"}}))
          break;
          case "programs":
            yield put (ToastActions.AddToast({toast:{message:`${labels.GENERAL_PROGRAM_NOTES} updated successfully`,status:"success"}}))
            break;
            case "documents":
            yield put (ToastActions.AddToast({toast:{message:`${labels.GENERAL_DOCUMENTS_NOTES  } updated successfully`,status:"success"}}))
            break;
            case "exhibitors":
            yield put (ToastActions.AddToast({toast:{message:`${labels.GENERAL_EXHIBITORS_NOTES } updated successfully`,status:"success"}}))
              break;
        default:
      }

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

    switch(note_type){
        case "sponsors":
            yield put (ToastActions.AddToast({toast:{message:labels.GENERAL_SPONSORS_NOTES,status:"success"}}))
          break;
          case "programs":
            yield put (ToastActions.AddToast({toast:{message:labels.GENERAL_PROGRAM_NOTES,status:"success"}}))
            break;
            case "directory":
                yield put (ToastActions.AddToast({toast:{message:labels.GENERAL_DOCUMENTS_NOTES ,status:"success"}}))
            break;
            case "exhibitors":
                yield put (ToastActions.AddToast({toast:{message:labels.GENERAL_EXHIBITORS_NOTES,status:"success"}}))
              break;
        default:
      }
}

// Watcher Saga
export function* NoteWatcherSaga(): SagaIterator {
    yield takeEvery(NoteActions.SaveNote.type, OnSaveNote)
    yield takeEvery(NoteActions.GetMyNote.type, OnGetMyNote)
    yield takeEvery(NoteActions.UpdateNote.type, OnUpdateNote)
}

export default NoteWatcherSaga