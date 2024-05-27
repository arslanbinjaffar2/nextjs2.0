import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Event } from 'application/models/Event'

import { Module, SettingModule } from 'application/models/Module'

import type { RootState } from 'application/store/Index'

import AsyncStorageClass from 'application/utils/AsyncStorageClass';

export interface EventState {
    event: Event,
    modules: Array<Module>
    setting_modules: SettingModule[]
    event_url: string
}

const initialState: EventState = {
    event: {},
    modules: [],
    setting_modules: [],
    event_url: ''
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
        SetEventUrl(state, action: PayloadAction<string>) {
            state.event_url = action.payload
        }
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
    SetEventUrl: EventSlice.actions.SetEventUrl
}

// Selectors
export const SelectEvent = (state: RootState) => state.event.event
 console.log(SelectEvent)
export const Modules = (state: RootState) => state.event.modules

export const SettingModules = (state: RootState) => state.event.setting_modules

export const SelectEventUrl = (state: RootState) => state.event.event_url

// Reducer
export default EventSlice.reducer