import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from 'application/store/Index'

export interface EventState {
    loading: boolean;
    scroll: number;
}

const initialState: EventState = {
    loading: false,
    scroll: 0,
}

// Slice
export const LoadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        set(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setScrollCounter(state, action: PayloadAction<number>) {
            state.scroll = action.payload
        },
    },
})

// Actions
export const LoadingActions = {
    set: LoadingSlice.actions.set,
    setScrollCounter: LoadingSlice.actions.setScrollCounter,
}

// Selectors
export const isLoading = (state: RootState) => state.loading.loading;

export const scroll = (state: RootState) => state.loading.scroll;

// Reducer
export default LoadingSlice.reducer