import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getSponsorApi, makeFavouriteApi, getSponsorDetailApi, getMySponsorsApi, getOurSponsorsApi } from 'application/store/api/Sponsor.api';

import { SponsorActions } from 'application/store/slices/Sponsor.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';
import { DocumentActions } from '../slices/Document.Slice';

function* OnGetSponsors({
    payload,
}: {
    type: typeof SponsorActions.FetchSponsors
    payload: { category_id: number, query: string, screen: string }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getSponsorApi, { ...payload, limit: payload.screen === 'our-sponsors' ? 5 : 20 }, state)
    if(payload.screen === 'our-sponsors') {
        yield put(SponsorActions.updateOurSponsors(response.data.data.sponsors!))
    } else if(payload.screen === 'my-sponsors') {
        yield put(SponsorActions.updateMySponsors(response.data.data.sponsors!))
    }else{
        yield put(SponsorActions.update(response.data.data.sponsors!))
        yield put(SponsorActions.updateSiteLabels(response.data.data.site_labels!))
    }
    
    yield put(SponsorActions.updateCategories(response.data.data.sponsorCategories!))
    yield put(SponsorActions.updateSettings(response.data.data.settings!))
    yield put(SponsorActions.updateCategory(payload.category_id))
    yield put(SponsorActions.updateQuery(payload.query))
    yield put(LoadingActions.set(false));
}

function* OnGetMySponsors({
    payload,
}: {
    type: typeof SponsorActions.FetchMySponsors
    payload: { }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMySponsorsApi,payload, state)
    yield put(SponsorActions.updateMySponsors(response.data.data.sponsors!))
    yield put(SponsorActions.updateSettings(response.data.data.settings!))
    yield put(LoadingActions.set(false));
}

function* OnGetOurSponsors({
    payload,
}: {
    type: typeof SponsorActions.FetchOurSponsors
    payload: { }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getOurSponsorsApi,payload, state)
    yield put(SponsorActions.updateOurSponsors(response.data.data.sponsors!))
    yield put(SponsorActions.updateSettings(response.data.data.settings!))
    yield put(LoadingActions.set(false));
}

function* OnMakeFavourite({
    payload,
}: {
    type: typeof SponsorActions.MakeFavourite
    payload: { sponsor_id: number, screen: string }
}): SagaIterator {
    const state = yield select(state => state);
    yield call(makeFavouriteApi, payload, state);
    if(payload.screen === "my-sponsors") {
        yield put(SponsorActions.FetchMySponsors({ }))
    }
}

function* OnGetSponsorDetail({
    payload,
}: {
    type: typeof SponsorActions.FetchSponsorDetail
    payload: { id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getSponsorDetailApi, payload, state)
    yield put(SponsorActions.updateSponsorDetail(response.data.data!))
    yield put(DocumentActions.update(response.data.data.documents!))
    yield put(LoadingActions.set(false));
}

// Watcher Saga
export function* SponsorWatcherSaga(): SagaIterator {
    yield takeEvery(SponsorActions.FetchSponsors.type, OnGetSponsors)
    yield takeEvery(SponsorActions.FetchMySponsors.type, OnGetMySponsors)
    yield takeEvery(SponsorActions.FetchSponsorDetail.type, OnGetSponsorDetail)
    yield takeEvery(SponsorActions.MakeFavourite.type, OnMakeFavourite)
    yield takeEvery(SponsorActions.FetchOurSponsors.type, OnGetOurSponsors)
}

export default SponsorWatcherSaga