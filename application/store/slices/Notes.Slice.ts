import { createSlice, PayloadAction } from '@reduxjs/toolkit'



import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface NoteState {
    my_notes: any[],
    saving_notes:boolean,
}

const initialState: NoteState = {
    my_notes: [],
    saving_notes:false,
}

// Slice
export const NoteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        SaveNote(state, action: PayloadAction<{ note: string, note_type:string, note_type_id:number }>) {
            state.saving_notes = true;
        },
        SetSaving(state, action:PayloadAction<boolean>){
            state.saving_notes = action.payload;
        }
    },
})

// Actions
export const NoteActions = {
    SaveNote:NoteSlice.actions.SaveNote,
    SetSaving:NoteSlice.actions.SetSaving,
}

export const SelectSavingNote = (state: RootState) => state.notes.saving_notes



// Reducer
export default NoteSlice.reducer