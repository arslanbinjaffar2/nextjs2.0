import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getMySubRegistrationApi, getSubRegistrationApi, saveSubRegistrationApi } from 'application/store/api/SubRegistration.Api'

import { SubRegistrationActions } from 'application/store/slices/SubRegistration.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';
import { ToastActions } from '../slices/Toast.Slice'

function* OnFetchSubRegistrationAfterLogin({
}: {
    type: typeof SubRegistrationActions.FetchSubRegistrationAfterLogin
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getSubRegistrationApi, {}, state)
    yield put(SubRegistrationActions.update({ afterLogin: {...response.data.data}, event_url: state.event.event.url }))
    yield put(LoadingActions.set(false));
}

function* OnFetchMySubRegistration({
}: {
    type: typeof SubRegistrationActions.FetchSubRegistrationAfterLogin
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMySubRegistrationApi, {}, state)
    yield put(SubRegistrationActions.updateMySubRegistration({ ...response.data.data }))
    yield put(LoadingActions.set(false));
}

function* OnSaveSubRegistration({
    payload,
}: {
    type: typeof SubRegistrationActions.SaveSubRegistration
    payload:any
}): SagaIterator {
    const state = yield select(state => state);
    const response: HttpResponse = yield call(saveSubRegistrationApi, payload, state)
    if(response.data.data.status){
        const SubRegistrationLabel=state?.event?.event.labels?.EVENTSITES_SUBREGISTRATION_UPDATE_MESSAGE
        yield put(ToastActions.AddToast({toast:{status:"success", message:SubRegistrationLabel,duration:10000}}))
        yield put(SubRegistrationActions.SubmitSuccess({event_url:state.event.event.url}))
        yield put(SubRegistrationActions.setSkip({event_url:state.event.event.url}))
       
    }else{
        yield put(SubRegistrationActions.setSubmitting(false))
        yield put(SubRegistrationActions.setLimitErrors(response.data.data.limit_errors!))
    }
}





// Watcher Saga
export function* SubRegistrationWatcherSaga(): SagaIterator {
    yield takeEvery(SubRegistrationActions.FetchSubRegistrationAfterLogin.type, OnFetchSubRegistrationAfterLogin)
    yield takeEvery(SubRegistrationActions.FetchMySubRegistration.type, OnFetchMySubRegistration)
    yield takeEvery(SubRegistrationActions.SaveSubRegistration.type, OnSaveSubRegistration)
}

export default SubRegistrationWatcherSaga