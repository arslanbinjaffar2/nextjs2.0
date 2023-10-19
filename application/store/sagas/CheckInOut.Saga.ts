import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getCheckInOutApi } from 'application/store/api/CheckInOut.Api'

import { CheckInOutActions } from 'application/store/slices/CheckInOut.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchCheckInOut({
}: {
    type: typeof CheckInOutActions.FetchCheckInOut
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getCheckInOutApi, {}, state)
    const typeHistory = response.data.data.history.reduce((ack:any,item:any)=>{
        if(ack[item.type_name] !== undefined){
            ack[item.type_name].push(item);
        }
        return ack;
    }, {event:[],program:[],group:[],ticket:[]});
    yield put(CheckInOutActions.update({ ...response.data.data, history:typeHistory }))
    yield put(LoadingActions.set(false));
}





// Watcher Saga
export function* CheckInOutWatcherSaga(): SagaIterator {
    yield takeEvery(CheckInOutActions.FetchCheckInOut.type, OnFetchCheckInOut)
}

export default CheckInOutWatcherSaga