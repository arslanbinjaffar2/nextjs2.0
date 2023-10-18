import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getAttendeeApi, makeFavouriteApi, getGroupsApi, getAttendeeDetailApi, getCategoryApi } from 'application/store/api/Attendee.Api';

import { AttendeeActions } from 'application/store/slices/Attendee.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnGetAttendees({
    payload,
}: {
    type: typeof AttendeeActions.FetchAttendees
    payload: { group_id: number, query: string, page: number, my_attendee_id: number, speaker: number, category_id: number, screen: string }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'attendee-listing' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getAttendeeApi, payload, state)
    yield put(AttendeeActions.Update({ attendee: response.data.data!, group_id: payload.group_id, query: payload.query, page: payload.page, group_name: response?.data?.meta?.group_name, screen: payload.screen, total: response.data.meta?.total! }))
    yield put(LoadingActions.removeProcess({ process: 'attendee-listing' }))
}

function* OnGetAttendeeDetail({
    payload,
}: {
    type: typeof AttendeeActions.FetchAttendeeDetail
    payload: { id: number, speaker: number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'attendee-detail' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getAttendeeDetailApi, payload, state)
    yield put(AttendeeActions.UpdateDetail({ detail: response.data.data! }))
    yield put(LoadingActions.removeProcess({ process: 'attendee-detail' }))
}

function* OnMakeFavourite({
    payload,
}: {
    type: typeof AttendeeActions.MakeFavourite
    payload: { attendee_id: number, screen: string }
}): SagaIterator {
    const state = yield select(state => state);
    yield call(makeFavouriteApi, payload, state);
    if (payload.screen === "listing") {
        yield put(AttendeeActions.FetchAttendees({ query: state?.attendees?.query, page: 1, group_id: state?.attendees?.group_id, my_attendee_id: state?.attendees?.my_attendee_id, speaker: 0, category_id: state?.attendees?.category_id, screen: state?.attendees?.screen }))
    } else {
        yield put(AttendeeActions.FetchAttendeeDetail({ id: payload.attendee_id, speaker: 0 }))
    }
}

function* OnGetGroups({
    payload,
}: {
    type: typeof AttendeeActions.FetchGroups
    payload: { group_id: number, query: string, page: number, attendee_id: number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'groups' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getGroupsApi, payload, state)
    yield put(AttendeeActions.UpdateGroups({ groups: response.data.data.groups.data!, query: payload.query, page: payload.page, group_id: payload.group_id }))
    yield put(LoadingActions.removeProcess({ process: 'groups' }))
}

function* OnGetCategories({
    payload,
}: {
    type: typeof AttendeeActions.FetchCategories
    payload: { parent_id: number, query: string, page: number, cat_type: string }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'category-listing' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getCategoryApi, payload, state)
    yield put(AttendeeActions.UpdateCategories({ categories: response?.data?.data?.data!, page: payload.page, category_name: response?.data?.data?.category_name! }))
    yield put(LoadingActions.removeProcess({ process: 'category-listing' }))
}

// Watcher Saga
export function* AttendeeWatcherSaga(): SagaIterator {
    yield takeEvery(AttendeeActions.FetchAttendees.type, OnGetAttendees)
    yield takeEvery(AttendeeActions.FetchAttendeeDetail.type, OnGetAttendeeDetail)
    yield takeEvery(AttendeeActions.MakeFavourite.type, OnMakeFavourite)
    yield takeEvery(AttendeeActions.FetchGroups.type, OnGetGroups)
    yield takeEvery(AttendeeActions.FetchCategories.type, OnGetCategories)
}

export default AttendeeWatcherSaga