import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getMyProgramApi, makeFavouriteApi } from 'application/store/api/Program.Api';

import { ProgramActions } from 'application/store/slices/Program.Slice'

import { AttendeeActions } from 'application/store/slices/Attendee.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnGetMyPrograms({
    payload,
}: {
    type: typeof ProgramActions.FetchMyPrograms
    payload: { query: string, page: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMyProgramApi, payload, state)
    yield put(ProgramActions.update({ programs: response.data.data!, query: payload.query, page: payload.page }))
    yield put(LoadingActions.set(false));
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
        yield put(ProgramActions.FetchMyPrograms({ query: '', page: 1, screen: 'my-program' }))
    }
}

// Watcher Saga
export function* ProgramWatcherSaga(): SagaIterator {
    yield takeEvery(ProgramActions.FetchMyPrograms.type, OnGetMyPrograms)
    yield takeEvery(ProgramActions.MakeFavourite.type, OnMakeFavourite)
}

export default ProgramWatcherSaga