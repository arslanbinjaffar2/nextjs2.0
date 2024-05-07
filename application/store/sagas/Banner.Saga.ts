import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getBannerApi } from 'application/store/api/Banner.Api'

import { BannerActions } from 'application/store/slices/Banner.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';


function* OnFetchBanners({
}: {
    type: typeof BannerActions.FetchBanners
}): SagaIterator {
    const state = yield select(state => state);
    if(state.banners.fetch_count > 1) return;  
    yield put(LoadingActions.addProcess({process:'banner-listing'}))
    const response: HttpResponse = yield call(getBannerApi, {}, state)
    yield put(BannerActions.update({ banners: response.data.data.banners!, banner_setting:response.data.data.banner_setting! }))
    yield put(LoadingActions.removeProcess({process:'banner-listing'}));
}





// Watcher Saga
export function* BannerWatcherSaga(): SagaIterator {
    yield takeEvery(BannerActions.FetchBanners.type, OnFetchBanners)
}

export default BannerWatcherSaga