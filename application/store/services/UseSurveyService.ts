import { useCallback } from 'react'

import { SelectSurveys, SelectCompletedSurveys, SurveyActions, SelectSurveyLabelDetail, SelectSurveySubmitSuccess, SelectSurveyDetail, SelectMySurveyResult, SelectMySurveyResultDetail, SelectMySurveyResultScore, SelectSurveySettings } from 'application/store/slices/Survey.Slice'

import { SurveyLabels, SurveySetting, SurveySubmitData, Surveys } from 'application/models/survey/Survey'
import { SurveyDetail } from 'application/models/survey/Detail'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { MySurveyResultSurvey } from 'application/models/survey/ResultDetail'

export type SurveyServiceOperators = {
    surveys: Surveys,
    completed_surveys: Surveys,
    detail:SurveyDetail | null,
    survey_settings:SurveySetting | null,
    survey_labels:SurveyLabels,
    submitSuccess:boolean,
    mySurveyResult: Surveys,
    mySurveyResultDetail:MySurveyResultSurvey | null,
    mySurveyResultScore:number,
    FetchSurveys: () => void,
    FetchSurveyDetail: (payload:{id:number}) => void,
    SubmitSurvey: (payload:SurveySubmitData) => void,
    FetchMySurveyResults: () => void,
    FetchMySurveyResultDetail: (payload:{id:number}) => void,
    checkSurveyVotingPermission: (payload:{data:any}) => void,
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
        survey_settings: useAppSelector(SelectSurveySettings),
        submitSuccess: useAppSelector(SelectSurveySubmitSuccess),
        mySurveyResult: useAppSelector(SelectMySurveyResult),
        mySurveyResultDetail: useAppSelector(SelectMySurveyResultDetail),
        mySurveyResultScore: useAppSelector(SelectMySurveyResultScore),
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
        FetchMySurveyResults: useCallback(
            () => {
                dispatch(SurveyActions.FetchMySurveyResults())
            },
        [dispatch],
        ),
        FetchMySurveyResultDetail: useCallback(
            (payload: { id: number }) => {
                dispatch(SurveyActions.FetchMySurveyResultDetail(payload))
            },
            [dispatch],
        ),
        checkSurveyVotingPermission: useCallback(
            (payload: { data:any }) => {
                dispatch(SurveyActions.checkVotingPermission(payload))
            },
            [dispatch],
        ),
    }
}

export default UseSurveyService
