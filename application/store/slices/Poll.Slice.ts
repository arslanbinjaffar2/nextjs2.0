import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Poll, Polls,  PollSetting} from 'application/models/poll/Poll'
import { PollDetail } from 'application/models/poll/Detail'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface PollState {
    polls: Polls,
    completed_polls: Polls,
    detail: PollDetail | null,
    poll_settings:PollSetting | {}
}

const initialState: PollState = {
    polls: {},
    completed_polls: {},
    poll_settings:{},
    detail: null,
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
        },
        FetchPollDetail(state, action: PayloadAction<{ id: number }>) { },
        updateDetail(state, action: PayloadAction<{ detail: PollDetail }>) {
            state.detail = action.payload.detail;
        },
    },
})

// Actions
export const PollActions = {
    FetchPolls:PollSlice.actions.FetchPolls,
    update:PollSlice.actions.update,
    FetchPollDetail:PollSlice.actions.FetchPollDetail,
    updateDetail:PollSlice.actions.updateDetail,
}

export const SelectPolls = (state: RootState) => state.polls.polls

export const SelectCompletedPolls = (state: RootState) => state.polls.completed_polls

export const SelectPollDetail = (state: RootState) => state.polls.detail


// Reducer
export default PollSlice.reducer