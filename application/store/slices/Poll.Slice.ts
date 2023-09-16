import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Poll, PollLabels, Polls,  PollSetting, PollSubmitData} from 'application/models/poll/Poll'
import { PollDetail } from 'application/models/poll/Detail'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface PollState {
    polls: Polls,
    completed_polls: Polls,
    detail: PollDetail | null,
    poll_settings:PollSetting | {},
    poll_labels:PollLabels
    submitSuccess:boolean,
}

const initialState: PollState = {
    polls: {},
    completed_polls: {},
    poll_settings:{},
    detail: null,
    poll_labels:{},
    submitSuccess:false,
}

// Slice
export const PollSlice = createSlice({
    name: 'polls',
    initialState,
    reducers: {
        FetchPolls() {},
        update(state, action: PayloadAction<{ polls: Polls, completed_polls: Polls, poll_settings:PollSetting }>) {
            state.polls = action.payload.polls;
            state.completed_polls = action.payload.completed_polls;
            state.poll_settings = action.payload.poll_settings;
            state.submitSuccess = false
        },
        FetchPollDetail(state, action: PayloadAction<{ id: number }>) { },
        updateDetail(state, action: PayloadAction<{ detail: PollDetail, poll_labels:PollLabels }>) {
            state.detail = action.payload.detail;
            state.poll_labels = action.payload.poll_labels;
        },
        SubmitPoll(state, action: PayloadAction<PollSubmitData>){
            state.submitSuccess = false
        },
        PollSubmitSuccess(state){
            state.submitSuccess = true
        },

    },
})

// Actions
export const PollActions = {
    FetchPolls:PollSlice.actions.FetchPolls,
    update:PollSlice.actions.update,
    FetchPollDetail:PollSlice.actions.FetchPollDetail,
    updateDetail:PollSlice.actions.updateDetail,
    SubmitPoll:PollSlice.actions.SubmitPoll,
    PollSubmitSuccess:PollSlice.actions.PollSubmitSuccess,
}

export const SelectPolls = (state: RootState) => state.polls.polls

export const SelectCompletedPolls = (state: RootState) => state.polls.completed_polls

export const SelectPollDetail = (state: RootState) => state.polls.detail

export const SelectPollLabelDetail = (state: RootState) => state.polls.poll_labels

export const SelectPollSubmitSuccess = (state: RootState) => state.polls.submitSuccess


// Reducer
export default PollSlice.reducer