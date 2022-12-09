import { useCallback } from 'react'

import { EventActions, SelectEvent } from 'application/store/slices/Event.Slice'
import { Event } from 'application/models/Event'
import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type EventServiceOperators = {
    event: Event
    FetchEvent: (slug: string) => void
    UpdateEvent: (event: Event) => void
}

/**
 * EventService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseEventService = (): Readonly<EventServiceOperators> => {
    const dispatch = useAppDispatch()

    return {
        event: useAppSelector(SelectEvent),
        FetchEvent: useCallback(
            (slug: string) => {
                dispatch(EventActions.FetchEvent(slug))
            },
            [dispatch],
        ),
        UpdateEvent: useCallback(
            (event: Event) => {
                dispatch(
                    EventActions.UpdateEvent({
                        ...event
                    }),
                )
            },
            [dispatch],
        ),
    }
}

export default UseEventService