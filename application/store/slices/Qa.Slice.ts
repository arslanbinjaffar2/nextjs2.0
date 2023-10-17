import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Program, ProgramSettings, QaSettings } from 'application/models/qa/Qa'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface QaState {
    programs: Program[],
    qaSettings:QaSettings|null,
    programSettings:ProgramSettings|null,
}

const initialState: QaState = {
    programs: [],
    qaSettings:null,
    programSettings:null,
}

// Slice
export const QaSlice = createSlice({
    name: 'qa',
    initialState,
    reducers: {
        OnFetchPrograms() {},
        update(state, action: PayloadAction<{ programs: Program[], qa_settings:QaSettings, program_settings:ProgramSettings }>) {
            state.programs = action.payload.programs;
            state.qaSettings = action.payload.qa_settings;
            state.programSettings = action.payload.program_settings;
        }

    },
})

// Actions
export const QaActions = {
    OnFetchPrograms:QaSlice.actions.OnFetchPrograms,
    update:QaSlice.actions.update,
}

export const SelectPrograms = (state: RootState) => state.qa.programs

export const SelectProgramSettings = (state: RootState) => state.qa.programSettings

export const SelectQaSettings = (state: RootState) => state.qa.qaSettings




// Reducer
export default QaSlice.reducer