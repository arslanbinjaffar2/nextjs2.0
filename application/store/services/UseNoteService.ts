import { useCallback } from 'react'

import { SelectSavingNote, NoteActions, SelectMyNote, SelectMyNotes, SelectMyTypeNotes  } from 'application/store/slices/Notes.Slice'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { MyNote } from 'application/models/notes/Notes'

export type NoteServiceOperators = {
    my_note: MyNote | null,
    saving_notes: boolean,
    SaveNote: (payload:any) => void,
    GetNote: (payload:any) => void,
    UpdateNote: (payload:any) => void,
    FetchMyNotesByType: (payload:any) => void,
    FetchMyNotes: () => void,
    myNotes: any | undefined
    myTypeNotes: any | undefined
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseNoteService = (): Readonly<NoteServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        my_note:useAppSelector(SelectMyNote),
        saving_notes: useAppSelector(SelectSavingNote),
        myNotes: useAppSelector(SelectMyNotes),
        myTypeNotes: useAppSelector(SelectMyTypeNotes),
        SaveNote: useCallback(
            (payload:any) => {
                dispatch(NoteActions.SaveNote(payload))
            },
            [dispatch],
        ),
        UpdateNote: useCallback(
            (payload: { notes:string, id: number, type: string }) => {
                dispatch(NoteActions.UpdateNote(payload))
            },
            [dispatch],
        ),
        GetNote: useCallback(
            (payload:any) => {
                dispatch(NoteActions.GetMyNote(payload))
            },
            [dispatch],
        ),
        FetchMyNotes: useCallback(
            () => {
                dispatch(NoteActions.FetchMyNotes())
            },
            [dispatch],
        ),
        FetchMyNotesByType: useCallback(
            (payload: { note_type:string }) => {
                dispatch(NoteActions.FetchMyNotesByType(payload))
            },
            [dispatch],
        ),
    }
}

export default UseNoteService
