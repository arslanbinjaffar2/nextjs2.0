import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Survey, SurveyLabels, Surveys,  SurveySetting, SurveySubmitData} from 'application/models/survey/Survey'
// import { SurveyDetail } from 'application/models/survey/Detail'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface SurveyState {
    surveys: Surveys,
    completed_surveys: Surveys,
    // detail: SurveyDetail | null,
    survey_settings:SurveySetting | {},
    survey_labels:SurveyLabels
    submitSuccess:boolean,
}

const initialState: SurveyState = {
    surveys: {},
    completed_surveys: {},
    survey_settings:{},
    // detail: null,
    survey_labels:{},
    submitSuccess:false,
}

// Slice
export const SurveySlice = createSlice({
    name: 'surveys',
    initialState,
    reducers: {
        FetchSurveys() {},
        update(state, action: PayloadAction<{ surveys: Surveys, completed_surveys: Surveys, survey_settings:SurveySetting }>) {
            state.surveys = action.payload.surveys;
            state.completed_surveys = action.payload.completed_surveys;
            state.survey_settings = action.payload.survey_settings;
            state.submitSuccess = false
        },
        FetchSurveyDetail(state, action: PayloadAction<{ id: number }>) { },
        updateDetail(state, action: PayloadAction<{ detail: SurveyDetail, survey_labels:SurveyLabels }>) {
            // state.detail = action.payload.detail;
            state.survey_labels = action.payload.survey_labels;
        },
        SubmitSurvey(state, action: PayloadAction<SurveySubmitData>){
            state.submitSuccess = false
        },
        SurveySubmitSuccess(state){
            state.submitSuccess = true
        },

    },
})

// Actions
export const SurveyActions = {
    FetchSurveys:SurveySlice.actions.FetchSurveys,
    update:SurveySlice.actions.update,
    FetchSurveyDetail:SurveySlice.actions.FetchSurveyDetail,
    updateDetail:SurveySlice.actions.updateDetail,
    SubmitSurvey:SurveySlice.actions.SubmitSurvey,
    SurveySubmitSuccess:SurveySlice.actions.SurveySubmitSuccess,
}

export const SelectSurveys = (state: RootState) => state.surveys.surveys

export const SelectCompletedSurveys = (state: RootState) => state.surveys.completed_surveys

// export const SelectSurveyDetail = (state: RootState) => state.surveys.detail

export const SelectSurveyLabelDetail = (state: RootState) => state.surveys.survey_labels

export const SelectSurveySubmitSuccess = (state: RootState) => state.surveys.submitSuccess


// Reducer
export default SurveySlice.reducer