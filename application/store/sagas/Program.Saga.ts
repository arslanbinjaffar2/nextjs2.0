import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getProgramApi, getTrackApi, makeFavouriteApi, getProgramDetailApi, getRatingApi, saveRatingApi, getUpcomingProgramApi } from 'application/store/api/Program.Api';

import { ProgramActions } from 'application/store/slices/Program.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';
import { ToastActions } from 'application/store/slices/Toast.Slice';
import { NotificationActions } from 'application/store/slices/Notification.Slice'

function* OnGetMyPrograms({
    payload,
}: {
    type: typeof ProgramActions.FetchPrograms
    payload: { query: string, page: number, id: number, track_id: number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'programs' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getProgramApi, payload, state)
    yield put(ProgramActions.update({ programs: response.data?.data?.programs, query: payload.query, page: payload.page, track: response.data.data.track!, agendas_attached_via_group:response.data.data.agendas_attached_via_group!, total_pages: response?.data?.data?.programs_total_pages, event_status: response?.data?.data?.event_status}))
    yield put(LoadingActions.removeProcess({ process: 'programs' }))
}

function* OnGetProgramDetail({
    payload,
}: {
    type: typeof ProgramActions.FetchProgramDetail
    payload: { id: number, speaker: number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'program-detail' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getProgramDetailApi, payload, state)
    yield put(ProgramActions.UpdateDetail({ detail: response.data.data! }))
    yield put(LoadingActions.removeProcess({ process: 'program-detail' }))
}

function* OnMakeFavourite({
    payload,
}: {
    type: typeof ProgramActions.MakeFavourite
    payload: { program_id: number, screen: string }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: `program-fav-${payload.program_id}` }))
    const state = yield select(state => state);
    const response: HttpResponse =  yield call(makeFavouriteApi, payload, state);
    if(response?.data?.data.status == 0){
        yield put(NotificationActions.addNotification({notification:{status:"error", title:state?.event?.event?.labels?.NATIVE_APP_ERROR, text:response?.data?.data?.error,type:'program-fav-error',btnLeftText:state?.event?.event?.labels?.GENERAL_OK}}))
    }
    else{
        yield put(ProgramActions.ToggleFavourite({ program_id: payload.program_id }))
    }
    yield put(LoadingActions.removeProcess({ process: `program-fav-${payload.program_id}` }))
}

function* OnGetTracks({
    payload,
}: {
    type: typeof ProgramActions.FetchTracks
    payload: { query: string, page: number, screen: string, track_id: number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'tracks' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getTrackApi, payload, state)
    yield put(ProgramActions.UpdateTracks({ tracks: response.data.data.tracks!, query: payload.query, page: payload.page, track: response.data.data.track!, total_pages: response.data.data.total_pages!}))
    yield put(LoadingActions.removeProcess({ process: 'tracks' }))
}

function* OnGetRating({
    payload,
}: {
    type: typeof ProgramActions.FetchRating
    payload: { program_id: number}
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'program-ratings' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getRatingApi, payload, state)
    yield put(ProgramActions.UpdateRating({ rating: response.data.data.rating!}))
    yield put(LoadingActions.removeProcess({ process: 'program-ratings' }))
}

function* OnSaveRating({
    payload,
}: {
    type: typeof ProgramActions.SaveRating
    payload: { program_id: number, rate:number,comment:string}
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'save-program-ratings' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(saveRatingApi, payload, state)
    yield put(ProgramActions.UpdateRating({ rating: response.data.data.rating!}))
    yield put(ToastActions.AddToast({toast:{status:"success", message:state?.event?.event?.labels?.NATIVE_APP_FEEDBACK_SUCCESS_MSG}}))
    yield put(LoadingActions.removeProcess({ process: 'save-program-ratings' }))
}

function* OnGetUpcomingPrograms({
    payload,
}: {
    type: typeof ProgramActions.FetchUpcomingPrograms
    payload: { limit: number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'upcoming-programs' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getUpcomingProgramApi, payload, state)
    yield put(ProgramActions.UpdateUpcomingPrograms({ programs: response.data?.data?.programs}))
    yield put(LoadingActions.removeProcess({ process: 'upcoming-programs' }))
}

// Watcher Saga
export function* ProgramWatcherSaga(): SagaIterator {
    yield takeEvery(ProgramActions.FetchPrograms.type, OnGetMyPrograms)
    yield takeEvery(ProgramActions.MakeFavourite.type, OnMakeFavourite)
    yield takeEvery(ProgramActions.FetchTracks.type, OnGetTracks)
    yield takeEvery(ProgramActions.FetchProgramDetail.type, OnGetProgramDetail)
    yield takeEvery(ProgramActions.FetchRating.type, OnGetRating)
    yield takeEvery(ProgramActions.SaveRating.type, OnSaveRating)
    yield takeEvery(ProgramActions.FetchUpcomingPrograms.type, OnGetUpcomingPrograms)
}

export default ProgramWatcherSaga