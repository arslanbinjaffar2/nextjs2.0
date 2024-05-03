import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getEditProfileDataApi, updateAttendeeApi } from 'application/store/api/EditProfile.Api'

import { EditProfileActions } from 'application/store/slices/EditProfile.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

import { ToastActions } from '../slices/Toast.Slice'
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

function* OnUpdateAttendee({
    payload,
}: {
    type: typeof EditProfileActions.UpdateAttendee
    payload: any
}): SagaIterator {
    const state = yield select(state => state);
    const response: HttpResponse = yield call(updateAttendeeApi, payload, state)
    if (response?.status === 200) {
        yield put(EditProfileActions.AttendeeUpdatedSuccessfully())
        yield put(ToastActions.AddToast({toast:{status:"success", message: "Congratulation! your action has been completed successfully",duration:5000}}))                
    }
}



// Watcher Saga
export function* EditProfileWatcherSaga(): SagaIterator {
    yield takeEvery(EditProfileActions.FetchEditProfileData.type, OnFetchEditProfileData)
    yield takeEvery(EditProfileActions.UpdateAttendee.type, OnUpdateAttendee)
}

export default EditProfileWatcherSaga