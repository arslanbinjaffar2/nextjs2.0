import { useCallback } from 'react'

import { SelectPolls, SelectCompletedPolls, PollActions, SelectPollDetail, SelectPollLabelDetail, SelectPollSubmitSuccess, SelectPollsCount, SelectMyPollResult, SelectMyPollResultDetail, SelectPollSettings, SelectMyPollResultScore, SelectMyPollTotalScore } from 'application/store/slices/Poll.Slice'

import { PollLabels, PollSetting, PollSubmitData, Polls } from 'application/models/poll/Poll'
import { PollDetail } from 'application/models/poll/Detail'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { MyPollResultDetailPoll } from 'application/models/poll/ResultDetail'

export type PollServiceOperators = {
    polls: Polls,
    myPollResult: Polls,
    polls_count:number,
    completed_polls: Polls,
    detail:PollDetail | null,
    poll_labels:PollLabels,
    submitSuccess:boolean,
    myPollResultDetail:MyPollResultDetailPoll | null,
    pollSettings:PollSetting | null
    myPollResultScore:number,
    myPollTotalScore:number,
    FetchPolls: () => void,
    FetchPollDetail: (payload:{id:number}) => void,
    SubmitPoll: (payload:PollSubmitData) => void,
    FetchMyPollResults: () => void,
    FetchMyPollResultDetail: (payload:{id:number}) => void,
    checkPollVotingPermission: (payload:{ data:any}) => void,
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
        myPollResultScore: useAppSelector(SelectMyPollResultScore),
        myPollTotalScore: useAppSelector(SelectMyPollTotalScore),
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
        checkPollVotingPermission: useCallback(
            (payload: { data:any }) => {
                dispatch(PollActions.checkVotingPermission(payload))
            },
            [dispatch],
        ),
    }
}

export default UsePollService
