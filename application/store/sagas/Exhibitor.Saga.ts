import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getExhibitorApi, makeFavouriteApi, getExhibitorDetailApi, getMyExhibitorApi, getOurExhibitorApi,getContactExhibitorApi } from 'application/store/api/Exhibitor.api';

import { ExhibitorActions } from 'application/store/slices/Exhibitor.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';
import { DocumentActions } from '../slices/Document.Slice';
import { SponsorActions } from 'application/store/slices/Sponsor.Slice'

function* OnGetExhibitors({
    payload,
}: {
    type: typeof ExhibitorActions.FetchExhibitors
    payload: { category_id: number, query: string, screen: string }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getExhibitorApi, { ...payload, limit: payload.screen === 'our-exhibitors' ? 5 : 20 }, state)
    if (payload.screen === 'our-exhibitors') {
        yield put(ExhibitorActions.updateOurExhibitors(response.data.data.exhibitors!))
    }else if(payload.screen === 'my-exhibitors') {
        yield put(ExhibitorActions.updateMyExhibitors(response.data.data.exhibitors!))
    } else {
        yield put(ExhibitorActions.update(response.data.data.exhibitors!))
        yield put(ExhibitorActions.updateSiteLabels(response.data.data.labels!))
    }
    yield put(ExhibitorActions.updateCategories(response.data.data.exhibitorCategories!))
    yield put(ExhibitorActions.updateSettings(response.data.data.settings!))
    yield put(ExhibitorActions.updateCategory(payload.category_id))
    yield put(ExhibitorActions.updateQuery(payload.query))
    yield put(LoadingActions.set(false));
}

function* OnGetMyExhibitors({
    payload,
}: {
    type: typeof ExhibitorActions.FetchMyExhibitors
    payload: {}
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMyExhibitorApi,payload, state)
    yield put(ExhibitorActions.updateMyExhibitors(response.data.data.exhibitors!))
    yield put(ExhibitorActions.updateSettings(response.data.data.settings!))
    yield put(LoadingActions.set(false));
}

function* OnGetOurExhibitors({
    payload,
}: {
    type: typeof ExhibitorActions.FetchOurExhibitors
    payload: {}
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getOurExhibitorApi,payload, state)
    yield put(ExhibitorActions.updateOurExhibitors(response.data.data.exhibitors!))
    yield put(ExhibitorActions.updateSettings(response.data.data.settings!))
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
    if(payload.screen === "my-exhibitors") {
        yield put(ExhibitorActions.FetchMyExhibitors({ }))
    }
}

function* OnGetExhibitorDetail({
    payload,
}: {
    type: typeof ExhibitorActions.FetchExhibitorDetail
    payload: { id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    yield put(LoadingActions.addProcess({ process: 'exhibitor-detail' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getExhibitorDetailApi, payload, state)
    yield put(ExhibitorActions.updateExhibitorDetail(response.data.data!))
    yield put(DocumentActions.update(response.data.data.documents!))
    yield put(LoadingActions.set(false));
    yield put(LoadingActions.removeProcess({ process: 'exhibitor-detail' }))
}
function* OnGetExhibitorContact({
    payload,
}: {
    type: typeof ExhibitorActions.FetchExhibitorContact
    payload: { id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getContactExhibitorApi, payload, state)
    yield put(LoadingActions.set(false));
}

// Watcher Saga
export function* ExhibitorWatcherSaga(): SagaIterator {
    yield takeEvery(ExhibitorActions.FetchExhibitors.type, OnGetExhibitors)
    yield takeEvery(ExhibitorActions.FetchExhibitorDetail.type, OnGetExhibitorDetail)
    yield takeEvery(ExhibitorActions.FetchExhibitorContact.type, OnGetExhibitorContact)
    yield takeEvery(ExhibitorActions.MakeFavourite.type, OnMakeFavourite)
    yield takeEvery(ExhibitorActions.FetchMyExhibitors.type, OnGetMyExhibitors)
    yield takeEvery(ExhibitorActions.FetchOurExhibitors.type, OnGetOurExhibitors)
}

export default ExhibitorWatcherSaga