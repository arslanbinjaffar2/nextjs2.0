import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getGalleryImagesApi } from 'application/store/api/Gallery.Api'

import { GalleryActions } from 'application/store/slices/Gallery.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchGalleryImages({
}: {
    type: typeof GalleryActions.FetchGalleryImages
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getGalleryImagesApi, {}, state)
    yield put(GalleryActions.update({ gallery_images:response.data.data.images.data!, filters:response.data.data.filters!}))
    yield put(LoadingActions.set(false));
}





// Watcher Saga
export function* GalleryWatcherSaga(): SagaIterator {
    yield takeEvery(GalleryActions.FetchGalleryImages.type, OnFetchGalleryImages)
}

export default GalleryWatcherSaga