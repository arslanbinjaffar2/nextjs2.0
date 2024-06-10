import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Event } from 'application/models/Event'

import { Module, SettingModule } from 'application/models/Module'
import { CustomHtml } from 'application/models/CustomHtml'
import { HomeMyEvent, UpcomingEvent } from 'application/models/FetchEvent'

import type { RootState } from 'application/store/Index'

import AsyncStorageClass from 'application/utils/AsyncStorageClass';

export interface EventState {
    event: Event,
    modules: Array<Module>
    custom_html: Array<CustomHtml>
    setting_modules: SettingModule[]
    screen: string,
    home_events: HomeMyEvent[],
    upcoming_events: UpcomingEvent[],
    event_detail: HomeMyEvent | null,
}

const initialState: EventState = {
    event: {},
    modules: [],
    custom_html: [],
    setting_modules: [],
    screen: 'homeMyevents',
    home_events:[],
    upcoming_events:[],
    event_detail: null,
}

// Slice
export const EventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        FetchEvent(state, action: PayloadAction<string>) { },
        FetchEventByCode(state, action: PayloadAction<string>) { },
        update(state, action: PayloadAction<Event>) {
            state.event = action.payload;
            if(action.payload.id !== undefined) {
                AsyncStorageClass.setItem('eventbuizz-active-event-id', action.payload.id);
            } else {
                AsyncStorageClass.removeItem('eventbuizz-active-event-id');
            }
        },
        loadModules(state) { },
        updateModules(state, action: PayloadAction<Array<Module>>) {
            state.modules = action.payload
        },
        loadSettingsModules(state) { },
        updateSettingsModules(state, action: PayloadAction<Array<SettingModule>>) {
            state.setting_modules = action.payload
        },
        customHtml(state, action: PayloadAction<Array<CustomHtml>>) {
            state.custom_html = action.payload
        },
        FetchEvents(state, action: PayloadAction<{query: string, screen: string }>){
            state.screen = action.payload.screen;
        },
        UpdateEvents(state, action: PayloadAction<HomeMyEvent[]>) {
            state.home_events = action.payload;
        },
        UpdateUpcomingEvents(state, action: PayloadAction<UpcomingEvent[]>) {
            state.upcoming_events = action.payload;
        },
        updateEventDetail(state, action: PayloadAction<{ id: number }>) {
            state.event_detail = action.payload;
            console.log(state.event_detail)
         },
         fetchEventDetail(state, action: PayloadAction<{ id: number }>) {
            state.event_detail = action.payload;
            console.log(state.event_detail)
         },
    },
})

// Actions
export const EventActions = {
    FetchEvent: EventSlice.actions.FetchEvent,
    FetchEventByCode: EventSlice.actions.FetchEventByCode,
    update: EventSlice.actions.update,
    loadModules: EventSlice.actions.loadModules,
    updateModules: EventSlice.actions.updateModules,
    loadSettingsModules: EventSlice.actions.loadSettingsModules,
    updateSettingsModules: EventSlice.actions.updateSettingsModules,
    customHtml: EventSlice.actions.customHtml,
    FetchEvents: EventSlice.actions.FetchEvents,
    UpdateEvents: EventSlice.actions.UpdateEvents,
    UpdateUpcomingEvents: EventSlice.actions.UpdateUpcomingEvents,
    updateEventDetail: EventSlice.actions.updateEventDetail,
    fetchEventDetail: EventSlice.actions.fetchEventDetail,
}

// Selectors
export const SelectEvent = (state: RootState) => state.event.event
export const Modules = (state: RootState) => state.event.modules
export const CustomHtmls = (state: RootState) => state.event.custom_html

export const SettingModules = (state: RootState) => state.event.setting_modules
export const SelectHomeEvents = (state: RootState) => state.event.home_events
export const SelectUpcomingEvents = (state: RootState) => state.event.upcoming_events
export const SelectHomeEventDetail = (state: RootState) => state.event.event_detail

// Reducer
export default EventSlice.reducer