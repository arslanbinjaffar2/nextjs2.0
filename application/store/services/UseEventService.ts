import { useCallback } from 'react'

import { EventActions, SelectEvent, Modules, SettingModules,CustomHtmls, SelectHomeEvents, SelectUpcomingEvents,SelectHomeEventDetail, SelectEventUrl } from 'application/store/slices/Event.Slice'

import { Event } from 'application/models/Event'

import { Module, SettingModule } from 'application/models/Module'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { CustomHtml } from 'application/models/CustomHtml'
import { EventDetail, HomeMyEvent, HomeMyEventDetail, UpcomingEvent } from 'application/models/FetchEvent'
import HomeEvent from 'application/components/atoms/events/homeEvent/HomeEvent'
import homeMyevents from 'application/assets/icons/homeMyevents'

export type EventServiceOperators = {
    event: Event
    modules: Array<Module>
    custom_html: Array<CustomHtml>
    setting_modules: SettingModule[]
    home_events: HomeMyEvent[]
    upcoming_events: UpcomingEvent[]
    event_detail: EventDetail|null,
    event_url: string
    FetchEvent: (slug: string) => void
    FetchEventByCode: (code: string) => void
    loadModules: () => void
    loadSettingsModules: () => void
    FetchEvents: (payload: {query: string, screen: string,selected_filter: string }) => void
    SetEventUrl: (event_url: string) => void
    FetchEventDetail: (payload: { id: number, screen: string }) => void
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
        home_events:useAppSelector(SelectHomeEvents),
        upcoming_events:useAppSelector(SelectUpcomingEvents),
        event_detail: useAppSelector(SelectHomeEventDetail),
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
        FetchEvents: useCallback(
            (payload: {query: string, screen: string,selected_filter: string }) => {
                dispatch(EventActions.FetchEvents(payload))
            },
            [dispatch],
        ),
        FetchEventDetail: useCallback(
            (payload: { id: number, screen: string }) => {
                dispatch(EventActions.FetchEventDetail(payload))
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