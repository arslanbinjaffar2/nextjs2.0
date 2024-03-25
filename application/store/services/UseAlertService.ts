import { useCallback } from 'react'

import { SelectAlerts, SelectAttendeeAlerts, AlertActions, SelectAlertDetail  } from 'application/store/slices/Alert.Slice'

import {  Alert } from 'application/models/alert/Alert'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type AlertServiceOperators = {
    alerts: Alert[],
    detail: Alert | null,
    attendee_alerts: "" | number[],
    FetchAlerts: () => void,
    markAlertRead: (payload:{alertIds:string}) => void,
    FetchAlertDetails: (payload:{alertId:number}) => void,
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
        FetchAlertDetails: useCallback(
            (payload:{alertId:number}) => {
              dispatch(AlertActions.FetchAlertDetails(payload));
            },
            [dispatch],
          ),
    }
}

export default UseAlertService
