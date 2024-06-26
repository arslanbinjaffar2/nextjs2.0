import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getAttendeeApi, makeFavouriteApi, getGroupsApi, getAttendeeDetailApi, getCategoryApi, getHotelApi, getInvoiceApi, getContactAttendeeApi, getAddGDPRlogApi } from 'application/store/api/Attendee.Api';

import { AttendeeActions } from 'application/store/slices/Attendee.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

import in_array from "in_array";

function* OnGetAttendees({
    payload,
}: {
    type: typeof AttendeeActions.FetchAttendees
    payload: { group_id: number, query: string, page: number, my_attendee_id: number, speaker: number, category_id: number, screen: string, program_id: number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: in_array(payload.screen, ['dashboard-my-speakers']) ? payload.screen : 'attendee-listing' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getAttendeeApi, payload, state)
    yield put(AttendeeActions.Update({ attendee: response.data.data!, group_id: payload.group_id, query: payload.query, page: payload.page, group_name: response?.data?.meta?.group_name, screen: payload.screen, total: response.data.meta?.total!, last_page: response.data.meta?.last_page!}))
    yield put(LoadingActions.removeProcess({ process: in_array(payload.screen, ['dashboard-my-speakers']) ? payload.screen : 'attendee-listing' }))
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

function* OnGetAttendeeContact({
    payload,
}: {
    type: typeof AttendeeActions.FetchAttendeeContact
    payload: { id: number, speaker: number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'attendee-detail' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getAttendeeDetailApi, payload, state)
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
    yield put(AttendeeActions.UpdateFavourite({ attendee_id: payload.attendee_id, screen: payload.screen}))
}

function* OnGetGroups({
    payload,
}: {
    type: typeof AttendeeActions.FetchGroups
    payload: { group_id: number, query: string, page: number, attendee_id: number, program_id: number }
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

function* OnGetHotels({
    payload,
}: {
    type: typeof AttendeeActions.FetchHotels
    payload: { parent_id: number, query: string, page: number, cat_type: string }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getHotelApi, payload, state)
    yield put(AttendeeActions.updateHotels(response.data.data))
    yield put(LoadingActions.set(false))
}

function* OnGetMyRegistration({
    payload,
}: {
    type: typeof AttendeeActions.FetchMyRegistration
    payload: {}
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'my-registration' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getInvoiceApi, payload, state)
    yield put(AttendeeActions.updateRegistration(response.data.data))
    yield put(LoadingActions.removeProcess({ process: 'my-registration' }))
}

function* OnAddGDPRlog({
    payload,
}: {
    type: typeof AttendeeActions.addGDPRlog
    payload: {gdpr: number}
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getAddGDPRlogApi, payload, state)
    yield put(LoadingActions.set(false))
}

// Watcher Saga
export function* AttendeeWatcherSaga(): SagaIterator {
    yield takeEvery(AttendeeActions.FetchAttendees.type, OnGetAttendees)
    yield takeEvery(AttendeeActions.FetchAttendeeDetail.type, OnGetAttendeeDetail)
    yield takeEvery(AttendeeActions.FetchAttendeeContact.type, OnGetAttendeeContact)
    yield takeEvery(AttendeeActions.MakeFavourite.type, OnMakeFavourite)
    yield takeEvery(AttendeeActions.FetchGroups.type, OnGetGroups)
    yield takeEvery(AttendeeActions.FetchCategories.type, OnGetCategories)
    yield takeEvery(AttendeeActions.FetchHotels.type, OnGetHotels)
    yield takeEvery(AttendeeActions.FetchMyRegistration.type, OnGetMyRegistration)
    yield takeEvery(AttendeeActions.addGDPRlog.type, OnAddGDPRlog)
}

export default AttendeeWatcherSaga