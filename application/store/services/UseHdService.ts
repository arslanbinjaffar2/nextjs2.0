import { useCallback } from 'react'

import { SelectGroups, HdActions, SelectHdSettings, SelectDetail, SelectLabels, SelectMyQuestions, SelectMyQuestionsAnswers } from 'application/store/slices/Hd.Slice'

import { Group, Setting, Labels} from 'application/models/hd/Hd'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { Popularquestion, Archivedquestion } from 'application/models/hd/Detail'

export type HdServiceOperators = {
    groups: Group[],
    hdSettings:Setting|null,
    labels:Labels|null,
    hdDetails:{
        group:Group|null,
        popular_questions:Popularquestion[],
        archived_questions:Archivedquestion[],
        recent_questions:Popularquestion[],
        clientIp:string,
        all_languages:number[]
    },
    my_questions:any[],
    my_questions_answers:any[],
    FetchGroups: () => void,
    FetchGroupDetail: (payload:{id:number}) => void,
    FetchTabDetails: (payload:{id:number}) => void,
    SubmitHd: (payload:any) => void,
    SubmitHdLike: (payload:{question_id:number, group_id:number}) => void,
    HdRecentPopularSocketUpdate: (payload:any) => void,
    HdSort: (payload:any) => void,
    FetchMyHDQuestions: () => void,
    FetchHDMyQuestionsAnswers: (payload:any) => void,
    SendMessage: (payload:any) => void,
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
        my_questions:useAppSelector(SelectMyQuestions),
        my_questions_answers:useAppSelector(SelectMyQuestionsAnswers),
        FetchGroups: useCallback(
            () => {
                dispatch(HdActions.OnFetchGroups())
            },
            [dispatch],
        ),
        FetchGroupDetail: useCallback(
            (payload: { id: number }) => {
                dispatch(HdActions.OnFetchGroupDetail(payload))
            },
            [dispatch],
        ),
        FetchTabDetails: useCallback(
            (payload: { id: number }) => {
                dispatch(HdActions.OnFetchTabDetails(payload))
            },
            [dispatch],
        ),
        SubmitHd: useCallback(
            (payload: any) => {
                dispatch(HdActions.SubmitHd(payload))
            },
            [dispatch],
        ),
        SubmitHdLike: useCallback(
            (payload: {question_id:number, group_id:number}) => {
                dispatch(HdActions.SubmitHdLike(payload))
            },
            [dispatch],
        ),
        HdRecentPopularSocketUpdate: useCallback(
            (payload:any) => {
                dispatch(HdActions.HdRecentPopularSocketUpdate(payload))
            },
            [dispatch],
        ),
        HdSort: useCallback(
            (payload:any) => {
                dispatch(HdActions.HdSort(payload))
            },
            [dispatch],
        ),
        FetchMyHDQuestions: useCallback(
            () => {
                dispatch(HdActions.FetchMyHDQuestions())
            },
            [dispatch],
        ),
        FetchHDMyQuestionsAnswers: useCallback(
            (payload:any) => {
                dispatch(HdActions.FetchHDMyQuestionsAnswers(payload))
            },
            [dispatch],
        ),
        SendMessage: useCallback(
            (payload:any) => {
                dispatch(HdActions.SendMessage(payload))
            },
            [dispatch],
        ),
    }
}

export default UseHdService
