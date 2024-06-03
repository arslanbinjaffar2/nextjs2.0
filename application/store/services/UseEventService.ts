import { useCallback } from 'react'

import { EventActions, SelectEvent, Modules, SettingModules, SelectEventUrl, CustomHtmls } from 'application/store/slices/Event.Slice'

import { Event } from 'application/models/Event'

import { Module, SettingModule } from 'application/models/Module'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { CustomHtml } from 'application/models/CustomHtml'

export type EventServiceOperators = {
    event: Event
    modules: Array<Module>
    custom_html: Array<CustomHtml>
    setting_modules: SettingModule[]
    event_url: string
    FetchEvent: (slug: string) => void
    FetchEventByCode: (code: string) => void
    loadModules: () => void
    loadSettingsModules: () => void
    SetEventUrl: (event_url: string) => void
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
        custom_html: useAppSelector(CustomHtmls),
        setting_modules: useAppSelector(SettingModules),
        event_url: useAppSelector(SelectEventUrl),
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
        ),
        SetEventUrl: useCallback(
            (event_url: string) => {
                dispatch(EventActions.SetEventUrl(event_url))
            },
            [dispatch],
        )
    }
}

export default UseEventService