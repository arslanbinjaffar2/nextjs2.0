import { useCallback } from 'react'

import { RequestToSpeakActions, SelectActivePrograms, SelectCurrentAttendee, SelectRemainingSeconds, SelectTimerStartText, SelectAgendaDetail, SelectRefreshTime, SelectSpeechTimeStatus, SelectSettings, SelectAttendeesToCome, SelectAgendaSettings, SelectCurrentUserStatus, SelectActiveSpeakerlistSession, SelectFieldSettings, SelectCurrentUser } from 'application/store/slices/RequestToSpeak.Slice'
import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type RequestToSpeakServiceOperators = {
    programs: any,
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
    field_settings: any,
    currentUser: any,
    FetchActivePrograms: () => void,
    FetchProgramTurnList: (payload: {program_id: number}) => void,
    RequestToSpeech: (payload: {agenda_id: number, action: string}) => void,
}

export const UseRequestToSpeakService = (): Readonly<RequestToSpeakServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        programs: useAppSelector(SelectActivePrograms),
        currentAttendee: useAppSelector(SelectCurrentAttendee),
        remainingSeconds: useAppSelector(SelectRemainingSeconds),
        timerStartText: useAppSelector(SelectTimerStartText),
        agendaDetail: useAppSelector(SelectAgendaDetail),
        refreshTime: useAppSelector(SelectRefreshTime),
        speechTimeStatus: useAppSelector(SelectSpeechTimeStatus),
        settings: useAppSelector(SelectSettings),
        attendeesToCome: useAppSelector(SelectAttendeesToCome),
        agendaSettings: useAppSelector(SelectAgendaSettings),
        currentUserStatus: useAppSelector(SelectCurrentUserStatus),
        activeSpeakerlistSession: useAppSelector(SelectActiveSpeakerlistSession),
        field_settings: useAppSelector(SelectFieldSettings),
        currentUser: useAppSelector(SelectCurrentUser),
        FetchActivePrograms: useCallback(
            () => {
                dispatch(RequestToSpeakActions.FetchActivePrograms())
            },
            [dispatch],
        ),
        FetchProgramTurnList: useCallback(
            (payload: any) => {
                dispatch(RequestToSpeakActions.FetchProgramTurnList(payload))
            },
            [dispatch],
        ),
        RequestToSpeech: useCallback(
            (payload: {agenda_id: number, action: string}) => {
                console.log(payload, 'payload')
                dispatch(RequestToSpeakActions.RequestToSpeech(payload))
            },
            [dispatch],
        )
    }
}

export default UseRequestToSpeakService
