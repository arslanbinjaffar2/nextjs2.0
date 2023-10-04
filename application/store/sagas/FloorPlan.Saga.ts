import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getFloorPlanApi } from 'application/store/api/FloorPlan.Api'

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
    yield put(FloorPlanActions.update({ floor_plans:response.data.data.floor_plans!, filters:response.data.data.filters!, sponsorCount:response.data.data.sponsorCount!, exhibitorCount:response.data.data.exhibitorCount! }))
    yield put(LoadingActions.set(false));
}





// Watcher Saga
export function* FloorPlanWatcherSaga(): SagaIterator {
    yield takeEvery(FloorPlanActions.FetchFloorPlans.type, OnFetchFloorPlans)
}

export default FloorPlanWatcherSaga