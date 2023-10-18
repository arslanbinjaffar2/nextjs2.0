import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getExhibitorApi, makeFavouriteApi, getExhibitorDetailApi } from 'application/store/api/Exhibitor.api';

import { ExhibitorActions } from 'application/store/slices/Exhibitor.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnGetExhibitors({
    payload,
}: {
    type: typeof ExhibitorActions.FetchExhibitors
    payload: { category_id: number, query: string, screen: string }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getExhibitorApi, payload, state)
    if (payload.screen === 'our-exhibitors') {
        yield put(ExhibitorActions.updateOurExhibitors(response.data.data.exhibitors!))
    } else {
        yield put(ExhibitorActions.update(response.data.data.exhibitors!))
    }
    yield put(ExhibitorActions.updateCategories(response.data.data.exhibitorCategories!))
    yield put(ExhibitorActions.updateSettings(response.data.data.settings!))
    yield put(ExhibitorActions.updateCategory(payload.category_id))
    yield put(ExhibitorActions.updateQuery(payload.query))
    yield put(LoadingActions.set(false));
}

function* OnMakeFavourite({
    payload,
}: {
    type: typeof ExhibitorActions.MakeFavourite
    payload: { exhibitor_id: number, screen: string }
}): SagaIterator {
    const state = yield select(state => state);
    yield call(makeFavouriteApi, payload, state);
    if (payload.screen === "listing") {
        yield put(ExhibitorActions.FetchExhibitors({ category_id: 0, query: '', screen: state?.exhibitors?.screen }))
    } else {
        yield put(ExhibitorActions.FetchExhibitorDetail({ id: payload.exhibitor_id }))
    }
}

function* OnGetExhibitorDetail({
    payload,
}: {
    type: typeof ExhibitorActions.FetchExhibitorDetail
    payload: { id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getExhibitorDetailApi, payload, state)
    yield put(ExhibitorActions.updateExhibitorDetail(response.data.data!))
    yield put(LoadingActions.set(false));
}

// Watcher Saga
export function* ExhibitorWatcherSaga(): SagaIterator {
    yield takeEvery(ExhibitorActions.FetchExhibitors.type, OnGetExhibitors)
    yield takeEvery(ExhibitorActions.FetchExhibitorDetail.type, OnGetExhibitorDetail)
    yield takeEvery(ExhibitorActions.MakeFavourite.type, OnMakeFavourite)
}

export default ExhibitorWatcherSaga