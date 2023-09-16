import { useCallback } from 'react'

import { ProgramActions, SelectMyPrograms, SelectQuery, SelectPage, SelectID } from 'application/store/slices/Program.Slice'

import { Program } from 'application/models/program/Program'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type ProgramServiceOperators = {
    query: string
    page: number
    id: number
    programs: Program[]
    FetchPrograms: (payload: { query: string, page: number, screen: string, id: number }) => void
    MakeFavourite: (payload: { program_id: number, screen: string }) => void
}

/**
 * ProgramService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseProgramService = (): Readonly<ProgramServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        query: useAppSelector(SelectQuery),
        page: useAppSelector(SelectPage),
        id: useAppSelector(SelectID),
        programs: useAppSelector(SelectMyPrograms),
        FetchPrograms: useCallback(
            (payload: { query: string, page: number, screen: string, id: number }) => {
                dispatch(ProgramActions.FetchPrograms(payload))
            },
            [dispatch],
        ),
        MakeFavourite: useCallback(
            (payload: { program_id: number, screen: string }) => {
                dispatch(ProgramActions.MakeFavourite(payload))
            },
            [dispatch],
        )
    }
}

export default UseProgramService