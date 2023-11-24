import { useCallback } from 'react'

import { ProgramActions, SelectMyPrograms, SelectQuery, SelectPage, SelectID, SelectTrack, SelectTracks, SelectTrackDetail, SelectProgramDetail, SelectFavouriteProgramError } from 'application/store/slices/Program.Slice'

import { Program } from 'application/models/program/Program'

import { Track } from 'application/models/program/Track'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

import { Detail } from 'application/models/program/Detail';

export type ProgramServiceOperators = {
    query: string
    page: number
    id: number
    track_id: number
    programs: Program[]
    tracks: Track[]
    track: Track
    detail: Detail
    favouriteProgramError:string
    FetchPrograms: (payload: { query: string, page: number, screen: string, id: number, track_id: number }) => void
    MakeFavourite: (payload: { program_id: number, screen: string }) => void
    FetchTracks: (payload: { query: string, page: number, screen: string, track_id: number }) => void
    FetchProgramDetail: (payload: { id: number }) => void
    SetFavouriteProgramError: (payload: string) => void
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
        track_id: useAppSelector(SelectTrack),
        programs: useAppSelector(SelectMyPrograms),
        tracks: useAppSelector(SelectTracks),
        track: useAppSelector(SelectTrackDetail),
        detail: useAppSelector(SelectProgramDetail),
        favouriteProgramError: useAppSelector(SelectFavouriteProgramError),
        FetchPrograms: useCallback(
            (payload: { query: string, page: number, screen: string, id: number, track_id: number }) => {
                dispatch(ProgramActions.FetchPrograms(payload))
            },
            [dispatch],
        ),
        MakeFavourite: useCallback(
            (payload: { program_id: number, screen: string }) => {
                dispatch(ProgramActions.MakeFavourite(payload))
            },
            [dispatch],
        ),
        FetchTracks: useCallback(
            (payload: { query: string, page: number, screen: string, track_id: number }) => {
                dispatch(ProgramActions.FetchTracks(payload))
            },
            [dispatch],
        ),
        FetchProgramDetail: useCallback(
            (payload: { id: number }) => {
                dispatch(ProgramActions.FetchProgramDetail(payload))
            },
            [dispatch],
        ),
        SetFavouriteProgramError: useCallback(
            (payload: string) => {
                dispatch(ProgramActions.SetFavouriteProgramError(payload))
            },
            [dispatch],
        ),
    }

}

export default UseProgramService