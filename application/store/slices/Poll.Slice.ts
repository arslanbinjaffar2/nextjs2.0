import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Poll, Polls,  PollSetting} from 'application/models/poll/Poll'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface PollState {
    polls: Polls,
    completed_polls: Polls,
    detail: any,
    poll_settings:PollSetting | {}
}

const initialState: PollState = {
    polls: {},
    completed_polls: {},
    poll_settings:{},
    detail: {},
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
    },
})

// Actions
export const PollActions = {
    FetchPolls:PollSlice.actions.FetchPolls,
    update:PollSlice.actions.update
}

export const SelectPolls = (state: RootState) => state.polls.polls

export const SelectCompletedPolls = (state: RootState) => state.polls.completed_polls

// Reducer
export default PollSlice.reducer