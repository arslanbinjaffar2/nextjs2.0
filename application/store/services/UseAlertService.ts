import { useCallback } from 'react'

import { SelectAlerts, SelectAttendeeAlerts, AlertActions,  } from 'application/store/slices/Alert.Slice'

import {  Alert } from 'application/models/alert/Alert'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type AlertServiceOperators = {
    alerts: Alert[],
    attendee_alerts: "" | number[],
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
