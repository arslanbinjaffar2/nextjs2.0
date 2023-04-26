import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Event } from 'application/models/Event'

import type { RootState } from 'application/store/Index'

export interface EventState {
    event: Event
}

const initialState: EventState = {
    event: {}
}

// Slice
export const EventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        FetchEvent(state, action: PayloadAction<string>) { },
        FetchEventByCode(state, action: PayloadAction<string>) { },
        update(state, action: PayloadAction<Event>) {
            state.event = action.payload
        },
    },
})

// Actions
export const EventActions = {
    FetchEvent: EventSlice.actions.FetchEvent,
    FetchEventByCode: EventSlice.actions.FetchEventByCode,
    update: EventSlice.actions.update,
}

// Selectors
export const SelectEvent = (state: RootState) => state.event.event

// Reducer
export default EventSlice.reducer