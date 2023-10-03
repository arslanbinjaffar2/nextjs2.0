import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getProgramApi, getTrackApi, makeFavouriteApi } from 'application/store/api/Program.Api';

import { ProgramActions } from 'application/store/slices/Program.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnGetMyPrograms({
    payload,
}: {
    type: typeof ProgramActions.FetchPrograms
    payload: { query: string, page: number, id: number, track_id: number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'programs' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getProgramApi, payload, state)
    yield put(ProgramActions.update({ programs: response.data?.data?.programs, query: payload.query, page: payload.page, track: response.data.data.track! }))
    yield put(LoadingActions.removeProcess({ process: 'programs' }))
}

function* OnMakeFavourite({
    payload,
}: {
    type: typeof ProgramActions.MakeFavourite
    payload: { exhibitor_id: number, screen: string }
}): SagaIterator {
    const state = yield select(state => state);
    yield call(makeFavouriteApi, payload, state);
    if (payload.screen === "my-program") {
        yield put(ProgramActions.FetchPrograms({ query: '', page: 1, screen: 'my-program', id: 0, track_id: state?.programs?.track_id }))
    }
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
    yield put(ProgramActions.UpdateTracks({ tracks: response.data.data.tracks!, query: payload.query, page: payload.page, track: response.data.data.track! }))
    yield put(LoadingActions.removeProcess({ process: 'tracks' }))
}

// Watcher Saga
export function* ProgramWatcherSaga(): SagaIterator {
    yield takeEvery(ProgramActions.FetchPrograms.type, OnGetMyPrograms)
    yield takeEvery(ProgramActions.MakeFavourite.type, OnMakeFavourite)
    yield takeEvery(ProgramActions.FetchTracks.type, OnGetTracks)
}

export default ProgramWatcherSaga