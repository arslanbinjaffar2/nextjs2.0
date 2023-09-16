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
}

const initialState: ProgramState = {
    programs: [],
    query: '',
    screen: '',
    page: 1,
}

// Slice
export const ProgramSlice = createSlice({
    name: 'programs',
    initialState,
    reducers: {
        FetchPrograms(state, action: PayloadAction<{ query: string, page: number, screen: string }>) {
            state.query = action.payload.query;
            state.page = action.payload.page;
            state.screen = action.payload.screen;
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

// Reducer
export default ProgramSlice.reducer