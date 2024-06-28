import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'application/store/Index'
import { Program } from '../../models/program/Program'

export interface RequestToSpeakState {
    programs: Program[],
    currentAttendee: any,
    remainingSeconds: number,
    timerStartText: string,
    agendaDetail: any,
    refreshTime: number,
    speechTimeStatus: string,
    settings: any,
    attendeesToCome: any,
    agendaSettings: any,
    currentUserStatus: string,
    activeSpeakerlistSession: any,
    fieldSettings: any,
    currentUser: any
}

const initialState: RequestToSpeakState = {
    programs: [],
    currentAttendee: null,
    remainingSeconds: 0,
    timerStartText: '',
    agendaDetail: null,
    refreshTime: 0,
    speechTimeStatus: '',
    settings: null,
    attendeesToCome: null,
    agendaSettings: null,
    currentUserStatus: '',
    activeSpeakerlistSession: null,
    fieldSettings: null,
    currentUser: null
}

// Slice
export const RequestToSpeakSlice = createSlice({
    name: 'requestToSpeak',
    initialState,
    reducers: {
        FetchActivePrograms() {},
        FetchProgramTurnList(state, action: PayloadAction<{ program_id: number }>) {},
        RequestToSpeech(state, action: PayloadAction<{ agenda_id: number, action: string, notes?: string }>) {},
        updateTurnList(state, action: PayloadAction<{ current_attendee: any, remaining_seconds: number, timer_start_text: string, agenda_detail: any, refresh_time: number, speech_time_status: string, settings: any, attendees_to_come: any, agenda_settings: any, current_user_status: string, active_speakerlist_session: any, field_settings: any, current_user: any }>) {
            state.currentAttendee = action.payload.current_attendee;
            state.remainingSeconds = action.payload.remaining_seconds;
            state.timerStartText = action.payload.timer_start_text;
            state.agendaDetail = action.payload.agenda_detail;
            state.refreshTime = action.payload.refresh_time;
            state.speechTimeStatus = action.payload.speech_time_status;
            state.settings = action.payload.settings;
            state.attendeesToCome = action.payload.attendees_to_come;
            state.agendaSettings = action.payload.agenda_settings;
            state.currentUserStatus = action.payload.current_user_status;
            state.activeSpeakerlistSession = action.payload.active_speakerlist_session;
            state.fieldSettings = action.payload.field_settings;
            state.currentUser = action.payload.current_user;
        },
    },
})

// Actions
export const RequestToSpeakActions = {
    FetchActivePrograms: RequestToSpeakSlice.actions.FetchActivePrograms,
    FetchProgramTurnList: RequestToSpeakSlice.actions.FetchProgramTurnList,
    updateTurnList: RequestToSpeakSlice.actions.updateTurnList,
    RequestToSpeech: RequestToSpeakSlice.actions.RequestToSpeech,
}

export const SelectActivePrograms = (state: RootState) => state.requestToSpeak.programs
export const SelectCurrentAttendee = (state: RootState) => state.requestToSpeak.currentAttendee
export const SelectRemainingSeconds = (state: RootState) => state.requestToSpeak.remainingSeconds
export const SelectTimerStartText = (state: RootState) => state.requestToSpeak.timerStartText
export const SelectAgendaDetail = (state: RootState) => state.requestToSpeak.agendaDetail
export const SelectRefreshTime = (state: RootState) => state.requestToSpeak.refreshTime
export const SelectSpeechTimeStatus = (state: RootState) => state.requestToSpeak.speechTimeStatus
export const SelectSettings = (state: RootState) => state.requestToSpeak.settings
export const SelectAttendeesToCome = (state: RootState) => state.requestToSpeak.attendeesToCome
export const SelectAgendaSettings = (state: RootState) => state.requestToSpeak.agendaSettings
export const SelectCurrentUserStatus = (state: RootState) => state.requestToSpeak.currentUserStatus
export const SelectActiveSpeakerlistSession = (state: RootState) => state.requestToSpeak.activeSpeakerlistSession
export const SelectFieldSettings = (state: RootState) => state.requestToSpeak.fieldSettings
export const SelectCurrentUser = (state: RootState) => state.requestToSpeak.currentUser

// Reducer
export default RequestToSpeakSlice.reducer