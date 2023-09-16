import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from 'application/store/Index'

export interface EnvState {
    enviroment: string,
    api_base_url: string,
    eventcenter_base_url: string,
    msw_enabled: string,
    api_gateway_url: string,
    app_server_enviornment: string,
}

const initialState: EnvState = {
    enviroment: '',
    api_base_url: '',
    eventcenter_base_url: '',
    msw_enabled: '',
    api_gateway_url: '',
    app_server_enviornment:'',
}

// Slice
export const EnvSlice = createSlice({
    name: 'env',
    initialState,
    reducers: {
        update(state, action: PayloadAction<EnvState>) {
            state.enviroment = action.payload.enviroment
            state.api_base_url = action.payload.api_base_url
            state.eventcenter_base_url = action.payload.eventcenter_base_url
            state.msw_enabled = action.payload.msw_enabled
            state.api_gateway_url = action.payload.api_gateway_url
            state.app_server_enviornment = action.payload.app_server_enviornment
        },
    },
})

// Actions
export const EnvActions = {
    update: EnvSlice.actions.update,
}

// Selectors
export const Env = (state: RootState) => state.env

// Reducer
export default EnvSlice.reducer