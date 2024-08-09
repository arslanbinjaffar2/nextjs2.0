import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { doCheckInOutApi, getCheckInOutApi, getCheckInOutOrderDetailApi, sendQRCodeApi } from 'application/store/api/CheckInOut.Api'

import { CheckInOutActions } from 'application/store/slices/CheckInOut.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

import { ToastActions } from '../slices/Toast.Slice'

function* OnFetchCheckInOut({
    payload,
}: {
    type: typeof CheckInOutActions.FetchCheckInOut,
    payload: { showLoading: boolean }
}): SagaIterator {
    if (payload.showLoading){
        yield put(LoadingActions.addProcess({process:'fetch-checkin-out'}));
    }
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getCheckInOutApi, {}, state)
    yield put(CheckInOutActions.update({ ...response.data.data, }))
    if(payload.showLoading){
        yield put(LoadingActions.removeProcess({process:'fetch-checkin-out'}));
    }
}

function* OnSendQRCode({
}: {
    type: typeof CheckInOutActions.FetchCheckInOut
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:'checkin-send-qr-code'}));
    const state = yield select(state => state);
    const response: HttpResponse = yield call(sendQRCodeApi, {}, state)
     if(response.status == 200){
        yield put (ToastActions.AddToast({toast:{message: response?.data.event?.labels?.CHECKOUT_EMAIL_MSG ,status:"success"}}))
    }
    yield put(LoadingActions.removeProcess({process:'checkin-send-qr-code'}));
}

function* OnDoCheckInOut({
    payload,
}: {
    type: typeof CheckInOutActions.DoCheckInOut,
    payload: { attendee_id: number, organizer_id: number, action: string }
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:'checking-in-out'}));
    const state = yield select(state => state);
    const response: HttpResponse = yield call(doCheckInOutApi,payload, state)
    yield put(CheckInOutActions.toggleCheckInOut())
    yield put(CheckInOutActions.FetchCheckInOut({showLoading:false}))
    yield put(LoadingActions.removeProcess({process:'checking-in-out'}));
}

function* OnFetchOrderDetail({

}: {
    type: typeof CheckInOutActions.FetchOrderDetail,
}): SagaIterator {
    yield put(LoadingActions.addProcess({process:'checking-in-out-order-detail'}));
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getCheckInOutOrderDetailApi, {}, state)
    if(response.status == 200){
        yield put(CheckInOutActions.updateOrderDetail({order_detail:response.data.data.order_detail!}))
    }
    yield put(LoadingActions.removeProcess({process:'checking-in-out-order-detail'}));
}





// Watcher Saga
export function* CheckInOutWatcherSaga(): SagaIterator {
    yield takeEvery(CheckInOutActions.FetchCheckInOut.type, OnFetchCheckInOut)
    yield takeEvery(CheckInOutActions.SendQRCode.type, OnSendQRCode)
    yield takeEvery(CheckInOutActions.DoCheckInOut.type, OnDoCheckInOut)
    yield takeEvery(CheckInOutActions.FetchOrderDetail.type, OnFetchOrderDetail)
    
}

export default CheckInOutWatcherSaga