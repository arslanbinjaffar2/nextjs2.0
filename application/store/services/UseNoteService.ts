import { useCallback } from 'react'

import { SelectSavingNote, NoteActions  } from 'application/store/slices/Notes.Slice'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type NoteServiceOperators = {
    saving_notes: boolean,
    SaveNote: (payload:any) => void,
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseNoteService = (): Readonly<NoteServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        saving_notes: useAppSelector(SelectSavingNote),
        SaveNote: useCallback(
            (payload:any) => {
                dispatch(NoteActions.SaveNote(payload))
            },
            [dispatch],
        ),
    }
}

export default UseNoteService
