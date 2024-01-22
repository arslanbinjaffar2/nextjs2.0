import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getGalleryImagesApi } from 'application/store/api/Gallery.Api'

import { GalleryActions } from 'application/store/slices/Gallery.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchGalleryImages({
    payload,
}: {
    type: typeof GalleryActions.FetchGalleryImages
    payload: { page: number}
}): SagaIterator {
    yield put(LoadingActions.set(true))
    yield put(LoadingActions.addProcess({ process: 'gallery' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getGalleryImagesApi, payload, state)
    yield put(GalleryActions.update({ page:payload.page, last_page:response.data.data.images.last_page, gallery_images:response.data.data.images.data!, filters:response.data.data.filters!}))
    yield put(LoadingActions.set(false));
    yield put(LoadingActions.removeProcess({ process: 'gallery' }))
}





// Watcher Saga
export function* GalleryWatcherSaga(): SagaIterator {
    yield takeEvery(GalleryActions.FetchGalleryImages.type, OnFetchGalleryImages)
}

export default GalleryWatcherSaga