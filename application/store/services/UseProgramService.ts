import { useCallback } from 'react'

import { ProgramActions, SelectMyPrograms, SelectQuery, SelectPage } from 'application/store/slices/Program.Slice'

import { Program } from 'application/models/program/Program'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type ProgramServiceOperators = {
    query: string
    page: number
    programs: Program[]
    FetchMyPrograms: (payload: { query: string, page: number, screen: string }) => void
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
        programs: useAppSelector(SelectMyPrograms),
        FetchMyPrograms: useCallback(
            (payload: { query: string, page: number, screen: string }) => {
                dispatch(ProgramActions.FetchMyPrograms(payload))
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