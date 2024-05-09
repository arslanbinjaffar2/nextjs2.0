import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getFloorPlanApi, getFloorPlanDetailApi } from 'application/store/api/FloorPlan.Api'

import { FloorPlanActions } from 'application/store/slices/FloorPlan.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchFloorPlans({
}: {
    type: typeof FloorPlanActions.FetchFloorPlans
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getFloorPlanApi, {}, state)
    yield put(FloorPlanActions.update({ floor_plans:response.data.data.floorPlans!, filters:response.data.data.filters!, sponsorCount:response.data.data.sponsorCount!, exhibitorCount:response.data.data.exhibitorCount! }))
    yield put(FloorPlanActions.updateLabels({ labels:response.data.data.labels!}))
    yield put(LoadingActions.set(false));
}

function* OnFetchFloorPlanDetail({
    payload,
}: {
    type: typeof FloorPlanActions.FetchFloorPlanDetail
    payload: { id: number}
}): SagaIterator {
    yield put(LoadingActions.set(true))
    yield put(LoadingActions.addProcess({ process: 'floor_plan_detail' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getFloorPlanDetailApi,payload, state)
    yield put(FloorPlanActions.updateFloorPlanDetail({ floor_plan:response.data.data.details!}))
    yield put(FloorPlanActions.updateLabels({ labels:response.data.data.labels!}))
    yield put(LoadingActions.set(false));
    yield put(LoadingActions.removeProcess({ process: 'floor_plan_detail' }))
}





// Watcher Saga
export function* FloorPlanWatcherSaga(): SagaIterator {
    yield takeEvery(FloorPlanActions.FetchFloorPlans.type, OnFetchFloorPlans)
    yield takeEvery(FloorPlanActions.FetchFloorPlanDetail.type, OnFetchFloorPlanDetail)
}

export default FloorPlanWatcherSaga