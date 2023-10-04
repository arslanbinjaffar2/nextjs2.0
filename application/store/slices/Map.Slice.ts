import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Map } from 'application/models/Map'

import type { RootState } from 'application/store/Index'

export interface MapState {
    map: Map,
}

const initialState: MapState = {
    map: {},
}

// Slice
export const MapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        FetchMap(state) { },
        update(state, action: PayloadAction<Map>) {
            state.map = action.payload;
        },
    },
})

// Actions
export const MapActions = {
    FetchMap: MapSlice.actions.FetchMap,
    update: MapSlice.actions.update,
}

export const SelectMap = (state: RootState) => state.map.map

// Reducer
export default MapSlice.reducer