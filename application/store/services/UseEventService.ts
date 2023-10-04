import { useCallback } from 'react'

import { EventActions, SelectEvent, Modules, SettingModules } from 'application/store/slices/Event.Slice'

import { Event } from 'application/models/Event'

import { Module, SettingModule } from 'application/models/Module'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type EventServiceOperators = {
    event: Event
    modules: Array<Module>
    setting_modules: SettingModule[]
    FetchEvent: (slug: string) => void
    FetchEventByCode: (code: string) => void
    loadModules: () => void
    loadSettingsModules: () => void
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
        setting_modules: useAppSelector(SettingModules),
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
        ),
        loadSettingsModules: useCallback(
            () => {
                dispatch(EventActions.loadSettingsModules())
            },
            [dispatch],
        )
    }
}

export default UseEventService