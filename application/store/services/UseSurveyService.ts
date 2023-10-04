import { useCallback } from 'react'

import { SelectSurveys, SelectCompletedSurveys, SurveyActions, SelectSurveyLabelDetail, SelectSurveySubmitSuccess, SelectSurveyDetail } from 'application/store/slices/Survey.Slice'

import { SurveyLabels, SurveySubmitData, Surveys } from 'application/models/survey/Survey'
import { SurveyDetail } from 'application/models/survey/Detail'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type SurveyServiceOperators = {
    surveys: Surveys,
    completed_surveys: Surveys,
    detail:SurveyDetail | null,
    survey_labels:SurveyLabels,
    submitSuccess:boolean,
    FetchSurveys: () => void,
    FetchSurveyDetail: (payload:{id:number}) => void,
    SubmitSurvey: (payload:SurveySubmitData) => void,
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseSurveyService = (): Readonly<SurveyServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        surveys: useAppSelector(SelectSurveys),
        completed_surveys: useAppSelector(SelectCompletedSurveys),
        detail: useAppSelector(SelectSurveyDetail),
        survey_labels: useAppSelector(SelectSurveyLabelDetail),
        submitSuccess: useAppSelector(SelectSurveySubmitSuccess),
        FetchSurveys: useCallback(
            () => {
                dispatch(SurveyActions.FetchSurveys())
            },
            [dispatch],
        ),
        FetchSurveyDetail: useCallback(
            (payload: { id: number }) => {
                dispatch(SurveyActions.FetchSurveyDetail(payload))
            },
            [dispatch],
        ),
        SubmitSurvey: useCallback(
            (payload: SurveySubmitData) => {
                dispatch(SurveyActions.SubmitSurvey(payload))
            },
            [dispatch],
        ),
    }
}

export default UseSurveyService
