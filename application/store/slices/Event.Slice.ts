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
        FetchEventSucceeded(state, action: PayloadAction<Event>) {
            // it's okay to do this here, because immer makes it immutable under the hood😊
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
    FetchEventSucceeded: EventSlice.actions.FetchEventSucceeded,
    UpdateEvent: createAction<Event>(`${EventSlice.name}/update`),
}

// Selectors
export const SelectEvent = (state: RootState) => state.event.event

// Reducer
export default EventSlice.reducer