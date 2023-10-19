import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getSocialMediaApi } from 'application/store/api/SocialMedia.Api'

import { SocialMediaActions } from 'application/store/slices/SocialMedia.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchSocialMedia({
}: {
    type: typeof SocialMediaActions.FetchSocialMedias
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getSocialMediaApi, {}, state)
    yield put(SocialMediaActions.update({ socialMedia: response.data.data.social_media! }))
    yield put(LoadingActions.set(false));
}





// Watcher Saga
export function* SocialMediaWatcherSaga(): SagaIterator {
    yield takeEvery(SocialMediaActions.FetchSocialMedias.type, OnFetchSocialMedia)
}

export default SocialMediaWatcherSaga