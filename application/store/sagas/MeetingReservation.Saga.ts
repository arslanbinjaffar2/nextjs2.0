import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { MeetingReservationActions } from 'application/store/slices/MeetingReservation.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';
import { acceptMeetingRequestApi, addAvailabilityCalendarSlotApi, cancelMeetingRequestApi, deleteAvailabilityCalendarSlotApi, getAfterLoginMyMeetingRequestsApi, getAvailableMeetingSlotsApi, getMyAvailabilityCalendarApi, getMyMeetingRequestsApi, rejectMeetingRequestApi, sendMeetingReminderApi } from 'application/store/api/MeetingReservation.api';
import { NotificationActions } from '../slices/Notification.Slice'
import { AvailabilityCalendarSlot } from 'application/models/meetingReservation/MeetingReservation'
import { ToastActions } from '../slices/Toast.Slice'
import { Platform } from 'react-native'
import AsyncStorageClass from 'application/utils/AsyncStorageClass'

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
    payload: { attendee_id:number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'get-available-slots' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getAvailableMeetingSlotsApi, { ...payload, limit: 20 }, state)
    yield put(MeetingReservationActions.updateAvailableSlots({slots:response.data.data.meeting_slots, dates:response.data.data.dates}))
    yield put(MeetingReservationActions.updateLabels({labels:response.data.data.labels}))
    yield put(MeetingReservationActions.updateAvailableMeetingSpaces({meeting_spaces:response.data?.data?.meeting_spaces!}))
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
            btnLeftText:state?.event?.event?.labels?.GENERAL_OK,
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
        btnLeftText:state?.event?.event?.labels?.GENERAL_OK,
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
        btnLeftText:state?.event?.event?.labels?.GENERAL_OK,
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
        btnLeftText:state?.event?.event?.labels?.GENERAL_OK,
      }
    }))
    yield put(LoadingActions.removeProcess({ process: `send-reminder-${payload.meeting_request_id}` }))
}

function* OnAddAvailabilityCalendarSlot({
    payload,
}: {
    type: typeof MeetingReservationActions.AddAvailabilityCalendarSlot
    payload: { date:string, start_time:string, end_time:string }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: `add-availability` }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(addAvailabilityCalendarSlotApi, payload, state)
    if(response.status==200){

        yield put(ToastActions.AddToast({toast:{message:"added successfully",status:""}}))
    }
    yield put(MeetingReservationActions.FetchMyAvailabilityCalendar())
    yield put(LoadingActions.removeProcess({ process: `add-availability` }))
}

function* OnDeleteAvailabilityCalendarSlot({
    payload,
}: {
    type: typeof MeetingReservationActions.DeleteAvailabilityCalendarSlot
    payload: { id:number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: `delete-availability` }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(deleteAvailabilityCalendarSlotApi, payload, state)
    if(response.status==200){
        yield put( ToastActions.AddToast({toast:{message:"deleted successfully",status:"deleted"}}))    
    }
    yield put(LoadingActions.removeProcess({ process: `delete-availability` }))
}

function* OnFetchMyAvailabilityCalendar({
    payload,
}: {
    type: typeof MeetingReservationActions.FetchMyAvailabilityCalendar
    payload: {  }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: `fetch-my-availability` }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMyAvailabilityCalendarApi, payload, state)
    yield put(MeetingReservationActions.updateMyAvailabilityCalendar({availability_calendar:response.data.data.calendarSlots}))
    yield put(LoadingActions.removeProcess({ process: `fetch-my-availability` }))
}

function* OnFetchAfterLoginMyMeetingRequests({
    payload,
}: {
    type: typeof MeetingReservationActions.FetchAfterLoginMyMeetingRequests
    payload: {  }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: `reservation-after-login` }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getAfterLoginMyMeetingRequestsApi, payload, state)
    // yield put(MeetingReservationActions.updateAfterLoginMyMeetingRequests({my_meeting_requests:response?.data?.data?.my_meeting_requests!}))
    if(response?.data?.data?.my_meeting_requests && response?.data?.data?.my_meeting_requests?.length > 0){
        yield put(NotificationActions.addNotification({
            notification:{
              type:'pending-appointment-alert',
              title: state?.event?.event?.labels?.RESERVATION_REQUESTED_APPOINTMENT_ALERT_TITLE,
              text: state?.event?.event?.labels?.RESERVATION_REQUESTED_APPOINTMENT_ALERT_MSG,
              btnLeftText:state?.event?.event?.labels?.GENERAL_OK,
              btnRightText:state?.event?.event?.labels?.GENERAL_DETAIL,
              url:'/reservation?tab=requested'
            }
          }))
    }
    const event_url = state?.event?.event_url;
    //add skip 
    if(Platform.OS === 'web'){
        localStorage.setItem(`skip_pending_appointment_alerts_${event_url}`,'true');
    }else{
    AsyncStorageClass.setItem(`skip_pending_appointment_alerts_${event_url}`,'true');
    }
    yield put(LoadingActions.removeProcess({ process: `reservation-after-login` }))
}

// Watcher Saga
export function* MeetingReservationWatcherSaga(): SagaIterator {
    yield takeEvery(MeetingReservationActions.FetchMyMeetingRequests.type, OnGetMyMeetingRequests)
    yield takeEvery(MeetingReservationActions.FetchAvailableSlots.type, OnGetAvailableSlots)
    yield takeEvery(MeetingReservationActions.AcceptMeetingRequest.type, OnAcceptMeetingRequest)
    yield takeEvery(MeetingReservationActions.RejectMeetingRequest.type, OnRejectMeetingRequest)
    yield takeEvery(MeetingReservationActions.CancelMeetingRequest.type, OnCancelMeetingRequest)
    yield takeEvery(MeetingReservationActions.SendReminder.type, OnSendReminder)
    yield takeEvery(MeetingReservationActions.AddAvailabilityCalendarSlot.type, OnAddAvailabilityCalendarSlot)
    yield takeEvery(MeetingReservationActions.DeleteAvailabilityCalendarSlot.type, OnDeleteAvailabilityCalendarSlot)
    yield takeEvery(MeetingReservationActions.FetchMyAvailabilityCalendar.type, OnFetchMyAvailabilityCalendar)  
    yield takeEvery(MeetingReservationActions.FetchAfterLoginMyMeetingRequests.type, OnFetchAfterLoginMyMeetingRequests)
}

export default MeetingReservationWatcherSaga