import { useCallback } from 'react'

import {
    SelectAlerts,
    SelectAttendeeAlerts,
    AlertActions,
    SelectAlertSetting
} from 'application/store/slices/Alert.Slice'

import {  Alert, AlertSetting } from 'application/models/alert/Alert'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type AlertServiceOperators = {
    alerts: Alert[],
    attendee_alerts: "" | number[],
    alert_setting: null | AlertSetting[],
    FetchAlerts: () => void,
    markAlertRead: (payload:{alertIds:string}) => void,
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseAlertService = (): Readonly<AlertServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        alerts: useAppSelector(SelectAlerts),
        attendee_alerts: useAppSelector(SelectAttendeeAlerts),
        alert_setting: useAppSelector(SelectAlertSetting),
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
    }
}

export default UseAlertService
