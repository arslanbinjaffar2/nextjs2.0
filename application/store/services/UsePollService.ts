import { useCallback } from 'react'

import { SelectPolls, SelectCompletedPolls, PollActions } from 'application/store/slices/Poll.Slice'

import { Polls } from 'application/models/poll/Poll'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type PollServiceOperators = {
    polls: Polls,
    completed_polls: Polls,
    FetchPolls: () => void
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
        FetchPolls: useCallback(
            () => {
                dispatch(PollActions.FetchPolls())
            },
            [dispatch],
        ),
    }
}

export default UsePollService