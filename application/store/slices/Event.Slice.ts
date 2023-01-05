import { createAction, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { Event } from 'application/models/Event'

import type { RootState } from 'application/store/Index'

export interface EventState {
    slug: string,
    event: Event
}

const initialState: EventState = {
    slug: '',
    event: {}
}

// Slice
export const EventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        update(state, action: PayloadAction<Event>) {
            state.event = action.payload
        },
    },
})

// Actions
export const EventActions = {
    FetchEvent: createAction(`${EventSlice.name}/FetchEvent`, (slug: string) => ({
        payload: {
            slug: slug
        },
    })),
    FetchEventByCode: createAction(`${EventSlice.name}/FetchEventByCode`, (code: string) => ({
        payload: {
            code: code
        },
    })),
    update: EventSlice.actions.update,
}

// Selectors
export const SelectEvent = (state: RootState) => state.event.event

// Reducer
export default EventSlice.reducer