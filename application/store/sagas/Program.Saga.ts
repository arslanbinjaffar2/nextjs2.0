import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getProgramApi, makeFavouriteApi } from 'application/store/api/Program.Api';

import { ProgramActions } from 'application/store/slices/Program.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnGetMyPrograms({
    payload,
}: {
    type: typeof ProgramActions.FetchPrograms
    payload: { query: string, page: number, id: number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'programs' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getProgramApi, payload, state)
    yield put(ProgramActions.update({ programs: response.data?.data, query: payload.query, page: payload.page }))
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
        yield put(ProgramActions.FetchPrograms({ query: '', page: 1, screen: 'my-program', id: 0 }))
    }
}

// Watcher Saga
export function* ProgramWatcherSaga(): SagaIterator {
    yield takeEvery(ProgramActions.FetchPrograms.type, OnGetMyPrograms)
    yield takeEvery(ProgramActions.MakeFavourite.type, OnMakeFavourite)
}

export default ProgramWatcherSaga