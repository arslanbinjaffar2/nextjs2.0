import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Program } from 'application/models/program/Program'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface ProgramState {
    programs: Program[],
    query: string,
    screen: string,
    page: number,
    id: number,
    track_id: number,
}

const initialState: ProgramState = {
    programs: [],
    query: '',
    screen: '',
    page: 1,
    id: 0,
    track_id: 0,
}

// Slice
export const ProgramSlice = createSlice({
    name: 'programs',
    initialState,
    reducers: {
        FetchPrograms(state, action: PayloadAction<{ query: string, page: number, screen: string, id: number, track_id: number }>) {
            state.query = action.payload.query;
            state.id = action.payload.id;
            state.page = action.payload.page;
            state.screen = action.payload.screen;
            state.track_id = action.payload.track_id;
        },
        update(state, action: PayloadAction<{ programs: Program[], query: string, page: number }>) {
            const existed: any = current(state.programs);
            state.programs = action.payload.page === 1 ? action.payload.programs : [...existed, ...action.payload.programs];
        },
        MakeFavourite(state, action: PayloadAction<{ program_id: number, screen: string }>) { },
    },
})

// Actions
export const ProgramActions = {
    FetchPrograms: ProgramSlice.actions.FetchPrograms,
    update: ProgramSlice.actions.update,
    MakeFavourite: ProgramSlice.actions.MakeFavourite,
}

export const SelectMyPrograms = (state: RootState) => state.programs.programs

export const SelectQuery = (state: RootState) => state.programs.query

export const SelectPage = (state: RootState) => state.programs.page

export const SelectID = (state: RootState) => state.programs.id

export const SelectTrack = (state: RootState) => state.programs.track_id

// Reducer
export default ProgramSlice.reducer