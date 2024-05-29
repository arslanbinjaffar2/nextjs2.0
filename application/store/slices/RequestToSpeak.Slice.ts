import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'application/store/Index'
import { Program } from '../../models/program/Program'

export interface RequestToSpeakState {
    programs: Program[],
}

const initialState: RequestToSpeakState = {
    programs: [],
}

// Slice
export const RequestToSpeakSlice = createSlice({
    name: 'requestToSpeak',
    initialState,
    reducers: {
        FetchActivePrograms() {},
    },
})

// Actions
export const RequestToSpeakActions = {
    FetchActivePrograms:RequestToSpeakSlice.actions.FetchActivePrograms,
}

export const SelectActivePrograms = (state: RootState) => state.requestToSpeak.programs

// Reducer
export default RequestToSpeakSlice.reducer