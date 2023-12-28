import { useCallback } from 'react'

import { SelectNotifications,  NotificationActions, SelectPopups, SelectPopupCount, SelectCurrentPopup,  } from 'application/store/slices/Notification.Slice'


import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type NotificationServiceOperators = {
    notifications: any[],
    popups: any[],
    popupCount:number,
    currentPopup:any
    FetchNotifications: () => void,
    clearCurrentPopup: () => void,
    setCurrentPopup: () => void,
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseNotificationService = (): Readonly<NotificationServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        notifications: useAppSelector(SelectNotifications),
        popups: useAppSelector(SelectPopups),
        popupCount: useAppSelector(SelectPopupCount),
        currentPopup: useAppSelector(SelectCurrentPopup),
        FetchNotifications: useCallback(
            () => {
                dispatch(NotificationActions.FetchNotifications())
            },
            [dispatch],
        ),
        setCurrentPopup: useCallback(
            () => {
                dispatch(NotificationActions.setCurrentPopup())
            },
            [dispatch],
        ),
        clearCurrentPopup: useCallback(
            () => {
                dispatch(NotificationActions.clearCurrentPopup())
            },
            [dispatch],
        ),
    }
}

export default UseNotificationService
