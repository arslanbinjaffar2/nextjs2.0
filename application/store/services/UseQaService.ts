import { useCallback } from 'react'

import { SelectPrograms, QaActions, SelectProgramSettings, SelectQaSettings, SelectQaDetails,  SelectMyQuestions, SelectMyQuestionAnswers} from 'application/store/slices/Qa.Slice'

import { Program, ProgramSettings, QaSettings } from 'application/models/qa/Qa'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { AgendaDetail, Paragraph, Question, Speaker } from 'application/models/qa/Detail'

export type QaServiceOperators = {
    programs: Program[],
    programSettings:ProgramSettings | null
    qaSettings:QaSettings | null
    qaDetials:{
        program_detail:AgendaDetail|null,
        speakers:Speaker[],
        paragraph:Paragraph[],
        popular_questions:Question[],
        recent_questions:Question[],
        archived_questions:Question[],
        my_questions:Question[],
        clientIp:string,
        all_languages:number[],
        labels: any
    },
    my_questions: any,
    questionAnswers: any,
    FetchPrograms: () => void,
    FetchMyQuestions: () => void,
    FetchMyQuestionsAnswers: (payload:{id:number}) => void,
    FetchProgramDetail: (payload:{id:number}) => void,
    FetchTabDetails: (payload:{id:number}) => void,
    SubmitQa: (payload:any) => void,
    SubmitQaLike: (payload:{question_id:number, agenda_id:number}) => void,
    QaRecentPopularSocketUpdate: (payload:any) => void,
    QaSort: (payload:any) => void,
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseQaService = (): Readonly<QaServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        programs: useAppSelector(SelectPrograms),
        programSettings: useAppSelector(SelectProgramSettings),
        qaSettings: useAppSelector(SelectQaSettings),
        qaDetials: useAppSelector(SelectQaDetails),
        my_questions: useAppSelector(SelectMyQuestions),
        questionAnswers: useAppSelector(SelectMyQuestionAnswers),
        FetchPrograms: useCallback(
            () => {
                dispatch(QaActions.OnFetchPrograms())
            },
            [dispatch],
        ),
        FetchProgramDetail: useCallback(
            (payload: { id: number }) => {
                dispatch(QaActions.OnFetchProgramDetail(payload))
            },
            [dispatch],
        ),
        FetchTabDetails: useCallback(
            (payload: { id: number }) => {
                dispatch(QaActions.OnFetchTabDetails(payload))
            },
            [dispatch],
        ),
        SubmitQa: useCallback(
            (payload: any) => {
                dispatch(QaActions.SubmitQa(payload))
            },
            [dispatch],
        ),
        SubmitQaLike: useCallback(
            (payload: {question_id:number, agenda_id:number}) => {
                dispatch(QaActions.SubmitQaLike(payload))
            },
            [dispatch],
        ),
        QaRecentPopularSocketUpdate: useCallback(
            (payload:any) => {
                dispatch(QaActions.QaRecentPopularSocketUpdate(payload))
            },
            [dispatch],
        ),
        QaSort: useCallback(
            (payload:any) => {
                dispatch(QaActions.QaSort(payload))
            },
            [dispatch],
        ),
        FetchMyQuestions: useCallback(
            () => {
                dispatch(QaActions.FetchMyQuestions())
            },
            [dispatch],
        ),
        FetchMyQuestionsAnswers: useCallback(
            (payload: { id: number }) => {
                dispatch(QaActions.FetchMyQuestionsAnswers(payload))
            },
            [dispatch],
        ),
    }
}

export default UseQaService
