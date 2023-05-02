import { useCallback } from 'react'

import { EventActions, SelectEvent, Modules } from 'application/store/slices/Event.Slice'

import { Event } from 'application/models/Event'

import { Module } from 'application/models/Module'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type EventServiceOperators = {
    event: Event
    modules: Array<Module>
    FetchEvent: (slug: string) => void
    FetchEventByCode: (code: string) => void
    loadModules: () => void
}

/**
 * EventService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseEventService = (): Readonly<EventServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        event: useAppSelector(SelectEvent),
        modules: useAppSelector(Modules),
        FetchEvent: useCallback(
            (slug: string) => {
                dispatch(EventActions.FetchEvent(slug))
            },
            [dispatch],
        ),
        FetchEventByCode: useCallback(
            (code: string) => {
                dispatch(EventActions.FetchEventByCode(code))
            },
            [dispatch],
        ),
        loadModules: useCallback(
            () => {
                dispatch(EventActions.loadModules())
            },
            [dispatch],
        )
    }
}

export default UseEventService