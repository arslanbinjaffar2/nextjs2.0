import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface SocketState {
    socket: any,
}

const initialState: SocketState = {
    socket: null,
}

// Slice
export const SocketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket(state, action: PayloadAction<any>) {
            state.socket = action.payload;
        },
    },
})

// Actions
export const SocketActions = {
    SetSocket:SocketSlice.actions.setSocket,
}

export const SelectSockets = (state: RootState) => state.socket.socket

// Reducer
export default SocketSlice.reducer