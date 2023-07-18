import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getSponsorApi } from 'application/store/api/Sponsor.api';

import { SponsorActions } from 'application/store/slices/Sponsor.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnGetSponsors({
    payload,
}: {
    type: typeof SponsorActions.FetchSponsors
    payload: string
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getSponsorApi, payload, state)
    yield put(SponsorActions.update(response.data.data.sponsors!))
    yield put(SponsorActions.updateCategories(response.data.data.sponsorCategories!))
    yield put(LoadingActions.set(false));
}

// Watcher Saga
export function* SponsorWatcherSaga(): SagaIterator {
    yield takeEvery(SponsorActions.FetchSponsors.type, OnGetSponsors)
}

export default SponsorWatcherSaga