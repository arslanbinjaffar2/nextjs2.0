import { useCallback } from 'react'

import { SelectNotifications,  NotificationActions,  } from 'application/store/slices/Notification.Slice'


import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type NotificationServiceOperators = {
    notifications: any[],
    FetchNotifications: () => void,
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseNotificationService = (): Readonly<NotificationServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        notifications: useAppSelector(SelectNotifications),
        FetchNotifications: useCallback(
            () => {
                dispatch(NotificationActions.FetchNotifications())
            },
            [dispatch],
        ),
    }
}

export default UseNotificationService
