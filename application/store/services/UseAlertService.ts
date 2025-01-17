import { useCallback } from 'react'

import { SelectAlerts, SelectAttendeeAlerts, AlertActions, SelectAlertDetail, SelectAlertSetting, SelectUnreadCount  } from 'application/store/slices/Alert.Slice'

import {  Alert, AlertSetting } from 'application/models/alert/Alert'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type AlertServiceOperators = {
    alerts: Alert[],
    detail: Alert | null,
    unread: number,
    attendee_alerts: "" | number[],
    alert_setting: null | AlertSetting[],
    FetchAlerts: () => void,
    markAlertRead: (payload:{alertIds:string}) => void,
    FetchAlertDetails: (payload:{alertId:number}) => void,
    MarkAlertAsRead: (payload:{alertId:number}) => void,
    setUnreadCount: (payload:number) => void,
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseAlertService = (): Readonly<AlertServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        detail: useAppSelector(SelectAlertDetail),
        alerts: useAppSelector(SelectAlerts),
        alert_setting: useAppSelector(SelectAlertSetting),
        attendee_alerts: useAppSelector(SelectAttendeeAlerts),
        unread: useAppSelector(SelectUnreadCount),
        FetchAlerts: useCallback(
            () => {
                dispatch(AlertActions.FetchAlerts())
            },
            [dispatch],
        ),
        markAlertRead: useCallback(
            (payload:{alertIds:string}) => {
                dispatch(AlertActions.markAlertRead(payload))
            },
            [dispatch],
        ),
        FetchAlertDetails: useCallback(
            (payload:{alertId:number}) => {
              dispatch(AlertActions.FetchAlertDetails(payload));
            },
            [dispatch],
          ),
        MarkAlertAsRead: useCallback(
            (payload:{alertId:number}) => {
              dispatch(AlertActions.MarkAlertAsRead(payload));
            },
            [dispatch],
          ),
        setUnreadCount: useCallback(
            (payload) => {
              dispatch(AlertActions.setUnreadCount(payload));
            },
            [dispatch],
          ),
    }
}

export default UseAlertService
