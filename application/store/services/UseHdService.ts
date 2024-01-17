import { useCallback } from 'react'

import { SelectGroups, HdActions, SelectHdSettings, SelectDetail, SelectLabels } from 'application/store/slices/Hd.Slice'

import { Group, Setting, Labels} from 'application/models/hd/Hd'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
// import { AgendaDetail, Paragraph, Question, Speaker } from 'application/models/hd/Detail'

export type HdServiceOperators = {
    groups: Group[],
    hdSettings:Setting|null,
    labels:Labels|null,
    hdDetails:{
        group:Group|null,
    },
    FetchGroups: () => void,
    // FetchGroupDetail: (payload:{id:number}) => void,
    // FetchTabDetails: (payload:{id:number}) => void,
    // SubmitHd: (payload:any) => void,
    // SubmitHdLike: (payload:{question_id:number, agenda_id:number}) => void,
    // HdRecentPopularSocketUpdate: (payload:any) => void,
    // HdSort: (payload:any) => void,
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseHdService = (): Readonly<HdServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        groups: useAppSelector(SelectGroups),
        hdSettings: useAppSelector(SelectHdSettings),
        labels:useAppSelector(SelectLabels),
        hdDetails:useAppSelector(SelectDetail),
        FetchGroups: useCallback(
            () => {
                dispatch(HdActions.OnFetchGroups())
            },
            [dispatch],
        ),
        // FetchGroupDetail: useCallback(
        //     (payload: { id: number }) => {
        //         dispatch(HdActions.OnFetchGroupDetail(payload))
        //     },
        //     [dispatch],
        // ),
        // FetchTabDetails: useCallback(
        //     (payload: { id: number }) => {
        //         dispatch(HdActions.OnFetchTabDetails(payload))
        //     },
        //     [dispatch],
        // ),
        // SubmitHd: useCallback(
        //     (payload: any) => {
        //         dispatch(HdActions.SubmitHd(payload))
        //     },
        //     [dispatch],
        // ),
        // SubmitHdLike: useCallback(
        //     (payload: {question_id:number, agenda_id:number}) => {
        //         dispatch(HdActions.SubmitHdLike(payload))
        //     },
        //     [dispatch],
        // ),
        // HdRecentPopularSocketUpdate: useCallback(
        //     (payload:any) => {
        //         dispatch(HdActions.HdRecentPopularSocketUpdate(payload))
        //     },
        //     [dispatch],
        // ),
        // HdSort: useCallback(
        //     (payload:any) => {
        //         dispatch(HdActions.HdSort(payload))
        //     },
        //     [dispatch],
        // ),
    }
}

export default UseHdService
