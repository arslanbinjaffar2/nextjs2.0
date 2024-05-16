import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import { MyNote } from 'application/models/notes/Notes'
import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface NoteState {
    my_note: MyNote | null,
    saving_notes:boolean,
    myNotes: any | null,
}

const initialState: NoteState = {
    my_note: null,
    saving_notes:false,
    myNotes: null,
}

// Slice
export const NoteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        GetMyNote(state, action: PayloadAction<{ note_type:string, note_type_id:number }>) {},
        SaveNote(state, action: PayloadAction<{ note: string, note_type:string, note_type_id:number }>) {
            state.saving_notes = true;
        },
        UpdateNote(state, action: PayloadAction<{ notes:string, id: number, type: string }>) {
            state.saving_notes = true;
        },
        SetSaving(state, action:PayloadAction<boolean>){
            state.saving_notes = action.payload;
        },
        update(state, action:PayloadAction<any>){
            state.my_note = action.payload.note;
        },
        updateMyNotes(state, action:PayloadAction<any>){
            state.myNotes = action.payload;
        },
        FetchMyNotes() {}
    },
})

// Actions
export const NoteActions = {
    SaveNote:NoteSlice.actions.SaveNote,
    SetSaving:NoteSlice.actions.SetSaving,
    GetMyNote:NoteSlice.actions.GetMyNote,
    update:NoteSlice.actions.update,
    UpdateNote:NoteSlice.actions.UpdateNote,
    updateMyNotes:NoteSlice.actions.updateMyNotes,
    FetchMyNotes:NoteSlice.actions.FetchMyNotes,
}

export const SelectSavingNote = (state: RootState) => state.notes.saving_notes
export const SelectMyNote = (state: RootState) => state.notes.my_note
export const SelectMyNotes = (state: RootState) => state.notes.myNotes



// Reducer
export default NoteSlice.reducer