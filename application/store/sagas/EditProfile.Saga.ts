import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getEditProfileDataApi } from 'application/store/api/EditProfile.Api'

import { EditProfileActions } from 'application/store/slices/EditProfile.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchEditProfileData({
}: {
    type: typeof EditProfileActions.FetchEditProfileData
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getEditProfileDataApi, {}, state)
    yield put(EditProfileActions.update(response.data.data))
    yield put(LoadingActions.set(false));
}





// Watcher Saga
export function* EditProfileWatcherSaga(): SagaIterator {
    yield takeEvery(EditProfileActions.FetchEditProfileData.type, OnFetchEditProfileData)
}

export default EditProfileWatcherSaga