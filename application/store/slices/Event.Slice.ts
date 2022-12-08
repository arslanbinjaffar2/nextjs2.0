import { createAction, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { Event } from 'application/models/Event'

import type { RootState } from 'application/store/Index'

export interface EventState {
    event: Event[]
}

const initialState: EventState = {
    event: [],
}

// Slice
export const EventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        fetchAllSucceeded(state, action: PayloadAction<Event[]>) {
            // it's okay to do this here, because immer makes it immutable under the hood😊
            state.event = action.payload
        },
    },
})

// Actions
export const EventActions = {
    create: createAction(`${EventSlice.name}/create`, (event: Event) => ({
        payload: event,
    })),
    fetchAll: createAction(`${EventSlice.name}/fetchAll`),
    fetchAllSucceeded: EventSlice.actions.fetchAllSucceeded,
    update: createAction<Event>(`${EventSlice.name}/update`),
    delete: createAction<Event>(`${EventSlice.name}/delete`),
}

// Selectors
export const SelectEvent = (state: RootState) => state.event

// Reducer
export default EventSlice.reducer