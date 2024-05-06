import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { MeetingReservationActions } from 'application/store/slices/MeetingReservation.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';
import { acceptMeetingRequestApi, cancelMeetingRequestApi, getAvailableMeetingSlotsApi, getMyMeetingRequestsApi, rejectMeetingRequestApi, sendMeetingReminderApi } from 'application/store/api/MeetingReservation.api';
import { NotificationActions } from '../slices/Notification.Slice'

function* OnGetMyMeetingRequests({
    payload,
}: {
    type: typeof MeetingReservationActions.FetchMyMeetingRequests
    payload: {  }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'my-meeting-requests' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMyMeetingRequestsApi, { ...payload, limit: 20 }, state)
    yield put(MeetingReservationActions.updateMyMeetingRequests(response.data.data))
    yield put(MeetingReservationActions.updateLabels({labels:response.data.data.labels}))
    yield put(LoadingActions.removeProcess({ process: 'my-meeting-requests' }))
}

function* OnGetAvailableSlots({
    payload,
}: {
    type: typeof MeetingReservationActions.FetchAvailableSlots
    payload: {  }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'get-available-slots' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getAvailableMeetingSlotsApi, { ...payload, limit: 20 }, state)
    yield put(MeetingReservationActions.updateAvailableSlots({slots:response.data.data.meeting_slots, dates:response.data.data.dates}))
    yield put(MeetingReservationActions.updateLabels({labels:response.data.data.labels}))
    yield put(LoadingActions.removeProcess({ process: 'get-available-slots' }))
}

function* OnAcceptMeetingRequest({
    payload,
}: {
    type: typeof MeetingReservationActions.AcceptMeetingRequest
    payload: { meeting_request_id:number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: `accept-meeting-request-${payload.meeting_request_id}` }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(acceptMeetingRequestApi, payload, state)
    yield put(MeetingReservationActions.FetchMyMeetingRequests({}))
    yield put(NotificationActions.addNotification({notification:{
            type:'reservation',
            title:state?.event?.event?.labels?.RESERVATION_ACCEPT_MEETING_SUCCESS_TITLE,
            text:state?.event?.event?.labels?.RESERVATION_ACCEPT_MEETING_SUCCESS_MSG,
          }
    }))
    yield put(LoadingActions.removeProcess({ process: `accept-meeting-request-${payload.meeting_request_id}` }))
}

function* OnRejectMeetingRequest({
    payload,
}: {
    type: typeof MeetingReservationActions.RejectMeetingRequest
    payload: { meeting_request_id:number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: `reject-meeting-request-${payload.meeting_request_id}` }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(rejectMeetingRequestApi, payload, state)
    yield put(MeetingReservationActions.FetchMyMeetingRequests({}))
    yield put(NotificationActions.addNotification({notification:{
        type:'reservation',
        title:state?.event?.event?.labels?.RESERVATION_REJECT_MEETING_SUCCESS_TITLE,
        text:state?.event?.event?.labels?.RESERVATION_REJECT_MEETING_SUCCESS_MSG,
      }
}))
    yield put(LoadingActions.removeProcess({ process: `reject-meeting-request-${payload.meeting_request_id}` }))
}

function* OnCancelMeetingRequest({
    payload,
}: {
    type: typeof MeetingReservationActions.CancelMeetingRequest
    payload: { meeting_request_id:number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: `cancel-meeting-request-${payload.meeting_request_id}` }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(cancelMeetingRequestApi, payload, state)
    yield put(MeetingReservationActions.FetchMyMeetingRequests({}))
    yield put(NotificationActions.addNotification({notification:{
        type:'reservation',
        title:state?.event?.event?.labels?.RESERVATION_CANCEL_MEETING_SUCCESS_TITLE,
        text:state?.event?.event?.labels?.RESERVATION_CANCEL_MEETING_SUCCESS_MSG,
      }
    })
)
    yield put(LoadingActions.removeProcess({ process: `cancel-meeting-request-${payload.meeting_request_id}` }))
}

function* OnSendReminder({
    payload,
}: {
    type: typeof MeetingReservationActions.SendReminder
    payload: { meeting_request_id:number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: `send-reminder-${payload.meeting_request_id}` }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(sendMeetingReminderApi, payload, state)
    yield put(NotificationActions.addNotification({notification:{
        type:'reservation',
        title:state?.event?.event?.labels?.RESERVATION_EMAIL_SENT_TITLE,
        text:state?.event?.event?.labels?.RESERVATION_EMAIL_SENT_MSG,
      }
    }))
    yield put(LoadingActions.removeProcess({ process: `send-reminder-${payload.meeting_request_id}` }))
}

// Watcher Saga
export function* MeetingReservationWatcherSaga(): SagaIterator {
    yield takeEvery(MeetingReservationActions.FetchMyMeetingRequests.type, OnGetMyMeetingRequests)
    yield takeEvery(MeetingReservationActions.FetchAvailableSlots.type, OnGetAvailableSlots)
    yield takeEvery(MeetingReservationActions.AcceptMeetingRequest.type, OnAcceptMeetingRequest)
    yield takeEvery(MeetingReservationActions.RejectMeetingRequest.type, OnRejectMeetingRequest)
    yield takeEvery(MeetingReservationActions.CancelMeetingRequest.type, OnCancelMeetingRequest)
    yield takeEvery(MeetingReservationActions.SendReminder.type, OnSendReminder)
}

export default MeetingReservationWatcherSaga