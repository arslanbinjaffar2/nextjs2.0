import { useCallback } from 'react'

import { SelectPolls, SelectCompletedPolls, PollActions, SelectPollDetail, SelectPollLabelDetail, SelectPollSubmitSuccess, SelectPollsCount, SelectMyPollResult, SelectMyPollResultDetail, SelectPollSettings } from 'application/store/slices/Poll.Slice'

import { PollLabels, PollSetting, PollSubmitData, Polls } from 'application/models/poll/Poll'
import { PollDetail } from 'application/models/poll/Detail'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { MyPollResultDetail } from 'application/models/poll/ResultDetail'

export type PollServiceOperators = {
    polls: Polls,
    myPollResult: Polls,
    polls_count:number,
    completed_polls: Polls,
    detail:PollDetail | null,
    poll_labels:PollLabels,
    submitSuccess:boolean,
    myPollResultDetail:MyPollResultDetail | null,
    pollSettings:PollSetting | null
    FetchPolls: () => void,
    FetchPollDetail: (payload:{id:number}) => void,
    SubmitPoll: (payload:PollSubmitData) => void,
    FetchMyPollResults: () => void,
    FetchMyPollResultDetail: (payload:{id:number}) => void,
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
        polls_count: useAppSelector(SelectPollsCount),
        detail: useAppSelector(SelectPollDetail),
        poll_labels: useAppSelector(SelectPollLabelDetail),
        submitSuccess: useAppSelector(SelectPollSubmitSuccess),
        myPollResult: useAppSelector(SelectMyPollResult),
        myPollResultDetail: useAppSelector(SelectMyPollResultDetail),
        pollSettings: useAppSelector(SelectPollSettings),
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
        FetchMyPollResults: useCallback(
            () => {
                dispatch(PollActions.FetchMyPollResults())
            },
        [dispatch],
        ),
        FetchMyPollResultDetail: useCallback(
            (payload: { id: number }) => {
                dispatch(PollActions.FetchMyPollResultDetail(payload))
            },
            [dispatch],
        ),
    }
}

export default UsePollService
