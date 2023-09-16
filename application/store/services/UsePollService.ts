import { useCallback } from 'react'

import { SelectPolls, SelectCompletedPolls, PollActions, SelectPollDetail, SelectPollLabelDetail, SelectPollSubmitting, SelectPollSubmitSuccess } from 'application/store/slices/Poll.Slice'

import { PollLabels, PollSubmitData, Polls } from 'application/models/poll/Poll'
import { PollDetail } from 'application/models/poll/Detail'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type PollServiceOperators = {
    polls: Polls,
    completed_polls: Polls,
    detail:PollDetail | null,
    poll_labels:PollLabels,
    submitSuccess:boolean,
    FetchPolls: () => void,
    FetchPollDetail: (payload:{id:number}) => void,
    SubmitPoll: (payload:PollSubmitData) => void,
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UsePollService = (): Readonly<PollServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        polls: useAppSelector(SelectPolls),
        completed_polls: useAppSelector(SelectCompletedPolls),
        detail: useAppSelector(SelectPollDetail),
        poll_labels: useAppSelector(SelectPollLabelDetail),
        submitSuccess: useAppSelector(SelectPollSubmitSuccess),
        FetchPolls: useCallback(
            () => {
                dispatch(PollActions.FetchPolls())
            },
            [dispatch],
        ),
        FetchPollDetail: useCallback(
            (payload: { id: number }) => {
                dispatch(PollActions.FetchPollDetail(payload))
            },
            [dispatch],
        ),
        SubmitPoll: useCallback(
            (payload: PollSubmitData) => {
                dispatch(PollActions.SubmitPoll(payload))
            },
            [dispatch],
        ),
    }
}

export default UsePollService
